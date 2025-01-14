import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateAddressModal } from "./address-form-modal";
import { useAuth } from "../../context/AuthContext";
import { CreatePaymentModal } from "./payment-form-modal";
import { AddressesListModal } from "./address-list-modal";
import api from "../../lib/axios";
import { CartItem } from "./cart-page";
import { CartItemsContext } from "./CartItemsProvider";
import { toast } from "sonner";

export interface Address{
  id: string;
  recipientName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentDetails: Payment[];
}

export interface User{
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: number;
}

export interface Payment{
  id?: string;
  user?: User;
  cardNumber: string;
  cardHolderName: string;
  expireDate: string;
  address: Address;
  isDefault: boolean;
}
interface CheckoutContextType {
  setAddressModal: (value: boolean) => void;
  setPaymentModal: (value: boolean) => void;
  paymentDetail: Payment | undefined;
  setPaymentDetail: (value: Payment) => void;
  address: Address | undefined;
  billingAddress: Address | undefined;
  setBillingAddress: (value: Address) => void;
  billingAddressModal: boolean;
  setBillingAddressModal: (value: boolean) => void;
}

export const checkoutContext = createContext<CheckoutContextType | undefined>(undefined);


export default function CheckoutPage() {

// check if user is signed in.
  const navigate = useNavigate();
  const {user, token} = useAuth();
  const cartItemsContext = useContext(CartItemsContext);

  // selected address and payment
  const [selectAddress, setSelectAddress] = useState<Address>();
  const [selectPayment, setSelectPayment] = useState<Payment>();

  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [addressSecion, setAddressSection] = useState(true);
  const [paymentSection, setPaymentSection] = useState(false);
  const [orderSection, setOrderSection] = useState(false)
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentDetails, setPaymentDetails] = useState<Payment[]>([]);

  // for context API
  const [billingAddressModal, setBillingAddressModal] = useState<boolean>(false);
  const [paymentDetail, setPaymentDetail] = useState<Payment>();
  const [address, setAddress] = useState<Address>();
  const [billingAddress, setBillingAddress] = useState<Address>();

  useEffect(()=>{
    if(!user){
      navigate('/login');
    }
    const fetchAddresses = async ()=>{
    const addresses = await api.get(`/customers/users/my-info/addresses`);
    console.log(addresses)
    setAddresses(addresses.data);
    setSelectAddress(addresses.data[0])
    const payments = await api.get(`/customers/users/my-info/payment-methods`);
    setPaymentDetails(payments.data);
    setSelectPayment(payments.data.find((payment:Payment)=>payment.isDefault));
  }
    fetchAddresses();
  },[]);

  const addAddress = ()=>{
    setAddressModal(true);
  }

  const onAddress = ()=>{
    setAddressSection(true);
    setPaymentSection(false)
    setOrderSection(false)
  }

  const onPayment = ()=>{
    setPaymentSection(true)
    setAddressSection(false);
    setOrderSection(false)
  }

  const onOrder =()=>{
    setOrderSection(true);
    setPaymentSection(false);
    setAddressSection(false);
  }
  const onAddressClose = ()=>{
    setPaymentModal(false);
    // setPaymentDetail(undefined);
  }

  const onAddNewPayment = (paymentDetail:Payment)=>{
    setPaymentDetails([...paymentDetails, paymentDetail!]);
    setSelectPayment(paymentDetail);
  }
  const placeOrder = async ()=>{
    const obj:{ [key: string]: number } = {};
    cartItemsContext?.cartItems.forEach((item:CartItem)=>{obj[item.product.id] = item.quantity});
    // make object of key value pair of product id and quantity
    console.log(obj);
    const order = {
      addressId: selectAddress?.id,
      paymentId: selectPayment?.id,
      orderItems: obj
    }
    console.log(order);
    try {
      const {data} = await api.post(`/public/orders/customer/order/create`, order);
      console.log(data);
    } catch (error) {
      console.log("Order placement failed!", error);
      toast.error("Order placement failed!");
    }
  }

  if(!user){
    return null;
  }

  return <div className="flex w-full justify-between">
    <div className="w-[75%] mr-[15px]">
      <div className=" p-2 m-2">
        {!addressSecion && !selectAddress && 
        <div className="flex justify-between">
          <div className="text-lg font-medium"><span className="mr-3">1</span> Shipping Address</div>
          <div>
            <div>Name</div>
            <div>Address</div>
          </div>
          <div onClick={onAddress} className="cursor-pointer text-[dodgerblue] hover:underline">Change</div>
        </div>}
        {!addressSecion && selectAddress &&
        <div className="flex justify-between">
          <div>
            <div className="font-bold">Delivering to <span >{selectAddress.recipientName}</span></div>
            <div>{selectAddress.addressLine1} {selectAddress.addressLine2}, {selectAddress.city}, {selectAddress.state}, {selectAddress.zipCode}, {selectAddress.country}</div>
          </div>
          <div onClick={onAddress} className="cursor-pointer text-[dodgerblue] hover:underline">Change</div>
        </div>}

        {addressSecion && <div>
          <div className="flex justify-between">
            <div className="text-lg font-medium"><span className="mr-3">1</span> Choose a shipping address</div>
            <div onClick={onPayment} >
              <span className="cursor-pointer mr-2 hover:underline text-[dodgerblue]">Close</span>
              <i className="fa-solid fa-x cursor-pointer"></i>
            </div>
          </div>
          <div className="ml-7 mt-2 border border-white rounded-md">
            <div className="text-lg font-medium py-2 border-b border-white mx-3">Delivery addresses</div>
            {addresses.map((address)=>(
              <div key={address.id} className={"flex w-fit items-center py-2 pl-3 pr-4 my-2 mx-3"+`${address.id===selectAddress?.id? '  rounded-md bg-[#f3be624b]': ''}`}>
                <input type="radio" name="address" onChange={()=>setSelectAddress(address)} checked={address.id===selectAddress?.id} id={address.id} value={address.id} />
                <label htmlFor={address.id} className="block pl-2"><span className="font-medium text-[15px] pl-2 pr-1">{address.recipientName?.split(' ')[0]} {address.recipientName?.split(' ')[1]}</span> {address.addressLine1} {address.addressLine2}, {address.city}, {address.state}, {address.zipCode}, {address.country}</label>
                {/* <div className="self-center">
                  <label htmlFor={address.id} className="font-medium text-[15px] pl-2"></label>
                  
                  <label htmlFor={address.id} className="pl-2">{address.user.phoneNumber}</label>
                </div> */}
              </div>
            ))}

            {/* <div className="my-2 mx-3">
            <input type="radio" name="address" id={"1"} />
                <label htmlFor={"1"} className="pl-2">John Doe</label>
                <label htmlFor={"1"} className="pl-2">134 State st, NY, NY, 02165</label>
              </div> */}
            <div className="my-2 mx-3">
              <span className="text-[lightgrey] cursor-pointer "><i className="fa-solid fa-plus"></i></span>
              <span onClick={addAddress} className="text-[dodgerblue] cursor-pointer hover:underline pl-2"> Add a new address</span>
            </div>
            <div className="cursor-pointer py-2 bg-[lightgrey] pl-3">
              <div onClick={onPayment} className="w-fit py-1 px-3 rounded-3xl font-medium bg-[#ffd105] hover:bg-[#ffc505]">Use this address</div>
            </div>
          </div>
        </div>}
        {addressModal && <CreateAddressModal setAddresses={(address: Address)=>setAddresses(()=>[...addresses, address])} setSelectAddress={(address:Address)=>setSelectAddress(address)} onClose={()=>setAddressModal(false)} />}
      </div>  
      <div className="p-2 m-2">
        {paymentSection && <div>
          <div className="text-lg font-medium"><span className="mr-3">2</span> Choose a payment method</div>
          <div className="ml-7 mt-4 border border-white rounded-md">
            <div className="pt-2 border-b border-white mx-3">
              <div className="text-lg font-medium ">Your credit and debit cards</div>
              <div className="pb-1 pt-2 flex justify-between text-[#858282] text-[15px]">
                <div className="w-[150px]"></div>
                <div className="">Name on card</div>
                <div>Expires on</div>
              </div>
            </div>
            {paymentDetails.map((payment)=>(
              <div key={payment.id} className={"flex p-2 rounded-lg justify-between px-3 py-2 my-2 mx-3 "+`${payment.id===selectPayment?.id? 'bg-[#f3be624b]': ''}`}>
                <div>
                  <input type="radio" name="payment" onChange={()=>setSelectPayment(payment)} checked={selectPayment?.id===payment.id} id={payment.id} value={payment.id} />
                  <label htmlFor={payment.id} className="font-medium text-[15px] pl-2">Card ending in {payment.cardNumber.slice(-4)}</label>
                </div>
                <label htmlFor={payment.id} className="block pl-2">{payment.cardHolderName}</label>
                <label htmlFor={payment.id} className="pl-2">{payment.expireDate}</label> 
              </div>
            ))}
              
            <div className="my-2 mx-3">
              <span className="text-[lightgrey] cursor-pointer "><i className="fa-solid fa-plus"></i></span>
              <span onClick={()=>setPaymentModal(true)} className="text-[dodgerblue] cursor-pointer hover:underline pl-2"> Add a credit or debit card</span>
            </div>
            <div className="cursor-pointer py-2 bg-[lightgrey] pl-3">
              <div onClick={onOrder} className="w-fit py-1 px-3 rounded-3xl font-medium bg-[#ffd105] hover:bg-[#ffc505]">Use this payment method</div>
            </div>
          </div>
        </div>}
        {!paymentSection && selectPayment===undefined && <div className="flex justify-between">
          <div className="text-lg font-medium"><span className="mr-3">2</span> Payment Method</div>
          <div onClick={onPayment} className="cursor-pointer text-[dodgerblue] hover:underline">Change</div>
        </div>}
        {!paymentSection && selectPayment && <div className="flex justify-between">
          <div className="text-lg font-medium">Paying with {selectPayment.cardNumber.substring(12)}</div>
          <div onClick={onPayment} className="cursor-pointer text-[dodgerblue] hover:underline">Change</div>
        </div>}
      </div>  
      {/* <div className="p-2 m-2">
        <div className="text-lg font-medium"><span className="mr-3">3</span> Offers</div>
      </div> */}
      {!orderSection && <div className="p-2 m-2">
        <div className="text-lg font-medium"><span className="mr-3">3</span> Items and shipping</div>
      </div>}
      {orderSection && <div className="p-2 m-2">
        <div className="text-lg font-medium mb-4"><span className=""></span> Review items and shipping</div>
        {cartItemsContext?.cartItems.map((item: CartItem) => (
          <div className="mx-2 my-3">
              <div key={item.id} className="flex justify-between items-center">
                <img src={item.product.images[0]} alt={item.product.name} className="w-[130px] object-cover" />
                <div className="flex-1 ml-4">
                  <div className="font-medium">{item.product.name}</div>
                  <div className="font-bold">${item.quantity * item.product.price}</div>
                </div>
                {/* <div className="font-bold">{item.quantity} x ${item.product.price}</div> */}
              </div>
              <div ><span className="font-bold">Quantity</span>: {item.quantity}</div>
            </div>
          ))}
      </div>}
    </div>
    <div className="text-[14px] w-[25%] ml-[15px] h-fit p-3 bg-white rounded-md">
      <div className=""></div>
        {/* <div className="text-lg font-medium">Order Summary</div> */}
        {addressSecion && <div onClick={onPayment} className="text-center cursor-pointer mx-auto py-1 px-4 mb-2 rounded-3xl bg-[#ffd105] hover:bg-[#ffc505]">Use this address</div>}
        {paymentSection && <div onClick={onOrder} className="text-center cursor-pointer mx-auto py-1 px-4 mb-2 rounded-3xl bg-[#ffd105] hover:bg-[#ffc505]">Use this payment method</div>}
        {orderSection && <div>
        <div onClick={placeOrder} className="text-center cursor-pointer mx-auto py-1 px-4 mb-2 rounded-3xl bg-[#ffd105] hover:bg-[#ffc505]">Place your order</div>
        <p className="pb-3 border-b border-[lightgrey]">By placing your order, you agree to Shoply's <span className="text-[dodgerblue] cursor-pointer underline hover:text-[dimgrey]">privacy notice</span> and <span className="text-[dodgerblue] cursor-pointer underline hover:text-[dimgrey]">conditions of use</span>.</p>
        </div>}

        <div className="flex justify-between">
          <div>Items:</div>
          <div>${cartItemsContext?.total}</div>
        </div>
        <div className="flex justify-between">
          <div>Shipping & handling:</div>
          <div>$6.99</div>
        </div>
        <div className="flex justify-between">
          <div>Estimated tax to be collected: *</div>
          <div>${(cartItemsContext?.total ?? 0) + 6.99}</div>
        </div>
        <div className="font-medium text-xl flex justify-between">
          <div>Order total:</div>
          <div>${(cartItemsContext?.total ?? 0) + 6.99}</div>
        </div>
    </div>
    
    <checkoutContext.Provider value={{setAddressModal, setPaymentModal, paymentDetail, setPaymentDetail, address, billingAddress, setBillingAddress, billingAddressModal, setBillingAddressModal}}>
      {paymentModal && <CreatePaymentModal addresses={addresses} onClose={()=>setPaymentModal(false)} addNewPayment={(payment:Payment)=>onAddNewPayment(payment)}  setBillingAddress={()=>setBillingAddress(undefined)} setPaymentDetail={()=>setPaymentDetail(undefined)} />}
      {billingAddressModal && <AddressesListModal setAddresses={(address: Address)=>setAddresses(()=>[...addresses, address])} addresses={addresses} onClose={()=>setBillingAddressModal(false)} setBillingAddress={()=>setBillingAddress(undefined)} setPaymentDetail={()=>setPaymentDetail(undefined)} />}
    </checkoutContext.Provider>
   
      
  </div>
}
