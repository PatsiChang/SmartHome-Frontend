import React, {BaseSyntheticEvent, FormHTMLAttributes, PropsWithChildren} from "react";
import { View } from "react-native";
import BasicButton from "@/components/basic/buttons/BasicButton";

interface FormProps extends PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> {
    onSubmitCallback ?: (e: BaseSyntheticEvent, formData: FormData) => void
}

export default function BasicForm({onSubmitCallback, children, ...props} : FormProps) {
// TODO form
    const submitFuc = (e: BaseSyntheticEvent) => {
        if (onSubmitCallback != null) {
            const formData = new FormData();
            formData.append("uid", "test");
            formData.append("password", "test");
            onSubmitCallback(e, formData);
        }
    }

    return (
        <View>
            {children}
            <BasicButton onClick={submitFuc}>Login</BasicButton>
        </View>
    )
}