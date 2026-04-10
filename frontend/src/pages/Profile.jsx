import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import PageSkeleton from '../components/PageSkeleton';

const Profile = () => {
  const { backendUrl, token, navigate, cartItems } = useContext(ShopContext);
  const [profile, setProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      setIsProfileLoading(true);

      try {
        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });

        if (response.data.success) {
          setProfile(response.data.user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsProfileLoading(false);
      }
    };

    loadProfile();
  }, [backendUrl, navigate, token]);

  const initial = profile?.name?.trim()?.charAt(0)?.toUpperCase() || 'U';
  const localCartCount = Object.values(cartItems || {}).reduce((total, sizeMap) => {
    if (!sizeMap || typeof sizeMap !== 'object') {
      return total;
    }

    return total + Object.values(sizeMap).reduce((count, qty) => count + Number(qty || 0), 0);
  }, 0);

  return (
    <PageSkeleton name="profile-page" loading={isProfileLoading}>
      <div className="border-t pt-10">
        <div className="text-2xl">
          <Title text1={'My'} text2={'Profile'} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-black text-3xl font-semibold text-white">
              {initial}
            </div>
            <h2 className="mt-5 text-center text-2xl font-semibold text-gray-900">
              {profile?.name || 'User'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              {profile?.email || 'No email available'}
            </p>
            <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Account Status</p>
              <p className="mt-2 font-medium text-green-600">Active Shopper</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">{profile?.name || '-'}</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="mt-2 text-lg font-semibold text-gray-900 break-all">{profile?.email || '-'}</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Items In Cart</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                {profile?.cartItemsCount ?? localCartCount}
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Quick Actions</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/orders')}
                  className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white"
                >
                  View Orders
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/collection')}
                  className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSkeleton>
  );
};

export default Profile;
