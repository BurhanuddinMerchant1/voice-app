if (!sessionStorage.getItem("Name")) {
  window.location.pathname = "./";
}

function runSpeechRecognition() {
  var Name = document.getElementById("name");
  Name.innerHTML = "Name: " + sessionStorage.getItem("Name");
  var Score = document.getElementById("score");
  Score.innerHTML = "Score: " + sessionStorage.getItem("Score");
  // new speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.continuous = true;
  // This runs when the speech recognition service starts
  recognition.onstart = function () {};

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    var transcript = event.results[event.results.length - 1][0].transcript;
    console.log("inside result", event.results);
    if (transcript.toLowerCase().includes("back")) {
      window.location.pathname = "./game/";
    } else if (transcript.toLowerCase().includes("home")) {
      window.location.pathname = "./";
    } else if (transcript.toLowerCase().includes("read")) {
      speak(
        "Flappy Thanks, You have scored:" +
          sessionStorage.getItem("Score") +
          ". Say: Back, to play the game else say: home to navigate to the home page!"
      );
    }
  };

  // start recognition
  recognition.start();
}
function speak(text) {
  var msg = new SpeechSynthesisUtterance("No warning should arise");
  msg.text = text;
  window.speechSynthesis.speak(msg);
}
