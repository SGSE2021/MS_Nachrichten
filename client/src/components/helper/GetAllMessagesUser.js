import Env from '../Env'
import axios from 'axios';
import getUserById from './GetUsers';

export const getAllMessagesUser = async (id) => {
    let messages=[]
    try {
        // URL + /API/message
        messages = await axios.get(Env.BACK_URL + '/message/' + id)
        messages = messages.data
    } catch (error) {
        // TODO
        console.error(error);
        return messages
    }
    for (let i = 0; i < messages.length; i++) {
        try {
            const user = await getUserById(messages[i].senderID)
            messages[i].senderName = user.data.firstname + " " + user.data.lastname
        } catch (error) {
            // TODO
            console.error(error);
        }
        const user = await getUserById(messages[i].senderID)
        messages[i].senderName = user.data.firstname + " " + user.data.lastname
    }
    return (messages)

}

export default getAllMessagesUser