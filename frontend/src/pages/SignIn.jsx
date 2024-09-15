import { Link, useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
function SignIn() {
    const [username,setUserName]=useState();
    const [password,setPassword]=useState();
    const navigate = useNavigate();
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="text-center">
                <Heading label="Sign In" />
                <SubHeading label="Enter your credentials to access your account" />
                <InputBox onChange={(e)=>{setUserName(e.target.value)}} heading="Email" plchldr="johndoe@example.com" />
                <InputBox onChange={(e)=>{setPassword(e.target.value)}} heading="Password" plchldr="******" />
                <Button onClick={async ()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                        username,
                        password
                    });
                    localStorage.setItem("token",response.data.token);
                    console.log(response);
                    navigate("/dashboard");
                }} btnm="SignIn"/>
                <BottomWarning to="/signup" label="Dont Not Already have an account" buttonText="SignUp" />
            </div>
        </div>);
}
export default SignIn;