package main

import (
	"crypto/tls"
	"log"
	"net/http"
	"os"

	"github.com/OleGramit/InternalApi/controllers"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
	"gopkg.in/mgo.v2"
	// Third party packages
)

func getDBSession() *mgo.Session {
	mongoDBUrl, ok := os.LookupEnv("DATABASE_URL")

	// if local
	if !ok {
		log.Println("DATABASE_URL NOT FOUND")
		mongoDBUrl = "mongodb://localhost"
	}

	// Connect to our local mongo
	s, err := mgo.Dial(mongoDBUrl)
	// Check if connection error, is mongo running?
	if err != nil {
		log.Println("DB ERROR CONNECTION NOT POSSIBLE", err)
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
	// If the file doesn't exist, create it or append to the file
	file, err := os.OpenFile("logs.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		log.Fatal(err)
	}

	log.SetOutput(file)

	// if local
	ownRestUrl, ok := os.LookupEnv("OWN_REST_URL")
	if !ok {
		ownRestUrl = "localhost:8080"
	}

	log.Println("ownRestUrl:", ownRestUrl)

	r := httprouter.New()
	dbSession := getDBSession()
	userManagementClient := getUserManagementSession()

	userContr := controllers.NewUserController(userManagementClient)

	databaseName, ok := os.LookupEnv("DATABASE_NAME")
	// if local
	if !ok {
		log.Println("DATABASE_NAME NOT FOUND")
		databaseName = "MS_Nachrichten_DB"
	}

	messageContr := controllers.NewMessageController(dbSession, databaseName)

	r.GET("/users/lecturers", userContr.GetUsersLecturers)

	r.GET("/users/lecturers/:id", userContr.GetUsersLecturerById)

	r.GET("/users/students", userContr.GetUsersStudents)

	r.GET("/users/students/:id", userContr.GetUsersStudentById)

	r.GET("/users/administratives", userContr.GetUsersadministratives)

	r.GET("/users/administratives/:id", userContr.GetUsersadministrativesById)

	r.GET("/message/:id", messageContr.GetMessagesForUserId)

	r.GET("/test", messageContr.Test)

	r.POST("/message", messageContr.AddMessage)

	r.DELETE("/message/:id", messageContr.RemoveMessage)

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
		AllowedOrigins: []string{"http://localhost:80", "https://sgse2021-ilias.westeurope.cloudapp.azure.com"},
	}
	handler := cors.New(_cors).Handler(r)

	// http.ListenAndServeTLS(":8080", "server.crt", "server.key", handler)
	http.ListenAndServe(":8080", handler)

	log.Println("END OF STORY")
}
