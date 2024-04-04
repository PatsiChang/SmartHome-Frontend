interface ErrorCodeProps {
    errorList: string[],
}
const ErrorCode = ({ errorList }: ErrorCodeProps) => {
    return (
        <h4>
            {errorList.map((error, index) => <div key={index}>{`*${error}!`}</div>)}
        </h4>
    )
}

export default ErrorCode;
