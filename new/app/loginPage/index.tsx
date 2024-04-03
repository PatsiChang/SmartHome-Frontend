import { BaseSyntheticEvent, useState } from "react";
import * as UserSessionApi from '@/lib/userSessionApi';
import BasicForm from "@/components/basic/form/BasicForm";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { useWrappedSearchParam } from "@/hooks/navigation/useWrappedSearchParam";
import { Text } from "react-native";
import BasicTextInput from "@/components/basic/form/BasicTextInput";
import { validationList } from "@/lib/validations";

export default function LoginPage() {
    const [showLoginFail, setShowLoginFail] = useState(false);
    const searchParams = useWrappedSearchParam();
    const redirectParam = (searchParams !== null) ? searchParams.redirect as string : "";
    const router = useWrappedRouter();

    console.log('login page: redirect = ' + redirectParam);
    const submitFunc = async (e: BaseSyntheticEvent, formData: FormData) => {
        e.preventDefault();
        try {
            setShowLoginFail(false);
            await UserSessionApi.loginWithUidAndPassword(formData.get("userId") as string,
                formData.get("logInPasswordHashed") as string);
            if (redirectParam != null && redirectParam.trim().length > 0) {
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
            <BasicForm onSubmitCallback={submitFunc} >
                <BasicTextInput name="userId" label="User Id" type="username" validationList={[validateRequired]} />
                <BasicTextInput name="password" label="Password" type="password" validationList={[validateRequired]} />
            </BasicForm>
            {showLoginFail ? (<Text>Login Fail</Text>) : null}
        </>
    );
}