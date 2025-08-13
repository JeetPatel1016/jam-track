import { Flex, SegmentedControl, Separator } from "@radix-ui/themes";
import Header from "./Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import MainContent from "@/components/Workspace/MainContent";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { ViewType } from "@/types";
import { changeView } from "@/state/slices/workspaceSlice";
import { useEffect, useRef } from "react";
import { TrackManager } from "@/audio/TrackManager";

export default function AppLayout() {
  const trackManagerRef = useRef<TrackManager | null>(null);
  const { view } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!trackManagerRef.current) {
      trackManagerRef.current = new TrackManager();
    }
    return () => {
      trackManagerRef.current?.dispose?.();
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Flex direction={"column"} height={"100%"}>
        <Header />
        <Separator size={"4"} />
        <div style={{ width: "100vw", height: "100vh" }}>
          <Flex height={"100%"}>
            {/* Content goes here */}
            <Sidebar />
            <Separator orientation={"vertical"} size={"4"} />
            <MainContent />
            {/* Other components can be added here */}
          </Flex>
        </div>
        <Separator size={"4"} mt={"auto"} />
        <Flex px="4" py="4">
          <SegmentedControl.Root
            value={view}
            onValueChange={(value: ViewType) => {
              dispatch(changeView(value));
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
