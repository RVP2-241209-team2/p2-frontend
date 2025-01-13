import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";


export const AddressForm:React.FC<{onClose: () =>void}> = ({onClose}) => {

    const auth = useAuth();
    const [addressLine1, setAddressLine1] = useState<string>('');
    const [addressLine2, setAddressLine2] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [defaultAddress, setDefaultAddress] = useState<boolean>(false);

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log({addressLine1, addressLine2, city, state, zipCode, country});
        const address = {
            addressLine1,
            addressLine2,
            city,
            state,
            zipCode,
            country
        }
        const response = await axios.post(`http://3.144.215.146:8081/api/v1/users/${auth.user?.id}/addresses`, 
                                            address,
                                            {headers: {Authorization: `Bearer ${auth.token}`}});
        if(response.status === 200){
            onClose();
        }
    }

    return <div className="bg-white rounded-xl">
        <div className="flex justify-between p-3 bg-[#e5e5e9] rounded-t-xl">
            <div className="font-bold text-[17px]">Add an address</div>
            <i onClick={onClose} className="fa-solid fa-x cursor-pointer"></i>
        </div>
        <h3 className="py-4 px-5 font-[650]">Enter a new shipping address</h3>
        <form className="ml-2 px-5 pb-5 font-medium" onSubmit={onSubmit}>
            <label htmlFor="fullname">Full name (First and Last name)</label>
            <input className="block border-1 border-[grey] w-full font-normal pl-1 py-0.5" type="text" id="fullname" placeholder="" name="fullname" required/>
            <label className="mt-2" htmlFor="phoneNumber">Phone number</label>
            <input className="block border-1 border-[grey] w-full font-normal pl-1 py-0.5" type="text" id="phoneNumber" placeholder="" name="phoneNumber" required/>
            <label className="mt-2" htmlFor="addressLine1">Address</label>
            <input className="block border-1 border-[grey] w-full font-normal pl-1 py-0.5" type="text" id="addressLine1" placeholder="Street address or P.O.Box" value={addressLine1} onChange={(e)=>setAddressLine1(e.target.value)} name="addressLine1" required/>
            <input className="block border-1 border-[grey] w-full font-normal pl-1 py-0.5" type="text" id="addressLine2" placeholder="Apt, Suite, unit, building, floor, etc" value={addressLine2} onChange={(e)=>setAddressLine2(e.target.value)} name="addressLine2"/>
            <label className="mt-2" htmlFor="city">City</label>
            <input className="block border-1 border-[grey] w-full" type="text" id="city" value={city} onChange={(e)=>setCity(e.target.value)} name="city" required/>
            <label className="mt-2" htmlFor="state">State</label>
            <input className="block border-1 border-[grey] w-full" type="text" id="state" value={state} onChange={(e)=>setState(e.target.value)} name="state" required/>
            <label className="mt-2" htmlFor="zipCode">Zip Code</label>
            <input className="block border-1 border-[grey] w-full" type="text" id="zipCode" value={zipCode} onChange={(e)=>setZipCode(e.target.value)} name="zipCode" required/>
            <label className="mt-2" htmlFor="country">Country/Region</label>
            <input className="block border-1 border-[grey] w-full" type="text" id="country" value={country} onChange={(e)=>setCountry(e.target.value)} name="country" required/>
            <div className="flex items-center mt-2">
                <input className="mr-1" type="checkbox" id="default" onChange={()=>setDefaultAddress(!defaultAddress)} name="default" checked={defaultAddress}/>
                <label className="font-normal" htmlFor="default">Make this my default address</label>
            </div>
            <button className="mt-4 px-4 py-1 font-normal bg-[#ffda05] rounded-2xl hover:bg-[#ffc505]" type="submit">Use this address</button>
        </form>
    </div>
}