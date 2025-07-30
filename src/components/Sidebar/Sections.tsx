import {
  Card,
  Flex,
  IconButton,
  ScrollArea,
  Text,
  TextField,
} from "@radix-ui/themes";
import { GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, type CSSProperties } from "react";

export default function Sections() {
  const [sections, setSections] = useState([
    { id: "section-1", name: "Intro", bars: 8 },
    { id: "section-2", name: "Verse", bars: 12 },
    { id: "section-3", name: "Chorus", bars: 16 },
    { id: "section-4", name: "Bridge", bars: 8 },
    { id: "section-5", name: "Solo", bars: 12 },
    { id: "section-6", name: "Outro", bars: 8 },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  function handleStartEdit(id: string, currentName: string) {
    setEditingId(id);
    setEditingValue(currentName);
  }

  function handleChangeEdit(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingValue(e.target.value);
  }

  function handleFinishEdit() {
    if (editingId) {
      setSections((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...s, name: editingValue.trim() || s.name } : s
        )
      );
    }
    setEditingId(null);
    setEditingValue("");
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      setSections((items) => arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <ScrollArea type="auto" scrollbars="vertical" style={{ height: "500px" }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <Flex
            direction={"column"}
            style={{ width: "100%" }}
            gap="4"
            p={"4"}
            pt="0"
          >
            {sections.map((section) => (
              <SortableSectionCard
                key={section.id}
                id={section.id}
                name={section.name}
                bars={section.bars}
                isEditing={editingId === section.id}
                editingValue={editingValue}
                onStartEdit={() => handleStartEdit(section.id, section.name)}
                onChangeEdit={handleChangeEdit}
                onFinishEdit={handleFinishEdit}
              />
            ))}
          </Flex>
        </SortableContext>
      </DndContext>
    </ScrollArea>
  );
}

interface SortableSectionCardProps {
  id: string;
  name: string;
  bars: number;
  isEditing: boolean;
  editingValue: string;
  onStartEdit: () => void;
  onChangeEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFinishEdit: () => void;
}

function SortableSectionCard({
  id,
  name,
  bars,
  isEditing,
  editingValue,
  onStartEdit,
  onChangeEdit,
  onFinishEdit,
}: SortableSectionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    userSelect: "none",
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onFinishEdit();
    }
  }

  return (
    <Card ref={setNodeRef} style={style} {...attributes}>
      <Flex
        direction="row"
        justify={"between"}
        align={"center"}
        width={"100%"}
        px={"1"}
      >
        <Flex direction={"column"}>
          {isEditing ? (
            <TextField.Root
              value={editingValue}
              mb={"2"}
              onChange={onChangeEdit}
              onKeyDown={handleKeyDown}
              onBlur={onFinishEdit}
              autoFocus
            >
              <TextField.Slot />
            </TextField.Root>
          ) : (
            <Text
              size={"5"}
              weight={"medium"}
              onDoubleClick={onStartEdit}
              style={{ cursor: "pointer" }}
              title="Double-click to rename"
              mb={"2"}
            >
              {name}
            </Text>
          )}
          <Text size="2" style={{ color: "var(--gray-11)" }}>
            {bars} Bars
          </Text>
        </Flex>
        <span {...listeners} style={{ display: "flex" }}>
          <IconButton variant="ghost" color="gray" radius="large">
            <GripVertical size={18} style={{ cursor: "grab" }} />
          </IconButton>
        </span>
      </Flex>
    </Card>
  );
}
