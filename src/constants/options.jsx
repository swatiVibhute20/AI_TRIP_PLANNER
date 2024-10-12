export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveles in exploration',
        icon: '🚵',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two traveles in tandem',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people: '5 to 8 people'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill seekers',
        icon: '🛳️',
        people: '5 to 10 people'
    },
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '🪙',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Don't worry about cost",
        icon: '💸',
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {noOfDays} Days for {travelers} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {noOfDays} days with each day plan with best time to visit in JSON format. Itinerary should be a list of maps for each day where day would map to the corresponding day'