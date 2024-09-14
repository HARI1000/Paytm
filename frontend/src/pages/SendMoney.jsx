import Button from "../components/Button";
import InputBox from "../components/InputBox";

function SendMoney()
{
 return(<div className="flex w-screen h-screen justify-center items-center">
    <div className="shadow-2xl border-black border-2 rounded-lg w-1/3 h-1/2 p-4 text-center">
        <div className="font-bold text-lg py-4" >Send Money</div>
        <div className="pt-4">
            <div className="flex justify-start items-center py-2">
                <div className="mr-4 rounded-full bg-green-300 w-12 h-12 flex justify-center items-center">A</div>
                <h1 className="font-bold">Friends Name</h1>
            </div>
            <InputBox heading="Amount (in Rs)" plchldr="Enter Amount"/>
            <Button btnm="Initiate Transfer" />
            
        </div>
    </div>
 </div>);
}
export default SendMoney;