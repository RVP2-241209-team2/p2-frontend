import { useContext, useEffect, useState } from "react";
import "./cart-page.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import { CartItemsContext } from "./CartItemsProvider";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";
import { ConfirmationModal } from "../../components/main/modal";

export interface Cart {
  id: string;
  cartItems: CartItem[];
  total: number;
}
export interface CartItem {
  id: string;
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
export interface ProductTag {
  id: string;
  product: Product;
  tag: Tag;
}
export interface Tag {
  id: string;
  name: string;
  productTags: ProductTag[];
}

export default function CartPage() {
  const { user } = useAuth();
  const cartItemsContext = useContext(CartItemsContext);
  console.log(cartItemsContext?.total);
  const nagivate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price, 0);
  });
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      nagivate("/login");
    }
    // fetch cart items
    const cartItems = async () => {
      const response = await api.get("/customers/cart/items");
      console.log(response.data);
      setCartItems(response.data);
      cartItemsContext?.setTotal(
        response.data.reduce(
          (acc: number, item: CartItem) => acc + item.product.price,
          0
        )
      );
      cartItemsContext?.setCartItems(response.data);
      setTotal(
        response.data.reduce(
          (acc: number, item: CartItem) => acc + item.product.price,
          0
        )
      );
      const checkedItems: { [key: string]: boolean } = {};
      response.data.forEach((item: CartItem) => {
        checkedItems[`${item.id}`] = true;
      });
      setCheckedItems(checkedItems);
      setPages(
        Array.from(
          { length: Math.ceil(response.data.length / 4) },
          (_, i) => i + 1
        )
      );
    };
    cartItems();
  }, []);

  const onPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.textContent);
    setCurrentPage(Number(e.currentTarget.textContent));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const prevNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (e.currentTarget.textContent === "Next") {
      setCurrentPage(currentPage + 1);
    } else if (e.currentTarget.textContent === "Previous") {
      setCurrentPage(currentPage - 1);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  const onCheck = (e:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(cartItems, e.target.id);
    const itemId = e.currentTarget.id;
    const isChecked = e.target.checked;
    console.log(checkedItems[itemId],itemId, isChecked, checkedItems)
    setCheckedItems(prevState => ({
      ...prevState,
      [itemId]: isChecked
    }));
    const item = cartItems.find(item => item.id === itemId);
    if(isChecked){
      setTotal(total + Number(item?.product.price));
        cartItemsContext?.setTotal(total + Number(item?.product.price));
    }else{
      setTotal(total - Number(item?.product.price));
        cartItemsContext?.setTotal(total - Number(item?.product.price));
  };


  const handleClearCart = async () => {
    try {
      const response = await api.delete("/customers/cart/clear");

      if (response.status === 200) {
        setCartItems([]);
        setTotal(0);
        cartItemsContext?.setCartItems([]);
        cartItemsContext?.setTotal(0);
        setCheckedItems({});
        setPages([1]);

        toast.success(
          <div className="flex flex-col gap-2">
            <p>Cart cleared successfully</p>
            <Link
              to="/products"
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Continue shopping
            </Link>
          </div>
        );
      }
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error("Clear cart error:", error);
    }
  }

  const deleteItem = async (id: string) => {
    // Optimistically update UI
    const previousItems = [...cartItems];
    const newItems = cartItems.filter((item) => item.id !== id);
    const newTotal = newItems.reduce(
      (acc, item) => acc + item.product.price,
      0
    );

    // Update UI immediately
    setCartItems(newItems);
    setTotal(newTotal);
    cartItemsContext?.setCartItems(newItems);
    cartItemsContext?.setTotal(newTotal);

    try {
      const response = await api.delete(`/customers/cart/remove/${id}`);

      if (response.status === 200) {
        toast.success(
          <div className="flex flex-col gap-2">
            <p>Item removed from cart</p>
            <Link
              to="/products"
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Continue shopping
            </Link>
          </div>
        );

        // Update pagination
        setPages(
          Array.from(
            { length: Math.ceil(newItems.length / 4) },
            (_, i) => i + 1
          )
        );

        // Update checked items
        const updatedCheckedItems = { ...checkedItems };
        delete updatedCheckedItems[id];
        setCheckedItems(updatedCheckedItems);
      }
    } catch (error) {
      // Revert changes on error
      setCartItems(previousItems);
      setTotal(
        previousItems.reduce((acc, item) => acc + item.product.price, 0)
      );
      cartItemsContext?.setCartItems(previousItems);
      cartItemsContext?.setTotal(
        previousItems.reduce((acc, item) => acc + item.product.price, 0)
      );

      toast.error(
        <div className="flex flex-col gap-2">
          <p>Failed to remove item from cart</p>
          <p className="text-sm text-gray-500">Please try again</p>
        </div>
      );

      console.error("Cart delete error:", {
        error,
        itemId: id,
        status: (error as any).response?.status,
      });
    }
  };

  const reduceItem = async (item: CartItem) => {
    const response = await api.patch(`/customers/cart/update/quantity`, {
      productId: item.product.id,
      quantity: -1,
    });
    console.log(response.data);
    setTotal(total - item.product.price);
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
              total: cartItem.total - item.product.price,
            }
          : cartItem
      )
    );
    cartItemsContext?.setTotal(total - item.product.price);
  };

  const addItem = async (item: CartItem) => {
    console.log({ productId: item.product.id, quantity: item.quantity + 1 });
    const response = await api.patch(`/customers/cart/update/quantity`, {
      productId: item.product.id,
      quantity: 1,
    });
    console.log(response.data);
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              total: cartItem.total + item.product.price,
            }
          : cartItem
      )
    );
    setTotal(total + item.product.price);
    cartItemsContext?.setTotal(total + item.product.price);
  };

  if (!user) return;
  if (!cartItems) return <div>Loading...</div>;

  return (
    <>
      <div className="cart-Container ">
        <div className="cart-Items">
          <div className="cart-Header">
            <h2>Shopping Cart</h2>
            <div className="text-[grey] text-[15px] text-end">Price</div>
          </div>
          <div>
            {cartItems.map((item, index) => {
              if (index < 4 * (currentPage - 1) || index >= 4 * currentPage)
                return null;
              return (
                <div className="item-Container" key={index}>
                  <div className="w-[300px]">
                    <input
                      className="mx-2"
                      id={`${item.id}`}
                      name="cart"
                      onChange={onCheck}
                      type="checkbox"
                      checked={checkedItems[`${item.id}`]}
                    ></input>
                    <img
                      className="img"
                      src={item.product.images[0]}
                      alt={item.product.name}
                    />
                  </div>
                  <div className="item-Details">
                    <h3>{item.product.name}</h3>
                    <p>{item.product.description}</p>
                    <div className="flex items-center">
                      <div className="item-Quantity-Controller">
                        {item.quantity === 1 && (
                          <i
                            onClick={() => deleteItem(item.id)}
                            className="fa-solid fa-trash cursor-pointer"
                          ></i>
                        )}
                        {item.quantity >= 2 && (
                          <i
                            onClick={() => reduceItem(item)}
                            className="fa-solid fa-minus cursor-pointer"
                          ></i>
                        )}
                        <span>{item.quantity}</span>
                        <i
                          onClick={() => addItem(item)}
                          className="fa-solid fa-plus cursor-pointer"
                        ></i>
                      </div>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="px-2.5 ml-2.5 border-l-2 border-white h-fit hover:underline"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                  <div style={{ fontWeight: "700" }}>${item.total}</div>
                </div>
              );
            })}
          </div>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a onClick={prevNav} className="page-link" href="#">
                Previous
              </a>
            </li>
            {pages.length > 0 &&
              pages.map((page, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    page === currentPage ? "active" : ""
                  }`}
                >
                  <a onClick={onPage} className="page-link" href="#">
                    {page}
                  </a>
                </li>
              ))}
            {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li> */}
            <li
              className={`page-item ${
                currentPage === pages.length ? "disabled" : ""
              }`}
            >
              <a onClick={prevNav} className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </div>
        <div className="cart-Checkout">
          <div>
            Subtotal ({cartItems.length} items): <span>${total}</span>
          </div>
          <button
            className="hover:bg-[#ffc505]"
            onClick={() => nagivate("/checkout")}
          >
            Proceed to checkout
          </button>
          {cartItems.length > 0 && (
            <button
              className="hover:bg-[#ffc505]"
              onClick={() => setShowModal(true)}
            >
              Clear cart
            </button>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Clear Shopping Cart"
        description="This will remove all items from your cart. This action cannot be undone."
        primaryAction={{
          label: "Clear Cart",
          onClick: handleClearCart,
          variant: "danger",
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => setShowModal(false),
        }}
      />
    </>
  );
}
