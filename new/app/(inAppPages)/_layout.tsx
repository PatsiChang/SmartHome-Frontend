import React from "react";
import BaseLayout from "@/components/basic/layout/BaseLayout";
import RouterWrapper from "@/components/basic/navigation/RouterWrapper";
import BaseButton from "@/components/basic/buttons/BaseButton";
import { getContext, setContext } from "@/lib/globalContextApi";
import { CONTEXT_KEY_CURRENT_THEME, CONTEXT_KEY_SET_THEME } from "@/components/basic/style/StyleProvider";
import BaseRow from "@/components/basic/layout/BaseRow";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import BaseFooter from "@/components/basic/layout/BaseFooter";
import BaseNavBar from "@/components/basic/layout/BaseNavBar";


export const unstable_settings = {
  initialRouteName: "home",
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const router = useWrappedRouter();

  const toggleTheme = () => {
    const currentTheme = getContext<string>(CONTEXT_KEY_CURRENT_THEME);
    const setTheme = getContext(CONTEXT_KEY_SET_THEME) as (theme: string) => {}
    setTheme((currentTheme === 'darkTheme') ? 'lightTheme' : 'darkTheme');
    console.log("Check getGlobalContext", getContext("defaultContext"));
    console.log("Check setGlobalContext", setContext("firstContext", "firstContext"));
    console.log("Check getGlobalContext", getContext("firstContext"));

    router.replace("/layoutPOC");
  };

  return (
    <BaseLayout>
      <BaseRow>
        <BaseButton onPress={toggleTheme} title="Toogle Theme"></BaseButton>
      </BaseRow>
      <RouterWrapper />
      <BaseFooter>
        <BaseNavBar pages={["Home", "Feeds", "AddRecipe"]} type="menuBar" platform="mobile" />
      </BaseFooter>
    </BaseLayout>
  );
}

