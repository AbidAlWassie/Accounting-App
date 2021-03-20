const fs = require("fs");
const express = require("express");
const app = express();

var data = fs.readFileSync("dist/js/words.json");
var words = JSON.parse(data);
console.log(words);


const server = app.listen(3000);

function listening() {
  console.log("listening...");
}

app.use(express.static("dist"));

app.get("/add/:word/:score", addWord);

function addWord(request, response) {
  var data = request.params;
  var word = data.word;
  var score = Number(data.score);
  var reply;
  if (!score) {
    reply = {
      msg: "Score is required."
    }
    response.send(reply);
  } else {
      words[word] = score;
      var data = JSON.stringify(words, null, 2);
      fs.writeFile("dist/js/words.json", data, finished);
      function finished (err) {
        console.log("All set")
      }
      reply = {
        msg: "Thank you for your word."
      }
      response.send(reply);
    }
  
}
// Route for sending all the concordance data
app.get("/all", sendAll);
// Callback
function sendAll(request, response) {
  response.send(words);
}