"use client"
import {InputHTMLAttributes} from "react";

interface SimpleInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label ?: string
}
export default function TextInput({label, name, ...props} : SimpleInputProps ) {
    let showLabel = typeof label !== 'undefined' && label.trim().length > 0;
    return (
        <>
            {showLabel ? (<label htmlFor={"input_" + name}>{label}</label>) : null}
            <input id={"input_" + name} name={name} {...props} />
        </>
    );
}