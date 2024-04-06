import { PropsWithChildren } from "react";
import { StyleSheet, Text } from 'react-native';


interface BaseHeaderProps extends PropsWithChildren<{}> {
}

export default function BaseHeader({ children, ...props }: BaseHeaderProps) {
    return (
        <Text style={styles.header}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        fontSize: 40
    }
});