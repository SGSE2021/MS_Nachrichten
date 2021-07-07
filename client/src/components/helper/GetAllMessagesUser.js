import Env from '../Env'
import axios from 'axios';
import getUserById from './GetUsers';

export const getAllMessagesUser = async (id) => {
    try {
        // URL + /API/messages
        let messages = await axios.get(Env.BACK_URL + '/messages/' + id)
        messages = messages.data
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
    } catch (error) {
        // TODO
        console.error(error);
    }
}

export default getAllMessagesUser