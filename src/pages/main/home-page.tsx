import { useEffect, useState } from "react";

interface Item {
  name:string,
  seller:string,
  price:number,
  rating:number
}

export default function HomePage() {
  const [featured, setFeatured] = useState<Item[]>([
    {
      name:"example1",
      seller:"seller1",
      price:10.50,
      rating:4.5
    },
    {
      name:"example2",
      seller:"seller1",
      price:10.50,
      rating:4.5
    },
    {
      name:"example3",
      seller:"seller2",
      price:10.50,
      rating:4.5
    },
    {
      name:"example2",
      seller:"seller1",
      price:10.50,
      rating:4.5
    },
    {
      name:"example2",
      seller:"seller1",
      price:10.50,
      rating:4.5
    },
    {
      name:"example2",
      seller:"seller1",
      price:10.50,
      rating:4.5
    },
    {
      name:"example2",
      seller:"seller1",
      price:10.50,
      rating:4.5
    }
  ])
  const [popular, setPopular] = useState<Item[]>([
    {
      name:"popular1",
      seller:"seller1",
      price:10.50,
      rating:4.5
    }
  ])
  const [forYou, setForYou] = useState<Item[]>([
    {
      name:"foryou1",
      seller:"seller1",
      price:10.50,
      rating:4.5
    }
  ])

  useEffect(() => {
    //TODO: fill in product lists with backend API calls
  }, [])
  
  return (
    <div>
      {/* hero section */}
      <div>
        {/* image of some sort promoting deal, perhaps a carousel? */}
      </div>
      

      {/* Product Lists */}
      <div className="flex flex-col w-full mx-auto">
        <h3>Featured</h3>
        <div className="flex flex-nowrap overflow-x-auto">
          {featured.map((item:Item, index:number) => (
            <div key = {index} className="m-4 flex-none">
              {/* TODO: replace this with a standardized product component later */}
              <p>{item.name}</p>
              <p>By {item.seller}</p>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full mx-auto">
        <h3>Popular</h3>
        <div className="flex flex-row flex-nowrap overflow-auto">
          {popular.map((item:Item, index:number) => (
            <div key = {index} className="m-4 flex-none">
              {/* TODO: replace this with a standardized product component later */}
              <p>{item.name}</p>
              <p>By {item.seller}</p>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full mx-auto">
        <h3>For You</h3>
        <div className="flex flex-row flex-nowrap overflow-auto"> {/* ask how i can get this to scroll */}
          {forYou.map((item:Item, index:number) => (
            <div key = {index} className="m-4 flex-none">
              {/* TODO: replace this with a standardized product component later */}
              <p>{item.name}</p>
              <p>By {item.seller}</p>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
