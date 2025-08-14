import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addChord,
  removeChord,
  reorderChords,
} from "@/state/slices/projectSlice";
import {
  Card,
  Flex,
  Grid,
  IconButton,
  ScrollArea,
  Select,
  Text,
} from "@radix-ui/themes";
import { Delete, GripVertical, Plus, X } from "lucide-react";
import {
  Fragment,
  useState,
  type CSSProperties,
  type MouseEventHandler,
} from "react";
import { updateChord } from "@/state/slices/projectSlice";
import {
  KEY_OPTIONS,
  CHORD_TYPE_OPTIONS,
  INVERSION_OPTIONS,
  DURATION_OPTIONS,
  GROUP_ORDER,
} from "@/lib/chordOptions";
import type { Inversion, Key } from "@/types";
import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

export default function MainContent() {
  const [selectedChordId, setSelectedChordId] = useState<string | null>(null);
  const { selectedSectionId } = useAppSelector((state) => state.workspace);
  const section = useAppSelector((state) =>
    state.project.sections.find((s) => s.id === selectedSectionId)
  );
  const dispatch = useAppDispatch();

  // Find the selected chord from state, not local copy
  const selectedChord =
    section?.chords?.find((c) => c.id === selectedChordId) || null;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (section && over && active.id !== over.id) {
      const oldIndex =
        section.chords?.findIndex((s) => s.id === active.id) || 0;
      const newIndex = section.chords?.findIndex((s) => s.id === over.id) || 0;
      if (oldIndex === -1 || newIndex === -1) return;

      // dispatch handle chord switching
      dispatch(reorderChords({ sectionId: section!.id, oldIndex, newIndex }));
    }
  };
  return (
    <Flex p={"5"} direction={"column"} width={"100%"} position={"relative"}>
      {section ? (
        <>
          {/* Top Bar */}
          <Flex align={"center"} gap={"4"}>
            <Text size={"5"} weight={"medium"}>
              {section.name}
            </Text>
            <Flex style={{ marginLeft: "auto" }} gap={"2"} align={"center"}>
              <IconButton
                onClick={() => dispatch(addChord(selectedSectionId!))}
                variant="soft"
                radius="large"
                color="gray"
              >
                <Plus size={16} style={{ color: "var(--gray-12)" }} />
              </IconButton>
              <IconButton
                disabled={!selectedChordId}
                onClick={() => {
                  dispatch(
                    removeChord({
                      chordId: selectedChordId!,
                      sectionId: selectedSectionId!,
                    })
                  );
                  setSelectedChordId(null);
                }}
                variant="soft"
                radius="large"
                color="crimson"
              >
                <Delete size={16} />
              </IconButton>
            </Flex>
          </Flex>
          {/* Main Cards Scrollable */}
          {section.chords?.length ? (
            <ScrollArea
              mt="6"
              style={{ height: selectedChord ? "200px" : "400px" }}
            >
              {/* All DND Context stuff here */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={section.chords.map((c) => c.id)}
                  strategy={rectSortingStrategy}
                >
                  <Grid columns={"4"} gap="5">
                    {section.chords!.map((chord) => (
                      <SortableChordCard
                        id={chord.id}
                        chordKey={chord.key}
                        type={chord.type}
                        duration={chord.duration}
                        bass={chord.bass}
                        isSelected={selectedChordId === chord.id}
                        onSelect={() => setSelectedChordId(chord.id)}
                      />
                    ))}
                  </Grid>
                </SortableContext>
              </DndContext>
            </ScrollArea>
          ) : (
            <>
              <Flex
                width={"100%"}
                height={"100%"}
                align={"center"}
                justify={"center"}
              >
                <Text style={{ color: "var(--gray-11)" }}>
                  No chords in the section. Start by adding chords.
                </Text>
              </Flex>
            </>
          )}
          {/* Chord Editor */}
          {selectedChord && (
            <div
              style={{
                position: "absolute",
                bottom: "0",
                width: "calc(100% - 48px)",
                left: "0",
                borderTop: "1px solid var(--gray-6)",
                padding: "24px",
                background: "var(--gray-1)",
              }}
            >
              <Flex direction={"column"} gap={"2"}>
                <Flex align={"center"} justify={"between"}>
                  <Text size={"5"} weight={"medium"}>
                    Chord Editor
                  </Text>
                  <IconButton
                    variant="ghost"
                    radius="large"
                    color="gray"
                    onClick={() => setSelectedChordId(null)}
                  >
                    <X size={20} />
                  </IconButton>
                </Flex>
                <Grid columns={"5"} my="4" gap="6">
                  <div>
                    <Text as="p" size={"3"} mb="2">
                      Key
                    </Text>
                    <Select.Root
                      value={selectedChord.key}
                      size={"3"}
                      onValueChange={(val) =>
                        dispatch(
                          updateChord({
                            sectionId: section.id,
                            chord: { ...selectedChord, key: val as Key },
                          })
                        )
                      }
                    >
                      <Select.Trigger
                        radius="large"
                        style={{ width: "100%" }}
                      />
                      <Select.Content>
                        {KEY_OPTIONS.map((opt) => (
                          <Select.Item key={opt.value} value={opt.value}>
                            {opt.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </div>
                  <div>
                    <Text as="p" size={"3"} mb="2">
                      Bass
                    </Text>
                    <Select.Root
                      value={selectedChord.bass}
                      size={"3"}
                      onValueChange={(val) =>
                        dispatch(
                          updateChord({
                            sectionId: section.id,
                            chord: { ...selectedChord, bass: val as Key },
                          })
                        )
                      }
                    >
                      <Select.Trigger
                        radius="large"
                        style={{ width: "100%" }}
                      />
                      <Select.Content>
                        {KEY_OPTIONS.map((opt) => (
                          <Select.Item key={opt.value} value={opt.value}>
                            {opt.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </div>
                  <div>
                    <Text as="p" size={"3"} mb="2">
                      Chord Type
                    </Text>
                    <Select.Root
                      value={selectedChord.type}
                      size={"3"}
                      onValueChange={(val) =>
                        dispatch(
                          updateChord({
                            sectionId: section.id,
                            chord: { ...selectedChord, type: val },
                          })
                        )
                      }
                    >
                      <Select.Trigger
                        radius="large"
                        style={{ width: "100%" }}
                      />
                      <Select.Content>
                        {GROUP_ORDER.map((category, groupIndex) => {
                          if (
                            !CHORD_TYPE_OPTIONS[category] ||
                            CHORD_TYPE_OPTIONS[category].length === 0
                          ) {
                            return null;
                          }

                          return (
                            <Fragment key={category}>
                              {groupIndex > 0 && <Select.Separator />}
                              <Select.Group>
                                <Select.Label>
                                  {category.replace("_", " ").toUpperCase()}
                                </Select.Label>
                                {CHORD_TYPE_OPTIONS[category].map((chord) => (
                                  <Select.Item
                                    key={chord.value}
                                    value={chord.value}
                                  >
                                    {chord.label}
                                  </Select.Item>
                                ))}
                              </Select.Group>
                            </Fragment>
                          );
                        })}
                      </Select.Content>
                    </Select.Root>
                  </div>
                  <div>
                    <Text as="p" size={"3"} mb="2">
                      Inversion
                    </Text>
                    <Select.Root
                      value={selectedChord.inversion}
                      size={"3"}
                      onValueChange={(val) =>
                        dispatch(
                          updateChord({
                            sectionId: section.id,
                            chord: {
                              ...selectedChord,
                              inversion: val as Inversion,
                            },
                          })
                        )
                      }
                    >
                      <Select.Trigger
                        radius="large"
                        style={{ width: "100%" }}
                      />
                      <Select.Content>
                        {INVERSION_OPTIONS.map((opt) => (
                          <Select.Item key={opt.value} value={opt.value}>
                            {opt.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </div>
                  <div>
                    <Text as="p" size={"3"} mb="2">
                      Duration
                    </Text>
                    <Select.Root
                      value={selectedChord.duration}
                      size={"3"}
                      onValueChange={(val) =>
                        dispatch(
                          updateChord({
                            sectionId: section.id,
                            chord: { ...selectedChord, duration: val },
                          })
                        )
                      }
                    >
                      <Select.Trigger
                        radius="large"
                        style={{ width: "100%" }}
                      />
                      <Select.Content>
                        {DURATION_OPTIONS.map((opt) => (
                          <Select.Item key={opt.value} value={opt.value}>
                            {opt.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </div>
                </Grid>
              </Flex>
            </div>
          )}
        </>
      ) : (
        <Flex
          width={"100%"}
          height={"100%"}
          align={"center"}
          justify={"center"}
        >
          <Text style={{ color: "var(--gray-11)" }}>
            Select a section to view its chords
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

interface SortableChordCardProps {
  id: string;
  isSelected: boolean;
  onSelect: MouseEventHandler<HTMLDivElement>;
  chordKey: Key;
  type: string;
  bass: Key;
  duration: string;
}

function SortableChordCard(chord: SortableChordCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chord.id });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    userSelect: "none",
  };

  return (
    <Card
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: chord.isSelected ? "var(--teal-10)" : "var(--gray-2)",
      }}
      {...attributes}
      key={chord.id}
      onClick={chord.onSelect}
    >
      <Flex align={"center"} gap="2" px={"3"} pr={"2"} py={"4"}>
        <Text size="4" weight="medium">
          {chord.chordKey}
          {chord.type}
          {chord.chordKey !== chord.bass ? ` / ${chord.bass}` : ""}
        </Text>
        <Text size="2" style={{ color: "var(--gray-11)" }} ml={"auto"}>
          {chord.duration}
        </Text>
        <span {...listeners} style={{ display: "flex", marginLeft: "8px" }}>
          <IconButton variant="ghost" color="gray" radius="large">
            <GripVertical size={18} style={{ cursor: "grab" }} />
          </IconButton>
        </span>
      </Flex>
    </Card>
  );
}
