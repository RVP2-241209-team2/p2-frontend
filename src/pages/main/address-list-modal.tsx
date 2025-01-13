import React, { useContext, useEffect } from 'react';
import { Modal } from '../../Modal/Modal';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { checkoutContext } from './checkout-page';
import { set } from 'react-hook-form';

interface Address {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}

interface AddressesFormProps {
    // addresses: Address[];
    // selectedAddressId: number;
    onClose: () => void;
    setPaymentDetail: () => void;
    setBillingAddress: () => void;
}

const dummyAddresses: Address[] = [
    {
        id: 1,
        name: 'John Doe',
        address: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zip: '62701',
    },
    {
        id: 2,
        name: 'Jane Smith',
        address: '456 Elm St',
        city: 'Springfield',
        state: 'IL',
        zip: '62702',
    },
];

export const AddressesListModal: React.FC<AddressesFormProps> = ({setPaymentDetail, setBillingAddress, onClose}) => {
    
    const {user, token} = useAuth();
    const paymentContext = useContext(checkoutContext);

    const [selectedAddress, setSelectedAddress] = React.useState<number | null>(1);
    const [addresses, setAddresses] = React.useState<Address[]>([]);

    const [addressLine1, setAddressLine1] = React.useState<string>('');
    const [addressLine2, setAddressLine2] = React.useState<string>('');
    const [city, setCity] = React.useState<string>('');
    const [state, setState] = React.useState<string>('');
    const [zipCode, setZipCode] = React.useState<string>('');
    const [country, setCountry] = React.useState<string>('');
    const [newAddress, setNewAddress] = React.useState<boolean>(false);


    useEffect(() => {
        const fetchAddresses = async ()=>{
            const addresses = await axios.get(`http://3.144.215.146:8081/api/v1/users/${user?.id}/addresses`, {headers: {Authorization: `Bearer ${token}`}});
            setAddresses(addresses.data);
        }   
        // fetchAddresses();
    }, []);

    const addressChange = () => {
        // paymentContext?.setPaymentDetail({...paymentContext.paymentDetail!, address: addresses.find((address) => address.id === selectedAddress)!});
        // paymentContext?.setBillingAddress(addresses.find((address) => address.id === selectedAddress)!);
        paymentContext?.setPaymentModal(true);
        onClose();
    }
    const addNewAddress = () => {
        setNewAddress(true);
    }

    const onSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    }

    const addAddress = async () => {
        const address = {
            addressLine1,
            addressLine2,
            city,
            state,
            zipCode,
            country
        }
        const response = await axios.post(`http://3.144.215.146:8081/api/v1/users/${user?.id}/addresses`, address, {headers : {Authorization: `Bearer ${token}`}});
        if(response.status === 200){
            setNewAddress(false);
            // setAddresses([...addresses, response.data]);
        }
    }
    const onAddressClose = ()=>{
        onClose();
        setPaymentDetail();
        setBillingAddress();
      }

    return (
        <Modal onClose={onAddressClose}>
            <div className='bg-white pb-2 rounded-xl'>
                <div className='flex justify-between p-3 bg-[#e5e5e9] rounded-t-xl'>
                    <div className='font-bold text-[17px]'>Add a credit or debit card</div>
                    <i onClick={onAddressClose} className='fa-solid fa-x cursor-pointer'></i>
                </div>
                {!newAddress && <div className='p-3 mx-4 my-3 border border-[#e5e5e9] rounded-xl'>
                    {dummyAddresses.map((address) => (
                        <div className={selectedAddress === address.id? 'bg-[#f5ead7] py-2.5 pl-3 pr-5 rounded-lg': ' px-3 py-2.5 rounded-lg'}  key={address.id}>
                            <input
                                type="radio"
                                id={`address-${address.id}`}
                                name="address"
                                value={address.id}
                                checked={selectedAddress === address.id}
                                onChange={() => setSelectedAddress(address.id)}
                            />
                            <label className='ml-3' htmlFor={`address-${address.id}`}>
                                {address.name}, {address.address}, {address.city}, {address.state}, {address.zip}
                            </label>
                        </div>
                    ))}
                    <div className='mt-3'>
                        <button onClick={addNewAddress} className='py-1 px-2 border-1 border-[#999999] hover:bg-[#ffffff] rounded-2xl'>Add an address</button>
                        <button onClick={addressChange} className='py-1 px-2 ml-2 border-1 bg-[#ffd859] hover:bg-[#ffd000] rounded-2xl'>Use this address</button>
                    </div>
                </div>}
                {newAddress && <div className='p-3 mx-4 my-3 border w-[380px] border-[#e5e5e9] rounded-xl'>
                    <form className="ml-2 font-medium" onSubmit={onSubmit}>
                        <label htmlFor="fullname">Full name</label>
                        <input className="block rounded-md border-1 border-[#b3b2b2] w-full font-normal pl-1 py-0.5" type="text" id="fullname" placeholder="" name="fullname" required/>
                        <label className="mt-1" htmlFor="addressLine1">Address Line 1</label>
                        <input className="block rounded-md border-1 border-[#b3b2b2] w-full font-normal pl-1 py-0.5" type="text" id="addressLine1" placeholder="Street address or P.O.Box" value={addressLine1} onChange={(e)=>setAddressLine1(e.target.value)} name="addressLine1" required/>
                        <label className="mt-1" htmlFor="addressLine2">Address Line 2</label>
                        <input className="block rounded-md border-1 border-[#b3b2b2] w-full font-normal pl-1 py-0.5" type="text" id="addressLine2" placeholder="Apt, Suite, unit, building, floor, etc" value={addressLine2} onChange={(e)=>setAddressLine2(e.target.value)} name="addressLine2"/>
                        <label className="mt-1" htmlFor="city">City</label>
                        <input className="block rounded-md border-1 border-[#b3b2b2] w-full" type="text" id="city" value={city} onChange={(e)=>setCity(e.target.value)} name="city" required/>
                        <label className="mt-1" htmlFor="state">State</label>
                        <input className="block rounded-md border-1 border-[#b3b2b2] w-full" type="text" id="state" value={state} onChange={(e)=>setState(e.target.value)} name="state" required/>
                        <label className="mt-1" htmlFor="zipCode">Zip Code</label>
                        <input className="block rounded-md border-1 border-[#b3b2b2] w-full" type="text" id="zipCode" value={zipCode} onChange={(e)=>setZipCode(e.target.value)} name="zipCode" required/>
                        <label className="mt-1" htmlFor="country">Country/Region</label>
                        <input className="block rounded-md border-1 border-[#b3b2b2] w-full" type="text" id="country" value={country} onChange={(e)=>setCountry(e.target.value)} name="country" required/>
                        <label className="mt-1" htmlFor="phoneNumber">Phone number</label>
                        <input className="block rounded-md border-1 border-[#b3b2b2] w-full font-normal pl-1 py-0.5" type="text" id="phoneNumber" placeholder="" name="phoneNumber" required/>
                        <div className='text-end'>
                        <button onClick={()=>setNewAddress(!newAddress)} className='py-1 px-3 rounded-2xl border-[#a3a3a3] border-[1px] hover:bg-[#faf8f8] bg-[#fdfdfd]'>Back</button>
                        <button onClick={addAddress} className="mt-4 ml-2 px-4 py-1 font-normal bg-[#ffda05] rounded-2xl hover:bg-[#ffc505]" type="submit">Use this address</button>
                        </div>
                    </form>
                </div>}
            </div>
        </Modal>
    );
};