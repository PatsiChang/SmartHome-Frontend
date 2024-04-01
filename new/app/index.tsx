"use client"
import ClientPage from "@/components/basic/layout/clientPage";
import {usePopUp} from "@/components/basic/layout/clientLayout";
import BaseHeader from "@/components/basic/layout/BaseHeader";
import BasicButton from "@/components/basic/buttons/BasicButton";
import {useWrappedRouter} from "@/hooks/navigation/useWrappedRouter";

export default function Home() {
    const router = useWrappedRouter();

    return (
        <ClientPage>
            <BaseHeader>Welcome home page!</BaseHeader>
            <BasicButton onClick={() => router.push("/afterLoginPage")}>See something (Require login)</BasicButton>
            <PopupButton/>
        </ClientPage>
    );
}

function PopupButton() {
    const showPopup = usePopUp();
    return (<BasicButton onClick={() => showPopup("hihihihi")}>Show PopUp</BasicButton>);
}