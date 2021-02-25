
import { app, PORT } from "./app"

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})