import axios from 'axios';
import { useState } from 'react';
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {

  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const updateCartQuantity = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: Number(quantity)
    });
    await loadCart();
  }

  const handleKeyDownEvent = (event) => {
    if (event.key === "Enter") {
      updateCartQuantity();
      setIsUpdatingQuantity(!isUpdatingQuantity);
    }
    else if(event.key==='Escape'){
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(!isUpdatingQuantity);
    }
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {isUpdatingQuantity ?
              <input
                type="text"
                className="quantity-textbox"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
                onKeyDown={handleKeyDownEvent}
              />
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={() => {
              if (isUpdatingQuantity) {
                updateCartQuantity();
                setIsUpdatingQuantity(!isUpdatingQuantity);
              }
              else {
                setIsUpdatingQuantity(true);
              }

            }}>
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}