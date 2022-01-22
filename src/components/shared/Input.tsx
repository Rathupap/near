import { FC, HTMLInputTypeAttribute, FocusEventHandler, useState, ChangeEventHandler } from "react";
import tw from "twin.macro";

const InputComponent = tw.input`
    border-0
    text-base
    text-dark-shade-black
    w-full
    focus-visible:outline-none
`;

const InputWrapper = tw.div`
    flex
    py-4
    px-6
    w-full
    rounded-xl
`;

interface InputProps {
    type: HTMLInputTypeAttribute;
    value: string;
    placeholder?: string;
    onChange: ChangeEventHandler<HTMLInputElement>
}

const Input: FC<InputProps> = ({ type, value, placeholder, onChange }) => {

    const [isFocus, setIsFocus] = useState<boolean>(false);

    const HandleFocus: FocusEventHandler<HTMLInputElement>  = () => {
        setIsFocus(true);
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
        setIsFocus(false);
    }

    return (
    <InputWrapper className={`${isFocus ? "border-2 border-primary": "border border-grey-border"}`}>
        <InputComponent
            type={type}
            value={value}
            placeholder={placeholder}
            onFocus={HandleFocus}
            onBlur={handleBlur}
            onChange={onChange} 
        />
    </InputWrapper>
)
}

export default Input;