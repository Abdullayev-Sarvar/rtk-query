import { FcLike } from "react-icons/fc";
import { AiTwotoneLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { useGetProductsQuery, useLikeProductMutation, useUnlikeProductMutation } from '../../redux/api/productsApi';
import { Button, Card, message } from 'antd';
import { Container } from '../../utils';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike } from '../../redux/slices/likeSlice';

const { Meta } = Card;

const Products = () => {
  const dispatch = useDispatch();
  const { data } = useGetProductsQuery();
  const likedProducts = useSelector((state) => state.like?.likes) || [];
  const [likeProduct] = useLikeProductMutation();
  const [unlikeProduct] = useUnlikeProductMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Product added to cart successfully! 👌',
      duration: 5,
    });
  };

  const handleLikeToggle = async (productId, liked) => {
    if (liked) {
      await unlikeProduct({ id: productId });
      dispatch(removeLike(productId));
    } else {
      await likeProduct({ id: productId });
      dispatch(addLike(productId));
    }
  };

  return (
    <div className='my-10'>
      <Container>
        <div className='grid grid-cols-4 gap-4'>
          {data && data.payload &&
            data.payload.map(product => (
              <Card
                key={product._id}
                hoverable
                style={{
                  width: 260,
                }}
                cover={
                  <Link to={`/products/${product._id}`}>
                    <img alt="example" src={product.product_images[0]} />
                  </Link>
                }
              >
                <Meta title={product.product_name} />
                <br />
                <div className="flex justify-between items-center">
                  <strong>${product.sale_price}</strong>
                  <p className="flex items-center gap-1">
                    <FcLike />{product.likes}
                  </p>
                  <button
                    onClick={() => handleLikeToggle(product._id, likedProducts.includes(product._id))}
                    className="text-2xl cursor-pointer"
                  >
                    {likedProducts.includes(product._id) ? (
                      <AiTwotoneLike className="text-red-500" />
                    ) : (
                      <AiOutlineLike className="text-gray-500" />
                    )}
                  </button>
                </div>
                {contextHolder}
                <Button className='w-full mt-4 bg-black' onClick={success} type='primary'>
                  Add to cart
                </Button>
              </Card>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default Products;