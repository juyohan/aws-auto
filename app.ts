import express, { Express, Request, Response } from "express";

const app = express()
app.use(express.json())

const sendData = {
    name : "his"
}

// app.get("/get", (req: Request, res: Response) => {
//     res.send(sendData)
// })

app.post("/get", (req: Request, res: Response) => {
    try {
        const item = req.body
        console.log(req.body)
        res.status(200).send(sendData)
    } catch (err) {
        console.log(err)
    }
})

app.listen(8000)