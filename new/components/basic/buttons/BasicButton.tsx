import { BaseSyntheticEvent, ButtonHTMLAttributes } from "react";
import { Button } from "react-native";

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: string,
    onClick?: (e: BaseSyntheticEvent) => void
}
export default function BasicButton({ children, onClick, ...props }: SimpleButtonProps) {
    return (
        <Button onPress={onClick} title={children} />
    );
}