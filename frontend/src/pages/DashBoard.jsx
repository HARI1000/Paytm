import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import InputBox from "../components/InputBox";
import UserList from "../components/UserList";

function DashBoard() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-full h-full p-4">
                <AppBar/>
                <Balance/>
                <InputBox  heading="Users" plchldr="Search users..." />
                <UserList />
            </div>
        </div>);
}
export default DashBoard;