import BasePage from "@/components/basic/layout/BasePage";
import * as UserSessionApi from "@/lib/userSessionApi";
import { useState } from "react";
import AfterLoginPage from "../afterLoginPage";
import BaseRow from "@/components/basic/layout/BaseRow";

export default function AfterLoginPageLayout() {
    const [userName, setUserName] = useState("");
    const fetchData = async () => {
        const userProfile = await UserSessionApi.getUserProfile();
        setUserName(userProfile.name);
    }

    return (
        <BasePage requireLogin={false} fetchData={fetchData}>
            {/* <AfterLoginPage userName={userName} /> */}
            <BaseRow>Test Patsi</BaseRow>
        </BasePage>
    )
}