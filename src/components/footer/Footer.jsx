import React from 'react'
import { Container } from '../../utils'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <Container>
                <div className='flex justify-between text-center bg-black text-white p-6 mt-10'>
                    <Link to='https://github.com/Abdullayev-Sarvar'>&copy; xxxx this Company. All rights reserved.</Link>
                    <div className='flex gap-4'>
                        <Link to='/' className='text-white hover:underline' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About</Link>
                        <Link to='/' className='text-white hover:underline' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact Us</Link>
                        <Link to='/' className='text-white hover:underline' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}> Privacy Policy</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Footer