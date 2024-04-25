import { InputHTMLAttributes, useContext } from "react";
import { Text, TextInput } from "react-native";
import { BasicFormContext, registerInput } from "./BasicForm";
import { concatStyleClass } from "@/lib/appStyleApi";
import { useStyle } from "@/hooks/styles/useStyle";
import BaseContainer from "../layout/BaseContainer";
import BaseRow from "../layout/BaseRow";
import { BaseLargeText } from "../layout/BaseText";

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
    const showLabel = typeof props.label !== 'undefined' && props.label.trim().length > 0;
    const formContext = useContext(BasicFormContext);
    const formData = formContext.formData
    registerInput(formContext, props);

    const onChangeHandler = (value: string) => {
        if (formData != null) {
            formData.set(props.name as string, value);
        }
    }
    const style = useStyle(...concatStyleClass("baseTextInput", styleClass));
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
                    <TextInput id={"input_" + props.name} style={style}
                               onChangeText={onChangeHandler}/>
                </BaseRow>
            </BaseContainer>
        </BaseRow>
    );
}
