import Env from '../Env'
import axios from 'axios';

export const sendMessage = async (message) => {
    try {
        await axios.post(Env.BACK_URL + '/message', message);
    } catch (error) {
        console.error(error);
    } 
}

export default sendMessage