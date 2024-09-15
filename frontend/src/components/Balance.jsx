import { useEffect, useState } from "react";
import axios from "axios";
function Balance() {
    const token = localStorage.getItem("token");
    const [balance,setBalance]=useState();
        useEffect(()=>{
            axios.get("http://localhost:3000/api/v1/account/balance",{
                headers:{
                    'Authorization':`Bearer ${token}` 
                }
            }).then((res)=>{setBalance(res.data.balance);
            });
        },[])
    return (<>
        <div className="flex items-center px-4 py-4 mb-4 text-lg">
            <div className="text-lg font-bold">
                Your Balance:
            </div>
            <div className="ml-4 text-base font-semibold">
                Rs {balance}
            </div>
        </div>
        <hr />
    </>);
}
export default Balance;