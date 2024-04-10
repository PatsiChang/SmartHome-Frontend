let themeMapping = {
    darkTheme: {
        customRow: {
        },
        customColumn: {
            padding: 100,
        },
        surfaceBackground: {
            color: "#31363F",
        },
        primary: {
            color: "#76ABAE",
        },
        secondary: {
            color: "#77B0AA",
        },
        primaryText: {
            color: "#EEEEEE",
        },
        secondaryText: {
            color: "#EEEEEE",
        },
        onPrimaryText: {
            color: "#EEEEEE",
        },
        onSecondaryText: {
            color: "#EEEEEE",
        },
    } as { [key: string]: any },
    lightTheme: {
        customRow: {
            height: 10,
            border: "1 solid black"
        },
        customColumn: {
            height: 100,
            border: "1 solid black"
        },
        surfaceBackground: {
            color: "#F5F5F5", // Light gray surface background
        },
        primary: {
            color: "#007AFF", // Blue primary color
        },
        secondary: {
            color: "#34C759", // Green secondary color
        },
        primaryText: {
            color: "#000000", // Black primary text color
        },
        secondaryText: {
            color: "#000000", // Black secondary text color
        },
        onPrimaryText: {
            color: "#FFFFFF", // White on primary text color
        },
        onSecondaryText: {
            color: "#FFFFFF", // White on secondary text color
        }
    } as { [key: string]: any }
}

export const setDarkTheme = (name: string, value: any) => themeMapping.darkTheme[name] = value;
export const setLightTheme = (name: string, value: any) => themeMapping.lightTheme[name] = value;

export const darkTheme = () => { return themeMapping.darkTheme; };
export const lightTheme = () => { return themeMapping.lightTheme; };
