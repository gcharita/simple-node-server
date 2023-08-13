import * as express from "express"
import * as session from "express-session"
import { v4 as uuidv4 } from "uuid"

class ResponseObject {
    public id: string
    public name: string

    constructor(id: string, name: string) {
        this.id = id
        this.name = name
    }
}

const app = express()
app.set("port", 8080)
app.use(express.json())

const cookieExpirationDays = 1

app.use(
    session({
        cookie: {
            // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * cookieExpirationDays),
            httpOnly: true,
        },
        genid: (request) => {
            // eslint-disable-next-line no-console
            console.log(`Genid request sessionID: ${request.sessionID}`)
            return uuidv4() // use UUIDs for session IDs
        },
        name: "JSESSIONID",
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
    }),
)

app.get("/test", (request, response) => {
    const headers = JSON.stringify(request.headers, null, 4)
    const body = JSON.stringify(request.body, null, 4)
    // eslint-disable-next-line no-console
    console.info(`Received request \nmethod: ${request.method} \nheaders: ${headers} \nbody: ${body}\n`)

    const object = new ResponseObject("1", "some name")
    response.set({
        "Custom-Header": "Some-custom-header-value",
    })
    // response.status(400)
    response.json(object)
})

app.listen(app.get("port"), () => {
    // eslint-disable-next-line no-console
    console.info(`Started server at http://localhost:${app.get("port")}`)
})
