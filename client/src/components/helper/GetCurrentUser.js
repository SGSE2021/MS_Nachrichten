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
    //     "uid": "c4PDuisvvQOlc4PgEYcUlDZ1t9r2",
    //     "firstname": "test",
    //     "lastname": "test",
    //     "role": 2,
    // }))

    const currentUserString = localStorage.getItem("current-user");
    return JSON.parse(currentUserString)
}

export default getLoggedUser