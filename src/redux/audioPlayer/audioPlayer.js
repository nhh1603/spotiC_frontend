import { createSlice } from '@reduxjs/toolkit';

export const audioPlayerSlice = createSlice({
    name: 'audioPlayer',
    initialState: {
        currentSong: {
            song: "",
            action: "pause",
            volume: 30,
        },
        audioRef: null,
    },
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
        setAudioRef: (state, action) => {
            state.audioRef = action.payload;
        }
    },
});

export const { setCurrentSong, setAudioRef } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;