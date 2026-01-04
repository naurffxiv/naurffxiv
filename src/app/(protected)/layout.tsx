"use client";

import type { FCWithChildren } from "@/types/common";
import WithAuthLayout from "@auth/components/Gates/WithAuthLayout";

const ProtectedLayout: FCWithChildren = ({ children }) => {
  return <WithAuthLayout>{children}</WithAuthLayout>;
};

export default ProtectedLayout;
