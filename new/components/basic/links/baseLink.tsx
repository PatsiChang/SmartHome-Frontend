import { useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import BaseButton from '../buttons/BaseButton';
import { concatStyleClass } from "@/lib/appStyleApi";

interface BaseLinkProps {
    title: string,
    url: string,
    styleClass?: string,
}

function BaseLink(props: BaseLinkProps) {
    const { title, url, styleClass} = props;
    const styleWithClass = concatStyleClass("baseLink", styleClass);

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

export default BaseLink;