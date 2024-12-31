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
    //TODO: fill in product lists with backend API calls
    axios.get("https://fakestoreapi.com/products?limit=10")
    .then((response)=>{
      setFeatured(response.data)
      setPopular(response.data)
      setForYou(response.data)
    })
  }, [])

  const listItems = (itemList:Item[]) => {
    return(
      <div className="flex flex-nowrap overflow-auto">
        {itemList.map((item:Item, index:number) => (
          <div key = {index} className="m-4 flex-none">
            <img src={item.image} alt={item.title} className="w-48 h-48"/>
            <p className="w-48">{item.title}</p>
            <p className="w-48">${item.price}</p>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div>
      {/* hero section */}
      <div>
        {/* image of some sort promoting deal, perhaps a carousel? */}
      </div>
      

      {/* Product Lists */}
      <div className="flex flex-col w-full mx-auto">
        <h3>Featured</h3>
        {listItems(featured)}
      </div>
      <div className="flex flex-col w-full mx-auto">
        <h3>Popular</h3>
        <div className="flex flex-row flex-nowrap overflow-auto">
          {listItems(popular)}
        </div>
      </div>
      <div className="flex flex-col w-full mx-auto">
        <h3>For You</h3>
        {listItems(forYou)}
      </div>
    </div>
  );
}
