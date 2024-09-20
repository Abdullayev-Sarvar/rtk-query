import { AiOutlineLike, AiFillLike } from "react-icons/ai"; 
import React from 'react';
import { Container } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useLikeProductMutation } from '../../redux/api/productsApi';
import { removeLike } from '../../redux/slices/likeSlice';
import { useGetProductsQuery } from '../../redux/api/productsApi';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';

const { Meta } = Card;

const Favorite = () => {
    const dispatch = useDispatch();
    const [getLikedProducts] = useLikeProductMutation();

    const likedProducts = useSelector((state) => state.like?.likes) || [];
    const { data: productsData } = useGetProductsQuery();

    const likedItems = productsData?.payload?.filter((product) => likedProducts.includes(product._id)) || [];

    const handleLikeToggle = (productId, liked) => {
        dispatch(removeLike(productId));
        getLikedProducts({ id: productId, liked });
    };

    return (
        <div>
            <Container>
                <h2 className='text-3xl font-bold text-center mb-8 mt-[150px]'>Liked Products</h2>
                <div className='grid grid-cols-4 gap-6'>
                    {likedItems.length > 0 ? (
                        likedItems.map((product) => (
                            <Card
                                key={product._id}
                                hoverable
                                className='relative transition-transform duration-300 hover:scale-105 bg-gray-900'
                                cover={
                                    <img src={product.product_images[0]} alt={product.product_name} className='object-cover w-full h-80 rounded-lg' />
                                }
                            >
                                <div className="absolute top-4 right-4">
                                    {likedProducts.includes(product._id) ? (
                                        <AiFillLike
                                            className="text-red-500 text-2xl cursor-pointer"
                                            onClick={() => handleLikeToggle(product._id, true)}
                                        />
                                    ) : (
                                        <AiOutlineLike
                                            className="text-white text-2xl cursor-pointer"
                                            onClick={() => handleLikeToggle(product._id, false)}
                                        />
                                    )}
                                </div>
                                <Meta
                                    title={<span className='text-white'>{product.product_name}</span>}
                                    description={
                                        <div>
                                            <span className='text-lg text-white'>${product.sale_price}</span>
                                            <p className='text-sm text-gray-100 mb-2'>{product.description}</p>
                                            {product.discount && (
                                                <div className='mt-2 text-red-500'>
                                                    <strong>Discount: {product.discount}% OFF</strong>
                                                </div>
                                            )}
                                            <div className="mt-2 text-white">
                                                <span className='text-white'>{product.likes_count} Likes</span>
                                            </div>
                                        </div>
                                    }
                                />
                                <Link to={`/products/${product._id}`}><Button className='w-full mt-4' type='primary'>View Details</Button></Link>
                            </Card>
                        ))
                    ) : (
                        <p className="w-full h-full py-4 text-center text-xl text-gray-400">You haven't liked any products yet.</p>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Favorite;