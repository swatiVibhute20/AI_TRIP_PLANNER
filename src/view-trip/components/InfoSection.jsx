import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

const PHOTO_REF_URL = '' + import.meta.env; // link and other work maxHeightPx=1000 & maxWidthPx=1000px

function InfoSection({ trip }) {

    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location
        }

        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name);

            const PhotoUrl = PHOTO_REF_URL.replace('{Name}', resp.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl);
        })
    }

    return (
        <div>
            <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className="h-[340px] w-full object-cover rounded-xl" />
            <div className="flex justify-between  items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">
                        {trip?.userSelection?.location}
                    </h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            📅{trip?.userSelection?.noOfDays} Days
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            💰{trip?.userSelection?.budget} Budget
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            🥂No. Of Travelers: {trip?.userSelection?.travelers}
                        </h2>
                    </div>
                </div>
                <Button  >
                    <IoIosSend className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}

export default InfoSection;
