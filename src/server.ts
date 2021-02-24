import express from "express"
const PORT = 3000
import "./database"
import { router } from"./routes"

const app = express()

app.use(express.json())
app.use(router)

app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`)
})