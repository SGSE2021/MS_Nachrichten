package models

import "gopkg.in/mgo.v2/bson"

// Users []User
// Messages []Message
// Message

type (
	User struct {
		UserID    bson.ObjectId `json:"_id"`
		Name      string        `json:"name"`
		FirstName string        `json:"firstName"`
		UserType  string        `json:"userType"`
		Curses    []string      `json:"courses"`
	}
)

type (
	Users struct {
		Users []User `json:"users"`
	}
)

type (
	Message struct {
		SenderID     string   `json:"senderID"`
		RecipientIDs []string `json:"recipientIDs"`
		MessageBody  string   `json:"body"`
		IsRead       int      `json:"isRead"`
	}
)

type (
	Messages struct {
		Messages []Message `json:"messages"`
	}
)
