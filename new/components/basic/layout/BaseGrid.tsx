import { screenSizeConfig } from "@/app/enum/screenSize";
import { currentDevice } from "@/lib/DeviceDimensionApi";
import { ImageSourcePropType, Image, StyleProp, ImageStyle } from "react-native";
import BaseContainer from "./BaseContainer";

type BaseGridProps = {
    imageList: ImageSourcePropType[];
}

const BaseGrid: React.FC<BaseGridProps> = ({ imageList }) => {
    const { grid } = screenSizeConfig[currentDevice];
    const imageWidth = `${100 / grid}%`;

    return (
        <BaseContainer>
            {imageList.map((src, index) => (
                <Image source={src} key={index} style={[imageStyle]} />
            ))}
        </BaseContainer>
    );
}

const imageStyle = {
    aspectRatio: 1,
    width: 100,
    height: 100
}

export default BaseGrid;