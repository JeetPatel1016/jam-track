import { Flex, SegmentedControl, Separator } from "@radix-ui/themes";
import Header from "./Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import MainContent from "@/components/Workspace/MainContent";
import { useState } from "react";

export default function AppLayout() {
  // Can move this to workspace state along with selected Section
  const [state, setState] = useState<"sections" | "tracks">("sections");

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Flex direction={"column"} height={"100%"}>
        <Header />
        <Separator size={"4"} />
        <div style={{ width: "100vw", height: "100vh" }}>
          <Flex height={"100%"}>
            {/* Content goes here */}
            <Sidebar state={state} />
            <Separator orientation={"vertical"} size={"4"} />
            <MainContent />
            {/* Other components can be added here */}
          </Flex>
        </div>
        <Separator size={"4"} mt={"auto"} />
        <Flex px="4" py="4">
          <SegmentedControl.Root
            value={state}
            onValueChange={(value) => {
              if (value === "sections" || value === "tracks") {
                setState(value);
              }
            }}
          >
            <SegmentedControl.Item value="sections">
              Sections
            </SegmentedControl.Item>
            <SegmentedControl.Item value="tracks">Tracks</SegmentedControl.Item>
          </SegmentedControl.Root>
        </Flex>
      </Flex>
    </div>
  );
}
