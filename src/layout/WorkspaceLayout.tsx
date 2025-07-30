import { Flex, Separator } from "@radix-ui/themes";
import MainContent from "../components/Workspace/MainContent";
import Sidebar from "../components/Sidebar/Sidebar";

export default function WorkspaceLayout() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Flex height={"100%"}>
        {/* Content goes here */}
        <Sidebar isEmpty={false} state="tracks" />
        <Separator orientation={"vertical"} size={"4"} />
        <MainContent />
        {/* Other components can be added here */}
      </Flex>
    </div>
  );
}
