import { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { useStyle } from "@/hooks/styles/useStyle";
import { AppStyleClassProp } from "@/components/basic/style/StyleProvider";
import { concatStyleClass } from "@/lib/appStyleApi";

// Serve as a Base for all (BaseContainer/ BaseRow)
interface BaseFooterProps extends PropsWithChildren<{}>, AppStyleClassProp {
    scrollable?: boolean
}

const BaseFooter = ({ children, styleClass, scrollable, ...props }: BaseFooterProps) => {
    const style = useStyle(...concatStyleClass("baseFooter", styleClass));
    return scrollable
        ? <ScrollView style={style}>{children}</ScrollView>
        : <View style={style}>{children}</View>
}

export default BaseFooter;