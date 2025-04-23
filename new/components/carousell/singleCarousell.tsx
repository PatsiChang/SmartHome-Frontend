import { PropsWithChildren, useState } from "react";
import BaseRow from "../basic/layout/BaseRow";
import { Pressable, Image, ImageSourcePropType, Text, Dimensions, View, StyleProp, ViewStyle } from "react-native";
import { concatStyleClass } from "@/lib/appStyleApi";
import { BlurView } from 'expo-blur';

type CarousellHandleType = "PREV" | "NEXT";
interface SingleCarousellProps extends PropsWithChildren<{}> {
    caption: string[],
    imgList: ImageSourcePropType[],
    styleClass?: string,
    pressableStyleClass?: string,
}

const SingleCarousell = ({ caption, imgList, styleClass, pressableStyleClass }: SingleCarousellProps) => {
    const style = concatStyleClass("singleCarousellStyle", styleClass);


    const [currentSlide, setCurrentSlide] = useState(0);
    const handleSlides = (config: CarousellHandleType) => {
        if (config === "PREV") {
            setCurrentSlide((currentSlide - 1 + imgList.length) % imgList.length);
        } else {
            setCurrentSlide(((currentSlide + 1) % imgList.length));
        }
    }

    return imgList.length > 0 ? (
        <BaseRow styleClass={style}>
            <View style={{ position: 'relative', width: '100%', alignItems: 'center' }}>
                <Image style={singleCarousellStyle} source={imgList[currentSlide]}></Image>
                <View style={prevPressableStyle}>
                    <BlurView intensity={20} tint="light" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Pressable onPress={() => handleSlides("PREV")} >
                            <Text style={{ color: "black" }}>{"\u003C"}</Text>
                        </Pressable>
                    </BlurView>
                </View>

                <View style={nextPressableStyle}>
                    <BlurView intensity={20} tint="light" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Pressable onPress={() => handleSlides("NEXT")} >
                            <Text> {"\u003E"} </Text>
                        </Pressable>
                    </BlurView>
                </View>
            </View>

        </BaseRow>

    ) : <></>;

}

const screenWidth = Dimensions.get('window').width;
console.log('screenWidth', screenWidth)

const singleCarousellStyle = {
    width: screenWidth * 0.93,
    height: 250,
    padding: 2,
}
const baseDefaultPressable: StyleProp<ViewStyle> = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 50,
    justifyContent: 'center',
    zIndex: 10,
}
const defaultPrevPressable: StyleProp<ViewStyle> = {
    left: 0,
};
const defaultNextPressable: StyleProp<ViewStyle> = {
    right: 0,
}

const prevPressableStyle: StyleProp<ViewStyle> = { ...baseDefaultPressable, ...defaultPrevPressable };
const nextPressableStyle: StyleProp<ViewStyle> = { ...baseDefaultPressable, ...defaultNextPressable };


export default SingleCarousell;