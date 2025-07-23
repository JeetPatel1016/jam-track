import { Flex } from "@radix-ui/themes";
import Transport from "../components/Transport/Transport";
import Controls from "../components/Transport/Controls";

export default function Header() {
  return (
    <Flex direction="column" p={"4"} gap={"2"}>
      <Transport />
      <Controls />
    </Flex>
  );
}
