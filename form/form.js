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
    if (transcript.toLowerCase().includes("clear")) {
      if (document.getElementById("name").value) {
        speak("Input Box Cleared");
      }
      document.getElementById("name").value = "";
    } else if (transcript.toLowerCase().includes("home")) {
      window.location.pathname = "./";
    } else if (transcript.toLowerCase().includes("proceed")) {
      if (document.getElementById("name").value) {
        window.location.pathname = "./game/";
        sessionStorage.setItem("Name", document.getElementById("name").value);
      } else {
        speak("Please Enter Your Name");
      }
    } else if (transcript.toLowerCase().includes("read")) {
      speak(
        "Speak Your Name Please Or Say Clear If You Want to clear the input box"
      );
    } else {
      speak("Name " + document.getElementById("name").value + " inserted");
      document.getElementById("name").value = transcript;
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

document.getElementById("name").addEventListener("keypress", (e) => {
  if (e.which == 13) {
    if (document.getElementById("name").value) {
      window.location.pathname = "../game/";
      sessionStorage.setItem("Name", document.getElementById("name").value);
    }
  }
});
