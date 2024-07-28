import { create } from 'zustand'

interface CityState {
	selectedCity: City | undefined
	setSelectedCity: (city: City) => void
}

export const useCityStore = create<CityState>(set => ({
	selectedCity: undefined,
	setSelectedCity: city => set({ selectedCity: city }),
}))
