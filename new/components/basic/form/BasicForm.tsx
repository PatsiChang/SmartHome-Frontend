import React, { BaseSyntheticEvent, FormHTMLAttributes, PropsWithChildren, createContext, useContext, useState } from "react";
import { View } from "react-native";
import BaseButton from "@/components/basic/buttons/BaseButton";
import BasicTextInput from "./BasicTextInput";
import ErrorCode from "./ErrorCode";
import { validationsMap } from "@/lib/validations";
import BaseContainer from "../layout/BaseContainer";
import BaseRow from "../layout/BaseRow";

interface BasicFormProps extends PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> {
    onSubmitCallback?: (e: BaseSyntheticEvent, formData: FormData) => Promise<string[]>,
    submitBtnText?: string,
}

export const BasicFormContext = createContext({
    isSubmitting: false,
    formData: new FormData()
});

export default function BasicForm({ children, ...props }: BasicFormProps) {
    return (
        <View>
            <BasicFormContext.Provider value={{
                isSubmitting: false,
                formData: new FormData()
            }}>
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
    const [errorList, setErrorList] = useState<string[]>([]);
    const formContext = useContext(BasicFormContext);
    const formData = formContext.formData;

    const submitFuc = async (e: BaseSyntheticEvent) => {
        if (onSubmitCallback != null) {
            const errListTmp: string[] = [];
            setErrorList([]);
            React.Children.forEach(children, child => {
                console.log("Check 1", child);
                if (React.isValidElement(child) && child.type === BasicTextInput) {
                    console.log("Check 3");
                    const { name: fieldName, label: label, ...inputProps } = child.props;
                    Object.keys(inputProps).forEach((propName) => {
                        if (propName in validationsMap) {
                            console.log("Check 4");

                            const validationRes = validateInput(formData.get(fieldName), propName, child.props[propName])
                            if (validationRes !== true) {
                                errListTmp.push(`The ${label} ${validationRes}`);
                            }
                        }
                    })
                }
            });
            if (errListTmp.length == 0) {
                console.log("Check 2");

                const loginErrorCode = await onSubmitCallback(e, formData);
                if (loginErrorCode.length > 0) {
                    setErrorList(loginErrorCode)
                }
            } else {
                console.log("!!!!!!", errListTmp);
                setErrorList(errListTmp)
            }
        }
    };

    return (
        <BaseContainer>
            {children}
            <BaseRow styleClass="justifyContent_center">
                <BaseButton onPress={submitFuc} title={submitBtnText != null ? submitBtnText : "Submit"}></BaseButton>
            </BaseRow>
            <BaseRow styleClass="justifyContent_center">
                <ErrorCode errorList={errorList}></ErrorCode>
            </BaseRow>
        </BaseContainer>
    )
}


