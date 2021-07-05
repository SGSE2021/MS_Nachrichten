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

export const getLoggedUser = () =>{
    const currentUserString = localStorage.getItem( "current-user" );
    const currentUserObject = JSON.parse(currentUserString )
}

export default getLoggedUser