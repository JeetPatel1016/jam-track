import { Flex, IconButton, Slider } from "@radix-ui/themes";
import { Play, Redo2, Repeat, SkipBack, Undo2, Volume2 } from "lucide-react";
import Metronome from "./Metronome";
import BPMControl from "./Tempo";

export default function Controls() {
  return (
    <Flex>
      {/* Undo buttons */}
      <Flex gap={"1"}>
        <IconButton radius="large" variant="soft" color="gray" size={"3"}>
          <Undo2 size={18} />
        </IconButton>
        <IconButton radius="large" variant="soft" color="gray" size={"3"}>
          <Redo2 size={18} />
        </IconButton>
      </Flex>
      {/* Controls */}
      <Flex gap={"1"} ml={"auto"} mr={"auto"} align={"center"}>
        <Metronome />
        <BPMControl />
        {/* Skipback Button */}
        <IconButton radius="large" size={"3"} variant="soft" color="gray">
          <SkipBack size={18} />
          {/* Play Button */}
        </IconButton>
        <IconButton radius="large" size={"3"} variant="soft" color="gray">
          <Play size={18} />
        </IconButton>
        {/* Play Button */}
        <IconButton radius="large" size={"3"} variant="soft" color="gray">
          <Repeat size={18} />
        </IconButton>
      </Flex>
      {/* Volume Slider */}
      <Flex gap={"4"} width={"200px"} align={"center"}>
        <Volume2 />
        <Slider defaultValue={[75]} size={"1"} />
      </Flex>
    </Flex>
  );
}
