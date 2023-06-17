import { createSlice } from '@reduxjs/toolkit';

export const audioPlayer = createSlice({
    name: 'audioPlayer',
    initialState: {
        currentSong: null,
        isPlaying: false,
        currTime: 0,
    },
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setCurrTime: (state, action) => {
            state.currTime = action.payload;
        }
    },
});

export const { setCurrentSong, setIsPlaying, setCurrTime } = audioPlayer.actions;
export default audioPlayer.reducer;