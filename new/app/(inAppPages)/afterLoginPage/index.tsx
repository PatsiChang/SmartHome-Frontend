import { usePopUp } from "@/components/basic/layout/BaseLayout";
import * as UserSessionApi from '@/lib/userSessionApi';
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { BaseLargeText } from "@/components/basic/layout/BaseText";
import BaseButton from "@/components/basic/buttons/BaseButton";
import React from 'react'

interface AfterLoginPageProps {
    userName: string
}

export default function AfterLoginPage({ userName }: AfterLoginPageProps) {
    const router = useWrappedRouter();

    const doLogout = async () => {
        await UserSessionApi.logOut();
        router.push("/");
    }

    return (
        <>
            <BaseLargeText>Hi, {userName}!</BaseLargeText>
            <BaseButton onPress={doLogout} title="Logout"></BaseButton>
            <PopupButton />
        </>
    );
}

function PopupButton() {
    const showPopup = usePopUp();
    return (<BaseButton onPress={() => showPopup("Nothing here")} title="Show PopUp"></BaseButton>);
}