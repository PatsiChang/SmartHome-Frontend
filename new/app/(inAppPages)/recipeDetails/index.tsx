import BaseContainer from "@/components/basic/layout/BaseContainer";
import BasePage from "@/components/basic/layout/BasePage";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { PropsWithChildren } from "react";
import { Image } from "react-native";

interface RecipeDetailsProps extends PropsWithChildren<{}> {
    imageId: string,
}

const RecipeDetails = ({imageId} :RecipeDetailsProps) => {
    const router = useWrappedRouter();


    return (
        <BasePage styleClass="basePage">
            <BaseContainer styleClass="">
            <Image source={require("@/assets/Recipes/dessert1.jpg")}  />
            </BaseContainer>
        </BasePage >
    )

}
export default RecipeDetails;
