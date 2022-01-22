import { FC, ReactNode } from "react";
import tw from "twin.macro";

const HeaderWrapper = tw.div`

    bg-light-grey
    p-5
    
`;

interface HeaderProps {
    children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => (
    <HeaderWrapper>
        {
            children
        }
    </HeaderWrapper>
);

export default Header;