//Merge custom Style with Mandatory Styles
export const customStyleInput = <T>(styleObj: any, mandatoryStyleObj: { [key: string]: T }) => {
    if (!styleObj) {
        return mandatoryStyleObj;
    }
    const styleResult = structuredClone(styleObj);
    for (let key of Object.keys(mandatoryStyleObj)) {
        styleResult[key] = mandatoryStyleObj[key];
    }
    return styleResult;
}
