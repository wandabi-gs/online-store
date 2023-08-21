import React from 'react'
import { useQuery } from 'react-query'
import { fetchCheckout } from '../../query/order'

function Checkout() {

    const { data: cart, isLoading, isError } = useQuery("cartCheckout", fetchCheckout)

    return (
        <div className="flex justify-center">
            <div className='basis-10/12 bg-blue-300 p-3'>
                {cart && (
                    <div className=''></div>
                )}
            </div>
        </div>
    )
}

export default Checkout