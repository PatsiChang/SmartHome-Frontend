import { PropsWithChildren } from "react";
import BaseBlock from "./BaseBlock";
import { Image, ImageStyle } from 'react-native';
import { getIconsFromAssets } from "@/lib/ImageApi";
import { concatStyleClass } from "@/lib/appStyleApi";
import { useStyle } from "@/hooks/styles/useStyle";

interface BaseImgProps extends PropsWithChildren<{}> {
    imageName: string,
    styleClass?: string,

}

const BaseImg = ({ imageName, styleClass, ...props }: BaseImgProps) => {
    const style = useStyle(...concatStyleClass("baseImg", styleClass));
    return (
        <BaseBlock>
            <Image source={getIconsFromAssets(imageName)} style={style as ImageStyle} />
        </BaseBlock>
    )
}
const baseImg = {
    width: 50,
    height: 50,
}

export default BaseImg;