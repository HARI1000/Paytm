function InputBox({heading,plchldr,onChange})
{
    return <div className="py-1">
        <div className="text-base text-left">{heading}</div>
        <input  onChange={onChange} className="border border-2 w-full p-2 rounded" placeholder={plchldr} />
    </div>
}
export default InputBox;