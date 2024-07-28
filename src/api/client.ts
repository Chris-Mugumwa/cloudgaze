import axios from 'axios'

/**
 *    Root where I declare api urls for React Query.
 *
 *    I chose to use react query as I am a bit more familiar with it compared to
 *    Next 14's server & client side components. For the past year I have been *    using React Native so I still need to catch up to the current web meta *    since due to time constraints I have decided to use a data fetching and *    caching package I am familiar with to get this project completed in time.
 */

export const client = axios.create({
	baseURL: `https://api.openweathermap.org/data/2.5/forecast`,
})
