import { Button, Flex, Grid } from "@radix-ui/themes";
import { Save, Share } from "lucide-react";

import Brand from "./Brand";
import Title from "./Title";
import { useAppSelector } from "@/hooks/redux";

export default function Transport() {
  const project = useAppSelector((state) => state.project);

  const downloadProject = () => {
    const blob = new Blob([JSON.stringify(project)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.title || "project"}.jt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <Grid
      columns="3"
      align="center"
      width="100%"
      gap="4"
      style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
    >
      <Flex justify="start">
        <Brand />
      </Flex>

      <Flex justify="center">
        <Title />
      </Flex>

      <Flex justify="end" gap="2" align="center">
        <Button onClick={downloadProject} color="gray" size="2">
          <Save size={20} />
          Save
        </Button>
        <Button size="2" disabled>
          <Share size={20} />
          Share
        </Button>
      </Flex>
    </Grid>
  );
}
