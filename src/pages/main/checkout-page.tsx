import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
// check if user is signed in.
  const navigate = useNavigate();
  const [addressSecion, setaddressSecion] = useState(true);
  const [payment, setPayment] = useState(false);
  const [orderSection, setOrderSection] = useState(false)

  const onAddress = ()=>{
    setaddressSecion(true);
    setPayment(false)
    setOrderSection(false)
  }

  const closeAddress = ()=>{
    setPayment(true)
    setaddressSecion(false);
    setOrderSection(false)
  }

  const onPayment = ()=>{
    setPayment(true)
    setaddressSecion(false);
    setOrderSection(false)
  }

  const onOrder =()=>{
    setOrderSection(true);
    setPayment(false);
    setaddressSecion(false);
  }
  return <div className="flex w-[95vw] justify-between">
    <div className="w-[75%] mr-[15px]">
      <div className=" p-2 m-2">
        {!addressSecion &&
        <div className="flex justify-between">
          <div className="text-lg font-medium"><span className="mr-3">1</span> Shipping Address</div>
          <div>
            <div>Name</div>
            <div>Address</div>
          </div>
          <div onClick={onAddress} className="cursor-pointer text-[dodgerblue] hover:underline">Change</div>
        </div>}
        {addressSecion && <div>
          <div className="flex justify-between">
            <div className="text-lg font-medium"><span className="mr-3">1</span> Choose a shipping address</div>
            <div onClick={closeAddress} >
              <span className="cursor-pointer mr-2 hover:underline text-[dodgerblue]">Close</span>
              <i className="fa-solid fa-x cursor-pointer"></i>
            </div>
          </div>
          <div className="ml-7 mt-2 border border-white rounded-md">
            <div className="text-lg font-medium py-2 border-b border-white mx-3">Your addresses</div>
            <div className="my-2 mx-3">
              <span className="text-[lightgrey] cursor-pointer "><i className="fa-solid fa-plus"></i></span>
              <span className="text-[dodgerblue] cursor-pointer hover:underline pl-2"> Add a new address</span>
            </div>
            <div className="cursor-pointer py-2 bg-[lightgrey] pl-3">
              <div onClick={onPayment} className="w-fit py-1 px-3 rounded-3xl font-medium bg-[#ffd105] hover:bg-[#ffc505]">Use this address</div>
            </div>
          </div>
        </div>}
        
      </div>  
      <div className="p-2 m-2">
        {payment && <div>
          <div className="text-lg font-medium"><span className="mr-3">2</span> Choose a payment method</div>
          <div className="ml-7 mt-4 border border-white rounded-md">
            <div className="text-lg font-medium py-2 border-b border-white mx-3">Your credit and debit cards</div>
            <div className="my-2 mx-3">
              <span className="text-[lightgrey] cursor-pointer "><i className="fa-solid fa-plus"></i></span>
              <span className="text-[dodgerblue] cursor-pointer hover:underline pl-2"> Add a credit or debit card</span>
            </div>
            <div className="cursor-pointer py-2 bg-[lightgrey] pl-3">
              <div onClick={onOrder} className="w-fit py-1 px-3 rounded-3xl font-medium bg-[#ffd105] hover:bg-[#ffc505]">Use this payment method</div>
            </div>
          </div>
        </div>}
        {!payment && <div className="flex justify-between">
          <div className="text-lg font-medium"><span className="mr-3">2</span> Payment Method</div>
          <div onClick={onPayment} className="cursor-pointer text-[dodgerblue] hover:underline">Change</div>
        </div>}
      </div>  
      <div className="p-2 m-2">
        <div className="text-lg font-medium"><span className="mr-3">3</span> Offers</div>
      </div>
      {!orderSection && <div className="p-2 m-2">
        <div className="text-lg font-medium"><span className="mr-3">4</span> Items and shipping</div>
      </div>}
      {orderSection && <div className="p-2 m-2">
        <div className="text-lg font-medium"><span className="mr-3">4</span> Review items and shipping</div>
      </div>}
    </div>
    <div className="text-[14px] w-[25%] ml-[15px] h-fit p-3 bg-white rounded-md">
      <div className=""></div>
        {/* <div className="text-lg font-medium">Order Summary</div> */}
        {addressSecion && <div onClick={onPayment} className="text-center cursor-pointer mx-auto py-1 px-4 mb-2 rounded-3xl bg-[#ffd105] hover:bg-[#ffc505]">Use this address</div>}
        {payment && <div onClick={onOrder} className="text-center cursor-pointer mx-auto py-1 px-4 mb-2 rounded-3xl bg-[#ffd105] hover:bg-[#ffc505]">Use this payment method</div>}
        {orderSection && <div>
        <div className="text-center cursor-pointer mx-auto py-1 px-4 mb-2 rounded-3xl bg-[#ffd105] hover:bg-[#ffc505]">Place your order</div>
        <p className="pb-3 border-b border-[lightgrey]">By placing your order, you agree to Amazon's <span className="text-[dodgerblue] cursor-pointer underline hover:text-[dimgrey]">privacy notice</span> and <span className="text-[dodgerblue] cursor-pointer underline hover:text-[dimgrey]">conditions of use</span>.</p>
        </div>}

        <div className="flex justify-between">
          <div>Items:</div>
          <div>$0.00</div>
        </div>
        <div className="flex justify-between">
          <div>Shipping & handling:</div>
          <div>$0.00</div>
        </div>
        <div className="flex justify-between">
          <div>Estimated tax to be collected: *</div>
          <div>$0.00</div>
        </div>
        <div className="font-medium text-xl flex justify-between">
          <div>Order total:</div>
          <div>$0.00</div>
        </div>
    </div>
  </div>
}
