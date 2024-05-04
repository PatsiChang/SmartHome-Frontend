import { InputHTMLAttributes, useContext, useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import { BasicFormContext, useInput } from "./BasicForm";
import { concatStyleClass } from "@/lib/appStyleApi";
import { useStyle } from "@/hooks/styles/useStyle";
import BaseContainer from "../layout/BaseContainer";
import BaseRow from "../layout/BaseRow";
import { BaseLargeText, BaseText } from "../layout/BaseText";
import ErrorCode from "@/components/basic/form/ErrorCode";

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    required?: true,
    pattern?: string,
    max?: number,
    min?: number,
    autoComplete?: string,
    styleClass?: string,
}

export default function BasicTextInput({styleClass, ...props}: SimpleInputProps) {
    const [errorList, setErrorList] = useState([] as string[])
    const showLabel = typeof props.label !== 'undefined' && props.label.trim().length > 0;
    const formContext = useContext(BasicFormContext).formContext;
    const formData = formContext.formData
    const style = useStyle(...concatStyleClass("baseTextInput", styleClass));
    const errorStyle = useStyle(...concatStyleClass("baseTextInput", styleClass), "errorBaseTextInput");

    useInput(props);

    useEffect(() => {
        console.log("use effect iunput")
        if (props.name && formContext.errMsg[props.name]) {
            setErrorList(formContext.errMsg[props.name]);
        } else {
            setErrorList([]);
        }
    }, [formContext.errMsg]);

    const onChangeHandler = (value: string) => {
        if (formData != null) {
            formData.set(props.name as string, value);
        }
    }

    return (
        <BaseRow>
            <BaseContainer>
                <BaseRow styleClass={styleClass}>
                    <BaseLargeText>
                        {showLabel ? (<Text
                            aria-label={"Label for " + props.label}>{props.label}{(props.required) ? " *" : null}</Text>) : null}
                    </BaseLargeText>
                </BaseRow>
                <BaseRow styleClass={styleClass}>
                    <TextInput id={"input_" + props.name} style={(errorList && errorList.length <= 0) ? style : errorStyle}
                               onChangeText={onChangeHandler}/>
                </BaseRow>
                <BaseRow styleClass={styleClass}>
                    <ErrorCode errorList={errorList} />
                </BaseRow>
            </BaseContainer>
        </BaseRow>
    );
}
