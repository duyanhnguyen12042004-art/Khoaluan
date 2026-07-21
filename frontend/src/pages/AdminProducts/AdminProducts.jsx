import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Space,
  Table,
  Modal,
  Input,
  InputNumber,
  Checkbox,
  Popconfirm,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../../services/productApi";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [open, setOpen] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: 0,

    variants: [
      {
        color: "",
        colorCode: "",
        images: ["", "", "", ""],
      },
    ],

    sizes: [],
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getAllProducts();

      setProducts(res);
    } catch (err) {
      console.log(err);
    }
  };

  //Thêm sản phẩm
  const handleCreateProduct = async () => {
    try {
      if (
        !product.name ||
        !product.price ||
        !product.stock ||
        !product.category ||
        !product.variants[0].color ||
        !product.variants[0].colorCode
      ) {
        message.warning("Vui lòng nhập đầy đủ thông tin");
        return;
      }

      // Kiểm tra có ít nhất 1 ảnh
      if (!product.variants[0].images[0]) {
        message.warning("Vui lòng nhập ít nhất 1 ảnh");
        return;
      }

      const result = await createProduct(product);

      message.success(result.message || "Thêm sản phẩm thành công");

      setOpen(false);

      setProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: 0,

        variants: [
          {
            color: "",
            colorCode: "",
            images: ["", "", "", ""],
          },
        ],

        sizes: [],
      });

      loadProducts();
    } catch (error) {
      message.error(error.response?.data?.message || "Thêm sản phẩm thất bại");
    }
  };

  //Cập nhật sản phẩm
  const handleUpdateProduct = async () => {
    try {
      if (
        !product.name ||
        !product.price ||
        !product.stock ||
        !product.category
      ) {
        message.warning("Vui lòng nhập đầy đủ thông tin");
        return;
      }

      const result = await updateProduct(editingId, product);

      message.success(result.message || "Cập nhật thành công");

      setOpen(false);

      setEditingId(null);

      setProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: 0,
        variants: [
          {
            color: "",
            colorCode: "",
            images: ["", "", "", ""],
          },
        ],
        sizes: [],
      });

      loadProducts();
    } catch (error) {
      message.error(error.response?.data?.message || "Cập nhật thất bại");
    }
  };

  //Xóa sản phẩm
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);

      message.success("Xóa sản phẩm thành công");

      loadProducts();
    } catch (error) {
      message.error(error.response?.data?.message || "Xóa thất bại");
    }
  };

  const columns = [
    {
      title: "Ảnh",
      render: (_, record) => (
        <img
          src={record.variants?.[0]?.images?.[0]}
          alt={record.name}
          width={70}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price) => Number(price).toLocaleString("vi-VN") + "đ",
    },
    {
      title: "Kho",
      dataIndex: "stock",
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setEditingId(record.id);

              setProduct({
                name: record.name,
                price: record.price,
                description: record.description,
                category: record.category,
                stock: record.stock,
                variants: record.variants,
                sizes: record.sizes,
              });

              setOpen(true);
            }}
          >
            Sửa
          </Button>

          <Popconfirm
            title="Xóa sản phẩm?"
            description="Bạn có chắc muốn xóa sản phẩm này?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => handleDeleteProduct(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Quản lý sản phẩm"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Thêm sản phẩm
        </Button>
      }
    >
      <Table rowKey="id" columns={columns} dataSource={products} />
      <Modal
        title={editingId ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Input
          placeholder="Tên sản phẩm"
          value={product.name}
          onChange={(e) =>
            setProduct({
              ...product,
              name: e.target.value,
            })
          }
        />

        <br />
        <br />

        <InputNumber
          style={{ width: "100%" }}
          placeholder="Giá"
          value={product.price}
          onChange={(value) =>
            setProduct({
              ...product,
              price: value,
            })
          }
        />

        <br />
        <br />

        <InputNumber
          style={{ width: "100%" }}
          placeholder="Số lượng"
          value={product.stock}
          onChange={(value) =>
            setProduct({
              ...product,
              stock: value,
            })
          }
        />

        <br />
        <br />

        <Input
          placeholder="Danh mục"
          value={product.category}
          onChange={(e) =>
            setProduct({
              ...product,
              category: e.target.value,
            })
          }
        />

        <br />
        <br />

        <Input.TextArea
          rows={4}
          placeholder="Mô tả"
          value={product.description}
          onChange={(e) =>
            setProduct({
              ...product,
              description: e.target.value,
            })
          }
        />
        <h3 style={{ marginTop: 20 }}>Màu sắc</h3>

        <Input
          placeholder="Tên màu"
          value={product.variants[0].color}
          onChange={(e) => {
            const variants = [...product.variants];
            variants[0].color = e.target.value;

            setProduct({
              ...product,
              variants,
            });
          }}
        />

        <br />
        <br />

        <Input
          placeholder="Mã màu (#000000)"
          value={product.variants[0].colorCode}
          onChange={(e) => {
            const variants = [...product.variants];
            variants[0].colorCode = e.target.value;

            setProduct({
              ...product,
              variants,
            });
          }}
        />

        <br />
        <br />

        <h4>Ảnh của màu này</h4>

        {product.variants[0].images.map((image, index) => (
          <Input
            key={index}
            style={{ marginBottom: 10 }}
            placeholder={`Ảnh ${index + 1}`}
            value={image}
            onChange={(e) => {
              const variants = [...product.variants];
              variants[0].images[index] = e.target.value;

              setProduct({
                ...product,
                variants,
              });
            }}
          />
        ))}

        <h3>Size</h3>

        <Checkbox.Group
          options={["S", "M", "L", "XL"]}
          value={product.sizes}
          onChange={(value) =>
            setProduct({
              ...product,
              sizes: value,
            })
          }
        />
        <br />
        <br />

        <Button
          type="primary"
          block
          onClick={editingId ? handleUpdateProduct : handleCreateProduct}
        >
          {editingId ? "Cập nhật sản phẩm" : "Lưu sản phẩm"}
        </Button>
      </Modal>
    </Card>
  );
}

export default AdminProducts;
