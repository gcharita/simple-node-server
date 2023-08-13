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

// const cookieExpirationDays = 1

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

app.get("/redirect", (request, response) => {
    logRequest(request)

    response.redirect("https://www.google.com")
})

app.get("/file", (request, response) => {
    logRequest(request)

    // authentication middleware

    const auth = { login: "yourlogin", password: "yourpassword" } // change this

    // parse login and password from headers
    const b64auth = (request.headers.authorization ?? "").split(" ")[1] || ""
    const [login, password] = Buffer.from(b64auth, "base64").toString().split(":")

    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
        // Access granted...

        const file = `${__dirname}/feed_test.xml` // path to a file in dist directory
        // response.status(400)
        response.sendFile(file)
        return
    }

    // Access denied...
    response.set("WWW-Authenticate", 'Basic realm="401"') // change this
    response.status(401).send("Authentication required.") // custom message
})

app.get("/json", (request, response) => {
    logRequest(request)

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

// Helpers
function logRequest(request: express.Request) {
    const headers = JSON.stringify(request.headers, null, 4)
    const body = JSON.stringify(request.body, null, 4)
    // eslint-disable-next-line no-console
    console.info(`Received request \nmethod: ${request.method} \nheaders: ${headers} \nbody: ${body}\n`)
}
