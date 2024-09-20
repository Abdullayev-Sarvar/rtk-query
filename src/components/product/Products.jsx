import { AiTwotoneLike } from "react-icons/ai"; 
import { AiOutlineLike } from "react-icons/ai";
import { useGetProductsQuery } from '../../redux/api/productsApi'
import { Button, Card, message } from 'antd';
import { Container } from '../../utils';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const Products = () => {
  const { data } = useGetProductsQuery();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Product added to cart successfully! 👌',
      duration: 5,
    });
  };

  return (
    <div className='my-10'>
      <Container>
        <div className='grid grid-cols-4 gap-4'>
          {
            data && data.payload &&
            data.payload.map(product =>
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
                <div className="flex justify-between">
                  <strong>${product.sale_price}</strong>
                  <p>{data?.payload.liked}</p>
                  <button onClick={() => success(product._id)}>
                    {data?.payload.includes(product._id) ? (
                      <AiOutlineLike 
                        className="text-red-500 text-2xl cursor-pointer"
                        onClick={() => handleLikeToggle(product._id, true)}
                      />
                    ) : (
                      <AiTwotoneLike 
                        className="text-white text-2xl cursor-pointer"
                        onClick={() => handleLikeToggle(product._id, false)}
                      />
                    )}
                  </button>
                </div>
                {contextHolder}
                <Button className='w-full mt-4 bg-black' onClick={success} type='primary'>Add to cart</Button>
              </Card>
            )
          }
        </div>
      </Container>
    </div>
  )
}

export default Products