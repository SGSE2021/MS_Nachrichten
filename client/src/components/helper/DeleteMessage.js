import Env from '../Env'
import axios from 'axios';

export const deleteMessage = async (id) => {
    console.log("DELETE:", Env.BACK_URL + '/message/', id)
    let res = await axios.delete(Env.BACK_URL + '/message/' + id);

    let data = res.data;
    console.log(data);
}

export default deleteMessage