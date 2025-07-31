import { Button, Flex, Separator } from "@radix-ui/themes";
import { Save, Share } from "lucide-react";

import Brand from "./Brand";
import Title from "./Title";
import { useAppSelector } from "@/hooks/redux";

export default function Transport() {
  const { title } = useAppSelector((state) => state.project);

  const downloadProject = () => {
    const blob = new Blob([JSON.stringify(title)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "project"}.jamtrack.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <Flex align={"center"} gap={"4"} width={"100%"}>
      <Brand />
      <Separator orientation="vertical" />
      <Title />
      <Flex gap="2" align={"center"} ml={"auto"}>
        <Button size="2">
          <Save size={20} />
          Save
        </Button>
        <Button size="2" variant="soft" onClick={downloadProject}>
          <Share size={20} />
          Share
        </Button>
      </Flex>
    </Flex>
  );
}
