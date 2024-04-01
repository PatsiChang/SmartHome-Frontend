"use client"
import {InputHTMLAttributes} from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import {TextInputProps} from "react-native/Libraries/Components/TextInput/TextInput";

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label ?: string,
    autoComplete ?: string
}
//TODO
export default function BasicTextInput({label, name, type, ...props} : SimpleInputProps ) {
    const showLabel = typeof label !== 'undefined' && label.trim().length > 0;

    return (
        <View>
            {showLabel ? (<Text aria-label={"Label for " + label}>{label}</Text>) : null}
            <TextInput id={"input_" + name} style={styles.baseTextInput}/>
        </View>
    );
}

const styles = StyleSheet.create({
    baseTextInput:{
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1
    }
});