// if(process.env.NODE_ENV === 'production'){
//     "http://sgse2021.westeurope.cloudapp.azure.com/messages/api:8080"
// }

export default {
    BACK_URL: process.env.NODE_ENV === 'production' ? "https://sgse2021-ilias.westeurope.cloudapp.azure.com/messages-api" : "https://sgse2021-ilias.westeurope.cloudapp.azure.com/messages-api"
}