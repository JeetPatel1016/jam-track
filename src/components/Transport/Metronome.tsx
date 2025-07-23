import {
  Button,
  Popover,
  Separator,
  Flex,
  Text,
  Switch,
  IconButton,
  Select,
  Slider,
} from "@radix-ui/themes";
import { Timer, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

export default function MetronomeControl() {
  const [isOn, setIsOn] = useState(false);
  const popoverTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover.Root>
      <Flex align="center">
        <Button
          size="3"
          radius="large"
          variant={isOn ? "solid" : "soft"}
          color={isOn ? "teal" : "gray"}
          onClick={(e) => {
            // Prevent popover trigger if clicking chevron
            if (
              popoverTriggerRef.current?.contains(e.target as HTMLButtonElement)
            )
              return;
            setIsOn(!isOn);
          }}
        >
          <Timer size={20} />

          {/* Separator and Chevron inside Button */}
          <Separator orientation="vertical" decorative />

          <Popover.Trigger>
            <IconButton
              ref={popoverTriggerRef}
              variant="ghost"
              size="1"
              style={{ padding: 0 }}
              aria-label="Open metronome controls"
              onClick={(e) => e.stopPropagation()} // prevent toggle
            >
              <ChevronDown size={16} />
            </IconButton>
          </Popover.Trigger>
        </Button>
      </Flex>

      {/* Popover Content */}
      <Popover.Content align="end">
        <Flex direction="column" gap="4">
          {/* Metronome Sound */}
          <Flex direction={"column"} gap={"2"} width={"200px"}>
            <Text weight="medium">Metronome Sound</Text>
            <Select.Root defaultValue="Click" size={"3"}>
              <Select.Trigger radius="large" />
              <Select.Content>
                <Select.Item value="Click">Click</Select.Item>
                <Select.Item value="Conga">Conga</Select.Item>
                <Select.Item value="Hi Hat">Hi Hat</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>
          {/* Metronome Volume */}
          <Flex direction={"column"} gap={"2"} width={"200px"}>
            <Text weight="medium">Metronome Volume</Text>
            <Slider defaultValue={[75]} size={"1"} />
          </Flex>

          <Flex align="center" justify="between">
            <Text size="2">Enable</Text>
            <Switch checked={isOn} onCheckedChange={setIsOn} />
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
