import { FC, HTMLInputTypeAttribute, FocusEventHandler, useState, ChangeEventHandler } from "react";
import tw from "twin.macro";

const InputComponent = tw.input`
    border-0
    text-base
    text-dark-shade-black
    w-full
    py-3
    focus-visible:outline-none
`;

const InputWrapper = tw.div`
    flex
    px-4
    w-full
    rounded-xl
`;

interface InputProps {
    type: HTMLInputTypeAttribute;
    value: string;
    placeholder?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    inputRightLabel?: string;
    error?: boolean;
}

const Input: FC<InputProps> = ({ type, value, placeholder, onChange, inputRightLabel, error }) => {

    const [isFocus, setIsFocus] = useState<boolean>(false);

    const HandleFocus: FocusEventHandler<HTMLInputElement>  = () => {
        setIsFocus(true);
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
        setIsFocus(false);
    }

    return (
    <InputWrapper className={`${isFocus ? "border-2 border-primary": "border border-grey-border"} ${ error && "border-2 border-error"}`}>
        <InputComponent
            type={type}
            value={value}
            placeholder={placeholder}
            onFocus={HandleFocus}
            onBlur={handleBlur}
            onChange={onChange} 
        />
        {
            inputRightLabel && (
                <div className="border-l border-grey-border flex justify-center items-center pl-4">
                    <p className="font-semibold">{inputRightLabel}</p>
                </div>
            )
        }
    </InputWrapper>
)
}

export default Input;