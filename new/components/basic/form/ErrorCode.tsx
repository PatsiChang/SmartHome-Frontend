import { Text } from 'react-native';

interface ErrorCodeProps {
    errorList: string[],
}
const ErrorCode = ({ errorList }: ErrorCodeProps) => {
    return (
        <Text>{errorList.join("\n")}</Text>
    )
}

export default ErrorCode;
