import Env from '../Env'
import axios from 'axios';

export const getAllMessagesUser = async (id) => {
    async function getUserById(userId) {
        try {
            // URL + /API/messages
            let user = await axios.get(Env.BACK_URL + '/users/students/' + userId)
            if (user.data.id === "") {
                user = await axios.get(Env.BACK_URL + '/users/lecturers/' + userId)
            }
            if (user.data.id === "") {
                // const user = await axios.get(Env.BACK_URL + '/users/students/' + userId) //TODO
            }
            return user
        } catch (error) {
            // TODO
            console.error(error);
        }
    }

    try {
        // URL + /API/messages
        let messages = await axios.get(Env.BACK_URL + '/messages/' + id)
        messages = messages.data
        for (let i = 0; i < messages.length; i++) {
            const user = await getUserById(messages[i].senderID)
            messages[i].senderName = user.data.firstname + " " + user.data.lastname
        }

        return(messages)
    } catch (error) {
        // TODO
        console.error(error);
    }
}

export default getAllMessagesUser