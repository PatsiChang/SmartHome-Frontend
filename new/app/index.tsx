import BasePage from "@/components/basic/layout/BasePage";
import { usePopUp } from "@/components/basic/layout/BaseLayout";
import BaseHeader from "@/components/basic/layout/BaseHeader";
import BasicButton from "@/components/basic/buttons/BasicButton";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";

export default function Home() {
    const router = useWrappedRouter();

    return (
        <BasePage>
            <BaseHeader>Welcome home page!</BaseHeader>
            <BasicButton onClick={() => router.push("/afterLoginPage")}>See something (Require login)</BasicButton>
            <PopupButton />
        </BasePage>
    );
}

function PopupButton() {
    const showPopup = usePopUp();
    return (<BasicButton onClick={() => showPopup("hihihihi")}>Show PopUp</BasicButton>);
}