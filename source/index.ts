import * as bodyParser from "body-parser"
import * as express from "express"

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
app.use(bodyParser.json())
app.post("/test", (request, response) => {
  // tslint:disable-next-line:no-console
  console.info(
    `Received request \nheaders: ${JSON.stringify(request.headers, null, 3)} \nbody: ${JSON.stringify(
      request.body,
      null,
      3
    )}\n`
  )

  const object = new ResponseObject("1", "some name")
  response.set({
    "Content-Type": "application/json",
    "Custom-Header": "Some-custom-header-value"
  })
  // response.status(400)
  response.json(object)
})
app.listen(app.get("port"), () => {
  // tslint:disable-next-line:no-console
  console.info(`Started server at http://localhost:${app.get("port")}`)
})
