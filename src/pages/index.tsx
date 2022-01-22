import type { NextPage } from "next";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import tw from "twin.macro";
import { useState } from "react";
import validator from "validator";
import Login from "../components/login";
import Button from "../components/shared/Button";
import Header from "../components/shared/Header";
import HorizontalLine from "../components/shared/HorizontalLine";
import Input from "../components/shared/Input";
import { Logo } from "../svg";
import { ActionTypeEnum, SignUpWithEnum } from "../types/enum";
import { FlowState, UserType } from "../types/state";
import { useRouter } from "next/router";

const SignWithButtONWrapper = tw.button`
  py-2
  px-6
  rounded-2xl
`;

interface DispatchProps {
  signUpWithEmail: (email: string) => void;
  signUpWithPhone: (phone: string) => void;
}

interface StateProps {
  user?: UserType;
}

type HomeProps = StateProps & DispatchProps;

const Home: NextPage<HomeProps> = ({  user, signUpWithEmail, signUpWithPhone }) => {
  const router = useRouter();
  const [signUpWith, setSignUpWith] = useState<SignUpWithEnum>(SignUpWithEnum.email);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const enableButton = validator.isEmail(email) && signUpWith === SignUpWithEnum.email || validator.isMobilePhone(phone, [
    "en-ZA"
  ]) && signUpWith === SignUpWithEnum.phone || false;

  const renderSignUpWithBlock = () => (
    <div className="space-x-3">
      <SignWithButtONWrapper className={`${  signUpWith === SignUpWithEnum.email && "border border-grey-border"}`}  onClick={() => setSignUpWith(SignUpWithEnum.email)}>
        Email
      </SignWithButtONWrapper>
      <SignWithButtONWrapper className={`${  signUpWith === SignUpWithEnum.phone && "border border-grey-border"}`} onClick={() => setSignUpWith(SignUpWithEnum.phone)}>
        Phone
      </SignWithButtONWrapper>
    </div>
  )

  const navigateToVerification = () => {
    router.push("/verification");
  }

  const handleContinue = () => {
    if(signUpWith === SignUpWithEnum.email){
      signUpWithEmail(email);
      navigateToVerification()
    } else {
      signUpWithPhone(phone);
      navigateToVerification();
    }
  }

  return (
    <div>
        <Header>
            <div className="flex justify-center">
                <Logo />
            </div>
        </Header>
        <div className="flex flex-col items-center py-4 space-y-8 px-5">
          {
            renderSignUpWithBlock()
          }
          {
            signUpWith === SignUpWithEnum.email ?
            <>
              <Input value={email} type="text" placeholder="princerathupa@gmail.com" onChange={({ target: { value } }) => setEmail(value)} />
            </>
            :
            <>
              <Input value={phone} type="email" placeholder="Ex (337) 378 8383" onChange={({ target: { value } }) => setPhone(value)} />
            </>
          }
          <Button title="Continue" isDisabled={!enableButton} isPrimary={enableButton} onClick={handleContinue} />
          <p className="text-xs text-center mx-10 text-dark-grey">
            by clicking continue you must agree to near labs <a href="#" className="text-light-blue">Terms & Conditions</a> and <a href="#" className="text-light-blue">Privacy Policy</a>
          </p>
          <HorizontalLine />
          <Login />
        </div>
    </div>
  )
}

const mapStateToProps = (state: FlowState) => {
  return { user: state?.user}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signUpWithEmail: (email: string) => {
      dispatch({
        type: ActionTypeEnum.EMAIL,
        payload: {
          email
        }
      });
    },
    signUpWithPhone: (phone: string) => {
      dispatch({
        type: ActionTypeEnum.PHONE,
        payload: {
          phone
        }
      });
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

