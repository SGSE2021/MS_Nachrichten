import Env from '../Env'
import axios from 'axios';

export const deleteMessage = async (id) => {
    await axios.delete(Env.BACK_URL + '/message/' + id);
}

export default deleteMessage