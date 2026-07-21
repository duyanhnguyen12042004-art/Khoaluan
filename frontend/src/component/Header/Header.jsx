import "./Header.scss";
import { useState, useEffect, useContext } from "react";
import { Layout, Menu, Input, Flex, Dropdown } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../services/productApi";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";

const { Header } = Layout;

const menuItems = [
  {
    key: "1",
    label: <Link to="/home">Trang chủ</Link>,
  },
  {
    key: "2",
    label: <Link to="/products">Sản phẩm</Link>,
  },
  {
    key: "3",
    label: <Link to="/sale">Khuyến mại</Link>,
  },
  {
    key: "4",
    label: <Link to="/blog">Tạp chí</Link>,
  },
  {
    key: "5",
    label: <Link to="/store">Hệ thống cửa hàng</Link>,
  },
];

function AppHeader() {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const [keyword, setKeyword] = useState("");

  const [products, setProducts] = useState([]);

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadProducts();
  }, []);

  const userMenu = {
    items: [
      // Chỉ hiện với Admin
      ...(user?.role === 1
        ? [
            {
              key: "admin",
              label: "Dashboard quản trị",
              onClick: () => navigate("/admin"),
            },
            {
              type: "divider",
            },
          ]
        : []),

      {
        key: "profile",
        label: "Thông tin tài khoản",
        onClick: () => navigate("/profile"),
      },

      {
        key: "edit-profile",
        label: "Chỉnh sửa thông tin",
        onClick: () => navigate("/edit-profile"),
      },

      {
        key: "orders",
        label: "Đơn hàng của tôi",
        onClick: () => navigate("/my-orders"),
      },

      {
        type: "divider",
      },

      {
        key: "logout",
        danger: true,
        label: "Đăng xuất",
        onClick: () => {
          logout();
          navigate("/login");
        },
      },
    ],
  };
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setKeyword(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const keywordNoSign = removeVietnameseTones(value);

    const result = products
      .filter((item) =>
        removeVietnameseTones(item.name).includes(keywordNoSign),
      )
      .slice(0, 5);

    setSuggestions(result);
  };

  return (
    <Header className="app-header">
      <Flex justify="space-between" align="center" style={{ height: "100%" }}>
        {/* Logo */}

        <Flex align="center" gap={10}>
          <img src={logo} alt="Logo" className="logo" />
        </Flex>

        {/* Menu */}

        <Menu
          mode="horizontal"
          items={menuItems}
          selectable={false}
          className="header-menu"
        />

        {/* Right */}

        <Flex align="center" gap={20}>
          {/* Tìm kiếm */}
          <div className="search-wrapper">
            <Input
              placeholder="Tìm kiếm..."
              className="search-box"
              value={keyword}
              onChange={handleSearchChange}
              onPressEnter={() => {
                if (keyword.trim()) {
                  navigate(`/search?keyword=${keyword}`);
                  setSuggestions([]);
                }
              }}
              suffix={
                <SearchOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (keyword.trim()) {
                      navigate(`/search?keyword=${keyword}`);
                      setSuggestions([]);
                    }
                  }}
                />
              }
            />

            {suggestions.length > 0 && (
              <div className="search-suggestion">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="search-item"
                    onClick={() => {
                      setKeyword(item.name);
                      navigate(
                        `/search?keyword=${encodeURIComponent(item.name)}`,
                      );
                      setSuggestions([]);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Người dùng */}
          {user ? (
            <Dropdown
              menu={userMenu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                }}
              >
                <UserOutlined />

                <span>{user.fullname}</span>
              </div>
            </Dropdown>
          ) : (
            <Link to="/login">
              <UserOutlined />
            </Link>
          )}

          <Link to="/cart">
            <ShoppingCartOutlined />
          </Link>
        </Flex>
      </Flex>
    </Header>
  );
}

export default AppHeader;
