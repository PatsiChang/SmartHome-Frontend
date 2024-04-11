import BasicButton from "@/components/basic/buttons/BasicButton";
import BaseColumn from "@/components/basic/layout/BaseColumn";
import BaseContainer from "@/components/basic/layout/BaseContainer"
import BaseRow from "@/components/basic/layout/BaseRow";
import { BaseParagraph, BaseText } from "@/components/basic/layout/BaseText";
import { useTheme } from "@/hooks/styles/useTheme";
import { useWrappedRouter } from "@/hooks/navigation/useWrappedRouter";

const LayoutPOC = () => {
    const theme = useTheme();
    const router = useWrappedRouter();

    const toggleTheme = () => {
        theme.themeValue = (theme.themeValue === 'darkTheme') ? 'lightTheme' : 'darkTheme';
        router.replace("/layoutPOC");
    };

    return (
        <BaseContainer>
            {/* Test Row */}
            <BaseColumn styleClassName="customColumn">
                <BaseText>Test Column</BaseText>
                <BaseText>Test Column</BaseText>
                <BaseText>Test Column</BaseText>
                <BaseText>Test Column</BaseText>
            </BaseColumn>

            <BaseRow styleClassName="customRow">
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
                <BasicButton onClick={toggleTheme}>Toogle Theme</BasicButton>
            </BaseRow>
        </BaseContainer>
    )
}

export default LayoutPOC;