import Env from '../Env'
import axios from 'axios';

export const sendMessage = async (message) => {
    let res = await axios.post(Env.BACK_URL + '/messages', message);

    let data = res.data;
    console.log(data);
}

export default sendMessage