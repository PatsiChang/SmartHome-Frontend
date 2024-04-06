import React from "react";
import RouterWrapper from "@/components/basic/navigation/RouterWrapper";
import BaseLayout from "@/components/basic/layout/BaseLayout";

export const unstable_settings = {
  initialRouteName: "home",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <BaseLayout>
      <RouterWrapper />
    </BaseLayout>
  );
}

