import { createSlice } from '@reduxjs/toolkit';

export const audioPlayerSlice = createSlice({
    name: 'audioPlayer',
    initialState: {
        currentSong: {
            song: "",
            action: "pause",
        },
    },
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
    },
});

export const { setCurrentSong } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;