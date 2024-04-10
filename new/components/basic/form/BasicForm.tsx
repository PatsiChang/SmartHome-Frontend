import React, { BaseSyntheticEvent, FormHTMLAttributes, PropsWithChildren, createContext, useContext, useState } from "react";
import { View } from "react-native";
import BasicButton from "@/components/basic/buttons/BasicButton";
import BasicTextInput from "./BasicTextInput";
import ErrorCode from "./ErrorCode";
import { validationsMap } from "@/lib/validations";

interface BasicFormProps extends PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> {
    onSubmitCallback?: (e: BaseSyntheticEvent, formData: FormData) => Promise<string[]>,
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
export const validateInput = (input: any, key: string, propValue: any) => {
    console.log(key + ' ' + propValue);
    if (key in validationsMap) {
        return validationsMap[key](input);
    } else {
        return false;
    }
}

function BasicFormComponent({ onSubmitCallback, children, submitBtnText, ...props }: BasicFormProps) {
    const [errorList, setValidateErrorCode] = useState<string[]>([]);
    const formData = useContext(BasicFormContext);

    const submitFuc = async (e: BaseSyntheticEvent) => {
        if (onSubmitCallback != null) {
            const errListTmp: string[] = [];
            setValidateErrorCode([]);
            React.Children.forEach(children, child => {
                if (React.isValidElement(child) && child.type === BasicTextInput) {
                    const { name: fieldName, label: label, ...inputProps } = child.props;
                    Object.keys(inputProps).forEach((propName) => {
                        if (propName in validationsMap) {
                            const validationRes = validateInput(formData.get(fieldName), propName, child.props[propName])
                            if (validationRes !== true) {
                                errListTmp.push(`The ${label} ${validationRes}`);
                            }
                        }
                    })
                }
            });
            if (errListTmp.length == 0) {
                const loginErrorCode = await onSubmitCallback(e, formData);
                if (loginErrorCode.length > 0) {
                    setValidateErrorCode(loginErrorCode)
                }
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


