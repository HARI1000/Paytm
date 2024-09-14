import Button from "../components/Button";
function AppBar() {
    return <>
        <div className="flex justify-between px-2 py-4 items-center">
            <h1 className="text-lg">Payments App</h1>
            <div className="flex justify-between w-1/6 items-center">
                <p>Hello,User</p>
                <Button btnm="SignOut" />
            </div>
        </div>
        <hr />
    </>
}
export default AppBar;