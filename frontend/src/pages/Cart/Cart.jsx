import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/cart'
import { NumberInput } from '../../components/NumberInput/Numberinput';
import { deleteItemFromCartAction, updateItemToCartAction } from '../../store/actions/cartAction';
import DeleteIcon from '../../components/common/DeleteIcon';
import Modal from 'react-modal';
import { Link,useNavigate } from 'react-router-dom';
import { customStyles } from '../../styles/modal';
import { isTokenValid } from '../../utils/jwt-helper';

const headers = [
  "Product","Price","Quantity","Shipping","SubTotal","Action"
];

const Cart = () => {

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteItem,setDeleteItem] = useState({});
    const navigate = useNavigate();

    const onChangeQuantity = useCallback((value,productId,variantId)=>{

      dispatch(updateItemToCartAction({
          productId:productId,
          variant_id:variantId,
          quantity: value
      }))

    },[dispatch]);

    const onDeleteProduct= useCallback((productId,variantId)=>{
      setModalIsOpen(true);
      setDeleteItem({
          productId:productId,
          variantId : variantId
      })
    },[]);

    const onCloseModal = useCallback(()=>{
      setDeleteItem({});
      setModalIsOpen(false);
    },[]);

    const onDeleteItem= useCallback(()=>{
      dispatch(deleteItemFromCartAction(deleteItem));
      setModalIsOpen(false);
    },[deleteItem, dispatch]);

    const subTotal = useMemo(()=>{
      let value = 0;
      cartItems?.forEach(element => {
         value += element?.subTotal
      });
      return value?.toFixed(2);
    },[cartItems]);

    const isLoggedIn = isTokenValid();

    return (
      <>
      <div className='max-w-6xl mx-auto p-6'>

        {/* Cart Items */}
        {cartItems?.length > 0 && (
          <>
          <h1 className='text-2xl font-bold mb-6'>Shopping Cart</h1>

          <div className='overflow-x-auto shadow-lg rounded-lg'>
          <table className='w-full text-sm bg-white'>
              <thead className='bg-gray-900 text-white'>
                  <tr>
                      {headers?.map(header=> (
                              <th key={header} className='px-6 py-4 text-left font-medium'>
                                  {header}
                              </th>
                      ))}
                  </tr>
              </thead>

              <tbody>
                  {cartItems?.map((item,index)=>(
                      <tr key={index} className='border-b hover:bg-gray-50 transition'>

                          {/* Product */}
                          <td className='p-4'>
                              <div className='flex items-center gap-4'>
                                  <img
                                    src={item?.thumbnail}
                                    alt={'product-'+index}
                                    className='w-24 h-24 object-cover rounded-md border'
                                  />

                                  <div className='text-sm text-gray-700'>
                                      <p className='font-semibold'>{item?.name}</p>
                                      <p>Size : {item?.variant?.size}</p>
                                      <p>Color : {item?.variant?.color}</p>
                                  </div>
                              </div>
                          </td>

                          {/* Price */}
                          <td className='text-center font-medium'>
                              ${item?.price}
                          </td>

                          {/* Quantity */}
                          <td className='text-center'>
                              <NumberInput
                                max={2}
                                quantity={item?.quantity}
                                onChangeQuantity={(value)=>
                                  onChangeQuantity(value,item?.productId,item?.variant?.id)
                                }
                              />
                          </td>

                          {/* Shipping */}
                          <td className='text-center text-green-600 font-medium'>
                              FREE
                          </td>

                          {/* Subtotal */}
                          <td className='text-center font-semibold'>
                              ${item?.subTotal}
                          </td>

                          {/* Delete */}
                          <td className='text-center'>
                              <button
                                className='p-2 rounded hover:bg-red-100 transition'
                                onClick={()=> onDeleteProduct(item?.productId,item?.variant?.id)}
                              >
                                  <DeleteIcon />
                              </button>
                          </td>

                      </tr>
                  ))}
              </tbody>
          </table>
          </div>

          {/* Bottom Section */}
          <div className='grid md:grid-cols-2 gap-10 mt-10'>

              {/* Coupon */}
              <div className='bg-white shadow-md rounded-lg p-6'>
                  <p className='text-lg font-semibold'>Discount Coupon</p>
                  <p className='text-sm text-gray-500 mb-3'>
                    Enter your coupon code
                  </p>

                  <div className='flex gap-2'>
                      <input
                        type='text'
                        placeholder='Coupon code'
                        className='border rounded px-3 py-2 w-40 focus:outline-none focus:ring'
                      />

                      <button className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800'>
                          Apply
                      </button>
                  </div>
              </div>

              {/* Cart Total */}
              <div className='bg-white shadow-md rounded-lg p-6'>

                  <h2 className='text-lg font-semibold mb-4'>
                      Cart Totals
                  </h2>

                  <div className='flex justify-between mb-2'>
                      <p>Subtotal</p>
                      <p>${subTotal}</p>
                  </div>

                  <div className='flex justify-between mb-2'>
                      <p>Shipping</p>
                      <p>$0</p>
                  </div>

                  <hr className='my-3'/>

                  <div className='flex justify-between font-bold text-lg'>
                      <p>Total</p>
                      <p>${subTotal}</p>
                  </div>

                  {isLoggedIn && (
                    <button
                      onClick={()=> navigate("/checkout")}
                      className='w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition'
                    >
                      Checkout
                    </button>
                  )}

                  {!isLoggedIn && (
                    <Link
                      to={"/v1/login"}
                      className='block text-center mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800'
                    >
                      Login to Checkout
                    </Link>
                  )}

              </div>

          </div>
          </>
        )}

        {/* Empty Cart */}
        {!cartItems?.length && (
          <div className='text-center py-20'>
              <h2 className='text-3xl font-bold mb-4'>
                Your cart is empty
              </h2>

              <p className='text-gray-500 mb-6'>
                Looks like you haven't added anything yet.
              </p>

              <Link
                to={"/"}
                className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800'
              >
                Continue Shopping
              </Link>
          </div>
        )}

      </div>

      {/* Delete Modal */}
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={onCloseModal}
          style={customStyles}
          contentLabel="Remove Item"
      >
        <p className='text-lg font-medium mb-4'>
          Are you sure you want to remove this item?
        </p>

        <div className='flex justify-end gap-4'>
          <button
            className='px-4 py-2 border rounded'
            onClick={onCloseModal}
          >
            Cancel
          </button>

          <button
            className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
            onClick={onDeleteItem}
          >
            Remove
          </button>
        </div>

      </Modal>

      </>
    )
}

export default Cart