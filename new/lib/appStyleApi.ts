import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type AppStyles = ViewStyle | TextStyle | ImageStyle;

export type AppStylesSheet = {
    [key: string]: AppStyles
}

export type ThemeColorPalette = {
    primaryBackground: string,
    secondaryBackground: string,
    primaryColor: string,
    secondaryColor: string,
    primaryTextColor: string,
    secondaryTextColor: string
}

export type FontSizes = {
    xxs: number,
    xs: number,
    s: number,
    m: number,
    l: number,
    xl: number,
    xxl: number,
}

export type StyleConfig = {
    themeColorPalette: ThemeColorPalette,
    fontSize: FontSizes
}

let FONT_SIZES: { [key: string]: FontSizes } = {};
let fontSizesKeys: string[] = [];
export const addFontSizes = (fontSizeKey: string, fontSizesVal: FontSizes) => {
    FONT_SIZES[fontSizeKey] = fontSizesVal;
    fontSizesKeys.push(fontSizeKey);
}

export const setFontSizes = (fontSizes: { [key: string]: FontSizes }) => {
    if (fontSizesKeys.length > 0) {
        console.warn("Cannot override font size map. Use addFontSizes to add font size");
        for (let fontSizeKey of Object.keys(fontSizes)) {
            addFontSizes(fontSizeKey, fontSizes[fontSizeKey]);
        }
    }
    FONT_SIZES = structuredClone(fontSizes);
    fontSizesKeys = Object.keys(FONT_SIZES);
}

let THEME_COLORS: { [key: string]: ThemeColorPalette } = {};
let themeColorsKeys: string[] = [];
export const addThemeColor = (themeColorKey: string, themeColorVal: ThemeColorPalette) => {
    THEME_COLORS[themeColorKey] = themeColorVal;
    themeColorsKeys.push(themeColorKey);
}

export const setThemeColors = (themeColors: { [key: string]: ThemeColorPalette }) => {
    if (themeColorsKeys.length > 0) {
        console.warn("Cannot override theme colors map. Use addThemeColor to add theme color");
        for (let themeColorKey of Object.keys(themeColors)) {
            addThemeColor(themeColorKey, themeColors[themeColorKey]);
        }
    }
    THEME_COLORS = structuredClone(themeColors);
    themeColorsKeys = Object.keys(THEME_COLORS);
}

let COMPONENTS_STYLE_BUILDER: { [key: string]: (config: StyleConfig) => AppStyles } = {};
let componentsBuilderKeys: string[] = [];

export const addStyleBuilder = (styleClass: string, builder: (config: StyleConfig) => AppStyles) => {
    COMPONENTS_STYLE_BUILDER[styleClass] = builder;
    componentsBuilderKeys.push(styleClass);
};

export const setStyleBuilders = (builders: { [key: string]: (config: StyleConfig) => AppStyles }) => {
    if (componentsBuilderKeys.length > 0) {
        console.warn("theme colors map already registered. Use addThemeColor to add theme color");
        for (let styleClass of Object.keys(builders)) {
            addStyleBuilder(styleClass, builders[styleClass]);
        }
    } else {
        console.log(builders);
        COMPONENTS_STYLE_BUILDER = structuredClone(builders);
        componentsBuilderKeys = Object.keys(COMPONENTS_STYLE_BUILDER);
    }
};


export const buildAppStyleSheet = (colorTheme: string = "lightTheme", fontSize: string = "normal") => {
    let tempStylesSheet: AppStylesSheet = {};
    const styleConfig = {
        themeColorPalette: THEME_COLORS[colorTheme],
        fontSize: FONT_SIZES[fontSize]
    } as StyleConfig;

    for (let styleClass of componentsBuilderKeys) {
        tempStylesSheet[styleClass] = COMPONENTS_STYLE_BUILDER[styleClass](styleConfig);
    }
    return tempStylesSheet;
};


//Merge custom Style with Mandatory Styles
export const mergeAppStyles = (mandatoryStyleObj: AppStyles, styleObj: AppStyles): AppStyles => {
    if (!styleObj) {
        return mandatoryStyleObj;
    }
    const styleResult = structuredClone(styleObj);
    for (let key of Object.keys(mandatoryStyleObj)) {
        // @ts-ignore
        styleResult[key] = mandatoryStyleObj[key];
    }
    return styleResult;
};

export const concatStyleClass = (className: string, classNames?: string | string[]): string[] => {
    if (!classNames) {
        return [className];
    } else if (typeof classNames === 'string') {
        return [className, classNames];
    } else {
        return [className, ...classNames];
    }
}