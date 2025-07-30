import { Flex, SegmentedControl } from "@radix-ui/themes";

export default function Footer() {
  return (
    <Flex px="4" py="4">
      <SegmentedControl.Root defaultValue="sections">
        <SegmentedControl.Item value="sections">Sections</SegmentedControl.Item>
        <SegmentedControl.Item value="tracks">Tracks</SegmentedControl.Item>
      </SegmentedControl.Root>
    </Flex>
  );
}
