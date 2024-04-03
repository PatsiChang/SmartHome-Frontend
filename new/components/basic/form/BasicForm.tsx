import React, { BaseSyntheticEvent, FormHTMLAttributes, PropsWithChildren } from "react";
import { View } from "react-native";
import BasicButton from "@/components/basic/buttons/BasicButton";

interface FormProps extends PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> {
    onSubmitCallback?: (e: BaseSyntheticEvent, formData: FormData) => void
}

export default function BasicForm({ onSubmitCallback, children, ...props }: FormProps) {
    // TODO form
    const submitFuc = (e: BaseSyntheticEvent) => {
        if (onSubmitCallback != null) {
            const formData = new FormData();
            // React.Children.forEach(children, child => {
            //     if (React.isValidElement(child)) {
            //         const childType = child.type;
            //         if (childType === 'BasicTextInput') {
            //             const { source } = child.props;
            //             formData.append(source.name, source.value);
            //         }
            //     }
            // });
            formData.append("userId", "Patsi")
            formData.append("logInPasswordHashed", "PatsiSmartHome");
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