import {
  Card,
  Flex,
  Grid,
  IconButton,
  ScrollArea,
  Select,
  Separator,
  Text,
} from "@radix-ui/themes";
import { Clipboard, Copy, Delete, Plus, Scissors, X } from "lucide-react";
import { useState } from "react";

type Chord = {
  id: string;
  key: string;
  type: string;
  inversion: string;
  bass: string;
  duration: string; // e.g., "4/4", "3/4"
};
const progression: Chord[] = [
  {
    id: "1",
    key: "C",
    type: "maj7",
    inversion: "Root",
    bass: "C",
    duration: "4/4",
  },
  {
    id: "2",
    key: "G",
    type: "7",
    inversion: "1st",
    bass: "B",
    duration: "4/4",
  },
  {
    id: "3",
    key: "A",
    type: "min",
    inversion: "2nd",
    bass: "C",
    duration: "5/4",
  },
  {
    id: "4",
    key: "F",
    type: "maj7",
    inversion: "Root",
    bass: "F",
    duration: "3/4",
  },
];

export default function MainContent() {
  const [selectedChord, setSelectedChord] = useState<Chord | null>(null);

  return (
    <Flex p={"5"} direction={"column"} width={"100%"} position={"relative"}>
      {/* Top Bar */}
      <Flex>
        <Text size={"5"} weight={"medium"}>
          Section A
        </Text>
        <Flex style={{ marginLeft: "auto" }} gap={"2"} align={"center"}>
          <IconButton variant="soft" radius="large" color="gray">
            <Plus size={16} style={{ color: "var(--gray-12)" }} />
          </IconButton>
          <IconButton variant="soft" radius="large" color="crimson">
            <Delete size={16} />
          </IconButton>
          <Separator orientation="vertical" mx={"2"} />
          <IconButton variant="soft" radius="large" color="gray">
            <Scissors size={16} style={{ color: "var(--gray-12)" }} />
          </IconButton>
          <IconButton variant="soft" radius="large" color="gray">
            <Copy size={16} style={{ color: "var(--gray-12)" }} />
          </IconButton>
          <IconButton variant="soft" radius="large" color="gray">
            <Clipboard size={16} style={{ color: "var(--gray-12)" }} />
          </IconButton>
        </Flex>
      </Flex>
      {/* Main Cards Scrollable */}
      <ScrollArea mt="6" style={{ height: "400px" }}>
        <Grid columns={"4"} gap="5">
          {progression.map((chord) => (
            <Card
              style={{
                backgroundColor:
                  selectedChord?.id === chord.id
                    ? "var(--teal-10)"
                    : "var(--gray-2)",
              }}
              key={chord.id}
              onClick={() => setSelectedChord(chord)}
            >
              <Flex
                align={"center"}
                justify={"between"}
                gap="2"
                px={"3"}
                py={"4"}
              >
                <Text size="4" weight="medium">
                  {chord.key}
                  {chord.type}
                  {chord.key !== chord.bass ? ` / ${chord.bass}` : ""}
                </Text>
                <Text size="2" style={{ color: "var(--gray-11)" }}>
                  {chord.duration}
                </Text>
              </Flex>
            </Card>
          ))}
        </Grid>
      </ScrollArea>
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
                onClick={() => setSelectedChord(null)}
              >
                <X size={20} />
              </IconButton>
            </Flex>
            <Grid columns={"4"} my="4" gap="6">
              <div>
                <Text as="p" size={"3"} mb="2">
                  Key
                </Text>
                <Select.Root value={selectedChord.key} size={"3"}>
                  <Select.Trigger radius="large" style={{ width: "100%" }} />
                  <Select.Content>
                    <Select.Item value="C">C</Select.Item>
                    <Select.Item value="C#">C# / D♭</Select.Item>
                    <Select.Item value="D">D</Select.Item>
                    <Select.Item value="D#">D# / E♭</Select.Item>
                    <Select.Item value="E">E</Select.Item>
                    <Select.Item value="F">F</Select.Item>
                    <Select.Item value="F#">F# / G♭</Select.Item>
                    <Select.Item value="G">G</Select.Item>
                    <Select.Item value="G#">G# / A♭</Select.Item>
                    <Select.Item value="A">A</Select.Item>
                    <Select.Item value="A#">A# / B♭</Select.Item>
                    <Select.Item value="B">B</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
              <div>
                <Text as="p" size={"3"} mb="2">
                  Chord Type
                </Text>
                <Select.Root value={selectedChord.type} size={"3"}>
                  <Select.Trigger radius="large" style={{ width: "100%" }} />
                  <Select.Content>
                    <Select.Item value="maj">maj</Select.Item>
                    <Select.Item value="min">min</Select.Item>
                    <Select.Item value="7">7</Select.Item>
                    <Select.Item value="maj7">maj7</Select.Item>
                    <Select.Item value="min7">min7</Select.Item>
                    <Select.Item value="dim">dim</Select.Item>
                    <Select.Item value="aug">aug</Select.Item>
                    <Select.Item value="sus2">sus2</Select.Item>
                    <Select.Item value="sus4">sus4</Select.Item>
                    <Select.Item value="add9">add9</Select.Item>
                    <Select.Item value="6">6</Select.Item>
                    <Select.Item value="9">9</Select.Item>
                    <Select.Item value="11">11</Select.Item>
                    <Select.Item value="13">13</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
              <div>
                <Text as="p" size={"3"} mb="2">
                  Inversion
                </Text>
                <Select.Root value={selectedChord.inversion} size={"3"}>
                  <Select.Trigger radius="large" style={{ width: "100%" }} />
                  <Select.Content>
                    <Select.Item value="Root">Root</Select.Item>
                    <Select.Item value="1st">1st Inversion</Select.Item>
                    <Select.Item value="2nd">2nd Inversion</Select.Item>
                    <Select.Item value="3rd">3rd Inversion</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
              <div>
                <Text as="p" size={"3"} mb="2">
                  Duration
                </Text>
                <Select.Root value={selectedChord.duration} size={"3"}>
                  <Select.Trigger radius="large" style={{ width: "100%" }} />
                  <Select.Content>
                    <Select.Item value="1/4">1/4</Select.Item>
                    <Select.Item value="2/4">2/4</Select.Item>
                    <Select.Item value="3/4">3/4</Select.Item>
                    <Select.Item value="4/4">4/4</Select.Item>
                    <Select.Item value="5/4">5/4</Select.Item>
                    <Select.Item value="6/4">6/8</Select.Item>
                    <Select.Item value="7/4">6/8</Select.Item>
                    <Select.Item value="8/4">6/8</Select.Item>
                    <Select.Item value="6/8">6/8</Select.Item>
                    <Select.Item value="12/8">12/8</Select.Item>
                    <Select.Item value="7/8">7/8</Select.Item>
                    <Select.Item value="9/8">9/8</Select.Item>
                    <Select.Item value="10/8">10/8</Select.Item>
                    <Select.Item value="11/8">11/8</Select.Item>
                    <Select.Item value="13/8">13/8</Select.Item>
                    <Select.Item value="14/8">14/8</Select.Item>
                    <Select.Item value="15/8">15/8</Select.Item>
                    <Select.Item value="16/8">16/8</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
            </Grid>
          </Flex>
        </div>
      )}
    </Flex>
  );
}
