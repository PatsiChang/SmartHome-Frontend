import React, { BaseSyntheticEvent, FormHTMLAttributes, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import BasicButton from "@/components/basic/buttons/BasicButton";
import BasicTextInput from "./BasicTextInput";
import ErrorCode from "./ErrorCode";
import { validationsMap } from "@/lib/validations";

interface BasicFormProps extends PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> {
    onSubmitCallback?: (e: BaseSyntheticEvent, formData: FormData) => void,
    submitBtnText?: string,
}

export const BasicFormContext = createContext(new FormData());
export default function BasicForm({ children, ...props }: BasicFormProps) {
    return (
        <View>
            <BasicFormContext.Provider value={new FormData()}>
                <BasicFormComponent {...props}>
                    {children}
                </BasicFormComponent>
            </BasicFormContext.Provider>
        </View>
    )
}
export const validateInput = (input: any, key: string) => {
    if (key in validationsMap) {
        return validationsMap[key](input);
    } else {
        return false;
    }
}

function BasicFormComponent({ onSubmitCallback, children, submitBtnText, ...props }: BasicFormProps) {
    const [errorList, setValidateErrorCode] = useState<string[]>([]);
    const formData = useContext(BasicFormContext);

    const submitFuc = (e: BaseSyntheticEvent) => {
        if (onSubmitCallback != null) {
            const errListTmp: string[] = [];
            React.Children.forEach(children, child => {
                if (React.isValidElement(child) && child.type === BasicTextInput) {
                    const { name: fieldName, label: label, ...inputProps } = child.props;
                    Object.keys(inputProps).forEach((propName) => {
                        if (propName in validationsMap) {
                            const validationRes = validateInput(formData.get(fieldName), propName)
                            if (validationRes !== true) {
                                errListTmp.push(`The ${label} ${validationRes}`);
                            }
                        }
                    })
                }
            });
            if (errListTmp.length == 0) {
                onSubmitCallback(e, formData);
            } else {
                setValidateErrorCode(errListTmp)
            }
        }
    };


    return (
        <View>
            {children}
            <BasicButton onClick={submitFuc}>{submitBtnText != null ? submitBtnText : "Submit"}</BasicButton>
            <ErrorCode errorList={errorList}></ErrorCode>

        </View>
    )
}


