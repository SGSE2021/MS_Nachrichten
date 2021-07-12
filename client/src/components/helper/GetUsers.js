import Env from '../Env'
import axios from 'axios';


export const getUserById = async (userId) => {
    try {
        // URL + /API/messages
        let user = await axios.get(Env.BACK_URL + '/users/students/' + userId)
        if (user.data.id === "") {
            user = await axios.get(Env.BACK_URL + '/users/lecturers/' + userId)
        }
        if (user.data.id === "") {
            user = await axios.get(Env.BACK_URL + '/users/administratives/' + userId)
        }
        return user
    } catch (error) {
        console.error(error);
        return []
    }

}
export default getUserById

export const getAllStudents = async () => {
    try {
        const student = await axios.get(Env.BACK_URL + '/users/students')
        return student.data

    } catch (error) {
        console.error(error);
        return []
    }
}

export const getAllLecturers = async () => {
    try {
        const lecturers = await axios.get(Env.BACK_URL + '/users/lecturers')
        return lecturers.data

    } catch (error) {
        console.error(error);
        return []
    }
}

export const getAllAdministratives = async () => {
    try {
        const administratives = await axios.get(Env.BACK_URL + '/users/administratives')
        return administratives.data

    } catch (error) {
        console.error(error);
        return []
    }
}