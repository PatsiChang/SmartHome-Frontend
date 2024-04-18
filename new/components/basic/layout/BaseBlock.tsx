import { PropsWithChildren } from "react";
import {ScrollView, View} from "react-native";
import {useStyle} from "@/hooks/styles/useStyle";
import {AppStyleClassProp} from "@/components/basic/style/StyleProvider";
import {concatStyleClass} from "@/lib/appStyleApi";

interface BaseBlockProps extends PropsWithChildren<{}>, AppStyleClassProp{
    scrollable ?: boolean
}

const BaseBlock = ({ children, styleClass, scrollable, ...props }: BaseBlockProps) => {
    const style = useStyle(...concatStyleClass("baseBlock", styleClass));
    return scrollable
        ? <ScrollView style={style}>{children}</ScrollView>
        : <View style={style}>{children}</View>
}

export default BaseBlock;