import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const getGoogleMapsUrl = (hotelAddress) => {
    const baseUrl = 'https://www.google.com/maps?q=';
    return `${baseUrl}${encodeURIComponent(hotelAddress)}`;
  };


  const GetPlacePhoto = async () => {
    const data = {
      textQuery: 'hotel?.hotelName'
    }

    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name);

      const PhotoUrl = PHOTO_REF_URL.replace('{Name}', resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <div className="hover:scale-105 transition-all cursor-pointer">
      <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="Hotel" className="rounded-xl h-[180px] w-full object-cover" />
      <div className="my-2 flex flex-col gap-2">
        <h2 className="font-medium">{hotel?.hotelName}</h2>
        <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
        <h2 className="text-sm font-bold">💰 {hotel?.price}</h2>
        <h2>⭐ {hotel?.rating}</h2>

        <a
          href={getGoogleMapsUrl(hotel.hotelName + " " + hotel.hotelAddress)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
}

export default HotelCardItem;
