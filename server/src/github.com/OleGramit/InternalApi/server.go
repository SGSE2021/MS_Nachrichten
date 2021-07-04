package main

import (
	"crypto/tls"
	"net/http"

	"gopkg.in/mgo.v2"

	// Third party packages
	"github.com/OleGramit/InternalApi/controllers"
	"github.com/julienschmidt/httprouter"
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

	r.GET("/users/students", userContr.GetUsersStudents)

	r.GET("/messages", messageContr.GetMessages)

	r.POST("/messages", messageContr.AddMessage)

	r.PUT("/messages/:id", messageContr.UpdateMessage)

	r.DELETE("/messages/:id", messageContr.RemoveMessage)

	http.ListenAndServe("localhost:3333", r)
}
