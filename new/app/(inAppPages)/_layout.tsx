import React from "react";
import BaseLayout from "@/components/basic/layout/BaseLayout";
import { Slot } from "expo-router";
import RouterWrapper from "@/components/basic/navigation/RouterWrapper";

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

