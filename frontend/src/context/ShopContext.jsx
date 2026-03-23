import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { products as fallbackProducts } from "../assets/assets";

export const ShopContext = createContext();
const CART_STORAGE_KEY = "cartItems";
const TOKEN_STORAGE_KEY = "token";

const getStoredCartItems = () => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
        return {};
    }

    try {
        return JSON.parse(storedCart);
    } catch (error) {
        console.error("Failed to parse stored cart items", error);
        return {};
    }
};

const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState(getStoredCartItems);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY) || '');

    

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a size');
            return
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size },
                    { headers: { token } }
                )
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (item, size, quantity) => {
        let cartData = structuredClone(cartItems);
        if (!cartData[item]) {
            cartData[item] = {};
        }
        cartData[item][size] = quantity;
        setCartItems(cartData);

        if(token){
            try {
                await axios.post(
                    backendUrl + '/api/cart/update',
                    { item, size, quantity },
                    { headers: { token } }
                )
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }



    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            const itemInfo = products.find((product) => product._id === items);

            if (!itemInfo) {
                continue;
            }

            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }
        }
        return totalAmount;
    }

  
    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                const fetchedProducts = Array.isArray(response.data.products)
                    ? response.data.products
                    : [];

                setProducts(fetchedProducts.length > 0 ? fetchedProducts : fallbackProducts);
            } else {
                toast.error(response.data.message);
                setProducts(fallbackProducts);
            }
           
        } catch (error) {
            console.error(error);
            setProducts(fallbackProducts);
            toast.error(error.message);
        }
    }


    const getUserCart = async () => {
        try {
        const response = await axios.post(backendUrl + '/api/cart/get',{},{ headers: {token} })
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getProductData();
    }, []);


    useEffect(() => {
        if (token) {
            localStorage.setItem(TOKEN_STORAGE_KEY, token);
            axios.defaults.headers.common['token'] = token;
            getUserCart();
        } else {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            delete axios.defaults.headers.common['token'];
        }
    }, [token]);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

   
   
   



    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setCartItems,
        setToken,
        token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
