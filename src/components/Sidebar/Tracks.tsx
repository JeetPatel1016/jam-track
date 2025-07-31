import {
  Button,
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
  ChevronDown,
  ChevronRight,
  EllipsisVertical,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Track, TrackType } from "@/types";
import { TRACK_TYPE } from "@/lib/tracks";
import { TRACK_TYPE_PATTERNS, PATTERN_BLUEPRINTS } from "@/lib/patterns";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addTrack,
  duplicateTrack,
  removeTrack,
  updateTrack,
} from "@/state/slices/projectSlice";

export default function Tracks() {
  const { tracks } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  return (
    <>
      <Flex direction={"column"} style={{ height: "100%" }}>
        <Flex p={"4"}>
          {/* Dropdown menu here for instrument selection */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button size={"1"} color="gray" highContrast variant="soft">
                <Plus size={16} />
                Add Track
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {Object.entries(TRACK_TYPE).map(([trackType, details]) => (
                <DropdownMenu.Item
                  onClick={() => dispatch(addTrack(trackType as TrackType))}
                  key={trackType}
                >
                  {details.icon}
                  {details.displayName}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
        <Flex
          direction={"column"}
          align="center"
          justify="center"
          style={{ height: "100%" }}
        >
          {/* Here */}
          {tracks.length ? (
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              style={{ height: "500px" }}
            >
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
                No tracks added yet.
              </Text>
              <Text size={"2"} style={{ color: "var(--gray-11)" }}>
                Add a new track to get started.
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}

function TrackCard({ track }: { track: Track }) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  const dispatch = useAppDispatch();

  const [localTrack, setLocalTrack] = useState<Track>(track);

  useEffect(() => {
    setLocalTrack(track);
  }, [track]);

  const handleUpdate = (
    field: keyof Track,
    value: string | number,
    commit = false
  ) => {
    const updated = { ...localTrack, [field]: value };
    setLocalTrack(updated);
    if (commit) {
      dispatch(updateTrack(updated));
    }
  };

  return (
    <Card key={track.id}>
      {/* Top View */}
      <Flex direction="row" align="center" gap="2" width="100%">
        {TRACK_TYPE[track.name].icon}
        <Text
          size="2"
          style={{ color: "var(--gray-12)" }}
          weight="medium"
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
            <DropdownMenu.Item shortcut="⌘ E" onClick={toggleOpen}>
              Edit
            </DropdownMenu.Item>
            <DropdownMenu.Item
              shortcut="⌘ D"
              onClick={() => dispatch(duplicateTrack(track))}
            >
              Duplicate
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              shortcut="⌘ ⌫"
              color="red"
              onClick={() => dispatch(removeTrack(track.id))}
            >
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {/* Mute/Solo */}
        <Flex>
          <IconButton variant="soft" size="1" color="gray" radius="none">
            <Text size="1">M</Text>
          </IconButton>
          <IconButton variant="soft" size="1" color="gray" radius="none">
            <Text size="1">S</Text>
          </IconButton>
        </Flex>

        {/* Expand/Collapse */}
        <IconButton
          onClick={toggleOpen}
          variant="soft"
          size="1"
          color="gray"
          radius="large"
        >
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </IconButton>
      </Flex>

      {/* Hidden content */}
      <Flex display={open ? "flex" : "none"} mt="4" gap="4" direction="column">
        {/* Volume Control */}
        <Flex direction="column" gap="2">
          <Text size="1" style={{ color: "var(--gray-11)" }}>
            Volume
          </Text>
          <Slider
            size="1"
            value={[localTrack.volume]}
            onValueChange={([val]) => handleUpdate("volume", val)}
            onValueCommit={([val]) => handleUpdate("volume", val, true)}
          />
        </Flex>

        {/* Pattern Selector */}
        <Flex direction="column" gap="2" mb="2">
          <Text size="1" style={{ color: "var(--gray-11)" }}>
            Pattern
          </Text>
          <Select.Root
            value={localTrack.pattern}
            onValueChange={(val) => handleUpdate("pattern", val, true)}
            size="1"
          >
            <Select.Trigger
              placeholder="Select a pattern"
              radius="large"
              style={{ background: "var(--gray-4)" }}
            />
            <Select.Content>
              <Select.Group>
                <Select.Label>Patterns</Select.Label>
                {TRACK_TYPE_PATTERNS[track.name]?.map((patternId) => (
                  <Select.Item value={patternId} key={patternId}>
                    {PATTERN_BLUEPRINTS[patternId]?.displayName || patternId}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Flex>
    </Card>
  );
}
