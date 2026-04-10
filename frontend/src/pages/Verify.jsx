import axios from 'axios';
import React, { useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageSkeleton from '../components/PageSkeleton';

const Verify = () => {

    
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams(); // FIXED
    const [isVerifying, setIsVerifying] = React.useState(true);

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) {
                setIsVerifying(false);
                return null;
            }
            const response = await axios.post(
                backendUrl + '/api/order/verifyStripe',
                { success, orderId },
                { headers: { token } }
            )

            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
            } else {
                navigate('/cart');
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsVerifying(false);
        }

    }

    useEffect(() => {
        verifyPayment();
    }, [token])

    return (
        <PageSkeleton name="verify-page" loading={isVerifying}>
        <div className='border-t py-16 text-center text-gray-500'>
            Verifying your payment...
        </div>
        </PageSkeleton>
    )
}

export default Verify
