import BasePage from "@/components/basic/layout/BasePage";
import * as UserSessionApi from "@/lib/userSessionApi";
import { useState } from "react";
import AfterLoginPage from ".";

export default function AfterLoginPageLayout() {
    const [userName, setUserName] = useState("");
    const fetchData = async () => {
        const userProfile = await UserSessionApi.getUserProfile();
        setUserName(userProfile.name);
    }

    return (
        <BasePage requireLogin={true} fetchData={fetchData}>
            <AfterLoginPage userName={userName} />
        </BasePage>
    )
}