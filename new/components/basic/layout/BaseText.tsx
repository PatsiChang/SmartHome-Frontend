import { setDarkTheme, setLightTheme } from '@/app/stylesheet';
import { useStyle } from '@/hooks/styles/useTheme';
import { customStyleInput } from '@/lib/customStyleApi';
import { PropsWithChildren } from 'react';
import { Text, TextStyle } from 'react-native';

interface BaseTextProps extends PropsWithChildren<{}> {
    style?: TextStyle,
    styleClass?: any,
}

const BaseText = ({ style, children, ...props }: BaseTextProps) => {
    return (
        <Text style={style}>
            {children}
        </Text>
    )
}
const BaseParagraph = ({ children, styleClass }: BaseTextProps) => {
    const styleWithClass = customStyleInput(useStyle(styleClass), defaultParagraphStyle);
    return (
        <BaseText style={styleWithClass}>
            {children}
        </BaseText>
    )
}
const BaseMiddleText = ({ children, styleClass }: BaseTextProps) => {
    const styleWithClass = customStyleInput(useStyle(styleClass), defaultMiddleTextStyle);
    return (
        <BaseText style={styleWithClass}>
            {children}
        </BaseText>
    )
}
const BaseLargeText = ({ children, styleClass }: BaseTextProps) => {
    const styleWithClass = customStyleInput(useStyle(styleClass), defaultLargeStyle);

    return (
        <BaseText style={styleWithClass}>
            {children}
        </BaseText>
    )
}
const defaultTextStyle = {
    fontSize: 16,
};
const defaultParagraphStyle = {
    fontSize: 14,
};
const defaultMiddleTextStyle = {
    fontSize: 18,
};
const defaultLargeStyle = {
    fontSize: 20,
};
const defaultTextDarkStyle = {
};
const defaultTextLightStyle = {
};


setDarkTheme("baseText", defaultTextDarkStyle);
setLightTheme("baseText", defaultTextLightStyle);

export { BaseText, BaseParagraph, BaseMiddleText, BaseLargeText };