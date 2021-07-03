package models

// Users []User
// Messages []Message
// Message

type (
	User struct {
		Name      string   `json:"name"`
		FirstName string   `json:"firstName"`
		UserID    string   `json:"id"`
		Curses    []string `json:"courses"`
	}
)

type (
	Users struct {
		Users []User `json:"users"`
	}
)

type (
	Message struct {
		MessageID   string   `json:"messageId"`
		SenderID    string   `json:"senderId"`
		RecipientID []string `json:"recipientId"`
		MessageBody string   `json:"body"`
		IsRead      int      `json:"isRead"`
	}
)

type (
	Messages struct {
		Messages []Message `json:"messages"`
	}
)
