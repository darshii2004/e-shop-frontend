import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <>
      <div className="w-full h-[380px] bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt="Product"
            className="w-full h-[170px] object-contain rounded-t-xl"
          />
        </Link>

        <div className="px-4 py-4 w-full">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <span className="text-blue-400 mr-3 cursor-pointer capitalize text-sm">
              Shop Name : {data?.shop?.name}
            </span>
          </Link>
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            <p className="text-lg font-bold text-black truncate block capitalize">
              {data.name.length > 40
                ? data.name.slice(0, 40) + "..."
                : data.name}
            </p>
          </Link>
          <div className="line-clamp-2">{data.description}</div>
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
          >
            <button className="text-sm text-blue-400">More</button>
          </Link>
          <div className="flex items-center  my-1">
            <p className="text-lg font-semibold text-black cursor-default ">
              ${" "}
              {data.originalPrice === 0
                ? data.originalPrice
                : data.discountPrice}
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-default ml-2">
                {data.originalPrice ? data.originalPrice + " $" : null}
              </p>
            </del>
            <div className="ml-auto cursor-default font-semibold text-blue-400">
              {data?.sold_out} sold
            </div>
          </div>
          <div className="flex w-full justify-start gap-2">
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer"
                onClick={() => removeFromWishlistHandler(data)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursor-pointer"
                onClick={() => addToWishlistHandler(data)}
                color={click ? "red" : "#333"}
                title="Add to wishlist"
              />
            )}
            <AiOutlineEye
              size={22}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
              color="#333"
              title="Quick view"
            />
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer"
              onClick={() => addToCartHandler(data._id)}
              color="#444"
              title="Add to cart"
            />
          </div>
        </div>
      </div>
      {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
    </>
  );
};

export default ProductCard;
