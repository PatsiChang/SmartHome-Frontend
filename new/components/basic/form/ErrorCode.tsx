import { BaseHintsText } from '../layout/BaseText';

interface ErrorCodeProps {
    errorList: string[],
}

const ErrorCode = ({ errorList }: ErrorCodeProps) => {
    const errorMsg = errorList.length > 0 ? errorList[0] : " ";

    return (
        <BaseHintsText styleClass={"errorText"}>{errorMsg}</BaseHintsText>
    );
}

export default ErrorCode;
