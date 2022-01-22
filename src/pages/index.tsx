import type { NextPage } from "next";
import tw from "twin.macro";
import { useState } from "react";
import validator from "validator";
import Login from "../components/login";
import Button from "../components/shared/Button";
import Header from "../components/shared/Header";
import HorizontalLine from "../components/shared/HorizontalLine";
import Input from "../components/shared/Input";
import { Logo } from "../svg";
import { SignUpWithEnum } from "../types/enum";

const SignWithButtONWrapper = tw.button`
  py-2
  px-6
  rounded-2xl
`;

const Home: NextPage = () => {
  const [signUpWith, setSignUpWith] = useState<SignUpWithEnum>(SignUpWithEnum.email);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const enableButton = validator.isEmail(email) && signUpWith === SignUpWithEnum.email || phone && signUpWith === SignUpWithEnum.phone || false;

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
          <Button title="Continue" isDisabled={!enableButton} isPrimary={enableButton} />
          <p className="text-xs text-center mx-10 text-dark-grey">
            by clicking continue you must agree to near labs <a href="#" className="text-light-blue">Terms & Conditions</a> and <a href="#" className="text-light-blue">Privacy Policy</a>
          </p>
          <HorizontalLine />
          <Login />
        </div>
    </div>
  )
}

export default Home

