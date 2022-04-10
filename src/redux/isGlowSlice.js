import { createSlice } from '@reduxjs/toolkit'

export const isGlowSlice = createSlice({
    name: 'isGlow',
    initialState: {
        day: [],
        location: { Camberwell: [], "St Roch's": [] },
        quarterHour: []
    },
    reducers: {
        setIsGlow: {
            reducer: (state, action) => {
                const { dayIndex, location, courtIndex, quarterHourIndex, boolean } = action.payload;
                if (dayIndex) state.day[dayIndex] = boolean;
                if (courtIndex) state.location[location.name][courtIndex] = boolean;
                state.quarterHour[quarterHourIndex] = boolean;
            },
            prepare: (dayIndex, location, courtIndex, quarterHourIndex, boolean) => ({
                payload: { dayIndex, location, courtIndex, quarterHourIndex, boolean }
            })
        }
    }
});
export const selectIsGlow = state => state.isGlow.value;
export const { setIsGlow } = isGlowSlice.actions;

export default isGlowSlice.reducer;