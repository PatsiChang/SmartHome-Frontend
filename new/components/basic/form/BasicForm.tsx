"use client"
import {ButtonHTMLAttributes, FormHTMLAttributes, PropsWithChildren} from "react";

interface FormProps extends PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> {
}

export default function BasicForm({children, ...props} : FormProps) {
    return (
        <form {...props}>
            {children}
        </form>
    )
}