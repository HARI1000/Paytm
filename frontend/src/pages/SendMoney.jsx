import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import axios from "axios";
import { useState } from "react";
function SendMoney()
{
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    
 return(<div className="flex items-center justify-center w-screen h-screen">
    <div className="w-1/3 p-4 text-center border-2 border-black rounded-lg shadow-2xl h-1/2">
        <div className="py-4 text-lg font-bold" >Send Money</div>
        <div className="pt-4">
            <div className="flex items-center justify-start py-2">
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-300 rounded-full">A</div>
                <h1 className="font-bold">{name}</h1>
            </div>
            <InputBox onChange={(e)=>{setAmount(e.target.value)}} heading="Amount (in Rs)" plchldr="Enter Amount"/>
            <Button onClick={()=>{
                axios.post("http://localhost:3000/api/v1/account/transfer",{
                    to:id,
                    amount:amount
                },{
                    headers:{
                        Authorization:'Bearer '+localStorage.getItem("token"),
                    }
                }).then(
                ()=>{navigate("/dashboard");}
                ).catch((e)=>{console.log(e);})
            }} btnm="Initiate Transfer" />
        </div>
    </div>
 </div>);
}
export default SendMoney;