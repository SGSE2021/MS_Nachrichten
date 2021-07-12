import axios from "axios";
import Env from "../Env";

export const getMyCoursesLecturer = async (id) => {
    try {
        const courses = await axios.get(Env.BACK_URL + '/courses')
        const myCourses = []
        courses.data.forEach(course => {
            const docentList = course.docents.split(',')
            docentList.forEach(docentId => {
                if (docentId === id) {
                    myCourses.push(course)
                }
            })
        });
        return myCourses

    } catch (error) {
        // TODO
        console.error(error);
        return []
    }
}

export const getMyCoursesStudent = async (id) => {
    try {
        const courses = await axios.get(Env.BACK_URL + '/courses')
        const myCourses = []
        courses.data.forEach(course => {
            const studentsList = course.persons.split(',')
            studentsList.forEach(studentId => {
                if (studentId === id) {
                    myCourses.push(course)
                }
            })
        });
        return myCourses
    } catch (error) {
        // TODO
        console.error(error);
        return []
    }
}