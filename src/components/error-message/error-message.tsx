import { useAppSelector } from "../../hooks";

function ErrorMessage() {
    const error = useAppSelector((state) => state.error);

    return (error) ? <p>ERROR!</p> : null;
}

export default ErrorMessage;