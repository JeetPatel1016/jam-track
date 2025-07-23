import { Flex, Separator } from "@radix-ui/themes";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Flex direction={"column"} height={"100%"}>
        <Header />
        <Separator size={"4"} />
        <div>Working Area</div>
        <Separator size={"4"} mt={"auto"} />
        <Footer />

      </Flex>
    </div>
  );
}
