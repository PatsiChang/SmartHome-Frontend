import BaseRow from '../layout/BaseRow';
import BaseContainer from '../layout/BaseContainer';
import { BaseMiddleText } from '../layout/BaseText';

interface ErrorCodeProps {
    errorList: string[],
}
const ErrorCode = ({ errorList }: ErrorCodeProps) => {
    return (
        <BaseContainer>
            {errorList.map((error, index) =>
                <BaseRow key={index} styleClass={"justifyContent_center"}>
                    <BaseMiddleText>{error}</BaseMiddleText>
                </BaseRow>
            )}
        </BaseContainer>

    )
}

export default ErrorCode;
