
import { PropsWithChildren } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import BaseBlock from "./BaseBlock";

interface BaseContainerProps extends PropsWithChildren<{}> {
    style?: ViewStyle,
}

const BaseContainer = ({ children, ...props }: BaseContainerProps) => {
    return (
        //Toddo: add simple styling to view tags
        <BaseBlock style={containerStyles.container}>
            {children}
        </BaseBlock>
    )
}
const containerStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BaseContainer;