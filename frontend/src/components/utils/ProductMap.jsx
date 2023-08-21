import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarRatings from 'react-star-ratings'
import { ChangeRating, toggleLike } from '../../mutation/product';
import { useMutation } from 'react-query';
import { invalidateQuery } from '../../main';
import { DisplayMedia } from './DisplayMedia';
import { Link } from 'react-router-dom';
import { addCart } from '../../mutation/cart';
import { color } from 'framer-motion';

function ProductMap({ products }) {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const in_variants = {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 0, y: 50 },
    };

    const [fadeAnimations, setFadeAnimations] = useState(
        products.map(() => ({
            duration: 0,
            variant: in_variants,
        }))
    );

    const toggleActiveTab = (index) => () => {
        const updatedAnimations = [...fadeAnimations];
        updatedAnimations[index] = { duration: 0.5, variant: variants };
        setFadeAnimations(updatedAnimations);
    };

    const toggleInactiveTab = (index) => () => {
        const updatedAnimations = [...fadeAnimations];
        updatedAnimations[index] = { duration: 0.5, variant: in_variants };
        setFadeAnimations(updatedAnimations);
    };

    const { mutate: likeMutate, isLoading: likeIsLoading, isError: likeIsError } = useMutation(toggleLike, {
        onSuccess: () => {
            invalidateQuery("allProducts")
        }
    });

    const handleLike = (uid) => (event) => {
        likeMutate(uid);
    };

    const { mutate: addCartMutate, isLoading: addCartIsLoading, isError: addCartIsError } = useMutation(addCart, {
        onSuccess: () => {
            invalidateQuery("allProducts")
            alert("Product added to cart")
        }
    });

    const handleAddCart = (uid) => (event) => {
        addCartMutate(uid)
    }

    const { mutate: ratingMutate, isLoading: ratingIsLoading, isError: ratingIsError } = useMutation(ChangeRating, {
        onSuccess: () => {
            invalidateQuery("allProducts")
        }
    });
    const handleChangeRating = (uid) => (rating) => {
        console.log(uid, rating)
        ratingMutate({uid : uid, rating: rating})
    }
    return (
        <div className="flex flex-wrap">
            {products.map((product, index) => (
                <div key={index} className='basis-2/12 p-4'>
                    <div className="bg-blue-300 p-3 h-full">
                        <div className='object-cover justify-between h-full flex flex-col relative'>
                            <div className="absolute w-full top-0 p-4 flex justify-between">
                                <div className='px-2 py-1 shadow shadow-indigo-200 rounded-md bg-indigo-950 text-white'>{product.vendor.name}</div>
                                <div style={{color:"red"}}> -1{product.discount} %</div>
                            </div>
                            <Link to={`/product/${product.uid}/view`} className='h-5/6'>
                                <div className='h-full flex items-center justify-center'>
                                    <DisplayMedia url={product.image} />
                                </div>
                            </Link>
                            <div className='flex-grow flex flex-col justify-end'>
                                <div className="my-2 flex justify-between">
                                    <p>{product.name}</p>
                                    <p>Ksh. {product.price}</p>
                                </div>
                                <hr />
                                <div className='mt-3 p-2 flex justify-between'>
                                    <button type="button" className='w-full text-center basis-1/5' onClick={handleLike(product.uid)}>
                                        <FontAwesomeIcon icon="heart" className={`text-xl ${product.userLiked ? "text-red-600" : "text-slate-500"}`} />
                                    </button>
                                    <span className='text-center flex-grow border-x border-slate-950'>
                                        <StarRatings
                                            rating={product?.rating}
                                            starRatedColor="red"
                                            starEmptyColor='gray'
                                            starHoverColor='orange'
                                            changeRating={handleChangeRating(product.uid)}
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension='1.5rem'
                                            starSpacing='1px'
                                        />
                                    </span>
                                    <button type="button" className='w-full text-center basis-1/5' onClick={handleAddCart(product.uid)}>
                                        <FontAwesomeIcon icon="cart-shopping" className="text-xl text-black" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductMap;
