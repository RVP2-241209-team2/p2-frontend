import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
    const navigate = useNavigate();
    
    return(
        <>
        <h1 className="text-center mt-5 font-bold">Thank You!</h1>
        <p className="text-center"> We are getting started on your order right away, and you will recieve an order confirmation email shortly</p>
        </>
    )
}