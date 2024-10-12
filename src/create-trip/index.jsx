import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';



function CreateTrip() {
  const [place, setPlace] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({});

  const [openDialog, setopenDiaglog] = useState(false);

  const [loading, setLoading] = useState(false);

  const router = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Function to handle fetching suggestions from Mapbox
  const handleSearch = (query) => {
    if (!query) return;
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`, {
      params: {
        access_token: import.meta.env.VITE_MAPBOX_API_KEY,  // Your Mapbox API Key
        autocomplete: true,
        limit: 5  // Limit the number of suggestions
      }
    }).then(res => {
      setSuggestions(res.data.features);
    }).catch(err => {
      console.error("Error fetching places: ", err);
    });
  };

  // Function to handle place selection
  const handleSelect = (placeName) => {
    setPlace(placeName);
    handleInputChange('location', placeName); // Update the formData with the selected place
    setSuggestions([]); // Clear suggestions once a place is selected
  };

  // Function to handle key press (Enter key)
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSuggestions([]); // Clear suggestions when Enter is pressed
    }
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setopenDiaglog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.travelers) {
      // alert('Enter trip days less than 5');
      toast("Please fill all details.");
      return;
    }
    // console.log('aaa')
    // console.log(formData);
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{noOfDays}', formData?.noOfDays)
      .replace('{travelers}', formData?.travelers)
      .replace('{budget}', formData?.budget)
      .replace('{noOfDays}', formData?.noOfDays);

    // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    saveAiTrip(result?.response?.text())
  }

  const saveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docID = Date.now().toString();
    await setDoc(doc(db, "AiTrips", docID), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docID
    });
    setLoading(false);
    router('/view-trip/' + docID);
  }

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((res) => {
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data));
      setopenDiaglog(false);
      onGenerateTrip();
    })
  }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your Travel Preferences 🚵</h2>
      <p className='mt-3 text-grey-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination choice?</h2>
          <input
            type="text"
            value={place}
            onChange={(e) => { setPlace(e.target.value); handleSearch(e.target.value); }}
            onKeyDown={handleKeyPress}  // Handle Enter key press
            placeholder="Search for a destination"
            className="border rounded w-full p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <ul className="mt-2 border rounded">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} onClick={() => handleSelect(suggestion.place_name)} className="p-2 cursor-pointer hover:bg-gray-100">
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.3'} type="number" onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>

        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border border-gray-300 cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-slate-950'}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on your next adventure?</h2>

        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('travelers', item.people)}
              className={`p-4 border border-gray-300 cursor-pointer rounded-lg hover:shadow-lg ${formData?.travelers == item.people && 'shadow-lg border-slate-950'}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button disable={loading.toString()} onClick={() => onGenerateTrip()}>{
          loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "Generate Trip"
        }</Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg' />
              <h3 className='text-lg font-bold mt-7'>Sign In With Google</h3>
              <p>Sign in to the app with Google Authentication securely</p>
              <Button
                disable={loading}
                className='w-full mt-5 flex gap-1 items-center text-lg font-bold'
                onClick={login}>
                <FcGoogle className='h-7 w-7' />
                Sign In
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;
