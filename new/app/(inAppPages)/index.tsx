import BasePage from "@/components/basic/layout/BasePage";
import { usePopUp } from "@/components/basic/layout/BaseLayout";
import BasicButton from "@/components/basic/buttons/BasicButton";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { BaseLargeText } from "@/components/basic/layout/BaseText";

export default function Home() {
    const router = useWrappedRouter();

    return (
        <BasePage>
            <BaseLargeText>Welcome home page!</BaseLargeText>
            <BasicButton onClick={() => router.push("/afterLoginPage")}>See something (Require login)</BasicButton>
            <PopupButton />
        </BasePage>
    );
}

function PopupButton() {
    const showPopup = usePopUp();
    return (<BasicButton onClick={() => showPopup("hihihihi")}>Show PopUp</BasicButton>);
}