import axios from "axios";
import { useEffect, useState } from "react";
import "./cart-page.css";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";

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
  name: number;
  price: number;
  quantity: number;
  tags: number;
}
export default function CartPage() {
  const nagivate = useNavigate();;
  const [quantity, setQuantity] = useState<number>(2);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
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
        const checkedItems:{ [key: string]: boolean } = {}
        res.data.forEach((item:FakeItem) =>{checkedItems[`${item.id}`]=true})
        setCheckedItems(checkedItems);
        setPages(Array.from({length: Math.ceil(res.data.length/4)}, (_, i) => i+1));
        console.log(pages)
    })
      .catch((err)=>console.log(err));

      const response = await api.get<Cart>('/customers/cart/');
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
    console.log(checkedItems, checkedItems[id])
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
  const deleteItem = async(id:number)=>{
    const response = await api.delete(`/customers/cart/RemoveItem/${id}`)
    if(response.status === 200){
      const newItems = items.filter((item)=>item.id!==id);
      setItems(newItems);
      setTotal(newItems.reduce((acc:number, item:FakeItem) => acc + item.price, 0));
      const checkedItems:{ [key: string]: boolean } = {}
      newItems.forEach((item:FakeItem) =>{checkedItems[`${item.id}`]=true})
      setCheckedItems(checkedItems);
      setPages(Array.from({length: Math.ceil(newItems.length/4)}, (_, i) => i+1));
    }
  }
  const reduceItem = ()=>{setQuantity(quantity-1)}
  const addItem = ()=>{setQuantity(quantity+1)}
  

  return <>
    <div className="cart-Container ">
      <div className="cart-Items">
        <h2 className="cart-Header">Shopping Cart</h2>
        <div>
          {items.map((item, index) => {
            if(index<4*(currentPage-1) || index>=4*currentPage) return null;
            return (
            <div className="item-Container" key={index}>
              <input className="mx-2" id={`${item.price}-${item.id}`} name="cart" onChange={onCheck} type="checkbox" checked={checkedItems[`${item.id}`]}></input>
              <img className="img" src={item.image} alt={item.title} />
              <div className="item-Details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="flex items-center">
                  <div className="item-Quantity-Controller">
                    {quantity===1 && <i onClick={()=>deleteItem(item.id)} className="fa-solid fa-trash cursor-pointer"></i>}
                    {quantity>=2 &&<i onClick={reduceItem} className="fa-solid fa-minus cursor-pointer"></i>}
                    <span>{quantity}</span>
                    <i onClick={addItem} className="fa-solid fa-plus cursor-pointer"></i>
                  </div>
                  <button className="px-2.5 ml-2.5 border-l-2 border-white h-fit hover:underline">delete</button>
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
        <button className="hover:bg-[#ffc505]" onClick={()=>nagivate("/checkout")}>Proceed to checkout</button>
      </div>
    </div>
  </>;
}
