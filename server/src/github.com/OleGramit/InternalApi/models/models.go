package models

import "gopkg.in/mgo.v2/bson"

// Users []User
// Messages []Message
// Message

type (
	Student struct {
		UserID              string `json:"id"`
		Active              bool   `json:"active"`
		FirstName           string `json:"firstname"`
		MatriculationNumber string `json:"matriculationNumber"`
		Course              Course `json:"course"`
		Birthdate           string `json:"birthdate"`
		Gender              string `json:"gender"`
		Mail                string `json:"mail"`
		Title               string `json:"title"`
		Phone               string `json:"phone"`
		Semester            int    `json:"semester"`
	}
)

type (
	Course struct {
		CourseID     int        `json:"id"`
		Name         string     `json:"name"`
		Degree       string     `json:"degree"`
		DepartmentId int        `json:"departmentId"`
		Department   Department `json:"department"`
	}
)

type (
	Department struct {
		DepartmentID int    `json:"id"`
		Name         string `json:"name"`
		Description  string `json:"description"`
	}
)

type (
	Lecturer struct {
		UserID       string     `json:"id"`
		Title        string     `json:"title"`
		FirstName    string     `json:"firstname"`
		LastName     string     `json:"lastname"`
		Gender       string     `json:"gender"`
		Birthdate    string     `json:"birthdate"`
		Mail         string     `json:"mail"`
		Phone        string     `json:"phone"`
		Active       bool       `json:"active"`
		DepartmentID int        `json:"departmentId"`
		Department   Department `json:"department"`
	}
)

type (
	Message struct {
		MessageID    bson.ObjectId `json:"id" bson:"_id"`
		SenderID     string        `json:"senderID" bson:"senderID"`
		RecipientIDs []string      `json:"recipientIDs" bson:"recipientIDs"`
		MessageBody  string        `json:"body" bson:"body"`
	}
)

type (
	Messages struct {
		Messages []Message `json:"messages" bson:"messages"`
	}
)
