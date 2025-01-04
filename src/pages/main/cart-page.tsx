import axios from "axios";
import { useEffect, useState } from "react";
import "./cart-page.css";
import { useNavigate } from "react-router-dom";

interface FakeItem{
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  }
  image: string;
}

// interface CartItem {
//   id: number;
//   cart_id: number;
//   product_id: number;
//   quantity: number;
//   total: number;
// }
export default function CartPage() {
  const nagivate = useNavigate();;
  const [items, setItems] = useState<FakeItem[]>([]);
  const [total, setTotal] = useState<number>(()=>{
    return items.reduce((acc, item) => acc + item.price, 0);
  });
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(()=>{
    // fetch cart items
    const cartItems = async () => {
      await axios.get('https://fakestoreapi.com/products?limit=10')
      .then((res)=>{
        console.log(res.data);
        setItems(res.data);
        setTotal(res.data.reduce((acc:number, item:FakeItem) => acc + item.price, 0));
        setPages(Array.from({length: Math.ceil(res.data.length/4)}, (_, i) => i+1));
        console.log(pages)
    })
      .catch((err)=>console.log(err));
    }
    cartItems();
  }, [])

  const onPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.textContent);
    setCurrentPage(Number(e.currentTarget.textContent));
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  const prevNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if(e.currentTarget.textContent === "Next"){
      setCurrentPage(currentPage+1);
    }else if(e.currentTarget.textContent === "Previous"){
      setCurrentPage(currentPage-1);
    }
  }

  return <div>
    <div className="cart-Container">
      <div className="cart-Items">
        <h2 className="cart-Header">Shopping Cart</h2>
        <div>
          {items.map((item, index) => {
            if(index<4*(currentPage-1) || index>=4*currentPage) return null;
            return (
            <div className="item-Container" key={index}>
              <img className="img" src={item.image} alt={item.title} />
              <div className="item-Details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="flex">
                  <div className="item-Quantity-Controller">
                    <i className="fa-solid fa-trash"></i>
                    <span>qty</span>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                  <button className="px-2.5">delete</button>
                </div>
              </div>
              <div style={{fontWeight: "700"}}>${item.price}</div>
            </div>);
          })}
        </div>
        <ul className="pagination">
          <li className={`page-item ${currentPage===1? "disabled":""}`}><a onClick={prevNav} className="page-link" href="#">Previous</a></li>
          {pages.length>0 &&pages.map((page, index) => (
            <li key={index} className={`page-item ${page===currentPage? "active": ""}`}><a onClick={onPage} className="page-link" href="#">{page}</a></li>))}
          {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li> */}
          <li className={`page-item ${currentPage===pages.length? "disabled":""}`}><a onClick={prevNav} className="page-link" href="#">Next</a></li>
        </ul>
      </div>
      <div className="cart-Checkout">
        <div>Subtotal ({items.length} items): <span>${total}</span></div>
        <button onClick={()=>nagivate("/checkout")}>Proceed to checkout</button>
      </div>
    </div>
  </div>;
}
