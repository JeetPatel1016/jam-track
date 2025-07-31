import { Box } from "@radix-ui/themes";
import Sections from "./Sections";
import Tracks from "./Tracks";

// Will be removed when workspace/session context will be implemented.
type SidebarProps = {
  state: "sections" | "tracks";
};

const componentMap = {
  sections: Sections,
  tracks: Tracks,
};

export default function Sidebar({ state }: SidebarProps) {
  const ComponentToRender = componentMap[state];
  return (
    <Box width="400px" style={{ height: "100%" }}>
      <ComponentToRender />
    </Box>
  );
}
