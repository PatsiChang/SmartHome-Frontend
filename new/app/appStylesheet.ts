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
    // Neutrals — Pale to Dark
    snowWhite: "#FAFAFA",         // Paper white
    cloudMist: "#F2F2F2",         // Background
    fogGrey: "#E8E8E8",           // Secondary background
    softAsh: "#DADADA",           // Cards, surfaces
    mutedStone: "#B0B0B0",        // Borders, subtle text
    charcoal: "#333333",          // Primary text
    inkBlack: "#1A1A1A",          // Headers / dark bg

    // Blue accents (yours)
    blueHighlight: "#A3C5D9",     // Primary action
    blueMedium: "#6A9FB5",        // Secondary action
    blueDark: "#2E4A62",          // Links, active text
    blueSoftBg: "#F0F8FF",        // Subtle background tint
    blueSubtle: "#D1DCE5",        // Light border or shade

    // Status
    errorRed: "#E57373",
    successGreen: "#81C784"
};
setThemeColors({
    lightTheme: {
        primaryBackground: COLORS.cloudMist,           // Soft neutral
        secondaryBackground: COLORS.fogGrey,           // Slight contrast
        primaryColor: COLORS.blueHighlight,            // Highlight
        secondaryColor: COLORS.blueMedium,             // Buttons etc.
        primaryTextColor: COLORS.charcoal,             // Main text
        secondaryTextColor: COLORS.mutedStone,         // Subtle text
        errorColor: COLORS.errorRed
    },
    darkTheme: {
        primaryBackground: COLORS.inkBlack,            // Base dark
        secondaryBackground: COLORS.charcoal,          // Card background
        primaryColor: COLORS.blueHighlight,            // Highlight stays same
        secondaryColor: COLORS.blueDark,               // For buttons/links
        primaryTextColor: COLORS.snowWhite,            // Main text
        secondaryTextColor: COLORS.softAsh,            // Less important text
        errorColor: COLORS.errorRed
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
            backgroundColor: config.themeColorPalette.secondaryBackground,
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
            flexDirection: 'row', 
            justifyContent: 'center', 
            marginTop: 10
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
            margin: 1,
            backgroundColor: config.themeColorPalette.secondaryBackground,

        }
    },
    recipeDescription: (config) => {
        return {
            flex: 1,
            backgroundColor: config.themeColorPalette.primaryColor,


        }
    }
});
