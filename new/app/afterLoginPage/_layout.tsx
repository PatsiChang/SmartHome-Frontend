import ClientPage from "@/components/basic/layout/clientPage";
import * as UserSessionApi from "@/lib/userSessionApi";
import { useState } from "react";
import AfterLoginPage from "@/app/afterLoginPage/index";

export default function AfterLoginPageLayout() {
    const [userName, setUserName] = useState("");
    const fetchData = async () => {
        const userProfile = await UserSessionApi.getUserProfile();
        setUserName(userProfile.name);
    }

    return (
        <ClientPage requireLogin={true} fetchData={fetchData}>
            <AfterLoginPage userName={userName} />
        </ClientPage>
    )
}