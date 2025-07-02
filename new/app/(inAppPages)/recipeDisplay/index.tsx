import BaseContainer from "@/components/basic/layout/BaseContainer";
import BaseGrid from "@/components/basic/layout/BaseGrid";
import BasePage from "@/components/basic/layout/BasePage";
import BaseRow from "@/components/basic/layout/BaseRow";
import SingleCarousell from "@/components/carousel/sliderCarousel";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { ImageSourcePropType } from 'react-native'

const RecipeDisplay = () => {
    const router = useWrappedRouter();
    const defaultImgList: ImageSourcePropType = [
        // dessert1,
        require("@/assets/Recipes/dessert1.jpg"),
        require("@/assets/Recipes/dessert2.jpeg"),
        require("@/assets/Recipes/dessert3.jpg"),
        require("@/assets/Recipes/dessert4.jpg"),
        require("@/assets/Recipes/dessert5.jpg"),
        // Add all your images here manually
    ];

    return (
        <BasePage styleClass="basePage">
            <BaseContainer styleClass="carousellContainer">
                <BaseRow>
                    <SingleCarousell caption={['first', 'second', 'third', '4', '5', '6']} imgList={defaultImgList} />
                </BaseRow>
                <BaseRow>
                    <BaseGrid imageList={defaultImgList}></BaseGrid>
                </BaseRow>
            </BaseContainer>
        </BasePage >
    )

}
export default RecipeDisplay;
