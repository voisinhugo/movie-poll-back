const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: 'https://voisinhugo.github.io',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

let poll = {
  title: "Sondage",
  answers: [
    { id: "11", title: "La Guerre des étoiles" },
    { id: "12", title: "Le Monde de Nemo" }]
};
let answers = { 11: 0, 12: 0 };

const app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/poll', cors(corsOptions), (req, res) => res.set({
    'Content-Type': 'application/json'
  }).json(poll)
);

app.post(
  '/poll/vote',
  cors(corsOptions),
  (req, res) => {
    const answerId = req.body.answerId;    
    answers = { ...answers, [answerId]: answers[answerId] + 1 };
    res.json(answers);
  }
);

app.post(
  '/poll/answer/append',
  cors(corsOptions),
  (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    poll = { ...poll, answers: [ ...poll.answers, { id, title }]};
    answers = { ...answers, [id]: 0 };
    res.json(poll);
  }
);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
