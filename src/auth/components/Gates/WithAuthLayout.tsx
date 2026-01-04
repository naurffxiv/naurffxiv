import AuthGate from "@auth/components/Gates/AuthGate";
import type { FCWithChildren } from "@/types/common";

const WithAuthLayout: FCWithChildren = ({ children }) => {
  return <AuthGate>{children}</AuthGate>;
};

export default WithAuthLayout;
