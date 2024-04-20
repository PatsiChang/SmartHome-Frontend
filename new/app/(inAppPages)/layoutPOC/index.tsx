import BaseColumn from "@/components/basic/layout/BaseColumn";
import BaseRow from "@/components/basic/layout/BaseRow";
import {BaseLargeText, BaseParagraph, BaseText} from "@/components/basic/layout/BaseText";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { getContext, setContext } from "@/lib/globalContextApi";
import BaseButton from "@/components/basic/buttons/BaseButton";
import BaseLink from "@/components/basic/links/baseLink";
import {CONTEXT_KEY_CURRENT_THEME, CONTEXT_KEY_SET_THEME} from "@/components/basic/style/StyleProvider";
import {addStyleBuilder} from "@/lib/appStyleApi";
import BaseBlock from "@/components/basic/layout/BaseBlock";
import BasePage from "@/components/basic/layout/BasePage";
import ScrollableContainer from "@/components/basic/layout/ScrollableContainer";
import {BaseSyntheticEvent, useRef} from "react";
import BasicForm from "@/components/basic/form/BasicForm";
import {doFetch} from "@/lib/fetchApi";
import BaseImagePicker, {BaseFilePickerFunction} from "@/components/basic/buttons/BaseImagePicker";

const LayoutPOC = () => {
    const router = useWrappedRouter();
    const imagePickerRef = useRef<BaseFilePickerFunction>();

    const toggleTheme = () => {
        const currentTheme = getContext<string>(CONTEXT_KEY_CURRENT_THEME);
        const setTheme = getContext(CONTEXT_KEY_SET_THEME) as  (theme : string) => {}
        setTheme((currentTheme === 'darkTheme') ? 'lightTheme' : 'darkTheme');
        console.log("Check getGlobalContext", getContext("defaultContext"));
        console.log("Check setGlobalContext", setContext("firstContext", "firstContext"));
        console.log("Check getGlobalContext", getContext("firstContext"));

        router.replace("/layoutPOC");
    };

    const testUploadRecipeIcon = async (e: BaseSyntheticEvent, formData : FormData) : Promise<string[]> => {
        const imageId = await imagePickerRef.current?.uploadImage("http://localhost:8080/recipe/addRecipeIcon");
        if (imageId) {
            console.log("Image uploaded! " + imageId);
            return [];
        } else {
            return ["Image upload failed "];
        }
    }

    return (
        <BasePage>
            <BaseRow>
                <BaseButton onPress={toggleTheme} title="Toogle Theme"></BaseButton>
            </BaseRow>
            <BaseRow>
                <BaseColumn styleClass="customColumn">
                    <BaseLargeText>Column 1</BaseLargeText>
                    <BaseParagraph>
                        This is a testing column with customised style, which is just a simple green border.
                    </BaseParagraph>
                    <BaseLink url='https://google.com' title="Google"></BaseLink>
                </BaseColumn>
                <BaseColumn>
                    <BaseLargeText>Column 2</BaseLargeText>
                    <BaseParagraph>
                        Below are a series of poorly constructed paragraphs and possible solutions. Put yourself in the place of a teacher. Criticise the structure of each paragraph and suggest how it might be improved. Be very critical about how the paragraph is constructed and how well the ideas flow. There are quite a few examples to have a go at because being critical of the work of others is difficult but gets easier the more you practice.
                    </BaseParagraph>
                    <BaseLink url='https://www.futurelearn.com/info/courses/preparing-for-uni/0/steps/1177' title="Passage Source"></BaseLink>
                </BaseColumn>
            </BaseRow>
            <BaseRow styleClass="customRow">
                {/* Test BaseText */}
                <BaseParagraph>
                    This is a testing row with customised style, which is just a simple red border around the row.
                </BaseParagraph>
                <BaseParagraph>
                    Bali is predominantly a Hindu country. Bali is known for its elaborate, traditional dancing. The dancing is inspired by its Hindi beliefs. Most of the dancing portrays tales of good versus evil. To watch the dancing is a breathtaking experience. Lombok has some impressive points of interest – the majestic Gunung Rinjani is an active volcano. It is the second highest peak in Indonesia. Art is a Balinese passion. Batik paintings and carved statues make popular souvenirs. Artists can be seen whittling and painting on the streets, particularly in Ubud. It is easy to appreciate each island as an attractive tourist destination. Majestic scenery; rich culture; white sands and warm, azure waters draw visitors like magnets every year. Snorkelling and diving around the nearby Gili Islands is magnificent. Marine fish, starfish, turtles and coral reef are present in abundance. Bali and Lombok are part of the Indonesian archipelago. Bali has some spectacular temples. The most significant is the Mother Temple, Besakih. The inhabitants of Lombok are mostly Muslim with a Hindu minority. Lombok remains the most understated of the two islands. Lombok has several temples worthy of a visit, though they are less prolific. Bali and Lombok are neighbouring islands.
                </BaseParagraph>
                <BaseParagraph>
                    Bali and Lombok are neighbouring islands; both are part of the Indonesian archipelago. It is easy to appreciate each island as an attractive tourist destination – majestic scenery; rich culture; white sands and warm, azure waters draw visitors like magnets every year. Snorkelling and diving around the nearby Gili Islands is magnificent, with marine fish, starfish, turtles and coral reef present in abundance. Whereas Bali is predominantly a Hindu country, the inhabitants of Lombok are mostly Muslim with a Hindu minority. Bali is known for its elaborate, traditional dancing which is inspired by its Hindi beliefs. Most of the dancing portrays tales of good versus evil; to watch it is a breathtaking experience. Art is another Balinese passion – batik paintings and carved statues make popular souvenirs. Artists can be seen whittling and painting on the streets, particularly in Ubud. The island is home to some spectacular temples, the most significant being the Mother Temple, Besakih. Lombok, too, has some impressive points of interest – the majestic Gunung Rinjani is an active volcano and the second highest peak in Indonesia. Like Bali, Lombok has several temples worthy of a visit, though they are less prolific. Lombok remains the most understated of the two islands.
                </BaseParagraph>
            </BaseRow>

            <BaseRow>
                <BaseBlock styleClass="customFixedBlock">
                    <ScrollableContainer>
                        <BaseLargeText>This block has a lot of stuff</BaseLargeText>
                        <BaseParagraph>
                            Bali and Lombok are neighbouring islands; both are part of the Indonesian archipelago. It is easy to appreciate each island as an attractive tourist destination – majestic scenery; rich culture; white sands and warm, azure waters draw visitors like magnets every year. Snorkelling and diving around the nearby Gili Islands is magnificent, with marine fish, starfish, turtles and coral reef present in abundance. Whereas Bali is predominantly a Hindu country, the inhabitants of Lombok are mostly Muslim with a Hindu minority. Bali is known for its elaborate, traditional dancing which is inspired by its Hindi beliefs. Most of the dancing portrays tales of good versus evil; to watch it is a breathtaking experience. Art is another Balinese passion – batik paintings and carved statues make popular souvenirs. Artists can be seen whittling and painting on the streets, particularly in Ubud. The island is home to some spectacular temples, the most significant being the Mother Temple, Besakih. Lombok, too, has some impressive points of interest – the majestic Gunung Rinjani is an active volcano and the second highest peak in Indonesia. Like Bali, Lombok has several temples worthy of a visit, though they are less prolific. Lombok remains the most understated of the two islands.
                            Bali and Lombok are neighbouring islands; both are part of the Indonesian archipelago. It is easy to appreciate each island as an attractive tourist destination – majestic scenery; rich culture; white sands and warm, azure waters draw visitors like magnets every year. Snorkelling and diving around the nearby Gili Islands is magnificent, with marine fish, starfish, turtles and coral reef present in abundance. Whereas Bali is predominantly a Hindu country, the inhabitants of Lombok are mostly Muslim with a Hindu minority. Bali is known for its elaborate, traditional dancing which is inspired by its Hindi beliefs. Most of the dancing portrays tales of good versus evil; to watch it is a breathtaking experience. Art is another Balinese passion – batik paintings and carved statues make popular souvenirs. Artists can be seen whittling and painting on the streets, particularly in Ubud. The island is home to some spectacular temples, the most significant being the Mother Temple, Besakih. Lombok, too, has some impressive points of interest – the majestic Gunung Rinjani is an active volcano and the second highest peak in Indonesia. Like Bali, Lombok has several temples worthy of a visit, though they are less prolific. Lombok remains the most understated of the two islands.
                        </BaseParagraph>
                    </ScrollableContainer>
                </BaseBlock>
                <BaseBlock styleClass="customFixedBlock">
                    <BasicForm onSubmitCallback={testUploadRecipeIcon} submitBtnText="Upload!" >
                        <BaseImagePicker ref={imagePickerRef}
                                         imageIdFormInputName={"recipeIcon"}
                                         imageUploadFormInputName={"recipeIcon"} uploadMethod={"PUT"}/>
                    </BasicForm>
                </BaseBlock>
                <BaseBlock styleClass="customFixedBlock"><BaseLargeText>Block 3</BaseLargeText></BaseBlock>
                <BaseBlock styleClass="customFixedBlock"><BaseLargeText>Block 4</BaseLargeText></BaseBlock>
                <BaseBlock styleClass="customFixedBlock"><BaseLargeText>Block 5</BaseLargeText></BaseBlock>
                <BaseBlock styleClass="customFixedBlock"><BaseLargeText>Block 6</BaseLargeText></BaseBlock>
                <BaseBlock styleClass="customFixedBlock"><BaseLargeText>Block 7</BaseLargeText></BaseBlock>
                <BaseBlock styleClass="customFixedBlock"><BaseLargeText>Block 8</BaseLargeText></BaseBlock>
                <BaseBlock styleClass="customFixedBlock"><BaseLargeText>Block 9</BaseLargeText></BaseBlock>
            </BaseRow>
        </BasePage>

    )
}

addStyleBuilder("customColumn", (config) => {
    return {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#ff0000"
    };
});

addStyleBuilder("customRow", (config) => {
    return {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#00ff00"
    };
});

addStyleBuilder("customFixedBlock", (config) => {
    return {
        width: 500,
        height: 300,
        borderColor: config.themeColorPalette.primaryTextColor,
        borderWidth: 1,
        padding: 10,
        margin: 10,
        justifyContent: "center",
        alignContent: "center",
    };
});

export default LayoutPOC;