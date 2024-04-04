interface ErrorCodeProps {
    errorList: string[],
}
const ErrorCode = ({ errorList }: ErrorCodeProps) => {
    return (
        <h5>
            {errorList.map((error, index) => <div key={index}>{`*${error}!`}</div>)}
        </h5>
    )
}

export default ErrorCode;
