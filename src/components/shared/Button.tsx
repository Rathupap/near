import { FC, MouseEventHandler } from "react";
import tw from "twin.macro";
import { ChevronRight } from "../../svg";

interface ButtonProps {
    title: string;
    isDisabled?: boolean;
    isPrimary?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const ButtonWrapper = tw.button`
    rounded-2xl
    py-3
    px-4
    cursor-pointer
    flex
    justify-between
    text-white
    items-center
    text-base
`;

const Button: FC<ButtonProps> = ({ title, isDisabled = false, isPrimary = false, onClick }) => (
    <ButtonWrapper
        disabled={isDisabled}
        className={`bg-dark-shade-black ${ isDisabled && "bg-disabled-button cursor-not-allowed"} ${ isPrimary && "bg-primary"}`}
        onClick={onClick}
    >
        <span className="pr-4">
        {
            title
        }
        </span>
        <ChevronRight />
    </ButtonWrapper>
);

export default Button;

