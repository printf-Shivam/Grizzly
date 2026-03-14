import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/features/cart';
import { fetchUserDetails } from '../../api/userInfo';
import { setLoading } from '../../store/features/common';
import { createOrder } from "../../api/order";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const subTotal = useMemo(() => {
    let value = 0;
    cartItems?.forEach(element => {
      value += element?.subTotal
    });
    return value?.toFixed(2);
  }, [cartItems]);

  useEffect(() => {
    dispatch(setLoading(true))
    fetchUserDetails()
      .then(res => {
        setUserInfo(res);
      })
      .catch(err => {

      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }, [dispatch]);

  const handlePlaceOrder = async () => {
    console.log("PLACE ORDER CLICKED");
    try {
      dispatch(setLoading(true));
  
      const payload = {
        addressId: userInfo?.addressList?.[0]?.id,
        paymentMethod: paymentMethod,
        totalAmount: Number(subTotal),
        orderDate: new Date(),
        discount: 0,
        expectedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        orderItemRequests: cartItems.map((item) => ({
          productId: item?.productId,
          productVariantId: item?.variant?.id,
          quantity: item?.quantity
        }))
      };
  
      console.log("Sending order request...");

      const res = await createOrder(payload);

      console.log("Order response:", res);
  
      console.log("Order created:", res);
  
      alert("Order placed successfully!");
  
      navigate("/");
  
    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
  
      {/* LEFT SECTION */}
      <div className="lg:col-span-2 space-y-8">
  
        {/* Address */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="font-semibold text-lg mb-3">Delivery Address</p>
  
          {userInfo?.addressList && (
            <div className="text-gray-600">
              <p className="font-medium">{userInfo?.addressList?.[0]?.name}</p>
              <p>{userInfo?.addressList?.[0]?.street}</p>
              <p>
                {userInfo?.addressList?.[0]?.city},{" "}
                {userInfo?.addressList?.[0]?.state}{" "}
                {userInfo?.addressList?.[0]?.zipCode}
              </p>
            </div>
          )}
        </div>

  
        {/* Payment */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="font-semibold text-lg mb-4">Payment Method</p>
  
          <div className="space-y-3">
  
            <label className="flex gap-3 items-center">
              <input
                type="radio"
                name="payment_method"
                onChange={() => setPaymentMethod("CARD")}
              />
              Credit/Debit Card
            </label>
  
            <label className="flex gap-3 items-center">
              <input
                type="radio"
                name="payment_method"
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery
            </label>
  
            <label className="flex gap-3 items-center">
              <input
                type="radio"
                name="payment_method"
                onChange={() => setPaymentMethod("UPI")}
              />
              UPI / Wallet
            </label>
  
          </div>
        </div>
  
      </div>
  
  
      {/* RIGHT SECTION */}
      <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-24">
  
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
  
        <div className="flex justify-between mb-2">
          <p>Items</p>
          <p>{cartItems?.length}</p>
        </div>
  
        <div className="flex justify-between mb-2">
          <p>Subtotal</p>
          <p>${subTotal}</p>
        </div>
  
        <div className="flex justify-between mb-2">
          <p>Shipping</p>
          <p className="text-green-600">FREE</p>
        </div>
  
        <hr className="my-4" />
  
        <div className="flex justify-between text-lg font-semibold">
          <p>Total</p>
          <p>${subTotal}</p>
        </div>
  
        <button
          disabled={!paymentMethod}
          onClick={handlePlaceOrder}
          className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
        >
          Place Order
        </button>
  
      </div>
  
    </div>
  );
}

export default Checkout