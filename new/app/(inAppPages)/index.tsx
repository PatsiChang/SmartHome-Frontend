import BasePage from "@/components/basic/layout/BasePage";
import { usePopUp } from "@/components/basic/layout/BaseLayout";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { BaseLargeText } from "@/components/basic/layout/BaseText";
import BaseButton from "@/components/basic/buttons/BaseButton";

export default function Home() {
    const router = useWrappedRouter();

    return (
        <BasePage>
            <BaseLargeText>Welcome home page!</BaseLargeText>
            <BaseButton title="See something (Require login)" onPress={() => router.push("/afterLoginPage")}></BaseButton>
            <PopupButton />
        </BasePage>
    );
}

function PopupButton() {
    const showPopup = usePopUp();
    return (<BaseButton title="Show PopUp" onPress={() => showPopup("hihihihi")}></BaseButton>);
}