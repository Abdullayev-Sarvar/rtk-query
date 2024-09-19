import { useParams } from "react-router-dom"
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { Container } from "../../utils";
import { Carousel, Image, Typography } from 'antd';

const { Title, Text } = Typography;

const Details = () => {
    const { id } = useParams();
    const { data } = useGetProductDetailsQuery(id);

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Product added to cart successfully! 👌',
            duration: 5,
        });
    };

    return (
        <div className="px-4">
            <Container>
                {
                    data && data.payload &&
                    <div className="flex my-10 gap-12 shadow-lg p-3">
                        <div className="w-1/3 bg-black rounded-xl">
                            <Carousel arrows >
                                {
                                    data && data?.payload.product_images.map(image =>
                                        <Image className="w-full" alt="example" key={image} src={image} />
                                    )
                                }
                            </Carousel>
                        </div>
                        <div className="w-2/3 gap-4">
                            <Title level={1}>{data.payload.product_name}</Title>
                            <Text level={5}>{data.payload.description}</Text>
                            <div className="flex items-end my-2 gap-4">
                                <strong className="text-3xl text-red-500" level={2}>${data.payload.sale_price}</strong>
                                <span className="text-lg line-through">${data.payload.original_price}</span>
                            </div>
                            <Text level={3}>Category: {data.payload.category}</Text>
                            <br />
                            <Text level={3}>Product Type: {data.payload.product_type}</Text>
                            <br />
                            <button type="button" onClick={success} className="bg-black text-white px-8 py-2 rounded-lg mt-8 transition-all hover:scale-95 duration-300">Add to cart</button>
                        </div>
                    </div>
                }
            </Container>
        </div>
    )
}

export default Details