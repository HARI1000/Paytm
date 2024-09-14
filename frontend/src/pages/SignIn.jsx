import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

function SignIn() {

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="text-center">
                <Heading label="Sign In" />
                <SubHeading label="Enter your credentials to access your account" />
                <InputBox heading="Email" plchldr="johndoe@example.com" />
                <InputBox heading="Password" plchldr="******" />
                <Button btnm="SignIn"/>
                <BottomWarning to="/signup" label="Dont Not Already have an account" buttonText="SignUp" />
            </div>
        </div>);
}
export default SignIn;