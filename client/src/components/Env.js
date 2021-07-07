// if(process.env.NODE_ENV === 'production'){
//     "http://sgse2021.westeurope.cloudapp.azure.com/messages/api:8080"
// }

export default {
    BACK_URL: process.env.NODE_ENV === 'production' ? "http://sgse2021.westeurope.cloudapp.azure.com/api/nachrichten:8181" : "http://localhost:3333"
}

