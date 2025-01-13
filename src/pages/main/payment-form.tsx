import { useContext, useEffect, useState } from "react";
import { Address, checkoutContext, Payment } from "./checkout-page";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { AddressesListModal } from "./address-list-modal";

interface PaymentProps {
    onClose: () => void;
    setPaymentDetail: () => void;
    setBillingAddress: () => void;
}

export const PaymentForm: React.FC<PaymentProps> = ({onClose, setBillingAddress, setPaymentDetail}) => {

    const {user, token} = useAuth();
    const paymentContext = useContext(checkoutContext);

    const [cardNumber, setCardNumber] = useState<string>(()=>{
        return paymentContext?.paymentDetail?.cardNumber || '';
    });
    const [cardHolderName, setCardHolderName] = useState<string>(()=>{
        return paymentContext?.paymentDetail?.cardHolderName || '';
    });
    const [expireMonth, setExpireMonth] = useState<string>(()=>{
        return paymentContext?.paymentDetail?.expireDate.split('/')[0] || '';
    });
    const [expireYear, setExpireYear] = useState<string>(()=>{
        return paymentContext?.paymentDetail?.expireDate.split('/')[1] || '';
    });
    const [isDefault, setIsDefault] = useState<boolean>(false);
    const [defaultAddress, setDefaultAddress] = useState<Address | null>(()=>{
        return paymentContext?.billingAddress || null;
    });
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [defaultPayment, setDefaultPayment] = useState<Payment>();
    const [paymentDetails, setPaymenDetails] = useState<Payment[]>([]);
    // const [billAddrChange, setBillAddrChange] = useState<boolean>(false);
    
    // useEffect(()=>{
    //     const fetchAddresses = async ()=>{
    //         const addresses = await axios.get(`http://3.144.215.146:8081/api/v1/users/${user?.id}/addresses`, {headers: {Authorization: `Bearer ${token}`}});
    //         setAddresses(addresses.data);
    //         setDefaultAddress(addresses.data[0]);
    //         const payments = await axios.get(`http://3.144.215.146:8081/api/v1/users/${user?.id}/payment-methods`, {headers: {Authorization: `Bearer ${token}`}});
    //         setPaymenDetails(payments.data);
    //         setDefaultPayment(payments.data.find((payment:Payment)=>payment.isDefault));
    //     }   
    //     fetchAddresses();
    // },[]);

    const onSubmit = async ()=>{
        const payment = {
            cardNumber,
            cardHolderName,
            expireDate: `${expireMonth}/${expireYear}`,
            addressId: addresses[0].id,
            isDefault
        }

        const response = await axios.post(`http://3.144.215.146:8081/api/vi/users/${user?.id}/payment-methods`, payment, {headers: {Authorization: `Bearer ${token}`}});
        if(response.status === 200){
            setPaymenDetails([...paymentDetails, response.data]);
            onClose();
        }
        console.log(payment);
    }

    const onBillsChange = ()=>{
        // setBillAddrChange(true);
        paymentContext?.setBillingAddressModal(true);
        const payment:Payment = {
            cardNumber,
            cardHolderName,
            expireDate: `${expireMonth}/${expireYear}`,
            address: addresses[0],
            isDefault
        }
        paymentContext?.setPaymentDetail(payment);
        onClose();
        // onClose();
    }

    const onPaymentFormClose = ()=>{
        onClose();
        setPaymentDetail();
        setBillingAddress();
    }
    return <div className="bg-white rounded-xl">
        <div>
            <div className="flex justify-between px-4 py-3 bg-[#e5e5e9] rounded-t-xl">
                <div className="font-bold text-[17px]">Add a payment method</div>
                <i onClick={onPaymentFormClose} className="fa-solid fa-x cursor-pointer"></i>
            </div>
            <div className="px-[65px] my-4">
                <div className="my-2">
                    <label className="font-medium" htmlFor="cardNumber">Card number</label>
                    <input className="border-1 border-[grey] ml-3.5 py-0.5" value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)} type="text" id="cardNumber" placeholder="" name="cardNumber" required/>
                </div>
                <div className="my-2">
                    <label  className="font-medium" htmlFor="cardHolderName">Name on card</label>
                    <input className=" border-1 border-[grey] ml-2 py-0.5" value={cardHolderName} onChange={(e)=>setCardHolderName(e.target.value)} type="text" id="cardHolderName" placeholder="" name="cardHolderName" required/>
                </div>
                <div className="my-2">
                    <label className="font-medium" htmlFor="expireMonth">Expiration date</label>
                    <select className="bg-[#e9e8e8] px-2 py-1 rounded-lg cursor-pointer hover:bg-[#dddddd] border-[grey]" value={expireMonth} onChange={(e)=>setExpireMonth(e.target.value)} name="expireMonth" id="expireMonth">
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <select className="bg-[#e9e8e8] ml-1 px-2 py-1 rounded-lg cursor-pointer hover:bg-[#dddddd] border-[grey]" value={expireYear} onChange={(e)=>setExpireYear(e.target.value)} name="expireYear" id="expireYear">
                        <option value="25">2025</option>
                        <option value="26">2026</option>
                        <option value="27">2027</option>
                        <option value="28">2028</option>
                        <option value="29">2029</option>
                        <option value="30">2030</option>
                        <option value="31">2031</option>
                        <option value="32">2032</option>
                        <option value="33">2033</option>
                        <option value="34">2034</option>
                        <option value="35">2035</option>
                        <option value="36">2036</option>
                    </select>
                    {/* <input className="border-1 border-[grey] py-0.5" value={expireDate} onChange={(e)=>setExpireDate(e.target.value)} type="text" id="expireDate" placeholder="MM/YY" name="expireDate" required/> */}
                </div>
                <div className="my-2">
                    <label className="font-medium" htmlFor="cvv">CVV</label>
                    <input className="border-1 border-[grey] ml-3.5 py-0.5 w-[100px]" type="text" id="cvv" placeholder="" name="cvv" required/>
                </div>
                <div className="mt-5">
                    <label className="font-medium text-lg" htmlFor="address">Billing address</label>
                    {
                    <div className="text-[14px] ">                    
                        <div className="font-medium">{defaultAddress?.user.firstName} {defaultAddress?.user.lastName}</div>
                        <div>{defaultAddress?.addressLine1}</div>
                        <div>{defaultAddress?.city}, {defaultAddress?.state} {defaultAddress?.zipCode}</div>
                        <div>{defaultAddress?.country}</div>
                        <div>Phone: {defaultAddress?.user.phoneNumber}</div>
                        <div className="font-medium mt-3 ">John Doe</div>
                        <div>1234 Main Street, Building 42</div>
                        <div>Seattle, WA 98104</div>
                        <div>United States</div>
                        <div>Phone: 206-266-1000</div>                    
                        <div onClick={onBillsChange} className="cursor-pointer my-2 text-[#1e80ff] hover:underline">Change</div>
                    </div>}

                    {/* {!defaultAddress && <div className="my-2">
                        <span className="text-[#a7a5a5] cursor-pointer "><i className="fa-solid fa-plus"></i></span>
                        <span className="text-[#1e80ff] cursor-pointer hover:underline pl-1"> Add a new address</span>
                    </div>  } */}
                </div>
                <div className="flex items-center mt-4 pb-3">
                    <input className="mr-1" type="checkbox" id="default" onChange={()=>setIsDefault(!isDefault)} name="default" checked={isDefault}/>
                    <label className="font-normal" htmlFor="default">Set as default payment method</label>
                </div>
            </div>
            <div className="bg-[#e5e5e9] rounded-b-xl text-right py-2.5">
                <button onClick={onPaymentFormClose} className="py-1 px-3 rounded-2xl border-[#a3a3a3] border-[1px] hover:bg-[#faf8f8] bg-[#fdfdfd]">Cancel</button>
                <button onClick={onSubmit} className="bg-[#f0c14b] ml-2 mr-4 hover:bg-[#dfb13d] py-1 px-3 rounded-2xl">Add your card</button>
            </div>
            </div>
            {/* {billAddrChange && <AddressesListModal onClose={()=>setBillAddrChange(false)} />} */}
        </div>
}