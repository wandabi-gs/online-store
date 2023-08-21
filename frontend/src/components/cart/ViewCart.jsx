import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchUserCart } from '../../query/cart'
import { MEDIA_URL } from '../../backend'
import { addCart, reduceCart, removeCart } from '../../mutation/cart'
import { invalidateQuery } from '../../main'
import Loader from '../utils/Loader'

function ViewCart() {

    const [loading, setLoading] = useState(false)

    const { data: cart } = useQuery("userCart", fetchUserCart)

    const { mutate: addCartMutate } = useMutation(addCart, {
        onSuccess: () => {
            invalidateQuery("userCart")
            setLoading(false)
        }
    })
    const handleAddCart = (uid) => (event) => {
        setLoading(true)
        addCartMutate(uid)
    }

    const { mutate: reduceCartMutate } = useMutation(reduceCart, {
        onSuccess: () => {
            invalidateQuery("userCart")
            setLoading(false)
        }
    })
    const handleReduceCart = (uid) => (event) => {
        setLoading(true)
        reduceCartMutate(uid)
    }

    const { mutate: removeCartMutate } = useMutation(removeCart, {
        onSuccess: () => {
            invalidateQuery("userCart")
            setLoading(false)
        }
    })
    const handleRemoveCart = (uid) => (event) => {
        setLoading(true)
        removeCartMutate(uid)
    }

    const { mutate: clearCartMutate } = useMutation(addCart, {
        onSuccess: () => {
            invalidateQuery("userCart")
            setLoading(false)
        }
    })
    const handleClearCart = (event) => {
        setLoading(true)
        clearCartMutate()
    }

    return (
        <div className="flex justify-center">
            <Loader loading={loading} />
            <div className="basis-8/12 bg-blue-300 p-3">
                {cart && (
                    <div className='flex flex-col'>
                        <table>
                            <thead className='border-b-2 border-black'>
                                <tr>
                                    <th className='text-start'>Product</th>
                                    <th className='text-start'>Vendor</th>
                                    <th className='text-start'>Price</th>
                                    <th className='text-start'>Quantity</th>
                                    <th className='text-start'>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.qproducts.map((cartProduct, index) => (
                                    <tr key={index} className='border-b border-black'>
                                        <td className='flex'>
                                            <img src={`${MEDIA_URL}/${cartProduct.product.image}`} alt="" width={100} />
                                            <div className='flex flex-col justify-center'>
                                                <span>{cartProduct.product.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            {cartProduct.product.vendor.name}
                                        </td>
                                        <td>
                                            Ksh. {cartProduct.product.price}
                                        </td>
                                        <td>
                                            <FontAwesomeIcon onClick={handleReduceCart(cartProduct.product.uid)} icon="minus-circle" className='mr-3' />
                                            {cartProduct.quantity}
                                            <FontAwesomeIcon onClick={handleAddCart(cartProduct.product.uid)} icon="plus-circle" className='ml-3' />
                                        </td>
                                        <td>
                                            Ksh. {cartProduct.productTotal}
                                        </td>
                                        <td className='text-start'>
                                            <FontAwesomeIcon className='text-red-800' icon="times-circle" onClick={handleRemoveCart(cartProduct.product.uid)} />
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <th colSpan={4}>Grant Total</th> <th className='text-start'>Ksh. {cart.grantTotal}</th>
                                </tr>
                            </tbody>
                        </table>
                        <div className="mt-4 flex justify-end w-full">
                            <Link to="/order/checkout" className='p-3 bg-blue-600 text-white rounded-sm'>Checkout</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewCart