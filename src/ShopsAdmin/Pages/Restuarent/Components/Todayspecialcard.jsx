import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Card } from 'flowbite-react';

const BASE_URL = 'https://hezqa.com';

const fetchTodaySpecial = async () => {
  const authToken = localStorage.getItem('authToken');
  const { data } = await axios.get(`${BASE_URL}/api/restaurent/todays-special`, {
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });
  return data.data.todays_special;
};

const TodaySpecialCards = ({ currencySymbol }) => {
  const { data: specialItems, isLoading, isError, error } = useQuery({
    queryKey: ['todaySpecial'],
    queryFn: fetchTodaySpecial,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {specialItems.map((item, index) => (
        <Card key={index} className="w-full max-w-sm rounded-lg shadow-lg cardmenu">
          <div className="relative">
            <img
              src={item.image ? `${BASE_URL}${item.image}` : "/placeholder.svg"}
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