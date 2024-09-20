import React from 'react'
import {Container} from '../../utils'
import { useGetLikedProductsMutation } from '../../redux/api/productsApi'

const Favorite = () => {
    const [getLikedProducts, { data }] = useGetLikedProductsMutation();
  return (
    <div>
        <Container>
            <h1>Favorite Products</h1>
            {data && data?.payload.map((product) => (
                <div key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <Link to={`/details/${product.id}`}>Details</Link>
                </div>
            ))}
        </Container>
    </div>
  )
}

export default Favorite