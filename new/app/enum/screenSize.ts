enum ScreenSize {
    MOBILE,
    TABLET,
    COMPUTER,
    TV
}

const screenSizeConfig: Record<ScreenSize, { grid: number }> = {
    [ScreenSize.MOBILE]: { grid: 3 },
    [ScreenSize.TABLET]: { grid: 5 },
    [ScreenSize.COMPUTER]: { grid: 7 },
    [ScreenSize.TV]: { grid: 10, },
};

export {
    ScreenSize,
    screenSizeConfig
}