"use client"
import { InputHTMLAttributes, useContext } from "react";
import { View, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { BasicFormContext } from "./BasicForm";
import { validationsMap } from "@/lib/validations";

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    required?: true,
    pattern?: string,
    max?: number,
    min?: number,
    autoComplete?: string
}

export default function BasicTextInput(props: SimpleInputProps) {
    const showLabel = typeof props.label !== 'undefined' && props.label.trim().length > 0;
    const formData = useContext(BasicFormContext);

    const onChangeHandler = (value: string) => {
        if (formData != null) {
            formData.set(props.name as string, value);
        }
    }
    return (
        <View>
            {showLabel ? (<Text aria-label={"Label for " + props.label}>{props.label}</Text>) : null}
            <TextInput id={"input_" + props.name} style={styles.baseTextInput}
                onChangeText={onChangeHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    baseTextInput: {
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1
    }
});