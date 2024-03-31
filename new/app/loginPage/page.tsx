"use client"
import TextInput from "@/components/basic/form/TextInput";
import BasicButton from "@/components/basic/buttons/BasicButton";
import {FormEvent, type ReactElement, useState} from "react";
import * as UserSessionApi from '@/lib/userSessionApi';
import {useRouter, useSearchParams} from "next/navigation";
import BasicForm from "@/components/basic/form/BasicForm";

export default async function LoginPage() {
    const [showLoginFail, setShowLoginFail] = useState(false);
    const searchParams = useSearchParams();
    const redirectParam = (searchParams !== null) ? searchParams.get('redirect') : "";
    const router = useRouter();
    const submitFunc = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try{
            setShowLoginFail(false);
            await UserSessionApi.loginWithUidAndPassword(formData.get("uid") as string,
                formData.get("password") as string);
            if (redirectParam !== null && redirectParam.trim().length > 0) {
                router.replace(redirectParam);
            } else {
                router.replace("/");
            }
        } catch (e) {
            setShowLoginFail(true);
        }
    }

    return (
        <>
            <BasicForm onSubmit={submitFunc}>
                <TextInput name={"uid"} label={"User Id"} />
                <TextInput name={"password"} label={"Password"} type={"password"}/>
                <BasicButton type={"submit"} value={"Login"} />
            </BasicForm>
            {showLoginFail ? (<span>Login Fail</span>) : null}
        </>
    );
}