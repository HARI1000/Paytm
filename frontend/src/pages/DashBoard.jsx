import { useEffect,useState} from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import InputBox from "../components/InputBox";
import UserList from "../components/UserList";
import axios from "axios";
function DashBoard() {
    const [filter,setFilter]=useState();
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter).then((res)=>{setUsers(res.data)
        });
    },
    [filter])
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="w-full h-full p-4">
                <AppBar/>
                <Balance/>
                <InputBox  onChange={(e)=>{setFilter(e.target.value)}} heading="Users" plchldr="Search users..." />
                {users.map((user)=>{
                    return <UserList usr={user} />
                })}
            </div>
        </div>);
}
export default DashBoard;