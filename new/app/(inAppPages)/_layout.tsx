import React from "react";
import BaseLayout from "@/components/basic/layout/BaseLayout";
import RouterWrapper from "@/components/basic/navigation/RouterWrapper";
import BaseButton from "@/components/basic/buttons/BaseButton";
import { getContext } from "@/lib/globalContextApi";
import { CONTEXT_KEY_CURRENT_THEME, CONTEXT_KEY_SET_THEME } from "@/components/basic/style/StyleProvider";
import BaseRow from "@/components/basic/layout/BaseRow";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";


export const unstable_settings = {
  initialRouteName: "home",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const router = useWrappedRouter();

  const toggleTheme = () => {
    const currentTheme = getContext<string>(CONTEXT_KEY_CURRENT_THEME);
    const setTheme: (theme: string) => {} = getContext(CONTEXT_KEY_SET_THEME);
    setTheme((currentTheme === 'darkTheme') ? 'lightTheme' : 'darkTheme');
    router.replace("/recipeDisplay");
  };

  return (
    <BaseLayout>
      <BaseRow>
        <BaseButton onPress={toggleTheme} title="Toogle Theme"></BaseButton>
      </BaseRow>
      <RouterWrapper />
    </BaseLayout>
  );
}

