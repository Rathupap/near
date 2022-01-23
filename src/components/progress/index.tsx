import Link from "next/link";
import { FC } from "react";
import { Cancel } from "../../svg";

interface ProgressProps {
    percentage: number;
}

const Progress: FC<ProgressProps> = ({ percentage }) => (
    <div className="border-2 border-primary absolute top-0 left-0" style={{
        width: percentage + "%"
    }}></div>
);

export default Progress;