import Env from '../Env'
import axios from 'axios';

export const deleteMessage = async (id) => {
    let res = await axios.delete(Env.BACK_URL + '/message/' + id);

    let data = res.data;
}

export default deleteMessage