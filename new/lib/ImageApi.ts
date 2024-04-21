interface LocalIcon {
    imgName: string;
    uri: any;
}
export const LOCAL_ICONS: { [key: string]: LocalIcon } = {
    AddRecipe: {
        imgName: 'AddRecipeLogo',
        uri: require('../assets/Images/AddRecipeLogo.png'),
    },
    Feeds: {
        imgName: 'FeedsLogo',
        uri: require('../assets/Images/FeedsLogo.png'),
    },
    Grocery: {
        imgName: 'GroceryLogo',
        uri: require('../assets/Images/GroceryLogo.png'),
    },
    Home: {
        imgName: 'HomeLogo',
        uri: require('../assets/Images/HomeLogo.png'),
    },
    Setting: {
        imgName: 'SettingLogo',
        uri: require('../assets/Images/SettingLogo.png'),
    },
}

//Get Images from local Assets
export const getIconsFromAssets = (imgName: string) => {
    const image = LOCAL_ICONS[imgName];
    if (!image) {
        console.error('Image not found:', imgName);
        return null;
    } else {
        return image.uri;
    }
}

//Todo: To be implemented -> get images from server
export const getImages = (imgURL: string) => {
    if (imgURL != null || imgURL != undefined) {
        return `http://localhost:8080/RecipeIcons/${imgURL}.jpg`;
    } else {
        return `http://localhost:8080/recipeIconAlt.jpg`;
    }
}

