import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../components/shared/Button";
import Header from "../components/shared/header";
import HorizontalLine from "../components/shared/HorizontalLine";
import VerificationCode from "../components/verification";
import { FlowState, UserType } from "../types/state";
import SignUpHeader from "../components/signupheader/SignUpHeader";

interface StateProps {
  user?: UserType;
}

type VerificationProps = StateProps;

const Verification: NextPage<VerificationProps> = ({ user }) => {

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

    const navigateToCreate = () => {
        router.push("/create");
    }

    useEffect(() => {

        if(!user?.email && !user?.phone){
             router.replace("/");
        }

    }, [user, router])

    const handleVerificationCodeChange = (newValue: string) => {
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
                <SignUpHeader title="Verification" />
            </div>
        </Header>
        <div className="flex flex-col items-center py-4 space-y-8 px-5">
            <p className="text-sm text-center">
                We&apos;ve sent a 6-digit verification code to the <br /> { renderSixDigitCodeMessage() } 
            </p>
            <VerificationCode code={verificationCode} onChange={handleVerificationCodeChange} />
            <Button title="Continue" isDisabled={verificationCode.length !== 6} isPrimary={verificationCode.length === 6} onClick={navigateToCreate} />
            <HorizontalLine />
            <p className="text-sm font-medium text-dark-shade-black text-center">Didn&apos;t receive your code?</p>
            <a className="text-sm font-light text-light-blue text-center" href="#">{ user?.email ? "Send to a different email address" : "Send to a different phone" }</a>
            <a className="text-sm font-light text-light-blue  text-center" href="#">Resend your code </a>
        </div>
    </div>
  )
}

const mapStateToProps = (state: FlowState) => {
  return { user: state?.user}
}

export default connect(mapStateToProps)(Verification);

