function runSpeechRecognition() {
  // new speech recognition object
  console.log(window);
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.continuous = true;
  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    speak(
      "Welcome to The Voice Flappy Bird!!, To play , just say Play to proceed to the game"
    );
  };

  recognition.start();

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    let transcript = event.results[event.results.length - 1][0].transcript;
    console.log("inside result", event.results);
    if (transcript.toLowerCase().includes("play")) {
      window.location.pathname = "./instructions";
    } else if (transcript.toLowerCase().includes("read")) {
      speak(
        "Welcome to The Voice Flappy Bird!!, To play , just say Play to proceed to the game"
      );
    }
  };
}
function speak(text) {
  var msg = new SpeechSynthesisUtterance("No warning should arise");
  msg.text = text;
  window.speechSynthesis.speak(msg);
}
