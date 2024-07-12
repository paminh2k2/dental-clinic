// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit'

import projectReducer from '../features/project/projectSlice' // Import your other slices here

const rootReducer = combineReducers({
  project: projectReducer,
  // Add other reducers here
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
