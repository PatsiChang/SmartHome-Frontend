interface ValidationsMap {
    [key: string]: (input: any, param?: number) => boolean | string;
}
export const validationsMap: ValidationsMap = {
    //Check required
    "required": (input: any) => {
        if (input === undefined || input === null || input === "") {
            return "is required";
        }
        return input?.length > 0;
    },
    "min": (input: any, param?: number) => {
        if (typeof input == "string" && param !== undefined && param !== null) {
            return (input.length > param);
        }
        return `must be at least ${param} long`;
    },
    //Check input is String
    "validateInputIsString": (input: any) => {
        return (typeof input === "string") ? true : "Invalid Input";
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

