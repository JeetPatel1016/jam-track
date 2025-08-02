import { Box } from "@radix-ui/themes";
import Sections from "./Sections";
import Tracks from "./Tracks";
import { useAppSelector } from "@/hooks/redux";
import type { ViewType } from "@/types";
import type { ReactNode } from "react";

const componentMap: Record<ViewType, () => ReactNode> = {
  sections: Sections,
  tracks: Tracks,
};

export default function Sidebar() {
  const { view } = useAppSelector((state) => state.workspace);
  const ComponentToRender = componentMap[view];
  return (
    <Box width="400px" style={{ height: "100%" }}>
      <ComponentToRender />
    </Box>
  );
}
