import { Box, Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { Edit, Plus } from "lucide-react";
import Sections from "./Sections";
import Tracks from "./Tracks";

// For now, we will refactor the sidebar to show data according to the state. Props will be removed later.

type SidebarProps = {
  state: "sections" | "tracks";
  isEmpty: boolean;
};

const componentMap = {
  sections: {
    true: SectionsEmpty,
    false: SectionsFull,
  },
  tracks: {
    false: TracksFull,
    true: TracksEmpty,
  },
};

export default function Sidebar({ state, isEmpty }: SidebarProps) {
  const ComponentToRender =
    componentMap[state][String(isEmpty) as "true" | "false"];
  return (
    <Box width="400px" style={{ height: "100%" }}>
      <ComponentToRender />
    </Box>
  );
}

function SectionsEmpty() {
  return (
    <Flex direction={"column"} style={{ height: "100%" }} p={"4"}>
      <Flex>
        <Button size={"1"} color="gray" highContrast variant="soft">
          <Plus size={16} />
          Add Section
        </Button>
        <IconButton
          variant="soft"
          highContrast
          radius="large"
          size="1"
          color="gray"
          style={{ marginLeft: "auto" }}
        >
          <Edit size={14} />
        </IconButton>
      </Flex>
      <Flex
        direction={"column"}
        align="center"
        justify="center"
        style={{ height: "100%" }}
      >
        <Text size={"4"} weight={"medium"} style={{ color: "var(--gray-11)" }}>
          No Sections Available
        </Text>
        <Text size={"2"} style={{ color: "var(--gray-11)" }}>
          Please create a section to get started.
        </Text>
      </Flex>
    </Flex>
  );
}
function TracksEmpty() {
  return (
    <Flex direction={"column"} style={{ height: "100%" }} p={"4"}>
      <Flex>
        <Button size={"1"} color="gray" highContrast variant="soft">
          <Plus size={16} />
          Add Track
        </Button>
        <IconButton
          variant="soft"
          highContrast
          radius="large"
          size="1"
          color="gray"
          style={{ marginLeft: "auto" }}
        >
          <Edit size={14} />
        </IconButton>
      </Flex>
      <Flex
        direction={"column"}
        align="center"
        justify="center"
        style={{ height: "100%" }}
      >
        <Text size={"4"} weight={"medium"} style={{ color: "var(--gray-11)" }}>
          No tracks added yet.
        </Text>
        <Text size={"2"} style={{ color: "var(--gray-11)" }}>
          Add a new track to get started.
        </Text>
      </Flex>
    </Flex>
  );
}
function SectionsFull() {
  return (
    <Flex direction={"column"} style={{ height: "100%" }}>
      <Flex p={"4"}>
        <Button size={"1"} color="gray" highContrast variant="soft">
          <Plus size={16} />
          Add Section
        </Button>
        <IconButton
          variant="soft"
          highContrast
          radius="large"
          size="1"
          color="gray"
          style={{ marginLeft: "auto" }}
        >
          <Edit size={14} />
        </IconButton>
      </Flex>
      <Flex
        direction={"column"}
        align="center"
        justify="center"
        style={{ height: "100%" }}
      >
        <Sections />
      </Flex>
    </Flex>
  );
}
function TracksFull() {
  return (
    <Flex direction={"column"} style={{ height: "100%" }}>
      <Flex p={"4"}>
        <Button size={"1"} color="gray" highContrast variant="soft">
          <Plus size={16} />
          Add Track
        </Button>
        <IconButton
          variant="soft"
          highContrast
          radius="large"
          size="1"
          color="gray"
          style={{ marginLeft: "auto" }}
        >
          <Edit size={14} />
        </IconButton>
      </Flex>
      <Flex
        direction={"column"}
        align="center"
        justify="center"
        style={{ height: "100%" }}
      >
        <Tracks />
      </Flex>
    </Flex>
  );
}
