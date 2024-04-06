import { usePopUp } from "@/components/basic/layout/BaseLayout";
import * as UserSessionApi from '@/lib/userSessionApi';
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import BaseHeader from "@/components/basic/layout/BaseHeader";
import BasicButton from "@/components/basic/buttons/BasicButton";

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
            <BaseHeader>Hi, {userName}!</BaseHeader>
            <BasicButton onClick={doLogout}>Log out</BasicButton>
            <PopupButton />
        </>
    );
}

function PopupButton() {
    const showPopup = usePopUp();
    return (<BasicButton onClick={() => showPopup("Nothing here")}>Show PopUp</BasicButton>);
}