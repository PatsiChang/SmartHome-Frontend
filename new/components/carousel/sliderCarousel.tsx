import { PropsWithChildren, useState } from "react";
import { Image, ImageSourcePropType, Dimensions, View, StyleProp, FlatList, ImageStyle } from "react-native";
import BaseRow from "../basic/layout/BaseRow";
import BaseContainer from "../basic/layout/BaseContainer";
import { BaseText } from "../basic/layout/BaseText";
import { addStyleBuilder } from "@/lib/appStyleApi";
import BaseBlock from "../basic/layout/BaseBlock";

interface SliderCarouselProps extends PropsWithChildren<{}> {
    caption: string[],
    imgList: ImageSourcePropType[],
    styleClass?: string,
    pressableStyleClass?: string,
}
const screenWidth = Dimensions.get('window').width;

const SliderCarousel = ({ caption, imgList }: SliderCarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleScroll = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentSlide(index);
    };

    return imgList.length > 0 ? (
        <BaseContainer>
            <FlatList
                data={imgList}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                onScroll={handleScroll}
                renderItem={({ item, index }) => {
                    return caption[index] ? (
                        <BaseContainer>
                            <Image source={item} style={imageStyle} />
                            <BaseRow styleClass={'alignCenterAll'} key={index}>
                                <BaseText>{caption[index]}</BaseText>
                            </BaseRow>
                        </BaseContainer>
                    ) : <></>
                }}>
            </FlatList>

            <BaseRow styleClass={'alignCenterAll'}>
                {imgList.map((item, index) => {
                    return (
                        <BaseBlock key={index}
                            styleClass={
                                currentSlide === index
                                    ? ['baseCarouselIndex', 'carouselActiveIndex']
                                    : ['baseCarouselIndex', 'carouselInactiveIndex']
                            } />
                    )
                })}
            </BaseRow>
        </BaseContainer>

    ) : <></>;


}

const imageStyle: StyleProp<ImageStyle> = {
    width: screenWidth,
    height: 250,
    resizeMode: 'cover',
}
addStyleBuilder("baseCarouselIndex", (config) => {
    return {
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4,
    };
});
addStyleBuilder("carouselInactiveIndex", (config) => {
    return {
        backgroundColor: '#ccc',
    };
});
addStyleBuilder("carouselActiveIndex", (config) => {
    return {
        backgroundColor: '#000'
    };
});

export default SliderCarousel;