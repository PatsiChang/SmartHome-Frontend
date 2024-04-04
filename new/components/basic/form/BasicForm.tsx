import React, { BaseSyntheticEvent, FormHTMLAttributes, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import BasicButton from "@/components/basic/buttons/BasicButton";
import BasicTextInput, { validateInput } from "./BasicTextInput";
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

function BasicFormComponent({ onSubmitCallback, children, submitBtnText, ...props }: BasicFormProps) {
    const [errorList, setValidateErrorCode] = useState<string[]>([]);

    const formData = useContext(BasicFormContext);

    const submitFuc = (e: BaseSyntheticEvent) => {
        let result = true;
        if (onSubmitCallback != null) {
            setValidateErrorCode([]);

            React.Children.forEach(children, child => {
                if (React.isValidElement(child) && child.type === BasicTextInput) {
                    const { name: fieldName, ...inputProps } = child.props;
                    Object.keys(inputProps).forEach((propName) => {
                        if (propName in validationsMap) {
                            const validationRes = validateInput(formData, propName, fieldName)
                            if (validationRes !== true) {
                                result = false;
                                setValidateErrorCode(prevErrors => [...prevErrors, `The ${fieldName} ${validationRes}`]);
                            } else {
                                result = true;
                                setValidateErrorCode(prevErrors => {
                                    return prevErrors.filter(error => error !== `${fieldName} is required`);
                                })
                            }
                        }
                    })
                }
            });
            //Todo: only allow log in when errorList is empty (unable to check state as asychronise setValidateErrorCode)
            //Bug: If password is entered without userId it will still submit, this also affect if entered password, 
            //then login without userId, then enter userId, then login, will still trigger "no password" error
            if (result == true) {
                onSubmitCallback(e, formData);
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


