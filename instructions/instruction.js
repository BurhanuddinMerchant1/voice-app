function runSpeechRecognition() {
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
    if (transcript.toLowerCase().includes("proceed")) {
      window.location.pathname = "./form/";
    } else if (transcript.toLowerCase().includes("read")) {
      speak(
        "This is a voice enabled game. Instructions. To move up say. Up. To move down say. Down.  To play again say. Again.  To exit say. Exit. Say Proceed to play the game"
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
