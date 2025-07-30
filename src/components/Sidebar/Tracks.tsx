import {
  Card,
  DropdownMenu,
  Flex,
  IconButton,
  ScrollArea,
  Select,
  Slider,
  Text,
} from "@radix-ui/themes";
import {
  CassetteTape,
  ChevronDown,
  ChevronRight,
  EllipsisVertical,
} from "lucide-react";
import { useState } from "react";

const tracks = [
  { id: "track-1", name: "Guitar" },
  { id: "track-2", name: "Drums" },
  { id: "track-3", name: "Bass" },
];

export default function Tracks() {
  return (
    <ScrollArea type="auto" scrollbars="vertical" style={{ height: "500px" }}>
      <Flex
        direction={"column"}
        style={{ width: "100%" }}
        gap="4"
        p={"4"}
        pt="0"
      >
        {tracks.map((track) => (
          <TrackCard track={track} />
        ))}
      </Flex>
    </ScrollArea>
  );
}

// Enum for track instruments later

function TrackCard({ track }: { track: { id: string; name: string } }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <Card key={track.id}>
      {/* Top View */}
      <Flex direction={"row"} align="center" gap="2" width={"100%"}>
        <CassetteTape size={16} />
        <Text
          size={"2"}
          style={{ color: "var(--gray-12)" }}
          weight={"medium"}
          mr="auto"
        >
          {track.name}
        </Text>
        {/* Dropdown For Edit Actions */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton size="1" variant="ghost" radius="small" color="gray">
              <EllipsisVertical size={14} />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <Flex>
          <IconButton variant="soft" size="1" color="gray" radius="none">
            <Text size="1">M</Text>
          </IconButton>
          <IconButton variant="soft" size="1" color="gray" radius="none">
            <Text size="1">S</Text>
          </IconButton>
        </Flex>
        <IconButton
          onClick={toggleOpen}
          variant="soft"
          size={"1"}
          color="gray"
          radius="large"
        >
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </IconButton>
      </Flex>
      {/* Hidden content */}
      <Flex
        display={open ? "flex" : "none"}
        mt={"4"}
        gap={"4"}
        direction={"column"}
      >
        <Flex direction={"column"} gap="2">
          <Text size="1" style={{ color: "var(--gray-11)" }}>
            Volume
          </Text>
          <Slider size="1" defaultValue={[50]} />
        </Flex>
        <Flex direction={"column"} gap="2" mb={"2"}>
          <Text size="1" style={{ color: "var(--gray-11)" }}>
            Pattern
          </Text>
          <Select.Root defaultValue="apple" size={"2"}>
            <Select.Trigger
              placeholder="Select a pattern"
              radius="large"
              style={{
                background: "var(--gray-4)",
              }}
            />
            <Select.Content>
              <Select.Group>
                <Select.Label>Fruits</Select.Label>
                <Select.Item value="orange">Orange</Select.Item>
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="grape" disabled>
                  Grape
                </Select.Item>
              </Select.Group>
              <Select.Separator />
              <Select.Group>
                <Select.Label>Vegetables</Select.Label>
                <Select.Item value="carrot">Carrot</Select.Item>
                <Select.Item value="potato">Potato</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Flex>
    </Card>
  );
}
