import { ChangeEventHandler, FC, FocusEventHandler, useState } from "react";
import tw from "twin.macro";

const Input = tw.input`
    p-2
    w-1/6
    focus-visible:outline-none
    text-black
    rounded-lg
    text-center
`;

interface CodeProps {
    value: string;
    onChange: (newValue: string) => void;
}

const Code: FC<CodeProps> = ({ value, onChange }) => {

    const [isFocus, setIsFocus] = useState<boolean>(false);

    const HandleFocus: FocusEventHandler<HTMLInputElement>  = () => {
        setIsFocus(true);
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
        setIsFocus(false);
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        onChange(event.target.value);
    }

    return (
        <Input type="string" onChange={handleChange} value={value} className={`w-1/6 ${isFocus ? "border-primary border-2" : "border-code-border border"}`} onBlur={handleBlur} onFocus={HandleFocus} />
    );
}

export default Code;