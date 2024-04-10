import { useStyle } from "@/hooks/navigation/useTheme";
import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

interface BaseBlockProps extends PropsWithChildren<{}> {
    style?: ViewStyle,
}

const BaseBlock = ({ children, style, ...props }: BaseBlockProps) => {
    const styleObj = useStyle("baseBlock");
    return (
        <View style={style}>
            {children}
        </View>
    )
}

export default BaseBlock;