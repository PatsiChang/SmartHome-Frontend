import React from "react";
import BaseLayout from "@/components/basic/layout/BaseLayout";
import RouterWrapper from "@/components/basic/navigation/RouterWrapper";
import StyleProvider from "@/components/basic/style/StyleProvider";

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

