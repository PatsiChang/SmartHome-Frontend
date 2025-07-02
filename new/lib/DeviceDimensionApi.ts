import { ScreenSize } from '@/app/enum/screenSize';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const getCurrentDevice = (width: number): ScreenSize => {
    if (width < 480) return ScreenSize.MOBILE;
    if (width < 800) return ScreenSize.TABLET;
    if (width < 1400) return ScreenSize.COMPUTER;
    return ScreenSize.TV;
};

const currentDevice = getCurrentDevice(screenWidth);

export {
    screenWidth,
    screenHeight,
    currentDevice,
};