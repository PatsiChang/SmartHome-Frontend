import React, {
    BaseSyntheticEvent,
    createContext,
    FormHTMLAttributes,
    PropsWithChildren,
    useContext,
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
    isSubmitting: boolean,
    formData: FormData,
    validationRules: { [key: string]: ((input: any, param?: number) => boolean | string)[] }
}

function createFormContext(): BasicFormContextType {
    return {
        isSubmitting: false,
        formData: new FormData(),
        validationRules: {}
    };
}

export const BasicFormContext = createContext(createFormContext());

export function registerInput(formContext: BasicFormContextType, props: any) {
    if (props && props.name && formContext && formContext.validationRules) {
        formContext.validationRules[props.name] = getValidationRulesFromProp(props);
    }
}

export default function BasicForm({children, ...props}: BasicFormProps) {
    return (
        <View>
            <BasicFormContext.Provider value={createFormContext()}>
                <BasicFormComponent {...props}>
                    {children}
                </BasicFormComponent>
            </BasicFormContext.Provider>
        </View>
    )
}

function BasicFormComponent({onSubmitCallback, children, submitBtnText, ...props}: BasicFormProps) {
    const [errorList, setErrorList] = useState<string[]>([]);
    const formContext = useContext(BasicFormContext);
    const formData = formContext.formData;

    const submitFuc = async (e: BaseSyntheticEvent) => {
        const errListTmp: string[] = [];
        setErrorList([]);
        Object.keys(formContext.validationRules).forEach(inputName => {
            console.log("Validating input ", inputName);
            const inputFieldRules = formContext.validationRules[inputName];
            if (inputFieldRules) {
                inputFieldRules.forEach(validationRule => {
                    const validationRes = validationRule(formData.get(inputName));
                    if (validationRes !== true) {
                        errListTmp.push(validationRes as string);
                    }
                })
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
        } else {
            console.log("!!!!!!", errListTmp);
            setErrorList(errListTmp)
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


