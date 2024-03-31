"use client"
import {ButtonHTMLAttributes} from "react";

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    value ?: string,
    callBackFunc ?: () => void
}
export default function BasicButton({value, callBackFunc, ...props} : SimpleButtonProps) {
    return (
        <button {...props} onClick={callBackFunc}>{value}</button>
    );
}