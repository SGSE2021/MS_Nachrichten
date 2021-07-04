package controllers

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"

	"github.com/OleGramit/InternalApi/models"
	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2"
)

var MessageStubLen int = 10

// var MessagesStub []models.Message = CreateMessagesStub(MessageStubLen)

// var UserStub []models.User = createUsers()

type (
	UserController struct {
		session *mgo.Session
	}
)

type (
	MessageController struct {
		session *mgo.Session
	}
)

func NewUserController(session *mgo.Session) *UserController {
	return &UserController{session}
}

func NewMessageController(session *mgo.Session) *MessageController {
	return &MessageController{session}
}

// ************************************************
// TODO: REMOVE
// ************************************************

// helper
func getCourses() []string {
	allCourses := []string{
		"Test_Course_01",
		"Test_Course_02",
		"Test_Course_03",
		"Test_Course_04",
		"Test_Course_05",
	}
	tempCourses := make([]string, 0)
	if rand.Intn(10)%2 == 0 {
		tempCourses = append(tempCourses, allCourses[2])
	}
	if rand.Intn(10)%3 == 0 {
		tempCourses = append(tempCourses, allCourses[3])
	}
	tempCourses = append(tempCourses, allCourses[0])
	return tempCourses
}

// func createMessage(messageId int) models.Message {
// 	tempRecipientIds := make([]string, 0)
// 	for i := 0; i < rand.Intn(10); i++ {
// 		tempRecipientIds = append(tempRecipientIds, fmt.Sprintf("Recipient Name %d", i))
// 	}

// 	tempMessage := "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper	eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpatac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus."

// 	return models.Message{
// 		MessageID:      fmt.Sprintf("ID_%d", messageId),
// 		SenderName:     fmt.Sprintf("Sender Name %d", rand.Intn(10)),
// 		RecipientNames: tempRecipientIds,
// 		MessageBody:    tempMessage,
// 		IsRead:         rand.Intn(1),
// 	}
// }

func randomUserType() string {
	randInt := rand.Intn(2)
	if randInt == 0 {
		return "Studierende"
	}
	if randInt == 0 {
		return "Lehrende"
	}
	return "Administrative"
}

// func createUsers() []models.User {
// 	tempUsers := make([]models.User, 0)

// 	for i := 0; i < 20; i++ {
// 		tempUsers = append(tempUsers, models.User{
// 			Name:      fmt.Sprintf("Name_%d", i),
// 			FirstName: fmt.Sprintf("FirstName_%d", i),
// 			UserID:    fmt.Sprintf("ID_%d", i),
// 			UserType:  randomUserType(),
// 			Curses:    getCourses(),
// 		})

// 	}
// 	return tempUsers
// }

// List of all Users Stub
// func getAllUsers() models.Users {
// 	return models.Users{
// 		Users: UserStub,
// 	}
// }

// func getUserById(userId string) models.User {
// 	for i := 0; i <= len(UserStub); i++ {
// 		if UserStub[i].UserID == userId {
// 			return UserStub[i]
// 		}
// 	}
// 	return UserStub[0]
// }

// List of all messages stub
// func CreateMessagesStub(numberOfMessages int) []models.Message {
// 	tempMessages := make([]models.Message, 0)
// 	for i := 0; i < numberOfMessages; i++ {
// 		tempMessages = append(tempMessages, createMessage(i))
// 	}
// 	return tempMessages
// }

// func removeMessageById(messageId string) bool {
// 	for i := 0; i <= len(MessagesStub); i++ {
// 		if MessagesStub[i].MessageID == messageId {
// 			MessagesStub[i] = MessagesStub[len(MessagesStub)-1]
// 			return true
// 		}
// 	}
// 	return false
// }

// func getMessageById(messageId string) models.Message {
// 	for i := 0; i <= len(MessagesStub); i++ {
// 		if MessagesStub[i].MessageID == messageId {
// 			return MessagesStub[i]
// 		}
// 	}
// 	return createMessage(0)
// }

// ************************************************
// TODO: REMOVE
// ************************************************

// GET Users
// func (uc UserController) GetUsers(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
// 	// Stub all users
// 	users := getAllUsers()

// 	// Marshal provided interface into JSON structure
// 	uj, _ := json.Marshal(users)

// 	// Write content-type, statuscode, payload
// 	header := w.Header()
// 	header.Set("Content-Type", "application/json")
// 	header.Set("Access-Control-Allow-Methods", header.Get("Allow"))
// 	header.Set("Access-Control-Allow-Origin", "*")
// 	w.WriteHeader(200)
// 	fmt.Fprintf(w, "%s", uj)
// }

// func (uc UserController) GetUser(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
// 	// Stub all users
// 	user := getUserById(p.ByName("userID"))

// 	// Marshal provided interface into JSON structure
// 	uj, _ := json.Marshal(user)

// 	// Write content-type, statuscode, payload
// 	header := w.Header()
// 	header.Set("Content-Type", "application/json")
// 	header.Set("Access-Control-Allow-Methods", header.Get("Allow"))
// 	header.Set("Access-Control-Allow-Origin", "*")
// 	w.WriteHeader(200)
// 	fmt.Fprintf(w, "%s", uj)
// }

// GET Messages
func (mc MessageController) GetMessages(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	// Stub all messages
	messages := models.Messages{}

	// Fetch message
	if err := mc.session.DB("MS_Nachrichten_DB").C("Messages").Find(nil).All(&messages); err != nil {
		w.WriteHeader(404)
		return
	} else {
		fmt.Print("MESSAGES:", messages)
	}

	uj, _ := json.Marshal(messages)

	header := w.Header()
	header.Set("Content-Type", "application/json")
	header.Set("Access-Control-Allow-Methods", header.Get("Allow"))
	header.Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(200)
	fmt.Fprintf(w, "%s", uj)
}

// POST Message
func (mc MessageController) AddMessage(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	message := models.Message{}

	json.NewDecoder(r.Body).Decode(&message)

	// message.MessageID = bson.NewObjectId()

	mc.session.DB("MS_Nachrichten_DB").C("messages").Insert(message)

	uj, _ := json.Marshal(message)

	header := w.Header()
	header.Set("Content-Type", "application/json")
	header.Set("Access-Control-Allow-Methods", header.Get("Allow"))
	header.Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(201)
	fmt.Fprintf(w, "%s", uj)
}

// // DELETE Message
// func (mc MessageController) RemoveMessage(w http.ResponseWriter, r *http.Request, p httprouter.Params) {

// 	// TODO DO WHEN DATABASE
// 	result := removeMessageById(p.ByName("messageId"))

// 	header := w.Header()
// 	header.Set("Content-Type", "application/json")
// 	header.Set("Access-Control-Allow-Methods", header.Get("Allow"))
// 	header.Set("Access-Control-Allow-Origin", "*")
// 	if result {
// 		fmt.Printf("Messages Remaining: %d", len(MessagesStub))
// 		w.WriteHeader(200)
// 	}
// 	w.WriteHeader(500)
// }
