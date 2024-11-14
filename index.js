import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_SRV_STRING);

const homeTosdosSchema = mongoose.Schema({
    todo: String,
    calender: String
});
const workTosdosSchema = mongoose.Schema({
    todo: String,
    calender: String
});

const homeModelTodo = mongoose.model("hometodo", homeTosdosSchema);
const workModelTodo = mongoose.model("worktodo", workTosdosSchema);

const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var cal = "";
var year = "";
function datetime() {
    const dmyhm = new Date();
    const indiaTime = dmyhm.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const indiaDate = new Date(indiaTime);
    const date = indiaDate.getDate();
    const month = indiaDate.getMonth();
    year = indiaDate.getFullYear();
    const hrs = indiaDate.getHours();
    const min = indiaDate.getMinutes();
    cal = `${date} ${monthName[month]} ${year} ${hrs}:${min}`;
}
datetime();

const dtodo1 = new homeModelTodo({
    todo: "Welcome to your todo list.",
    calender: cal
});
const dtodo3 = new homeModelTodo({
    todo: "Hit the checkbox to delete an todo.",
    calender: cal
});

const defaulttodo = [dtodo1, dtodo2, dtodo3];

app.get("/", async (req, res) => {
    const hometodolist = await homeModelTodo.find({});
    if (hometodolist.length === 0) {
        homeModelTodo.insertMany(defaulttodo);
    }
    res.render("home", { hometodolist, year });
});
app.get("/home", async (req, res) => {
    const hometodolist = await homeModelTodo.find({});
    res.render("home", { hometodolist, year });
});
app.post("/homesubmit", (req, res) => {
    const hometask = req.body["textforitems"];
    datetime();
    const newhometask = new homeModelTodo({
        todo: hometask,
        calender: cal
    });
    newhometask.save();
    res.redirect("/home")
});
app.post("/homedelete", async (req, res) => {
    await homeModelTodo.deleteOne({ _id: req.body.checkbox });
    res.redirect("/home");
});

app.get("/work", async (req, res) => {
    const worktodolist = await workModelTodo.find({});
    res.render("work", { worktodolist, year });
});
app.post("/worksubmit", (req, res) => {
    const worktask = req.body["textforitems"];
    datetime();
    const newworktask = new workModelTodo({
        todo: worktask,
        calender: cal
    });
    newworktask.save();
    res.redirect("/work")
});
app.post("/workdelete", async (req, res) => {
    await workModelTodo.deleteOne({ _id: req.body.checkbox });
    res.redirect("/work");
});
app.get("/health", (req, res) => {
    res.status(200).send("OK")
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
