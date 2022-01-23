import Link from "next/link";
import { FC } from "react";
import { Cancel } from "../../svg";

interface SignUpHeaderProps {
    title: string;
}

const SignUpHeader: FC<SignUpHeaderProps> = ({ title }) => (
    <div className="flex justify-center">
        <div className="flex justify-center w-full items-center">
            <div className="flex-1 flex justify-center">
                <p className="font-semibold">{title}</p>
            </div>
            <div className="flex absolute right-4 justify-end">
                <Link href="/" passHref>
                    <a href="#"><Cancel /></a>
                </Link>
            </div>
        </div>
    </div>
);

export default SignUpHeader;