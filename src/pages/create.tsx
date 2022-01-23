import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "../components/shared/header";
import { FlowState, UserType } from "../types/state";
import SignUpHeader from "../components/signupheader/SignUpHeader";
import Login from "../components/login";
import HorizontalLine from "../components/shared/HorizontalLine";
import Terms from "../components/terms";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import { Info } from "../svg";
import { Dispatch } from "redux";
import { ActionTypeEnum } from "../types/enum";
import Progress from "../components/progress";


interface StateProps {
  user?: UserType;
 existingUsers: UserType[];
}

interface DispatchProps {
  createNearAccount: (fullName: string, accountId: string) => void;
}

type CreateProps = StateProps & DispatchProps;

const Create: NextPage<CreateProps> = ({ user, existingUsers, createNearAccount }) => {

    const router = useRouter();
    const [fullName, setFullName] = useState<string>("");
    const [accountId, setAccountId] = useState<string>("");
    const [err, setErr] = useState<boolean>(false);

    useEffect(() => {

        if(!user?.email && !user?.phone){
             router.replace("/");
        }

    }, [user, router])

    const handleContinue = () => {
      createNearAccount(fullName, accountId);
    }

    const handleAccountIdChange = (newAccountId: string) => {
      setErr(false);
      if(existingUsers.some((existingUser) => existingUser.accountId === newAccountId)) {
        setErr(true);
      }

      setAccountId(newAccountId)
    }

  return (
    <div>
        <Header>
            <div className="flex justify-center">
                <SignUpHeader title="Create NEAR account" />
            </div>
        </Header>
        <div className="relative">
            {
                fullName && accountId && (
                  <Progress percentage={35} />
                )
            }
        </div>
        <div className="flex flex-col items-center py-4 space-y-8 px-5">
            <p className="text-sm text-lighter-grey">
                Enter an Account ID to use with your NEAR account. Your Account ID will be used for all NEAR operations, including sending and receiving assets.
            </p>
            <div className="w-full space-y-6">
              <div className="space-y-1">
                <label className="text-sm text-dark-grey"><span>Full Name</span></label>
                <Input value={fullName} type="text" placeholder="Ex. Prince Rathupa" onChange={(event) => setFullName(event.target.value)} />
              </div>
              <div className="space-y-1">
                <label className={`text-sm ${ err ? "text-error" : "text-dark-grey"} flex space-x-2`}><span>Account ID </span><Info /></label>
                <Input value={accountId} type="text" placeholder="yourname" onChange={(event) => handleAccountIdChange(event.target.value)} inputRightLabel=".near" error={err} />
                {
                  err && (
                    <span className="text-error text-sm font-thin py-2">Account ID already exists</span>
                  )
                }
              </div>
            </div>
            <Button title="Continue" isDisabled={!(fullName && accountId)} isPrimary={!!(fullName && accountId)} onClick={handleContinue} />
            <Terms>
                <span>By creating a NEAR account, you agree to the NEAR Wallet <a href="#" className="text-primary">Terms & Conditions</a> and <a href="#" className="text-primary">Privacy Policy</a></span>
            </Terms>
            <HorizontalLine />
            <Login />
        </div>
    </div>
  )
}

const mapStateToProps = (state: FlowState) => {
  return { user: state?.user, existingUsers: state.users}
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createNearAccount: (fullName: string, accountId: string) => {
      dispatch({
        type: ActionTypeEnum.CREATE_ACCOUNT,
        payload: {
          fullName,
          accountId
        }
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);

