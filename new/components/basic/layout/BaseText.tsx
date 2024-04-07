import { PropsWithChildren } from 'react';
import { Text, TextStyle } from 'react-native';
import { StyleSheet } from "react-native";

interface BaseTextProps extends PropsWithChildren<{}> {
    style?: TextStyle,
}

const BaseText = ({ style, children, ...props }: BaseTextProps) => {
    return (
        <Text style={style}>
            {children}
        </Text>
    )
}
const BaseParagraph = ({ children }: BaseTextProps) => {
    return (
        <Text style={textStyles.paragraph}>
            {children}
        </Text>
    )
}
const BaseLargeText = ({ children }: BaseTextProps) => {
    return (
        <Text style={textStyles.largeText}>
            {children}
        </Text>
    )
}
const textStyles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontFamily: 'Poppins-thin, arial',
    },
    paragraph: {
        fontFamily: 'Poppins-thin, arial',
        fontSize: 12,
    },
    largeText: {
        fontFamily: 'Poppins-thin, arial',
        fontSize: 20,
    }
});

export { BaseText, BaseParagraph, BaseLargeText };