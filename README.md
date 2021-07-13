# MS_Nachrichten
MS_Nachrichten ist ein Microservice zum senden und empfangen von Nachrichten. Erreichbar über https://sgse2021-ilias.westeurope.cloudapp.azure.com/messages/ wenn man vorher angemeldet ist.
Es ist eine Sigle Page Applikation mit einem Tab zum einsehen der empfangenden Nachrichten und einem Tab zum Senden der Nachrichten. Bei der Auswahl der Empfänger können je nach angemeldetem Benutzer verschiedene Filter gesetzt werden.

## API
Die API für MS_Nachrichten ist unter https://sgse2021-ilias.westeurope.cloudapp.azure.com/messages-api/ zu erreichen.

## Frontend
Das Frontend wird in einem Container ausgeführt und ist eine NodeJs Anwendung, welche auf einem nginx Server läuft. Verwendet wurden ReactJs als Frontend Framework und Material-Ui als design.

## Backend
Das Backend ist eine Golang anwendung, welche ebenfalls in einem Container ausgeführt wird. Hier wurden die module "github.com/julienschmidt/httprouter"  und "net/http" für Netzwerkkommunikation verwendet. Und "gopkg.in/mgo.v2" für die Kommunikation mit das Datenbank.
