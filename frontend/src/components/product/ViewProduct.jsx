import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import { fetchProductById } from '../../query/product';
import { DisplayMedia } from '../utils/DisplayMedia';

function ViewProduct() {
    const params = useParams();
    const [currentIndex, setCurrentIndex] = useState(0)

    const { data: product, isLoading, isError } = useQuery("productData", () => fetchProductById(params.productId));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading product data.</div>;
    }

    return (
        <div className='w-full flex justify-center'>
            <div className="basis-10/12 bg-blue-300 p-3 flex">
                <div className='flex-grow flex'>
                    <div className='flex flex-col space-y-3 justify-center basis-2/5'>
                        {product.productimageSet.map((pimage, index) => (
                            <Link key={index} onClick={(event) => setCurrentIndex(index)} className='w-24'>
                                <DisplayMedia url={pimage.image} className="w-24 p-3" />
                            </Link>
                        ))}
                    </div>
                    <DisplayMedia className="basis-3/5" url={product.productimageSet[currentIndex].image} />
                </div>
                <div className="flex flex-col basis-3/5 justify-center">
                    <p className="text-4xl mb-1">Product Details</p>
                    <hr />
                    <div className="text-xl mt-3 mb-5">
                        <p>NAME : <span className='font-extralight'>{product.name}</span></p>
                        <p>PRICE : <span className='font-extralight'>Ksh. {product.price}</span></p>
                        <p>Vendor : <span className='font-extralight'>{product.vendor.name}</span></p>
                    </div>

                    <p className='text-4xl mb-1'>My Review</p>
                    <hr />
                    <div className="text-xl mt-3 mb-5">
                        <div className="form-control">
                            <label htmlFor="review">Review:</label>
                            <textarea name="" id="" rows="2"></textarea>
                        </div>
                    </div>

                    <p className="text-4xl mb-1">Reviews</p>
                    <hr />
                    <div className="text-xl mt-3 h-48 overflow-scroll">
                        {product.reviews.map((review, index) => {
                            if (review.review) {
                                return (
                                    <div className='flex flex-col' key={index}>
                                        <p>{review.email}</p>
                                        <p>{new Date(review.createdAt).toLocaleString('default', { month: 'numeric', year: 'numeric', day: 'numeric' })}</p>
                                        <p>{review.review}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;
