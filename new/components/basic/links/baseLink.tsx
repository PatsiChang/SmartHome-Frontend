
import { useStyle } from '@/hooks/styles/useTheme';
import { customStyleInput } from '@/lib/customStyleApi';
import { useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import BaseButton from '../buttons/BaseButton';

interface BaseLinkProps {
    title: string,
    url: string,
    styleClass?: string,
}

function BaseLink(props: BaseLinkProps) {
    const { title, url, styleClass = "baseButtonStyle" } = props;
    const styleWithClass = customStyleInput(useStyle(styleClass), defaultLinkStyle);

    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <BaseButton title={title} onPress={handlePress} styleClass={styleWithClass}></BaseButton>
    );
}
const defaultLinkStyle = {
    color: "#77B0AA",
};

export default BaseLink;