import BasicForm from "@/components/basic/form/BasicForm";
import BasicTextInput from "@/components/basic/form/BasicTextInput";
import * as UserSessionApi from '@/lib/userSessionApi';
import BaseColumn from "@/components/basic/layout/BaseColumn";
import BaseRow from "@/components/basic/layout/BaseRow";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { useWrappedSearchParam } from "@/hooks/navigation/useWrappedSearchParam";
import { addStyleBuilder } from "@/lib/appStyleApi";
import { BaseSyntheticEvent } from "react";
import { loginPage } from "../enum/pageURL";



const SignupPage = () => {
    const searchParams = useWrappedSearchParam();
    const redirectParam = (searchParams !== null) ? searchParams.redirect as string : "";
    const router = useWrappedRouter();

    const submitFunc = async (e: BaseSyntheticEvent, formData: FormData) => {
        e.preventDefault();
        const errListTmp: string[] = [];
        try {
            await UserSessionApi.signup(
                formData.get("userId") as string,
                formData.get("name") as string,
                formData.get("email") as string,
                formData.get("password") as string
            );
            if (redirectParam != null && redirectParam.trim().length > 0) {
                router.replace(redirectParam);
            } else {
                router.replace(loginPage);
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
                <BasicForm onSubmitCallback={submitFunc} submitBtnText="Sign Up">
                    <BasicTextInput name="userId" styleClass="justifyContent_center"
                        label="User Id"
                        type="username"
                        required />
                    <BasicTextInput name="name" styleClass="justifyContent_center"
                        label="Name"
                        type="name"
                        required />
                    <BasicTextInput name="email" styleClass="justifyContent_center"
                        label="Email"
                        type="email"
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

export default SignupPage;

addStyleBuilder("customLoginRow", (config) => {
    return {
        justifyContent: "center",
    };
});