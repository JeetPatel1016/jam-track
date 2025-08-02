import { Flex, IconButton, Grid, Slider } from "@radix-ui/themes";
// import { Grid, Flex, IconButton } from "@radix-ui/themes";
import { Play, Redo2, Repeat, SkipBack, Undo2, Volume2 } from "lucide-react";
import Metronome from "./Metronome";
import BPMControl from "./Tempo";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setVolume } from "@/state/slices/projectSlice";

export default function Controls() {
  const { volume } = useAppSelector((state) => state.project.settings);
  const dispatch = useAppDispatch();
  return (
    <Grid
      columns="3"
      width="100%"
      align="center"
      style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
    >
      {/* Left: Undo Buttons */}
      <Flex gap="1" justify="start">
        <IconButton radius="large" variant="soft" color="gray" size="3">
          <Undo2 size={18} />
        </IconButton>
        <IconButton radius="large" variant="soft" color="gray" size="3">
          <Redo2 size={18} />
        </IconButton>
      </Flex>

      {/* Center: Transport Controls */}
      <Flex gap="1" align="center" justify="center">
        <Metronome />
        <BPMControl />
        <IconButton radius="large" size="3" variant="soft" color="gray">
          <SkipBack size={18} />
        </IconButton>
        <IconButton radius="large" size="3" variant="soft" color="gray">
          <Play size={18} />
        </IconButton>
        <IconButton radius="large" size="3" variant="soft" color="gray">
          <Repeat size={18} />
        </IconButton>
      </Flex>

      {/* Right: Volume */}
      <Flex gap="4" align="center" justify="end">
        <Volume2 />
        <Slider
          defaultValue={[volume]}
          size="1"
          style={{maxWidth: "200px"}}
          onValueCommit={(value) => dispatch(setVolume(value[0]))}
        />
      </Flex>
    </Grid>
  );
}
