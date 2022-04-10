import { configureStore } from '@reduxjs/toolkit'
import classData from './classDataSlice'
import isGlow from './isGlowSlice';

export default configureStore({
    reducer: {
        classData,
        isGlow
    }
});