import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, message, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addOrder } from '../redux/product/orderSlice';
const { Header, Content, Footer } = Layout;


const SingleProduct = () => {
  const { id } = useParams()
  const { currentUser } = useSelector((state) => state.user)
  const { orders } = useSelector((state) => state.neworders)
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch()
  const [product, setProduct] = useState('')
  const [newOrder, setNewOrder] = useState({ orderId: "", productName: "", productId: "", productColor: "", productSize: "", quantity: 1, price: 0 })

  useEffect(() => {
    const price = newOrder.quantity * parseInt(product.price);
    setNewOrder({ ...newOrder, price: price })
  }, [newOrder.quantity])

  useEffect(() => {
    
    setNewOrder({ ...newOrder, productName: product.name, productId: product._id, price: parseInt(product.price) })
  }, [product.name, product._id, product.price])
  const getProductDetails = async () => {
    try {
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //     Authorization: `Bearer ${currentUser.token}`
      //   }
      // }
      const res = await axios.get(`/products/${id}`)
      console.log(res);
      if (res.status === 200) {
        setProduct(res.data.product)
      }
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProductDetails()
  }, [])
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleAddToCart = async () => {
    if (!newOrder.productColor) {
      return warning('select color')
    }
    if (!newOrder.productSize) {
      return warning('select size')
    }
    console.log(newOrder);
    if (orders && orders.length >= 5) {
      return warning("Can't buy more than 5 in a order")
    }
    function generateOrderId(length) {
      return Math.random().toString(36).substr(2, length);
    }
    const orderId = generateOrderId(4)
    const order ={...newOrder, orderId}
    dispatch(addOrder(order));
    success('Product added to cart')
  }

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: `${msg}`,
    });
  };
  const warning = (msg) => {
    messageApi.open({
      type: 'warning',
      content: `${msg}`,
    });
  };
  return (
    <Layout>
      {contextHolder}
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: '24px 24px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div class="bg-gray-100 dark:bg-gray-800 py-8">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex flex-col md:flex-row -mx-4">
                <div class="md:flex-1 px-4">
                  <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img class="w-full h-full object-cover" src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg" alt="Product Image" />
                  </div>
                  <div class="flex -mx-2 mb-4">
                    <div class="w-1/2 px-2">
                      <button onClick={() => handleAddToCart()} class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                    </div>
                    <div class="w-1/2 px-2">
                      <button class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                    </div>
                  </div>
                </div>
                <div class="md:flex-1 px-4">
                  <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.
                  </p>
                  <div class="flex mb-4">
                    <div class="mr-4">
                      <span class="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                      <span class="text-gray-600 dark:text-gray-300">{` $${product.price}`}</span>
                    </div>
                    <div>
                      <span class="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                      <span class="text-gray-600 dark:text-gray-300">In Stock</span>
                    </div>
                  </div>
                  <div class="mb-4">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
                    <div class="flex items-center mt-2">
                      {
                        product && product.colors.map((color) => {
                          return <button onClick={() => setNewOrder({ ...newOrder, productColor: `${color}` })} style={{ backgroundColor: `${color}` }} class="w-6 h-6 rounded-full bg-black-800 mr-2">{color}</button>
                        })
                      }
                    </div>
                  </div>
                  <div class="mb-4">
                    <span class="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
                    <div class="flex items-center mt-2">
                      {
                        product && product.sizes.map((size) => {
                          return <button onClick={() => setNewOrder({ ...newOrder, productSize: `${size}` })} class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{size}</button>
                        })

                      }
                    </div>
                  </div>
                  <div>
                    <span class="font-bold text-gray-700 dark:text-gray-300">Quantity: </span>
                    <button onClick={() => setNewOrder({ ...newOrder, quantity: newOrder.quantity - 1 })} disabled={newOrder.quantity <= 1} class='bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600'> - </button>
                    <span class='font-bold text-gray-700 dark:text-gray-300 px-3 '>{newOrder.quantity}</span>
                    <button onClick={() => setNewOrder({ ...newOrder, quantity: newOrder.quantity + 1 })} disabled={newOrder.quantity >= 5} class='bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600'> + </button>
                  </div>
                  <div>
                    <span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                      lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                      ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                      sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default SingleProduct