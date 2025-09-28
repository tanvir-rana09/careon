import { useEffect, useState } from "react";

const useDebounce = (inputValue: string, delay: number) => {
    const [input, setInput] = useState(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setInput(inputValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, delay]);

    return input;
};

export default useDebounce;
