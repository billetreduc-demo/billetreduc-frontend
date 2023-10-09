import axios from '@/api/config/axios';

const addPlayReservation = async (playId) => {
    try {
        const response = await axios.post(`/plays/${playId}/reservation`);
        return response.data;
    } catch (error) {
        console.error('Error adding play reservation: ', error);
        throw error;
    }
}

const getPlays = async () => {
    try {
        const response = await axios.get('/plays');
        return response.data;
    } catch (error) {
        console.error('Error fetching plays: ', error);
        throw error;
    }
}

const searchPlays = async (searchTerm) => {
    try {
        const response = await axios.get(`/plays/search?searchTerm=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('Error searching plays: ', error);
        throw error;
    }
}

export default {
    getPlays,
    searchPlays,
    addPlayReservation
}