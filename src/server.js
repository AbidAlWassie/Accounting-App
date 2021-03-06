const fs = require("fs");
const express = require("express");
const app = express();

var data = fs.readFileSync("./public/js/words.json");
var words = JSON.parse(data);
console.log(words);


const server = app.listen(3000);

function listening() {
  console.log("listening...");
}

app.use(express.static("public"));

app.get("/add/:word/:score?", addWord);

function addWord(request, response) {
  var data = request.params;
  var word = data.word;
  var score = data.score;
  var reply;
  if (!score) {
    reply = {
      msg: "Score is required."
    }
    response.send(reply);
  } else {
    var Obj = [];
    var newObj = words[word] = score;
    // words[word] = score;
    var data = JSON.stringify(newObj, null, 2);
    fs.writeFile("./public/js/words.json", data, finished);
    function finished (err) {
      console.log("All set.")
    }
    reply = {
      msg: "Done."
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