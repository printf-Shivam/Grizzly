import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/features/cart';
import { fetchUserDetails } from '../../api/userInfo';
import { setLoading } from '../../store/features/common';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');


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
    try {
      dispatch(setLoading(true));
  
      const payload = {
        addressId: userInfo?.addressList?.[0]?.id,
        paymentMethod: paymentMethod,
      };
  
      console.log("Order payload:", payload);
  
      // call backend 
      // await createOrder
  
      alert("Order placed successfully!");
  
    } catch (err) {
      console.error(err);
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
  
        {/* Delivery */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="font-semibold text-lg mb-4">Choose Delivery</p>
  
          <p className="text-gray-500 mb-3">Select a day</p>
  
          <div className="flex gap-4">
            <button className="px-5 py-2 border rounded-lg hover:bg-gray-100">
              Oct 5
            </button>
  
            <button className="px-5 py-2 border rounded-lg hover:bg-gray-100">
              Oct 8
            </button>
          </div>
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