// export interface UserInfoDTO{
//     uid:string,
//     firstname:string
//     lastname:string
//     role:RoleDTO
// }

// export enum RoleDTO {
//     STUDENT=1,
//     ADMINSTRATIVE,
//     LECTURER
// }

export const getLoggedUser = () => {

    // TODO REMOVE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // localStorage.setItem("current-user", JSON.stringify({
    //     "uid": "AWf5YNlnWmWLX4ooEbPh9qIRUpP2",
    //     "firstname": "Ole",
    //     "lastname": "Gramit",
    //     "role": 1,
    // }))
    const currentUserString = localStorage.getItem("current-user");
    return JSON.parse(currentUserString)
}

export default getLoggedUser