export const getLoggedUser = () => {
    // 3-> lecturers 2->admin 1->student
    // For development
    // localStorage.setItem("current-user", JSON.stringify({
    //     "uid": "LhlFb8g5C6hu8cTMntTdgyR4z7X2",
    //     "firstname": "Ole",
    //     "lastname": "Gramit",
    //     "role": 1,
    // }))
    // localStorage.setItem("current-user", JSON.stringify({
    //     "uid": "5LyrEGMQiURCDarRpEA99Lk0GYU2",
    //     "firstname": "Ole",
    //     "lastname": "Gramit",
    //     "role": 2,
    // }))
    // localStorage.setItem("current-user", JSON.stringify({
    //     "uid": "ONtaXe1UQbSiTmR6Bv1rHCVu7uY2",
    //     "firstname": "Ole",
    //     "lastname": "Gramit",
    //     "role": 3,
    // }))
    return JSON.parse(localStorage.getItem("current-user"));
}
export default getLoggedUser