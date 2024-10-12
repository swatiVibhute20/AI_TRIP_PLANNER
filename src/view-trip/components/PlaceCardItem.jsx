import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        place && GetPlacePhoto();
    }, [place]);

    const getGoogleMapsUrl = (hotelAddress) => {
        const baseUrl = 'https://www.google.com/maps?q=';
        return `${baseUrl}${encodeURIComponent(hotelAddress)}`;
    };

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place.placeName
        }

        const result = await GetPlaceDetails(data).then(resp => {
            // console.log(resp.data.places[0].photos[3].name);

            const PhotoUrl = PHOTO_REF_URL.replace('{Name}', resp.data.places[0].photos[3].name);
            console.log(PhotoUrl)
            setPhotoUrl(PhotoUrl);
        })
    }

    return (
        <div className='border p-3 rounded-xl mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
            <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className='h-[130px] w-[130px] rounded-xl object-cover' />

            <div>
                <h2 className='font-bold text-lg'>{place.placeName}</h2>
                <p className='text-sm text-gray-400'>{place.placeDetails}</p>
                <h2 className='mt-2'>🎫 {place.ticketPricing}</h2>
                <a
                    href={getGoogleMapsUrl(place.placeName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    View on Google Maps
                </a>
            </div>
        </div>
    )
}

export default PlaceCardItem
