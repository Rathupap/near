import { FC, ReactNode } from "react";

interface TermsProps {
    children: ReactNode;
}

const Terms: FC<TermsProps> = ({ children }) => (
    <p className="text-xs text-center mx-4 text-dark-grey font-thin">
        { children }
    </p>
);

export default Terms;