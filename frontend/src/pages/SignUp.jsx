import { useNavigate } from "react-router-dom";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
function SignUp() {

    const [firstName,setFirstName]= useState();
    const [lastName,setLastName]= useState();
    const [username,setUserName]= useState();
    const [password,setPassword]= useState();
    const navigate = useNavigate();
    return (
    <div className="w-screen h-screen flex justify-center items-center">
        <div className="text-center">
            <Heading label="Sign Up" />
            <SubHeading label="Enter your information to create your account" />
            <InputBox onChange={(e)=>{setFirstName(e.target.value)}}  heading="First Name" plchldr="John" />
            <InputBox onChange={(e)=>{setLastName(e.target.value)}} heading="Last Name" plchldr="Doe" />
            <InputBox onChange={(e)=>{setUserName(e.target.value)}} heading="Email" plchldr="johndoe@example.com" />
            <InputBox onChange={(e)=>{setPassword(e.target.value)}} heading="Password" plchldr="******" />
            <Button btnm="SignUp" onClick={async()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                    username,
                    firstName,
                    lastName,
                    password,
                });
                localStorage.setItem("token",response.data.token);
                navigate("/dashboard");
            }} />
            <BottomWarning to="/signin" label="Already have an account?" buttonText="Sign In" />
        </div>
    </div>);
}
export default SignUp;