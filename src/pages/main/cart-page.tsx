import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./cart-page.css";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import { CartItemsContext } from "./CartItemsProvider";
import { useAuth } from "../../context/AuthContext";

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
export interface Cart{
  id: string;
  cartItems: CartItem[];
  total: number;
}
export interface CartItem{
  id:string;
  product: Product;
  quantity: number;
  total: number;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  quantity: number;
  tags?: ProductTag[];
}
export interface ProductTag{
  id:string,
  product: Product;
  tag: Tag;
}
export interface Tag{
  id: string;
  name: string;
  productTags: ProductTag[];
}

export default function CartPage() {
  const {user} = useAuth();
  const cartItemsContext = useContext(CartItemsContext);
  console.log(cartItemsContext?.total);
  const nagivate = useNavigate();;
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(()=>{
    return cartItems.reduce((acc, item) => acc + item.product.price, 0);
  });
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(()=>{
    if(!user){
      nagivate("/login");
    }
    // fetch cart items
    const cartItems = async () => {

      const response = await api.get('/customers/cart/items');
      console.log(response.data);
      setCartItems(response.data);
      cartItemsContext?.setTotal(response.data.reduce((acc:number, item:CartItem) => acc + item.product.price, 0));
      cartItemsContext?.setCartItems(response.data);
      setTotal(response.data.reduce((acc:number, item:CartItem) => acc + item.product.price, 0));
      const checkedItems:{ [key: string]: boolean } = {}
      response.data.forEach((item:CartItem) =>{checkedItems[`${item.id}`]=true})
      setCheckedItems(checkedItems);
      setPages(Array.from({length: Math.ceil(response.data.length/4)}, (_, i) => i+1));
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  const onCheck = (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.checked);
    const [price, id] = e.target.id.split("-");
    const isChecked = e.target.checked;
    console.log(price, id, checkedItems, checkedItems[id])
    if(!isChecked){
      checkedItems[id] = false;
      setCheckedItems({...checkedItems});
      setTotal(total-Number(price))
    }else{
      checkedItems[id] = true
      console.log(checkedItems)
      setCheckedItems({...checkedItems});
      setTotal(total+Number(price))

    }
  }
  const deleteItem = async(id:string)=>{
    console.log(id);
    const response = await api.delete(`/customers/cart/remove/${id}`)
    console.log(response);
    if(response.status === 200){
      const newItems = cartItems.filter((item)=>item.id!==id);
      setCartItems(newItems);
      cartItemsContext?.setCartItems(newItems);
      const total = newItems.reduce((acc:number, item:CartItem) => acc + item.product.price, 0);
      setTotal(total);
      cartItemsContext?.setTotal(total);
      const checkedItems:{ [key: string]: boolean } = {}
      newItems.forEach((item:CartItem) =>{checkedItems[`${item.id}`]=true})
      setCheckedItems(checkedItems);
      setPages(Array.from({length: Math.ceil(newItems.length/4)}, (_, i) => i+1));
    }
  }
  const reduceItem = async (item:CartItem)=>{
    const response = await api.patch(`/customers/cart/update/quantity`, {productId: item.product.id, quantity: -1})
    console.log(response.data);
    setTotal(total-item.product.price);
    setCartItems(cartItems.map((cartItem)=>cartItem.id===item.id? {...cartItem, quantity: cartItem.quantity-1, total: cartItem.total-item.product.price}: cartItem));
    cartItemsContext?.setTotal(total-item.product.price);
  }
  const addItem = async (item:CartItem)=>{
    console.log({productId: item.product.id, quantity: item.quantity+1})
    const response = await api.patch(`/customers/cart/update/quantity`, {productId: item.product.id, quantity: 1})
    console.log(response.data);
    setCartItems(cartItems.map((cartItem)=>cartItem.id===item.id? {...cartItem, quantity: cartItem.quantity+1, total: cartItem.total+item.product.price}: cartItem));
    setTotal(total+item.product.price);
    cartItemsContext?.setTotal(total+item.product.price);
    }
  
  if(!user) return;
  if(!cartItems) return <div>Loading...</div>

  return <>
    <div className="cart-Container ">
      <div className="cart-Items">
        <h2 className="cart-Header">Shopping Cart</h2>
        <div>
          {cartItems.map((item, index) => {
            if(index<4*(currentPage-1) || index>=4*currentPage) return null;
            return (
            <div className="item-Container" key={index}>
              <div className="w-[300px]">
              <input className="mx-2" id={`${item.product.price}-${item.id}`} name="cart" onChange={onCheck} type="checkbox" checked={checkedItems[`${item.id}`]}></input>
              <img className="img" src={item.product.images[0]} alt={item.product.name} /></div>
              <div className="item-Details">
                <h3>{item.product.name}</h3>
                <p>{item.product.description}</p>
                <div className="flex items-center">
                  <div className="item-Quantity-Controller">
                    {item.quantity===1 && <i onClick={()=>deleteItem(item.id)} className="fa-solid fa-trash cursor-pointer"></i>}
                    {item.quantity>=2 &&<i onClick={()=>reduceItem(item)} className="fa-solid fa-minus cursor-pointer"></i>}
                    <span>{item.quantity}</span>
                    <i onClick={()=>addItem(item)} className="fa-solid fa-plus cursor-pointer"></i>
                  </div>
                  <button onClick={()=>deleteItem(item.id)} className="px-2.5 ml-2.5 border-l-2 border-white h-fit hover:underline">delete</button>
                </div>
              </div>
              <div style={{fontWeight: "700"}}>${item.total}</div>
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
        <div>Subtotal ({cartItems.length} items): <span>${total}</span></div>
        <button className="hover:bg-[#ffc505]" onClick={()=>nagivate("/checkout")}>Proceed to checkout</button>
      </div>
    </div>
  </>;
}
