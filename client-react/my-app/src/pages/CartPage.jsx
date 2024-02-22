
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleCart, removeOrder } from '../redux/product/orderSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { isOpenCart, orders } = useSelector((state) => state.neworders)
    const dispatch = useDispatch()
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    useEffect(() => {
        let total;
        total = orders.map((item) => item.price).reduce((acc, curr) => acc + curr, 0)
        setSubtotal(total)
        let tax;
        tax = total / 100 * 5
        setTax(tax)
        console.log(subtotal)
    }, [orders])
    console.log(subtotal)

    return (
        <>
            <div>
                {isOpenCart && (
                    <div className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden  sticky-0" id="chec-div"> {/*fixed */}
                        <div className="w-full absolute z-50 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                            <div className="flex md:flex-row flex-col justify-end" id="cart">
                                <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                                    <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer" onClick={() => dispatch(handleCart())}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <polyline points="15 6 9 12 15 18" />
                                        </svg>
                                        <p onClick={() => dispatch(handleCart())} className="text-sm pl-2 leading-none">Back</p>
                                    </div>
                                    <p className="text-5xl font-black leading-10 text-gray-600 pt-3">Your Cart</p>
                                    {
                                        orders.length >0 ? orders.map((order) => {
                                            return (
                                                <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                                                    <div className="w-1/4">
                                                        <img src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg" alt className="w-full h-full object-center object-cover" />
                                                    </div>
                                                    <div className="md:pl-3 md:w-3/4">
                                                        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
                                                        <div className="flex items-center justify-between w-full pt-1">
                                                            <p className="text-base font-black leading-none text-gray-800">{order.productName}</p>
                                                            {/* <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                                                                <option>01</option>
                                                                <option>02</option>
                                                                <option>03</option>
                                                            </select> */}
                                                        </div>
                                                        <p className="text-xs leading-3 text-gray-600 pt-2">Color: {order.productColor}</p>
                                                        <p className="text-xs leading-3 text-gray-600 py-4">Size: {order.productSize}</p>
                                                        <p className="text-xs leading-3 text-gray-600 py-4">Quantity: {order.quantity}</p>
                                                        <p className="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p>
                                                        <div className="flex items-center justify-between pt-5 pr-6">
                                                            <div className="flex itemms-center">
                                                                <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                                                                <p onClick={()=>dispatch(removeOrder(order.orderId))} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" >Remove</p>
                                                            </div>
                                                            <p className="text-base font-black leading-none text-gray-800">{order.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : <h3 className="my-5">Your cart is empty</h3>
                                    }


                                </div>
                                <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                                    <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                                        <div>
                                            <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                                            <div className="flex items-center justify-between pt-16">
                                                <p className="text-base leading-none text-gray-800">Subtotal</p>
                                                <p className="text-base leading-none text-gray-800">$ {subtotal}</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-gray-800">Shipping</p>
                                                <p className="text-base leading-none text-gray-800">$30</p>
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <p className="text-base leading-none text-gray-800">Tax</p>
                                                <p className="text-base leading-none text-gray-800">$ {tax}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                                <p className="text-2xl leading-normal text-gray-800">Total</p>
                                                <p className="text-2xl font-bold leading-normal text-right text-gray-800">$10,240</p>
                                            </div>
                                            <Link to="/checkout">
                                                <button onClick={() => dispatch(handleCart())} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                                    Checkout
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default CartPage