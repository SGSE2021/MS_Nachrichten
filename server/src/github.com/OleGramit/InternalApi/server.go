package main

import (
	"net/http"

	// Third party packages
	"github.com/OleGramit/InternalApi/controllers"
	"github.com/julienschmidt/httprouter"
)

func main() {
	// TODO: REMOVE STUBS

	r := httprouter.New()

	userContr := controllers.NewUserController()
	messageContr := controllers.NewMessageController()

	r.GET("/users", userContr.GetUsers)

	r.GET("/messages", messageContr.GetMessages)

	r.POST("/message/:id", messageContr.AddMessage)

	r.DELETE("/message/:id", messageContr.RemoveMessage)

	http.ListenAndServe("localhost:3001", r)
}
