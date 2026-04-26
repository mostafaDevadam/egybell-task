import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './auth.reducer';
import { useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
    reducer: {
        "auth": AuthSlice
    },
});
export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();
