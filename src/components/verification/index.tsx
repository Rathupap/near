import { FC } from "react";
import { uniqueId } from "lodash";
import Code from "./components/Code";

interface VerificationCodeProps {
    code: string;
    onChange: (newValue: string) => void;
}

const VerificationCode: FC<VerificationCodeProps> = ({ code, onChange }) => {

    const codeArr = [];

    for(let i = 0; i < 6; i++) {
        codeArr.push(code[i] || "");
    }

    return (
    <div className="flex flex-col justify-center items-center">
        <p className="text-lighter-grey text-sm pb-2">Enter Verification Code</p>
        <div className="flex space-x-4">
            {
                codeArr.map((value) => (
                <Code key={uniqueId()} onChange={onChange} value={value}/> 
                ))
            }
        </div>
    </div>
);
}

export default VerificationCode;