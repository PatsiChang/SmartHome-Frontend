import { BaseSyntheticEvent } from "react";
import { Pressable } from "react-native";
import { BaseMiddleText } from "../layout/BaseText";
import { customStyleInput } from "@/lib/customStyleApi";
import { useStyle } from "@/hooks/styles/useTheme";

interface SimpleButtonProps {
    title: string,
    styleClassName?: string,
    onPress?: ((e: BaseSyntheticEvent) => any) | (() => any),
    textColor?: string,
}
export default function BaseButton(props: SimpleButtonProps) {
    const { onPress, textColor, title = 'Save', styleClassName = "baseButtonStyle" } = props;
    const styleWithClass = customStyleInput(useStyle(styleClassName), baseButtonStyle);

    return (
        <Pressable onPress={onPress} style={styleWithClass}>
            <BaseMiddleText styleClassName={textColor} >{title}</BaseMiddleText>
        </Pressable>
    );
}

const baseButtonStyle = {
    backgroundColor: "#135D66",

};