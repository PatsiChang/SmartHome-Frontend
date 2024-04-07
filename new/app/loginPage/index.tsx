import { BaseSyntheticEvent, useState } from "react";
import * as UserSessionApi from '@/lib/userSessionApi';
import BasicForm from "@/components/basic/form/BasicForm";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { useWrappedSearchParam } from "@/hooks/navigation/useWrappedSearchParam";
import BasicTextInput from "@/components/basic/form/BasicTextInput";
import React from "react";

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
        <>
            <BasicForm onSubmitCallback={submitFunc} submitBtnText="login" >
                <BasicTextInput name="userId"
                    label="User Id"
                    type="username"
                    required />
                <BasicTextInput name="password"
                    label="Password"
                    type="password"
                    required />
            </BasicForm>
        </>
    );
}