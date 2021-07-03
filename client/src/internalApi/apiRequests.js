import axios from 'axios';

export default async function getAllMessages() {
    try {
        const response = await axios.get('http://localhost:3333/messages')
        console.log(response.data);
        return response.data
    } catch (error) {
        // TODO
        console.error(error);
    }
    // const messages = axios.get('http://localhost:3333/messages')
    //     .then(res => {
    //         return res.data
    //     })
    //     .catch(err => {
    //         // TODO
    //         console.log(err);
    //     });
    // console.log(messages);

}

