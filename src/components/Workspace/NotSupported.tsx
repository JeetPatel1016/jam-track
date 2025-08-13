import { Monitor } from "lucide-react";
import { Callout, Card, Flex, Text } from "@radix-ui/themes";

export default function NotSupported() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      p={"5"}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <Card
        style={{
          padding: "32px 24px",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        {/* Brand */}
        <Flex gap={"4"} mb="8" align={"center"} justify={"center"}>
          <img
            style={{ width: "48px", height: "48px" }}
            src="/logo.svg"
            alt="JamTrack Logo"
          />
          <Text size={"8"} weight={"medium"}>
            JamTrack
          </Text>
        </Flex>

        <Text as="p" size={"6"} weight={"medium"}>
          Screen Too Small
        </Text>

        <p
          style={{
            fontSize: "16px",
            color: "#6b7280",
            lineHeight: "1.5",
            marginBottom: "24px",
          }}
        >
          This application is not supported on smaller screens. Please use a
          tablet or desktop device for the best experience.
        </p>

        <Callout.Root color="gray">
          <Callout.Icon>
            <Monitor style={{ width: "20px", height: "20px" }} />
          </Callout.Icon>
          <Callout.Text align={"center"}>
            Minimum width: 1024px required
          </Callout.Text>
        </Callout.Root>
      </Card>
    </Flex>
  );
}
