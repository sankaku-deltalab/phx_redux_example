// redux-toolkit example is https://github.com/reduxjs/cra-template-redux-typescript/blob/b51ba63367aabc8a167f1881a688889bf86bb83e/template/src/features/counter/counterSlice.ts
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ClientSider} from 'js/hooks/client-sider';
import {RootState, AppThunk} from '../../app/store';

type ExampleState = {
  value: number;
};

const initialState: ExampleState = {
  value: 0,
};

export const incrementByAmount = createAsyncThunk('example/incrementByAmount', async (amount: number, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const currentValue = selectValue(state);
  const nextValue = currentValue + amount;
  const over10 = currentValue <= 10 && nextValue > 10;
  const idOfClientSider = 'cs';
  if (over10) ClientSider.sendMessageToServer(idOfClientSider, 'countOver10', {count: nextValue});
  return {amount};
});

export const incrementByAmount2 =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    // we can write thunk action without extraReducers
    const currentValue = selectValue(getState());
    const nextValue = currentValue + amount;
    const over10 = currentValue <= 10 && nextValue > 10;
    const idOfClientSider = 'cs';
    if (over10) ClientSider.sendMessageToServer(idOfClientSider, 'countOver10', {count: nextValue});
    dispatch(incrementByAmountPlain(amount));
  };

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmountPlain: (state, action: PayloadAction<number>) => {
      // no subeffect version
      state.value += action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(incrementByAmount.pending, state => {});
    builder.addCase(incrementByAmount.fulfilled, (state, action) => {
      state.value += action.payload.amount;
    });
    builder.addCase(incrementByAmount.rejected, state => {});
  },
});

const {incrementByAmountPlain} = exampleSlice.actions;
export const {increment, decrement} = exampleSlice.actions;

export const selectValue = (state: RootState) => state.example.value;

export default exampleSlice.reducer;
