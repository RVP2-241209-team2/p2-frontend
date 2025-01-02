import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Item{
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

export default function HomePage() {
  const [featured, setFeatured] = useState<Item[]>([])
  const [popular, setPopular] = useState<Item[]>([])
  const [forYou, setForYou] = useState<Item[]>([])

  useEffect(() => {
    loadItems()
  }, [])

  const nav = useNavigate()

  const loadItems = async () => {
    await axios.get("https://fakestoreapi.com/products?limit=10")
    .then((response)=>{
      setFeatured(response.data)
      setPopular(response.data)
      setForYou(response.data)
    })
  }

  const navToItem = async (id:number) => {
      nav("products/"+id)
  }

  const listItems = (itemList:Item[]) => {
    return(
      <div className="flex flex-nowrap overflow-auto gap-2">
        {itemList.map((item:Item, index:number) => (
          <div key = {index} className="flex-none bg-slate-100 rounded-lg p-2 " onClick={() => {navToItem(item.id)}}>
            <img src={item.image} alt={item.title} className="w-48 h-48"/>
            <p className="w-48">{item.title}</p>
            <p className="w-48">${item.price}</p>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div className="bg-white p-4">
      {/* hero section */}
      <div>
        <img src="../landing-hero-example.png"/>
      </div>
      

      {/* Product Lists */}
      <div className="flex flex-col w-full mx-auto ">
        <p className="text-2xl font-bold py-4">Featured</p>
        {listItems(featured)}
      </div>
      <div className="flex flex-col w-full mx-auto">
        <p className="text-2xl font-bold py-4">Popular</p>
        {listItems(popular)}
      </div>
      <div className="flex flex-col w-full mx-auto">
        <p className="text-2xl font-bold py-4">For You</p>
        {listItems(forYou)}
      </div>
    </div>
  );
}
