import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
// check if user is signed in.
  const navigate = useNavigate();


  return <div className="w-[90vw]">
    <div className="flex justify-between p-2 m-2">
      <div className="text-lg font-medium"><span className="mr-3">1</span> Shipping Address</div>
      <div>
        <div>Name</div>
        <div>Address</div>
      </div>
      <div>change</div>
    </div>  
    <div className="p-2 m-2">
      <div className="text-lg font-medium"><span className="mr-3">2</span> Choose a payment method</div>
      <div className="ml-7 mt-2 border border-white rounded-md">
        <div className="text-lg font-medium py-2 border-b border-white mx-3">Your credit and debit cards</div>
        <div className="my-2 mx-3">
          <span className="text-[lightgrey] cursor-pointer "><i className="fa-solid fa-plus"></i></span>
          <span className="text-[dodgerblue] cursor-pointer hover:underline pl-2"> Add a credit or debit card</span>
        </div>
        <div className="cursor-pointer py-2 bg-[lightgrey] pl-3">
          <div className="w-fit py-1 px-3 rounded-3xl bg-[#ffc505]">Use this payment method</div>
        </div>
      </div>
    </div>  
    <div className="p-2 m-2">
      <div className="text-lg font-medium"><span className="mr-3">3</span> Offers</div>
    </div>
    <div className="p-2 m-2">
      <div className="text-lg font-medium"><span className="mr-3">4</span> Items and shipping</div>
    </div>
  </div>
}
