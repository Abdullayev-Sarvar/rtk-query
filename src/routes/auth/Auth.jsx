import { Outlet, Link, useNavigate } from 'react-router-dom'
import { TbBrandGravatar } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';


const Auth = () => {
  const navigate = useNavigate();
  const {token} = useSelector(state => state.auth);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if(token){
      navigate("/profile");
    }
  }, [pathname])

  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-500'>
        <div className='max-w-[400px] flex-1 flex flex-col items-center bg-white'> 
          <Link to={"/"} className='mt-8'>
            <div className="flex px-2 shadow-2xl bg-gray-300 w-fit rounded-full">
                <span className="font-bold text-[36px]  text-lime-700">S</span>
                <div className="flex flex-col text-lg">
                <span className="font-bold mt-2 text-sm text-yellow-500">B</span>
                <span>
                    <TbBrandGravatar className="text-yellow-600  absolute" />
                </span>
                </div>
                <span className="font-bold  text-[22px]  left-[44px] mt-2 text-green-700">
                M
                </span>
            </div>
            </Link>
            <Outlet/>
        </div>
    </div>
  )
}

export default Auth