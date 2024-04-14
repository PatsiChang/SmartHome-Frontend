import BaseColumn from "@/components/basic/layout/BaseColumn";
import BaseContainer from "@/components/basic/layout/BaseContainer"
import BaseRow from "@/components/basic/layout/BaseRow";
import { BaseParagraph, BaseText } from "@/components/basic/layout/BaseText";
import { useTheme } from "@/hooks/styles/useTheme";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";
import { getContext, setContext } from "@/lib/globalContextApi";
import BaseButton from "@/components/basic/buttons/BaseButton";
import BaseLink from "@/components/basic/links/baseLink";

const LayoutPOC = () => {
    const theme = useTheme();
    const router = useWrappedRouter();

    const toggleTheme = () => {
        theme.themeValue = (theme.themeValue === 'darkTheme') ? 'lightTheme' : 'darkTheme';
        console.log("Check getGlobalContext", getContext("defaultContext"));
        console.log("Check setGlobalContext", setContext("firstContext", "firstContext"));
        console.log("Check getGlobalContext", getContext("firstContext"));

        router.replace("/layoutPOC");
    };

    return (
        <BaseContainer>
            {/* Test Row */}
            <BaseColumn styleClass="customColumn">
                <BaseText>Test Column</BaseText>
                <BaseText>Test Column</BaseText>
                <BaseText>Test Column</BaseText>
                {/* Test BaseLink */}
                <BaseLink url='https://google.com' title="Google"></BaseLink>
            </BaseColumn>

            <BaseRow styleClass="customRow">
                {/* Test BaseText */}
                <BaseParagraph>Text 3</BaseParagraph>
                <BaseParagraph>Text 3</BaseParagraph>
                <BaseParagraph>Text 3</BaseParagraph>
                <BaseParagraph>Text 3</BaseParagraph>
                <BaseParagraph>Text 3</BaseParagraph>
                <BaseParagraph>Text 3</BaseParagraph>
                <BaseParagraph>Text 3</BaseParagraph>
                <BaseParagraph>Text 3</BaseParagraph>
            </BaseRow>
            <BaseRow>
                {/* Test BaseButton */}
                <BaseButton onPress={toggleTheme} title="Toogle Theme" styleClass=""></BaseButton>
            </BaseRow>
        </BaseContainer>

    )
}

export default LayoutPOC;