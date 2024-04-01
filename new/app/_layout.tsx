import React from "react";
import {Stack} from "expo-router";
import RouterWrapper from "@/components/basic/navigation/RouterWrapper";
import ClientLayout from "@/components/basic/layout/clientLayout";

export const unstable_settings = {
    initialRouteName: "home",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
      <ClientLayout>
        <RouterWrapper />
      </ClientLayout>
  );
}

