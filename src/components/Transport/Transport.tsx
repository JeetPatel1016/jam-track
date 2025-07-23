import { Button, Flex, Separator } from "@radix-ui/themes";
import { Save, Share } from "lucide-react";

import Brand from "./Brand";
import Title from "./Title";

export default function Transport() {
  return (
    <Flex align={"center"} gap={"4"} width={"100%"}>
      <Brand />
      <Separator orientation="vertical" />
      <Title />
      {/* 
        <p>New Project</p>
        */}
      <Flex gap="2" align={"center"} ml={"auto"}>
        <Button size="2">
          <Save size={20} />
          Save
        </Button>
        <Button size="2" variant="soft">
          <Share size={20} />
          Share
        </Button>
      </Flex>
    </Flex>
  );
}
