import { Flex, Text } from "@radix-ui/themes";

export default function Brand() {
  return (
    <Flex gap={"4"} align={"center"}>
      <img
        style={{ width: "20px", height: "20px" }}
        src="/logo.svg"
        alt="JamTrack Logo"
      />
      <Text size={"5"} weight={"medium"}>
        JamTrack
      </Text>
    </Flex>
  );
}
