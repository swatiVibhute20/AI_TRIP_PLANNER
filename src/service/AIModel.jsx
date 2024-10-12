import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "\nGenerate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"hotels\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50 - $100 per night\",\n      \"hotelImageUrl\": \"https://www.thed.com/images/hero-images/hero-image-the-d-hotel-casino-las-vegas.jpg\",\n      \"geoCoordinates\": \"36.1699, -115.1424\",\n      \"rating\": 4.0,\n      \"description\": \"A budget-friendly hotel located in downtown Las Vegas, known for its vibrant atmosphere and proximity to Fremont Street Experience.\"\n    },\n    {\n      \"hotelName\": \"The Golden Nugget\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$70 - $150 per night\",\n      \"hotelImageUrl\": \"https://www.goldennugget.com/media/images/pages/home-pages/home-page-header-01.jpg\",\n      \"geoCoordinates\": \"36.1693, -115.1416\",\n      \"rating\": 4.5,\n      \"description\": \"A historic hotel with a luxurious feel, featuring a famous shark tank and a variety of dining and entertainment options.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$40 - $80 per night\",\n      \"hotelImageUrl\": \"https://media.cntraveler.com/photos/5b36d7a94b271f54b566a0a4/master/w_1600,c_limit/circus-circus-hotel-casino-las-vegas-exterior-night.jpg\",\n      \"geoCoordinates\": \"36.1117, -115.1702\",\n      \"rating\": 3.5,\n      \"description\": \"A family-friendly hotel known for its circus-themed attractions and affordable prices.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A pedestrian mall with a giant video screen, live music, and street performers.\",\n          \"placeImageUrl\": \"https://www.fremontstreetexperience.com/media/images/home/hero-image-mobile.jpg\",\n          \"geoCoordinates\": \"36.1699, -115.1424\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"time\": \"Evening\"\n        }\n      ],\n      \"bestTime\": \"Evening\"\n    },\n    \"day2\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Hoover Dam\",\n          \"placeDetails\": \"A massive dam and engineering marvel located about an hour drive from Las Vegas.\",\n          \"placeImageUrl\": \"https://www.nps.gov/hoov/planyourvisit/images/dam-daytime-long.jpg\",\n          \"geoCoordinates\": \"36.0057, -114.7230\",\n          \"ticketPricing\": \"Free to enter, tours available for purchase\",\n          \"rating\": 4.5,\n          \"time\": \"Morning\"\n        },\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"A scenic desert landscape with hiking trails and rock formations.\",\n          \"placeImageUrl\": \"https://www.nps.gov/redr/planyourvisit/images/redrockcanyon_001.jpg\",\n          \"geoCoordinates\": \"36.1200, -115.3700\",\n          \"ticketPricing\": \"Entry fee for vehicles\",\n          \"rating\": 4.0,\n          \"time\": \"Afternoon\"\n        }\n      ],\n      \"bestTime\": \"Daytime\"\n    },\n    \"day3\": {\n      \"plan\": [\n        {\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"A stunning indoor garden with elaborate floral displays.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/bellagio/images/conservatory-and-botanical-garden/gallery/conservatory-and-botanical-garden-gallery-20.jpg\",\n          \"geoCoordinates\": \"36.1156, -115.1727\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"time\": \"Morning\"\n        },\n        {\n          \"placeName\": \"The LINQ Promenade\",\n          \"placeDetails\": \"An outdoor shopping and dining complex with a giant observation wheel.\",\n          \"placeImageUrl\": \"https://www.thelinq.com/media/images/pages/home/homepage_hero_mobile.jpg\",\n          \"geoCoordinates\": \"36.1192, -115.1724\",\n          \"ticketPricing\": \"Free to enter, rides available for purchase\",\n          \"rating\": 4.0,\n          \"time\": \"Afternoon\"\n        }\n      ],\n      \"bestTime\": \"Daytime\"\n    }\n  }\n}\n```\n\n**Explanation:**\n\nThis JSON object provides a travel plan for a couple visiting Las Vegas on a cheap budget for three days. It includes the following information:\n\n* **Hotels:** A list of three budget-friendly hotels with relevant details such as name, address, price range, image URL, geo-coordinates, rating, and a brief description.\n* **Itinerary:** A day-by-day plan outlining suggested activities, including:\n    * **Place Name:** The name of the attraction or location.\n    * **Place Details:** A brief description of the place.\n    * **Place Image URL:** A URL to an image of the place.\n    * **Geo Coordinates:** Coordinates for easy location finding.\n    * **Ticket Pricing:** An indication of the cost of entry or any additional fees.\n    * **Rating:** A general rating based on popular reviews.\n    * **Time:** The recommended time of day to visit the place.\n    * **Best Time:** The overall best time of day for each day's plan.\n\n**Note:**\n\n* This is just a sample itinerary and can be adjusted based on your preferences.\n* The price range for hotels is approximate and may vary depending on the season and availability.\n* This plan focuses on free or low-cost activities. There are many other attractions in Las Vegas, some of which may require a higher budget.\n* It's always advisable to check the official websites for the latest information, pricing, and operating hours. \n" },
            ],
        },
    ],
});

