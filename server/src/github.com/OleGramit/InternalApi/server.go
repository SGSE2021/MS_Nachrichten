package main

import (
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

func main() {
	// TODO: REMOVE STUBS

	r := httprouter.New()
	dbSession := getDBSession()

	// userContr := controllers.NewUserController(dbSession)
	messageContr := controllers.NewMessageController(dbSession)

	// r.GET("/users", userContr.GetUsers)

	// r.GET("/users/:id", userContr.GetUser)

	r.GET("/messages", messageContr.GetMessages)

	r.POST("/messages", messageContr.AddMessage)

	// r.DELETE("/message/:id", messageContr.RemoveMessage)

	http.ListenAndServe("localhost:3333", r)
}
