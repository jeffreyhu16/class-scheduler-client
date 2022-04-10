import { configureStore } from '@reduxjs/toolkit'
import classDataReducer from './classDataSlice'
import isGlowSliceReducer from './isGlowSlice';

export default configureStore({
    reducer: {
        // classData: classDataReducer
        isGlow: isGlowSliceReducer
    }
});