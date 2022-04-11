import { createSlice } from '@reduxjs/toolkit'
import { DateTime, Settings } from 'luxon'
Settings.defaultZone = 'Asia/Taipei';

export const classDataSlice = createSlice({
    name: 'classData',
    initialState: [],
    reducers: {
        setData: {
            reducer: (state, action) => {
                const { data, day } = action.payload;
                if (!day) state[0] = data;
                    else state[day] = data;
            },
            prepare: (data, day) => ({
                payload: { data, day }
            })
        }
    }
});

export const fetchClassData = (currentDate, startOfWeek, day, location, coach) => {
    return async (dispatch) => {
        const inputDate = currentDate ? currentDate : startOfWeek;
        const isoDate = DateTime.fromObject(inputDate).toISO();
        const uri = encodeURIComponent(isoDate);
        const api = process.env.REACT_APP_API;
        let res;
        if (startOfWeek) {
            res = await fetch(`${api}/class/classes?startOfWeek=${uri}&day=${day}&location=${location.name}&coach=${coach.name}`);
        } else if (currentDate) {
            res = await fetch(`${api}/class/classes?currentDate=${uri}&location=${location.name}&coach=${coach.name}`);
        }
        res.json()
            .then(data => dispatch(setData(data, day)))
            .catch(err => console.log(err));
    }
}

export const { setData } = classDataSlice.actions;

export default classDataSlice.reducer;