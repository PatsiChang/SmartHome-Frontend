import { useStyle } from '@/hooks/styles/useStyle';
import { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import { concatStyleClass } from "@/lib/appStyleApi";
import { AppStyleClassProp } from "@/components/basic/style/StyleProvider";

interface BaseTextProps extends PropsWithChildren<{}>, AppStyleClassProp { }

const BaseText = ({ styleClass, children, ...props }: BaseTextProps) => {
    const style = useStyle(...concatStyleClass("baseText", styleClass));
    return (
        <Text style={style}>
            {children}
        </Text>
    )
}
const BaseParagraph = ({ children, styleClass }: BaseTextProps) => {
    return (
        <BaseText styleClass={concatStyleClass("baseParagraph", styleClass)}>
            {children}
        </BaseText>
    )
}
const BaseMiddleText = ({ children, styleClass }: BaseTextProps) => {
    return (
        <BaseText styleClass={concatStyleClass("baseMiddleText", styleClass)}>
            {children}
        </BaseText>
    )
}
const BaseLargeText = ({ children, styleClass }: BaseTextProps) => {
    return (
        <BaseText styleClass={concatStyleClass("baseLargeText", styleClass)}>
            {children}
        </BaseText>
    )
}

const BaseHintsText = ({ children, styleClass }: BaseTextProps) => {
    return (
        <BaseText styleClass={concatStyleClass("hintsText", styleClass)}>
            {children}
        </BaseText>
    )
}

export { BaseText, BaseParagraph, BaseMiddleText, BaseLargeText, BaseHintsText };