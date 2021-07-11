package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/OleGramit/InternalApi/models"
	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

var MessageStubLen int = 10

type (
	UserController struct {
		client  *http.Client
		restApi string
	}
)

type (
	MessageController struct {
		session *mgo.Session
		dbName  string
	}
)

func NewUserController(client *http.Client) *UserController {
	// if local
	userRestUrl, ok := os.LookupEnv("USER_REST_URL")
	if !ok {
		userRestUrl = "http://localhost:8181/"
	}
	return &UserController{client, userRestUrl}
}

func NewMessageController(session *mgo.Session, databaseName string) *MessageController {
	return &MessageController{session, databaseName}
}

// GET Users
func (uc UserController) GetUsersLecturers(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	log.Println("GetUsersLecturers:")

	log.Println("GetUsersLecturers_url:", uc.restApi+"lecturers")
	resp, err := uc.client.Get(uc.restApi + "lecturers")
	if err != nil {
		log.Fatalln(err)
	}
	log.Println("GetUsersLecturers_resp:", resp)

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	// Convert response body to Todo struct
	var lecturers []models.Lecturer
	json.Unmarshal(bodyBytes, &lecturers)

	// Marshal provided interface into JSON structure
	uj, _ := json.Marshal(lecturers)

	log.Println("GetUsersLecturers_resp:", uj)

	w.WriteHeader(200)
	fmt.Fprintf(w, "%s", uj)
}

func (uc UserController) GetUsersLecturerById(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	id := p.ByName("id")

	resp, err := uc.client.Get(uc.restApi + "lecturers/" + id)
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	// Convert response body to Todo struct
	var lecturer models.Lecturer
	json.Unmarshal(bodyBytes, &lecturer)

	// Marshal provided interface into JSON structure
	uj, _ := json.Marshal(lecturer)

	w.WriteHeader(200)
	fmt.Fprintf(w, "%s", uj)
}

func (uc UserController) GetUsersStudents(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	resp, err := uc.client.Get(uc.restApi + "students")
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	// Convert response body to Todo struct
	var lecturers []models.Student
	json.Unmarshal(bodyBytes, &lecturers)

	// Marshal provided interface into JSON structure
	uj, _ := json.Marshal(lecturers)

	w.WriteHeader(200)
	fmt.Fprintf(w, "%s", uj)
}

func (uc UserController) GetUsersStudentById(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	id := p.ByName("id")

	resp, err := uc.client.Get(uc.restApi + "students/" + id)
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	// Convert response body to Todo struct
	var student models.Student
	json.Unmarshal(bodyBytes, &student)

	// Marshal provided interface into JSON structure
	uj, _ := json.Marshal(student)

	w.WriteHeader(200)
	fmt.Fprintf(w, "%s", uj)
}

func (uc UserController) GetUsersadministratives(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	resp, err := uc.client.Get(uc.restApi + "administratives")
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	// Convert response body to Todo struct
	var lecturers []models.Student
	json.Unmarshal(bodyBytes, &lecturers)

	// Marshal provided interface into JSON structure
	uj, _ := json.Marshal(lecturers)

	w.WriteHeader(200)
	fmt.Fprintf(w, "%s", uj)
}

func (uc UserController) GetUsersadministrativesById(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	id := p.ByName("id")

	resp, err := uc.client.Get(uc.restApi + "administratives/" + id)
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	// Convert response body to Todo struct
	var student models.Student
	json.Unmarshal(bodyBytes, &student)

	// Marshal provided interface into JSON structure
	uj, _ := json.Marshal(student)

	w.WriteHeader(200)
	fmt.Fprintf(w, "%s", uj)
}

// GET Messages
func (mc MessageController) GetMessagesForUserId(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	id := p.ByName("id")

	messages := []models.Message{}

	// Fetch message db.getCollection("messages").find({"recipientIDs":"YGWRONITaNW3fwvTcxGjllop4fA2"}).pretty()
	if err := mc.session.DB(mc.dbName).C("messages").Find(bson.D{{"recipientIDs", id}}).All(&messages); err != nil {
		w.WriteHeader(404)
		return
	}
	uj, _ := json.Marshal(messages)

	w.WriteHeader(200)
	fmt.Fprintf(w, "%s", uj)
}

func (mc MessageController) Test(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	log.Println("Test:")

	messages := "Hello There!"
	uj, _ := json.Marshal(messages)
	log.Println("Test_uj:", uj)

	w.WriteHeader(200)
	log.Println("Test_w:", w)

	fmt.Fprintf(w, "%s", uj)
}

// POST Message
func (mc MessageController) AddMessage(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	message := models.Message{}

	json.NewDecoder(r.Body).Decode(&message)

	message.MessageID = bson.NewObjectId()

	mc.session.DB(mc.dbName).C("messages").Insert(message)

	uj, _ := json.Marshal(message)

	w.WriteHeader(201)
	fmt.Fprintf(w, "%s", uj)
}

// DELETE Message
func (mc MessageController) RemoveMessage(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	id := p.ByName("id")

	// Verify id is ObjectId, otherwise bail
	if !bson.IsObjectIdHex(id) {
		w.WriteHeader(404)
		return
	}

	// Grab id
	oid := bson.ObjectIdHex(id)

	if err := mc.session.DB(mc.dbName).C("messages").RemoveId(oid); err != nil {
		w.WriteHeader(404)
		return
	}

	w.WriteHeader(200)
}
