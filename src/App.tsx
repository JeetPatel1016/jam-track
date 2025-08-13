import AppLayout from "@/layout/AppLayout";
import useIsMobile from "@/hooks/useIsMobile";
import NotSupported from "@/components/Workspace/NotSupported";

export default function App() {
  const isMobile = useIsMobile();
  return isMobile ? <NotSupported /> : <AppLayout />;
}
