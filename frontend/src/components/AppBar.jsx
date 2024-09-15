import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
function AppBar() {
    const navigate = useNavigate();
    return <>
        <div className="flex items-center justify-between px-2 py-4">
            <h1 className="text-lg">Payments App</h1>
            <div className="flex items-center justify-between w-1/6">
                <p>Hello,User</p>
                <Button onClick={()=>{
                    localStorage.clear();
                    navigate("/signin");
                }} btnm="SignOut" />
            </div>
        </div>
        <hr />
    </>
}
export default AppBar;