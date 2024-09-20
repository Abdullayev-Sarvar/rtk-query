import { AiOutlineLike } from "react-icons/ai";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearchProductMutation } from "../../redux/api/productsApi";
import { AutoComplete, Menu } from "antd";
import { useGetProfileQuery } from "../../redux/api/userApi";
import { MenuOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const items = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: 'Navigation One',
    children: [
      { key: '11', label: 'Option 1' },
      { key: '12', label: 'Option 2' },
      { key: '13', label: 'Option 3' },
      { key: '14', label: 'Option 4' },
    ],
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: 'Navigation Two',
    children: [
      { key: '21', label: 'Option 1' },
      { key: '22', label: 'Option 2' },
      {
        key: '23',
        label: 'Submenu',
        children: [
          { key: '231', label: 'Option 1' },
          { key: '232', label: 'Option 2' },
          { key: '233', label: 'Option 3' },
        ],
      },
      {
        key: '24',
        label: 'Submenu 2',
        children: [
          { key: '241', label: 'Option 1' },
          { key: '242', label: 'Option 2' },
          { key: '243', label: 'Option 3' },
        ],
      },
    ],
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: 'Navigation Three',
    children: [
      { key: '31', label: 'Option 1' },
      { key: '32', label: 'Option 2' },
      { key: '33', label: 'Option 3' },
      { key: '34', label: 'Option 4' },
    ],
  },
];

const getLevelKeys = (items) => {
  const key = {};
  const func = (items, level = 1) => {
    items.forEach((item) => {
      if (item.key) key[item.key] = level;
      if (item.children) func(item.children, level + 1);
    });
  };
  func(items);
  return key;
};

const levelKeys = getLevelKeys(items);

const Sidebar = ({ levelKeys, stateOpenKeys, setStateOpenKeys }) => {
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
    />
  );
};

const Header = () => {
  const { data: user } = useGetProfileQuery();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { token } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [searchProduct, { data }] = useSearchProductMutation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/search?q=${searchValue}`);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  if (pathname.includes("auth")) return null;

  return (
    <>
      <div className="bg-black shadow-2xl">
        <nav className="w-[1200px] m-auto flex items-center justify-between p-2 gap-6">
          <button onClick={toggleSidebar} className="text-white">
            <MenuOutlined />
          </button>
          <Link to={"/"}>
            <img
              className="w-[50px] rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s"
              alt="Logo"
            />
          </Link>

          <form onSubmit={handleSearch}>
            <AutoComplete
              options={data?.payload?.map((product) => ({
                label: (
                  <Link key={product._id} to={`/products/${product._id}`}>
                    {product.product_name}
                  </Link>
                ),
              }))}
              style={{ width: 200 }}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  navigate(`/search?q=${searchValue}`);
                }
              }}
              onChange={(value) => setSearchValue(value)}
              onSearch={(text) => searchProduct(text)}
              placeholder="input here"
            />
          </form>

          <ul className="flex gap-6">
            <li className="text-white relative">
              <Link to={'/favorite'}>
                <span className="absolute top-0 right-0 text-2xl text-white bg-red-600 rounded-full px-2 py-1">
                  <AiOutlineLike />
                </span>
              </Link>
            </li>
            {token ? (
              <Link to={"/profile"}>
                <img
                  className="w-[35px] border border-white rounded-full transition-all hover:scale-110"
                  src={user?.payload?.photo_url}
                  alt="Profile"
                />
              </Link>
            ) : (
              <>
                <li className="text-white">
                  <Link to={"auth/signUp"}>Register</Link>
                </li>
                <li className="text-white">
                  <Link to={"auth/login"}>Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      {sidebarVisible && (
        <>
          <div className="overlay visible" onClick={toggleSidebar}></div>
          <div className="sidebar visible">
            <Sidebar levelKeys={levelKeys} stateOpenKeys={stateOpenKeys} setStateOpenKeys={setStateOpenKeys} />
          </div>
        </>
      )}
      {!sidebarVisible && (
        <>
          <div className="overlay"></div>
          <div className="sidebar"></div>
        </>
      )}
    </>
  );
};

export default Header;

//Abdullayev Sarvar