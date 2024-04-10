//Merge custom Style with Mandatory Styles
export const customStyleInput = (styleObj: any, mandatoryStyleObj: { [key: string]: any }) => {
    const styleResult = structuredClone(styleObj);
    for (let key of Object.keys(mandatoryStyleObj)) {
        styleResult[key] = mandatoryStyleObj[key];
    }
    return styleResult;
}
