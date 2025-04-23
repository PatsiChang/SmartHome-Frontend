import { setFontSizes, setStyleBuilders, setThemeColors } from "@/lib/appStyleApi";

setFontSizes({
    small: {
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
    licorice: "#1a1110",
    bistre: "#3c2a21",
    willowIII: "#e4e5ca",
    durianWhite: "#e6d0ab",
    delicateUmber: "#f0ece3",
    naturalLinen: "#DFD3C3",
    smokyBlue: "#596E79",
    nomadicDesert: "#C7B198",
    darkCandyAppleRed: "#a40000",
    redSalsa: "#fd3a4a",
    salmonPink: "#ff91a4"
}

setThemeColors({
    darkTheme: {
        primaryBackground: COLORS.licorice,
        secondaryBackground: COLORS.bistre,
        primaryColor: COLORS.willowIII,
        secondaryColor: COLORS.durianWhite,
        primaryTextColor: COLORS.willowIII,
        secondaryTextColor: COLORS.durianWhite,
        errorColor: COLORS.salmonPink
    },
    lightTheme: {
        primaryBackground: COLORS.delicateUmber,
        secondaryBackground: COLORS.naturalLinen,
        primaryColor: COLORS.smokyBlue,
        secondaryColor: COLORS.nomadicDesert,
        primaryTextColor: COLORS.smokyBlue,
        secondaryTextColor: COLORS.nomadicDesert,
        errorColor: COLORS.redSalsa
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
    baseFooter: (config) => {
        return {
            flexDirection: 'row',
            flexShrink: 0
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
            padding: 7,
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
            backgroundColor: config.themeColorPalette.secondaryBackground,
            justifyContent: "space-between",
        };
    },
    baseMenuBar: (config) => {
        return {
            backgroundColor: config.themeColorPalette.secondaryBackground,
            justifyContent: "space-evenly",

        };
    },
    baseImg: (config) => {
        return {
            width: 50,
            height: 50,
        }
    },
    basePage: (config) => {
        return {
            flex: 1,
            backgroundColor: config.themeColorPalette.primaryBackground,
        }
    },
    baseImagePicker: (config) => {
        return {
            width: 200,
            height: 150
        }
    },
    pageHeaderRow: (config) => {
        return {
            padding: 0,
            gap: 0,
            margin: 0
        }
    },
    baseTextInput: (config) => {
        return {
            backgroundColor: config.themeColorPalette.secondaryBackground,
            color: config.themeColorPalette.primaryTextColor,
            borderColor: config.themeColorPalette.primaryTextColor,
            borderWidth: 1,
            borderRadius: 5,
            caretColor: config.themeColorPalette.primaryTextColor,
        }
    },
    errorBaseTextInput: (config) => {
        return {
            borderColor: config.themeColorPalette.errorColor
        }
    },
    baseText: (config) => {
        return {
            color: config.themeColorPalette.primaryTextColor,
        }
    },
    baseForm: (config) => {
        return {
            backgroundColor: config.themeColorPalette.secondaryBackground,
            color: config.themeColorPalette.primaryTextColor,
        }
    },
    justifyContent_spaceEvenly: (config) => {
        return {
            justifyContent: "space-evenly"
        }
    },
    justifyContent_center: (config) => {
        return {
            justifyContent: "center"
        }
    },
    noPadding: (config) => {
        return {
            padding: 0
        }
    },
    noMargin: (config) => {
        return {
            margin: 0
        }
    },
    hintsText: (config) => {
        return {
            fontSize: config.fontSize.s
        }
    },
    errorText: (config) => {
        return {
            color: config.themeColorPalette.errorColor
        }
    },
    alignCenterAll: () => {
        return {
            alignSelf: "center",
            textAlign: "center",
            alignContent: "center"
        }
    },


    //Should this be kept somewhere else?
    menubarContainer: () => {
        return {
            justifyContent: "flex-end"
        }
    },
    recipeCarousell: (config) => {
        return {
            flex: 2,
            backgroundColor: config.themeColorPalette.secondaryBackground,
        }
    },
    carousellContainer: (config) => {
        return {
            borderColor: config.themeColorPalette.primaryColor,
            borderRadius: 2,
            borderWidth: 2,
            margin: 1,
            backgroundColor: config.themeColorPalette.primaryColor,

        }
    },
    recipeDescription: (config) => {
        return {
            flex: 1,
            backgroundColor: config.themeColorPalette.primaryColor,


        }
    }
});
