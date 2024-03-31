"use client"
import {useRouter} from "next/navigation";
import {usePopUp} from "@/components/basic/layout/clientLayout";
import * as UserSessionApi from '@/lib/userSessionApi';

export default async function AfterLoginPage() {
    const router = useRouter();
    const userProfile = await UserSessionApi.getUserProfile();

    await new Promise((r) => setTimeout(r, 1000));

    const doLogout = async () => {
        await UserSessionApi.logOut();
        router.push("/");
    }

    return (
        <>
            <h1>Hi, {userProfile.userName}!</h1>
            <div>
                <button onClick={doLogout}>Log out</button>
            </div>
            <div>
                <PopupButton/>
            </div>
        </>
    );
}

function PopupButton() {
    const showPopup = usePopUp();
    return (<button onClick={() => showPopup("Nothing here")}>Show PopUp</button>);
}