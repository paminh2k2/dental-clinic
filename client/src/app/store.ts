// store.ts
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import rootReducer, { RootState } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
