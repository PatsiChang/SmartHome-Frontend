import { setFontSizes, setStyleBuilders, setThemeColors} from "@/lib/appStyleApi";

setFontSizes({
    small : {
        xxs: 3,
        xs: 4,
        s: 6,
        m: 8,
        l: 10,
        xl: 12,
        xxl: 15
    },
    normal: {
        xxs: 8,
        xs: 10,
        s: 12,
        m: 15,
        l: 18,
        xl: 21,
        xxl: 25
    }
});

export const COLORS = {
    licorice : "#1a1110",
    bistre: "#3c2a21",
    willowIII: "#e4e5ca",
    durianWhite: "#e6d0ab",
    delicateUmber: "#f0ece3",
    naturalLinen: "#DFD3C3",
    smokyBlue: "#596E79",
    nomadicDesert: "#C7B198"
}

setThemeColors({
    darkTheme : {
        primaryBackground: COLORS.licorice,
        secondaryBackground: COLORS.bistre,
        primaryColor: COLORS.willowIII,
        secondaryColor: COLORS.durianWhite,
        primaryTextColor: COLORS.willowIII,
        secondaryTextColor: COLORS.durianWhite
    },
    lightTheme: {
        primaryBackground: COLORS.delicateUmber,
        secondaryBackground: COLORS.naturalLinen,
        primaryColor: COLORS.smokyBlue,
        secondaryColor: COLORS.nomadicDesert,
        primaryTextColor: COLORS.smokyBlue,
        secondaryTextColor: COLORS.nomadicDesert
    }
});

setStyleBuilders({
    baseContainer: (config) => {
        return {
            flex: 1,
        };
    },
    baseColumn: (config) => {
        return {
            flexDirection: 'column',
            padding: 10,
            flex: 1,
        };
    },
    baseRow: (config) => {
        return {
            flexDirection: 'row',
            padding: 10,
            flexWrap: "wrap"
        };
    },
    primaryText: (config) => {
        return {
            color: config.themeColorPalette.primaryTextColor
        };
    },
    secondaryText: (config) => {
        return {
            color: config.themeColorPalette.secondaryTextColor
        };
    },
    baseParagraph: (config) => {
        return {
            fontSize: config.fontSize.s,
            flex: 1,
            padding: 10
        };
    },
    baseMiddleText: (config) => {
        return {
            fontSize: config.fontSize.m
        };
    },
    baseLargeText: (config) => {
        return {
            fontSize: config.fontSize.l
        };
    },
    baseButton: (config) => {
        return {
            backgroundColor: config.themeColorPalette.secondaryBackground,
            padding: 7
        };
    },
    baseLink: (config) => {
        return {
            color: config.themeColorPalette.secondaryTextColor,
            backgroundColor: "none",
            textDecorationLine: "underline"
        };
    },
    baseNavBar: (config) => {
        return {
            backgroundColor: config.themeColorPalette.secondaryBackground
        };
    },
    basePage: (config) => {
        return {
            backgroundColor: config.themeColorPalette.primaryBackground,
        }
    },
    baseImagePicker:  (config) => {
        return {
            width: 200,
            height: 150
        }
    },
});
