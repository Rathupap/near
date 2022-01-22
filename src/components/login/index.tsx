import Button from "../shared/Button";

const Login = () => (
    <div className="flex flex-col justify-center items-center">
        <p className="text-dark-shade-black text-sm pb-2">Already have NEAR account?</p>
        <Button title="Login in with NEAR" onClick={() => console.log("Navigating to login")} />
    </div>
);

export default Login;