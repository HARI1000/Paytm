import { useNavigate } from "react-router-dom";
import Button from "./Button";

function UserList({usr})
{
    const navigate = useNavigate();
    return (<div className="flex justify-between">
        <div>
            <h1>{usr.firstName} {usr.lastName}</h1>
        </div>
        <Button onClick={()=>{navigate("/send?id=" + usr._id + "&name=" + usr.firstName);}}  btnm="Send Money"/>
    </div>);
}
export default UserList;