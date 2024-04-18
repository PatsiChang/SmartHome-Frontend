import { BaseSyntheticEvent } from "react";
import { Pressable } from "react-native";
import { BaseMiddleText } from "../layout/BaseText";
import { useStyle } from "@/hooks/styles/useStyle";
import { concatStyleClass } from "@/lib/appStyleApi";
import {AppStyleClassProp} from "@/components/basic/style/StyleProvider";

interface SimpleButtonProps extends AppStyleClassProp{
    title: string,
    onPress?: ((e: BaseSyntheticEvent) => any) | (() => any),
    textColor?: string,
}
export default function BaseButton({ onPress, textColor, title = 'Save', styleClass }: SimpleButtonProps) {
    const style = useStyle(...concatStyleClass("baseButton", styleClass));

    return (
        <Pressable onPress={onPress} style={style}>
            <BaseMiddleText styleClass={textColor} >{title}</BaseMiddleText>
        </Pressable>
    );
}