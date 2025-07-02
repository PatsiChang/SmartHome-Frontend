import { screenSizeConfig } from "@/app/enum/screenSize";
import { currentDevice, screenWidth } from "@/lib/DeviceDimensionApi";
import { ImageSourcePropType, Image, StyleProp, ImageStyle, FlatList } from "react-native";
import BaseContainer from "./BaseContainer";
import BaseRow from "./BaseRow";

type BaseGridProps = {
    imageList: ImageSourcePropType[];
}

const BaseGrid: React.FC<BaseGridProps> = ({ imageList }) => {
    const { grid } = screenSizeConfig[currentDevice];

    const renderItem = ({ item }: { item: ImageSourcePropType }) => (
        <Image source={item} 
            style={{
                width: screenWidth / (grid+1),
                height: screenWidth / (grid+1),
                margin: 2,
            }} 
        resizeMode="cover" />
    );

    return (
          <BaseContainer>
            <BaseRow styleClass={['alignCenterAll', 'justifyCenterAll']}>
                <FlatList
                    data={imageList}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={grid}
                    scrollEnabled={false} 
                />
            </BaseRow>
        </BaseContainer>
    );
}

const imageStyle = {
    aspectRatio: 1,
    width: 100,
    height: 100
}

export default BaseGrid;