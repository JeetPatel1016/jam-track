import { Button, Text } from "@radix-ui/themes";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setTempo } from "@/state/slices/projectSlice";

export default function BPMControl() {
  const { settings } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startValue.current = settings.tempo;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const deltaY = startY.current - e.clientY;
    const step = 1;
    const newValue = Math.max(
      30,
      Math.min(300, startValue.current + deltaY * step)
    );
    dispatch(setTempo(Math.round(newValue)));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <Button
      variant="soft"
      color="gray"
      size="3"
      radius="large"
      onMouseDown={handleMouseDown}
      style={{
        cursor: "ns-resize",
        userSelect: "none",
        width: "100%",
        maxWidth: "100px",
        display: "flex",
      }}
      title="Drag up/down to adjust BPM"
    >
      <Text align="right" style={{ color: "white" }}>{settings.tempo}</Text>
      <Text ml="auto" size={"1"} weight={"regular"}>
        bpm
      </Text>
    </Button>
  );
}
