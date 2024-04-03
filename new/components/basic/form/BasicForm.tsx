import React, { BaseSyntheticEvent, FormHTMLAttributes, PropsWithChildren } from "react";
import { View } from "react-native";
import BasicButton from "@/components/basic/buttons/BasicButton";
import { loopValidations } from "@/lib/validations";

interface FormProps extends PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> {
    onSubmitCallback?: (e: BaseSyntheticEvent, formData: FormData) => void,
}

export default function BasicForm({ onSubmitCallback, children, ...props }: FormProps) {
    //Call validation
    const validateInputs = (validationList: [], input: any) => {
        return loopValidations(input, validationList);
    }
    // TODO form
    const submitFuc = (e: BaseSyntheticEvent) => {
        if (onSubmitCallback != null) {
            const formData = new FormData();
            React.Children.forEach(children, child => {
                if (React.isValidElement(child)) {
                    if (child.type === 'BasicTextInput') {
                        const { source } = child.props;
                        if (validateInputs(source.validationList, source.value))
                            formData.append(source.name, source.value);
                    }
                }
            });
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