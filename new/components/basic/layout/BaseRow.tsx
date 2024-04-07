import { PropsWithChildren } from "react";
import BaseBlock from "./BaseBlock";
import { StyleSheet, ViewStyle } from "react-native";


interface BaseRowProps extends PropsWithChildren<{}> {
    style?: ViewStyle,
}

const BaseRow = ({ children, ...props }: BaseRowProps) => {
    return (
        <BaseBlock style={rowStyles.container}>
            {children}
        </BaseBlock>
    )
}
const rowStyles = StyleSheet.create({
    container: {
        width: '100%',
    },
});


export default BaseRow;