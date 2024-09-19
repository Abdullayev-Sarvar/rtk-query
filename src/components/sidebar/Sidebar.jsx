

const Sidebar = () => {
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['231']}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            style={{
                width: 256,
            }}
            items={items}
        />
    );
};

export default Sidebar;