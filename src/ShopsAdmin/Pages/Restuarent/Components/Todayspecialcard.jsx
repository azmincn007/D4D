import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { Card } from 'flowbite-react';
import LazyImage from '../../../../api/Lazyimage';
import { API_BASE_URL } from '../../../../config/config';
import Loading from '../../../../api/Loading';
import ErrorMessage from '../../../../Pages/Authentication/ErrorValidation';

const fetchTodaySpecial = async () => {
  const authToken = localStorage.getItem('authToken');
  const { data } = await axios.get(`${API_BASE_URL}/api/restaurent/todays-special`, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  console.log(data.data.todays_special);
  return data.data.todays_special;
};

const TodaySpecialCards = ({ currencySymbol }) => {
  const queryClient = useQueryClient();

  const { data: specialItems, isLoading, isError, error } = useQuery({
    queryKey: ['todaySpecial'],
    queryFn: fetchTodaySpecial,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message} />;

  const activeSpecialItems = specialItems.filter(item => item.status === 'Active');

  if (!Array.isArray(activeSpecialItems) || activeSpecialItems.length === 0) {
    return <div>No active special items available today.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {activeSpecialItems.map((item) => (
        <Card key={item.id} className="w-full max-w-sm rounded-lg shadow-lg cardmenu">
          <div className="relative">
            <LazyImage
              src={item.image ? `${item.image}` : "/placeholder.svg"}
              alt={item.menu_eng}
              className="h-56 w-full rounded-t-lg object-cover"
            />
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Today's Special
            </div>
          </div>
          <div className="p-4">
            <h3 className="mb-2 text-lg font-bold">{item.menu_eng}</h3>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-[#4BB543]">{currencySymbol}{item.offer_price}</span>
                <span className="ml-2 text-sm font-medium text-muted-foreground line-through text-[#ff3333]">{currencySymbol}{item.normal_price}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TodaySpecialCards;