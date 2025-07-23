import { Button, Text } from "@radix-ui/themes";
import { useState, useRef } from "react";

export default function BPMControl() {
  const [bpm, setBpm] = useState(120);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startValue.current = bpm;
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
    setBpm(newValue);
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
      }}
      title="Drag up/down to adjust BPM"
    >
      <Text style={{ color: "white" }}>{Math.round(bpm)}</Text>
      <Text size={"1"} weight={"regular"}>
        bpm
      </Text>
    </Button>
  );
}
