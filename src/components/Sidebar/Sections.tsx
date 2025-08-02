import {
  Button,
  Card,
  DropdownMenu,
  Flex,
  IconButton,
  ScrollArea,
  Text,
  TextField,
} from "@radix-ui/themes";
import { EllipsisVertical, GripVertical, Plus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  // arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, type CSSProperties } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addSection,
  duplicateSection,
  removeSection,
  reorderSections,
  updateSection,
} from "@/state/slices/projectSlice";
import { selectSection } from "@/state/slices/workspaceSlice";

export default function Sections() {
  const { sections } = useAppSelector((state) => state.project);
  const { selectedSectionId } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

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
      dispatch(reorderSections({ oldIndex, newIndex }));
    }
  }

  function handleStartEdit(id: string, currentName: string) {
    setEditingId(id);
    setEditingValue(currentName);
  }

  function handleChangeEdit(e: React.ChangeEvent<HTMLInputElement>) {
    setEditingValue(e.target.value);
  }

  function handleFinishEdit() {
    if (editingId) {
      const section = sections.find((s) => s.id === editingId);
      if (section) {
        dispatch(
          updateSection({ ...section, name: editingValue.trim() || "Untitled" })
        );
      }
    }
    setEditingId(null);
    setEditingValue("");
  }

  return (
    <Flex direction={"column"} style={{ height: "100%" }}>
      <Flex p={"4"}>
        <Button
          onClick={() => dispatch(addSection())}
          size={"1"}
          color="gray"
          highContrast
          variant="soft"
        >
          <Plus size={16} />
          Add Section
        </Button>
        {/* Dropdown menu here */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger disabled={!selectedSectionId}>
            <IconButton
              variant="soft"
              highContrast
              radius="large"
              size="1"
              color="gray"
              style={{ marginLeft: "auto" }}
            >
              <EllipsisVertical size={14} />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            align="end"
            sideOffset={10}
            style={{ minWidth: "150px" }}
          >
            <DropdownMenu.Item
              onClick={() => {
                dispatch(duplicateSection(selectedSectionId!));
                dispatch(selectSection(null));
              }}
            >
              Duplicate
            </DropdownMenu.Item>
            <DropdownMenu.Item
              color="ruby"
              onClick={() => {
                dispatch(removeSection(selectedSectionId!));
                dispatch(selectSection(null));
              }}
            >
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
      <Flex
        direction={"column"}
        align="center"
        justify="start"
        style={{ height: "100%" }}
      >
        <>
          {sections.length ? (
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              style={{ height: "500px" }}
            >
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
                    pt="2"
                  >
                    {sections.map((section) => (
                      <SortableSectionCard
                        key={section.id}
                        id={section.id}
                        name={section.name}
                        chordsCount={section.chords?.length || 0}
                        isEditing={editingId === section.id}
                        editingValue={editingValue}
                        onStartEdit={() =>
                          handleStartEdit(section.id, section.name)
                        }
                        onChangeEdit={handleChangeEdit}
                        onFinishEdit={handleFinishEdit}
                        selected={selectedSectionId === section.id}
                        onSelect={() => dispatch(selectSection(section.id))}
                      />
                    ))}
                  </Flex>
                </SortableContext>
              </DndContext>
            </ScrollArea>
          ) : (
            <Flex
              direction={"column"}
              align="center"
              justify="center"
              style={{ height: "100%" }}
            >
              <Text
                size={"4"}
                weight={"medium"}
                style={{ color: "var(--gray-12)" }}
              >
                No Sections Added
              </Text>
              <Text size={"2"} style={{ color: "var(--gray-11)" }}>
                Please create a section to get started.
              </Text>
            </Flex>
          )}
        </>
      </Flex>
    </Flex>
  );
}

interface SortableSectionCardProps {
  id: string;
  name: string;
  chordsCount: number;
  isEditing: boolean;
  editingValue: string;
  onStartEdit: () => void;
  onChangeEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFinishEdit: () => void;
  selected?: boolean;
  onSelect?: () => void;
}

function SortableSectionCard({
  id,
  name,
  chordsCount,
  isEditing,
  editingValue,
  onStartEdit,
  onChangeEdit,
  onFinishEdit,
  selected,
  onSelect,
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
    <Card
      ref={setNodeRef}
      style={{
        ...style,
        border: selected ? "2px solid var(--teal-10)" : undefined,
        boxShadow: selected ? "0 0 0 2px var(--teal-8)" : undefined,
        cursor: "pointer",
      }}
      {...attributes}
      onClick={onSelect}
    >
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
              size={"4"}
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
            {chordsCount} Chord{chordsCount === 1 ? "" : "s"}
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
