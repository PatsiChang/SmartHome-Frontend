export const loopValidations = (input: any, validationList: ((input: any) => boolean)[]) => {
    for (const validation of validationList) {
        if (!validation(input)) {
            return false;
        }
    }
    return true;
};

//Check required
const validateRequired = (input: any) => {
    if (input === undefined || input === null) {
        return false;
    }
    return (input?.length < 1) ? false : true;
}

//Check input is String
const validateInputIsString = (input: any) => {
    return typeof input === "string";
}

//Check input is Number
const validateInputIsNumber = (input: any) => {
    return typeof input === "number";
}

//Check Email
const validateEmail = (input: any) => {
    return String(input)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

//Check Password (Contains 8-30 characters)
const validatePassword = (password: any) => {
    return (validateInputIsString(password)) ? password.length >= 8 && password.length <= 30 : false;
}

export const validationList = [
    validateRequired,
    validateInputIsString,
    validateInputIsNumber,
    validateEmail,
    validatePassword
];