package main

import (
	"crypto/tls"
	"net/http"

	"github.com/OleGramit/InternalApi/controllers"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
	"gopkg.in/mgo.v2"
	// Third party packages
)

func getDBSession() *mgo.Session {
	// Connect to our local mongo
	s, err := mgo.Dial("mongodb://localhost")

	// Check if connection error, is mongo running?
	if err != nil {
		panic(err)
	}
	return s
}

func getUserManagementSession() *http.Client {
	client := &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{
				InsecureSkipVerify: true,
			},
		},
	}
	return client
}

func main() {
	// TODO: REMOVE STUBS

	r := httprouter.New()
	dbSession := getDBSession()
	userManagementClient := getUserManagementSession()

	userContr := controllers.NewUserController(userManagementClient)
	messageContr := controllers.NewMessageController(dbSession)

	r.GET("/users/lecturers", userContr.GetUsersLecturers)

	r.GET("/users/lecturers/:id", userContr.GetUsersLecturerById)

	r.GET("/users/students", userContr.GetUsersStudents)

	r.GET("/users/students/:id", userContr.GetUsersStudentById)

	r.GET("/messages/:id", messageContr.GetMessagesForUserId)

	r.POST("/messages", messageContr.AddMessage)

	r.DELETE("/messages/:id", messageContr.RemoveMessage)

	// r.GlobalOPTIONS = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// 	if r.Header.Get("Access-Control-Request-Method") != "" {
	// 		// Set CORS headers
	// 		header := w.Header()
	// 		header.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	// 		header.Set("Access-Control-Allow-Origin", "*")
	// 	}

	// 	// Adjust status code to 204
	// 	w.WriteHeader(http.StatusNoContent)
	// })

	_cors := cors.Options{
		AllowedMethods: []string{"POST", "GET", "DELETE", "OPTIONS"},
		AllowedOrigins: []string{"http://localhost:3000", "https://sgse2021.westeurope.cloudapp.azure.com"},
	}
	handler := cors.New(_cors).Handler(r)

	http.ListenAndServe("localhost:3333", handler)
}
