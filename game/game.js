if (!sessionStorage.getItem("Name")) {
  window.location.pathname = "./";
}
function runSpeechRecognition() {
  // get output div reference
  var output = document.getElementById("output");
  // get action element reference
  var action = document.getElementById("action");
  // new speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.continuous = true;
  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    action.innerHTML = "<small>listening, please speak...</small>";
  };

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    var transcript = event.results[event.results.length - 1][0].transcript;
    console.log("inside result", event.results);
    if (transcript.toLowerCase().includes("u")) {
      moveup();
    } else if (transcript.toLowerCase().includes("d")) {
      movedown();
    } else if (transcript.toLowerCase().includes("r")) {
      moveright();
    } else if (transcript.toLowerCase().includes("again")) {
      restartGame();
    } else if (transcript.toLowerCase().includes("exit")) {
      sessionStorage.setItem("Score", myGameArea.frameNo);
      window.location.pathname = "./checkout/";
    }
    output.innerHTML = "<b>Voice Input:</b> " + transcript;
    // output.classList.remove("hide");
  };

  // start recognition
  recognition.start();
}

var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
  runSpeechRecognition();
  var url =
    "https://www.animatedimages.org/data/media/230/animated-bird-image-0251.gif";
  myGamePiece = new component(50, 50, url, 10, 120, "image");
  myScore = new component("30px", "Consolas", "white", 240, 40, "text");
  myGameArea.start();
}
function restartGame() {
  runSpeechRecognition();
  myObstacles = [];
  myScore = 0;
  clearmove();
  myGameArea.frameNo = 0;
  startGame();
}
var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 415;
    this.canvas.height = 250;
    this.context = this.canvas.getContext("2d");
    // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    document.getElementById("game").appendChild(this.canvas);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
};

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };
}

function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();

      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 41;
    maxHeight = 110;
    height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    minGap = 100;
    maxGap = 300;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new component(10, height, "yellow", x, 0));
    myObstacles.push(
      new component(10, x - height - gap, "yellow", x, height + gap)
    );
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].speedX = -1;
    myObstacles[i].newPos();
    myObstacles[i].update();
  }
  let name1 = sessionStorage.getItem("Name");
  myScore.text = name1 + ": " + myGameArea.frameNo;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function moveup() {
  myGamePiece.speedY = -0.7;
}

function movedown() {
  myGamePiece.speedY = 0.7;
}

function moveleft() {
  myGamePiece.speedX = -0.7;
}

function moveright() {
  myGamePiece.speedX = 0.7;
}

function clearmove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}
