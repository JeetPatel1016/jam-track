import { Separator } from "@radix-ui/themes";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div style={{ width: "100vw" }}>
      <Header />
      <Separator size={"4"} />
    </div>
  );
}
