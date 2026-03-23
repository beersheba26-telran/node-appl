import express from "express";
const app = express();
app.use((req, res, next) => {
    console.log("I'm first middleware")
    next()
})
app.use((req, res, next) => {
    console.log("I'm second middleware")
    next()
})
app.get("/",(req, res, next) => {
    res.json({a:"a", b:"2"})
    
})
export default app