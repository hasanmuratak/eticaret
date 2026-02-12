"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../cart/redux/cartSlice";
import styles from "./cart.module.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items || []);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Sepetim</h2>

      {cart.length === 0 ? (
        <div className={styles.empty}>Sepetiniz boş — alışverişe başlayın!</div>
      ) : (
        <div className={styles.content}>
          <div className={styles.list}>
            {cart.map((item) => (
              <div key={item.id} className={styles.card}>
                {item.image ? (
                  <img src={item.image} alt={item.title} className={styles.thumb} />
                ) : (
                  <div className={styles.thumbPlaceholder} />
                )}

                <div className={styles.details}>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.price}>{item.price.toFixed(2)} $</div>
                  <div className={styles.qtyControls}>
                    <button className={styles.qtyBtn} onClick={() => dispatch(decreaseQty(item.id))} aria-label="Azalt">-</button>
                    <span className={styles.qty}>{item.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => dispatch(increaseQty(item.id))} aria-label="Arttır">+</button>
                    <button className={styles.remove} onClick={() => dispatch(removeFromCart(item.id))}>Sepetten Sil</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className={styles.summary}>
            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}><span>Ara Toplam</span><strong>{totalPrice.toFixed(2)} $</strong></div>
              <button className={styles.checkoutBtn}>Ödeme</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;