import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../components/shared/Button";
import Header from "../components/shared/Header";
import HorizontalLine from "../components/shared/HorizontalLine";
import VerificationCode from "../components/verification";
import { Cancel } from "../svg";
import { FlowState, UserType } from "../types/state";


interface StateProps {
  user?: UserType;
}

type HomeProps = StateProps;

const Verification: NextPage<HomeProps> = ({ user }) => {

    const router = useRouter();
    const [verificationCode, setVerificationCode] = useState<string>("");

    const renderSixDigitCodeMessage = () => {
        if(user?.email) {
            return (
                <span>email address<br /> <span className="text-light-blue">{user.email}</span></span>
            )
        }

        if(user?.phone){
            return (
                <span>phone <br /><span className="text-light-blue">{user.phone}</span></span>
            )
        }


        return "";
    }

    useEffect(() => {

        if(!user?.email && !user?.email){
             router.replace("/");
        }

    }, [user, router])

    const handleVerificationCodeChange = (newValue: string) => {
        console.log(newValue)
        if(newValue){
            setVerificationCode(verificationCode + newValue)
        } else {
        setVerificationCode(verificationCode.substring(0, verificationCode.length -1))
        }
    }

  return (
    <div>
        <Header>
            <div className="flex justify-center">
                <div className="flex justify-center w-full items-center">
                    <div className="flex-1 flex justify-center">
                        <p>Verification</p>
                    </div>
                    <div className="flex absolute right-4 justify-end">
                        <Link href="/" passHref>
                            <a href="#"><Cancel /></a>
                        </Link>
                    </div>
                </div>
            </div>
        </Header>
        <div className="flex flex-col items-center py-4 space-y-8 px-5">
            <p className="text-sm text-center">
                We&apos;ve sent a 6-digit verification code to the <br /> { renderSixDigitCodeMessage() } 
            </p>
            <VerificationCode code={verificationCode} onChange={handleVerificationCodeChange} />
            <Button title="Continue" isDisabled={!(verificationCode.length < 6)} isPrimary={verificationCode.length === 6} />
            <HorizontalLine />
            <p className="text-sm font-medium text-dark-shade-black text-center">Didn&apos;t receive your code?</p>
            <p className="text-sm font-light text-light-blue text-center">{ user?.email ? "Send to a different email address" : "Send to a different phone" }</p>
            <a className="text-sm font-light text-light-blue  text-center" href="#">Resend your code </a>
        </div>
    </div>
  )
}

const mapStateToProps = (state: FlowState) => {
  return { user: state?.user}
}

export default connect(mapStateToProps)(Verification);

