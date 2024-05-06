import React, {
    BaseSyntheticEvent,
    createContext,
    FormHTMLAttributes,
    PropsWithChildren,
    useContext, useEffect,
    useState
} from "react";
import { View } from "react-native";
import BaseButton from "@/components/basic/buttons/BaseButton";
import ErrorCode from "./ErrorCode";
import { getValidationRulesFromProp } from "@/lib/validations";
import BaseContainer from "../layout/BaseContainer";
import BaseRow from "../layout/BaseRow";

interface BasicFormProps extends PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> {
    onSubmitCallback?: (e: BaseSyntheticEvent, formData: FormData) => Promise<string[]>,
    submitBtnText?: string,
}

export type BasicFormContextType = {
    formContext : {
        isSubmitting: boolean,
        formData: FormData,
        validationRules: { [key: string]: ((input: any, param?: number) => boolean | string)[] },
        errMsg: { [key: string]: string[] }
    },
    setFormContext ?: React.Dispatch<React.SetStateAction<BasicFormContextType>>
}

function createFormContext(): BasicFormContextType {
    return {
        formContext: {
            isSubmitting: false,
            formData: new FormData(),
            validationRules: {},
            errMsg: {}
        }
    };
}

export const BasicFormContext = createContext(createFormContext());

export function useInput(props: any) {
    const formContext = useContext(BasicFormContext).formContext;
    if (props && props.name && formContext && formContext.validationRules) {
        formContext.validationRules[props.name] = getValidationRulesFromProp(props);
    }
}

export default function BasicForm({children, ...props}: BasicFormProps) {
    const [formContext, setFormContext] = useState(createFormContext());
    formContext.setFormContext = setFormContext;
    return (
        <BaseContainer>
            <BasicFormContext.Provider value={formContext}>
                <BasicFormComponent {...props}>
                    {children}
                </BasicFormComponent>
            </BasicFormContext.Provider>
        </BaseContainer>
    )
}

function BasicFormComponent({onSubmitCallback, children, submitBtnText, ...props}: BasicFormProps) {
    const [errorList, setErrorList] = useState<string[]>([]);
    const basicFormContext = useContext(BasicFormContext)
    const formContext = basicFormContext.formContext;
    const formData = formContext.formData;

    const submitFuc = async (e: BaseSyntheticEvent) => {
        const errListTmp: string[] = [];
        setErrorList([]);
        formContext.errMsg = {};
        Object.keys(formContext.validationRules).forEach(inputName => {
            console.log("Validating input ", inputName);
            const inputFieldRules = formContext.validationRules[inputName];
            if (inputFieldRules) {
                formContext.errMsg[inputName] = [];
                inputFieldRules.forEach(validationRule => {
                    const validationRes = validationRule(formData.get(inputName));
                    if (validationRes !== true) {
                        const errMsg = validationRes as string;
                        formContext.errMsg[inputName].push(errMsg);
                        errListTmp.push(errMsg);
                    }
                });
            } else {
                console.error("Validation rules not found for ", inputName);
            }
        });

        if (errListTmp.length == 0) {
            if (onSubmitCallback != null) {
                const errors = await onSubmitCallback(e, formData);
                if (errors.length > 0) {
                    setErrorList(errors)
                }
            }
        }

        if (basicFormContext.setFormContext) {
            basicFormContext.setFormContext({formContext: formContext});
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


