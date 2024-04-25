interface ValidationsMap {
    [key: string]: (input: any, param?: number) => boolean | string;
}
export const validationsMap: ValidationsMap = {
    //Check required
    "required": (input: any) => {
        if (input === undefined || input === null || input === "") {
            return "is required";
        }
        return true;;
    },
    "min": (input: any, param?: number) => {
        if (typeof input == "string" && param !== undefined && param !== null) {
            return (input.length > param);
        }
        return `must be at least ${param} long`;
    },
    "validateNoSpace": (input: any) => {
        if (typeof input != "string" || input.indexOf(' ') >= 0) {
            return "Cannot contain Space"
        }
        return true;
    },
    //Check input is Number
    "validateInputIsNumber": (input: any) => {
        return (!isNaN(Number(input))) ? true : "can only be numbers";
    },
    //Check Email
    "validateEmail": (input: any) => {
        return (String(input)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) !== null) ? true : "Invalid Email Address"
    },
    //Check Password (Contains 8-30 characters)
    "validatePassword": (input: any) => {
        return (validationsMap["validateInputIsString"](input)) ? input.length >= 8 && input.length <= 30 : "must be between 8-30 characters";
    }
};

export function getValidationRulesFromProp({name, label, ...propsObject}: any): ((inputVal: any) => boolean | string)[] {
    const rules = [] as ((inputVal: any) => boolean | string)[];
    Object.keys(propsObject).forEach((propName) => {
        if (propName in validationsMap) {
            rules.push((inputVal: any) => {
                const result = validationsMap[propName](inputVal, propsObject[propName])
                if (result !== true) {
                    return `The ${label} ${result}`
                } else {
                    return result;
                }
            })
        }
    })
    return rules;
}
