import express from "express";
import { config } from "dotenv";
import helmet from "helmet"
import { graphqlHTTP } from "express-graphql"
import colors from "colors"
import cors from "cors"


import schema from "./server/schema.js"
import connectDB from "./server/config/db.js";


config()

const app = express();
const port = process.env.port || 5000

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(cors())
app.use(express.json())
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development"
}));

app.get("/", (req, res) => {
    res.send("Guanli is live!")
})

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
}


connectDB()
app.listen(port, () => {
    console.log(`Server on | Port ${port}`);
})