import { BaseSyntheticEvent } from "react";
import * as UserSessionApi from '@/lib/userSessionApi';
import BasicForm from "@/components/basic/form/BasicForm";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { useWrappedSearchParam } from "@/hooks/navigation/useWrappedSearchParam";
import BasicTextInput from "@/components/basic/form/BasicTextInput";
import React from "react";
import { BaseLargeText } from "@/components/basic/layout/BaseText";
import { addStyleBuilder } from "@/lib/appStyleApi";
import BaseRow from "@/components/basic/layout/BaseRow";
import BaseColumn from "@/components/basic/layout/BaseColumn";

export default function LoginPage() {
    const searchParams = useWrappedSearchParam();
    const redirectParam = (searchParams !== null) ? searchParams.redirect as string : "";
    const router = useWrappedRouter();

    console.log('login page: redirect = ' + redirectParam);
    const submitFunc = async (e: BaseSyntheticEvent, formData: FormData) => {
        e.preventDefault();
        const errListTmp: string[] = [];
        try {
            await UserSessionApi.loginWithUidAndPassword(formData.get("userId") as string,
                formData.get("password") as string);
            if (redirectParam != null && redirectParam.trim().length > 0) {
                router.replace(redirectParam);
            } else {
                router.replace("/");
            }
            errListTmp.push("");
        } catch (e) {
            errListTmp.push("Your Password does not match your User Id!");
        }
        return errListTmp;
    }

    return (
        <BaseRow>
            <BaseColumn>
                <BasicForm onSubmitCallback={submitFunc} submitBtnText="login" >
                    <BasicTextInput name="userId" styleClass="justifyContent_center"
                        label="User Id"
                        type="username"
                        required />

                    <BasicTextInput name="password" styleClass="justifyContent_center"
                        label="Password"
                        type="password"
                        required />
                </BasicForm>
            </BaseColumn>
        </BaseRow>
    );

}

addStyleBuilder("customLoginRow", (config) => {
    return {
        justifyContent: "center",
    };
});