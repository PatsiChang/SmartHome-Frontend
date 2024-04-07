import { PropsWithChildren } from "react";
import BaseBlock from "./BaseBlock";
import { StyleSheet, ViewStyle } from "react-native";

interface BaseColumnProps extends PropsWithChildren<{}> {
    style?: ViewStyle,
}

const BaseColumn = ({ children, ...props }: BaseColumnProps) => {
    return (
        //Toddo: add simple styling to view tags
        <BaseBlock style={columnStyles.container}>
            {children}
        </BaseBlock>
    )
}
const columnStyles = StyleSheet.create({
    container: {
        height: '100%',
    },
});

export default BaseColumn;