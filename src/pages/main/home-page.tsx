import axios from "axios";
import { useEffect, useState } from "react";

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
    /*
    axios.get("https://fakestoreapi.com/products?limit=10")
    .then((response)=>{
      setFeatured(response.data)
      setPopular(response.data)
      setForYou(response.data)
    })
    */

    let dummyList:Item[] = []

    for(let i = 0; i < 9; i++){
      dummyList.push(
        {
          id: 1,
          title: "example",
          price: 10.50,
          category: "cat",
          description: "desc",
          rating: {
            rate: 5,
            count: 21
          },
          image: ""
        }
      )
    }

    setFeatured(dummyList)
  }, [])

  const listItems = (itemList:Item[]) => {
    return(
      <div className="flex flex-nowrap overflow-auto gap-2">
        {itemList.map((item:Item, index:number) => (
          <div key = {index} className="flex-none bg-slate-100 rounded-lg p-2 ">
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
        {listItems(featured)}
      </div>
      <div className="flex flex-col w-full mx-auto">
        <p className="text-2xl font-bold py-4">For You</p>
        {listItems(featured)}
      </div>
    </div>
  );
}
