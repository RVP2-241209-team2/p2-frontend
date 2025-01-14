import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
    
    return(
        <>
        <Container className="bg-slate-100 rounded-md h-64 p-0.5">
            <h1 className="text-center mt-5 font-bold">Thank You!</h1>
            <div className="flex flex-col items-center">
                <p className="text-center w-9/12"> We are getting started on your order right away, and you will recieve an order confirmation email shortly.</p>
                <Link to="/">
                    <button type="button" className="w-60 rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"> Return to Store </button>
                </Link>
            </div>
        </Container>
        
        </>
    )
}