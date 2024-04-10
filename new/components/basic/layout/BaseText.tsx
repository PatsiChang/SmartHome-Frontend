import { setDarkTheme, setLightTheme } from '@/app/stylesheet';
import { useStyle } from '@/hooks/navigation/useTheme';
import { customStyleInput } from '@/lib/customStyleApi';
import { PropsWithChildren } from 'react';
import { Text, TextStyle } from 'react-native';

interface BaseTextProps extends PropsWithChildren<{}> {
    style?: TextStyle,
    styleClassName?: any,
}

const BaseText = ({ style, children, ...props }: BaseTextProps) => {

    return (
        <Text style={style}>
            {children}
        </Text>
    )
}
const BaseParagraph = ({ children, styleClassName }: BaseTextProps) => {
    const styleWithClass = customStyleInput(useStyle(styleClassName), baseParagraphStyle);
    return (
        <BaseText style={styleWithClass}>
            {children}
        </BaseText>
    )
}
const BaseLargeText = ({ children, styleClassName }: BaseTextProps) => {
    const styleWithClass = customStyleInput(useStyle(styleClassName), baseLargeStyle);

    return (
        <BaseText style={styleWithClass}>
            {children}
        </BaseText>
    )
}
const baseTextStyle = {
    fontSize: 14,
};
const baseParagraphStyle = {
    fontSize: 14,
};
const baseLargeStyle = {
    fontSize: 20,
};
const baseTextDarkStyle = {
};
const baseTextLightStyle = {
};


setDarkTheme("baseText", baseTextDarkStyle);
setLightTheme("baseText", baseTextLightStyle);

export { BaseText, BaseParagraph, BaseLargeText };