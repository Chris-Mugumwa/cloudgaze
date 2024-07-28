import { create } from 'zustand'

interface SetGroupedData {
	groupedData: GroupedDateData | undefined
	setGroupedData: (data: GroupedDateData) => void
}

export const useGroupedDataStore = create<SetGroupedData>(set => ({
	groupedData: undefined,
	setGroupedData: data => set({ groupedData: data }),
}))

interface SetSelectedDay {
	selectedDay: string
	setSelectedDay: (day: string) => void
}

export const useSelectedDayStore = create<SetSelectedDay>(set => ({
	selectedDay: new Date().toLocaleDateString(),
	setSelectedDay: day => set({ selectedDay: day }),
}))
