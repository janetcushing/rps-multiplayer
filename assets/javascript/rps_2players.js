//------------------------------------//
// rps multiplayer game javascript
//------------------------------------//

//------------------------------------//
// Initialize Firebase
//------------------------------------//
// var config = {
//     apiKey: "AIzaSyC4yhH7mbTZRBvoDeu3PeMbUBTSlFSIoP0",
//     authDomain: "rockpaperscissorsgame-2915c.firebaseapp.com",
//     databaseURL: "https://rockpaperscissorsgame-2915c.firebaseio.com",
//     projectId: "rockpaperscissorsgame-2915c",
//     storageBucket: "rockpaperscissorsgame-2915c.appspot.com",
//     messagingSenderId: "64228922403"
// };
// firebase.initializeApp(config);

var config = {
    apiKey: "AIzaSyDknU74vZAxtuo3n9TJSkW9xiyNhUVT1g0",
    authDomain: "rpsgame-1cb55.firebaseapp.com",
    databaseURL: "https://rpsgame-1cb55.firebaseio.com",
    projectId: "rpsgame-1cb55",
    storageBucket: "",
    messagingSenderId: "965858725523"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Create a variable to reference specific sections of the database.
var chatRef = database.ref("/chat");
var gameRef = database.ref("/game");
//---------------------------
var playerRef = database.ref("/player");
var playerUpdateRef = database.ref("/player").child("playerNumber");
var playerQuery = database.ref("player").orderByKey();
var chatQuery = database.ref("chat").orderByChild("timestamp");
//---------------------------
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");


// global variables

//---------------------------
var playerName = "player";
var playerReady = false;
var playerChoiceMade = false;
var playerChoice = "";
var playerWinCntr = 0;
var playerLossCntr = 0;
var playerNumber = 0;
var playerCount = 0;
var activePlayers = [];
var isPlayer1 = false;
var isPlayer2 = false;

var player = {
    key: "blank"
};
//---------------------------

var player1Name = "player1";
var player1Ready = false;
var player1ChoiceMade = false;
var player1Choice = "";
var player1WinCntr = 0;
var player1LossCntr = 0;

var player2Name = "player2";
var player2Ready = false;
var player2ChoiceMade = false;
var player2Choice = "";
var player2WinCntr = 0;
var player2LossCntr = 0;
var tieCntr = 0;
var brandNewGame = true;
//---------------------------
var nameInput;
var nameSubmit;
var nameLabel;
var nameForm;
//---------------------------
var panelHeadingDiv;
var h3;
var panelBodyDiv;
var rpsForm;
var rpsDiv;
var rpsSpan;
var rpsRockLabel;
var rpsRockImg;
var rpsPaperLabel;
var rpsPaperImg;
var rpsScissorsLabel;
var rpsScissorsImg;

var chatbox;
var playerChat = "";
var playerNumber = "";
var timestamp;





function displayEnterNamePanel() {
    //---------------------------
    nameLabel = $("<label>");
    nameLabel.addClass("playerName");
    nameLabel.attr("for", "playerNameInput");
    nameLabel.text("Player");
    nameInput = $("<input>");
    nameInput.attr("type", "text");
    nameInput.attr("id", "playerNme");
    nameInput.addClass("form-control");
    nameInput.attr("placeholder", "Enter Player's name here");
    $("#playerName").append(nameLabel);
    $("#playerName").append(nameInput);
    //---------------------------
}

function displayrpsEntryPanel() {
    panelHeadingDiv = $("<div>");
    panelHeadingDiv.addClass("panel-heading");
    h3 = $("<h3>");
    h3.addClass("panel-title");
    h3.text("Click Rock, Paper or Scissors: ");
    panelBodyDiv = $("<div>");
    panelBodyDiv.addClass("panel-body");
    rpsForm = $("<form>");
    // var rpsDiv;
    // var rpsSpan;
    // var rpsRockLabel;
    // var rpsRockImg;
    // var rpsPaperLabel;
    // var rpsPaperImg;
    // var rpsScissorsLabel;
    // var rpsScissorsImg;
}

function displayrpsStatsPanel() {

}

//---------------------------

function addPlayerToDatabase(playerName, playerReady, playerNumber) {
    console.log("im in addPlayerDatabase");
    playerRef.once("value", function (snapshot) {
        playerCount = snapshot.numChildren();
        console.log("playerCount " + playerCount);
        var existingPlayerNum;
        console.log("playerCount " + playerCount);
        if (playerCount < 2) {
            if (playerCount === 0) {
                playerNumber = 1;
                isPlayer1 = true;
            } else if (playerCount === 1) {
                playerNumber = 2;
                isPlayer2 = true;
                // existingPlayerNum = activePlayers[0];
                // if (existingPlayerNum === 1) {
                //     playerNumber = 2;
                // } else {
                //     playerNumber = 1;
                // }

            }

            playerRef.push({
                playerName: playerName,
                playerReady: playerReady,
                playerNumber: playerNumber
            });
        }
    });
}

// function updatePlayerDatabase(playerNumber) {
//     console.log("im in updatePlayerDatabase");
//     playerUpdateRef.child(playerNumber, function (snapshot) {
//         snapshot.ref().update({
//             playerChoiceMade: playerChoiceMade,
//             playerChoice: playerChoice,
//             playerNumber: playerNumber
//         });
//     });
// }


function checkPlayerDatabase() {
    console.log("in checkPlayerDatabase()");
    playerRef.on("value", function (snapshot) {
        playerCount = snapshot.numChildren();
        console.log("playerCount " + playerCount);
        activePlayers = [];
        if (playerCount >= 2) {
            console.log("game is full");
        }
        playerQuery.once("value").then(function (snap) {
            snap.forEach(function (snapshot) {
                var playerNumber = snapshot.val().playerNumber;
                var playerName = snapshot.val().playerName;
                activePlayers.push(playerNumber);
                console.log("activePlayers: " + activePlayers.toString());

            })
        });
    });
}
//---------------------------

function initGameDatabase() {
    console.log("im in addGameDatabase");
    gameRef.set({
        player1Name: player1Name,
        player1ChoiceMade: player1ChoiceMade,
        player1Choice: player1Choice,
        player1WinCntr: player1WinCntr,
        player1LossCntr: player1LossCntr,
        player2Name: player2Name,
        player2ChoiceMade: player2ChoiceMade,
        player2Choice: player2Choice,
        player2WinCntr: player2WinCntr,
        player2LossCntr: player2LossCntr,
        tieCntr: tieCntr,
        brandNewGame: brandNewGame
    });

}

function updateGameDatabase() {
    console.log("im in updateGameDatabase");
    gameRef.set({
        player1Name: player1Name,
        player1ChoiceMade: player1ChoiceMade,
        player1Choice: player1Choice,
        player1WinCntr: player1WinCntr,
        player1LossCntr: player1LossCntr,
        player2Name: player2Name,
        player2ChoiceMade: player2ChoiceMade,
        player2Choice: player2Choice,
        player2WinCntr: player2WinCntr,
        player2LossCntr: player2LossCntr,
        tieCntr: tieCntr,
        brandNewGame: brandNewGame
    });

}

function updateGameDatabaseP1Name() {
    console.log("im in updateGameDatabaseeforPlayer1");
    gameRef.update({
        player1Name: player1Name
    });

}

function updateGameDatabaseP2Name() {
    console.log("im in updateGameDatabaseeforPlayer1");
    gameRef.update({
        player2Name: player2Name
    });

}

function updateGameDatabaseforPlayer1() {
    console.log("im in updateGameDatabaseeforPlayer1");
    gameRef.update({
        player1ChoiceMade: player1ChoiceMade,
        player1Choice: player1Choice
    });

}

function updateGameDatabaseforPlayer2() {
    console.log("im in updateGameDatabaseeforPlayer1");
    gameRef.update({
        player2ChoiceMade: player2ChoiceMade,
        player2Choice: player2Choice
    });

}


function updateStatsInGameDatabase() {
    console.log("im in updateStatsGameDatabase");
    gameRef.update({
        player1WinCntr: player1WinCntr,
        player1LossCntr: player1LossCntr,
        player2WinCntr: player2WinCntr,
        player2LossCntr: player2LossCntr,
        tieCntr: tieCntr
    });

}function updateP2WinInGameDatabase() {
    console.log("im in updateP2WinGameDatabase");
    gameRef.update({       
        player1LossCntr: player1LossCntr,
        player2WinCntr: player2WinCntr
    });

}function updateP1WinInGameDatabase() {
    console.log("im in updateP1WinGameDatabase");
    gameRef.update({
        player1WinCntr: player1WinCntr,
        player2LossCntr: player2LossCntr
       
    });

}function updateTieCntrInGameDatabase() {
    console.log("im in updateTieCntrGameDatabase");
    gameRef.update({
        tieCntr: tieCntr
    });

}

function updateChatDatabase(playerChat, chatNumber, playerName, timestamp) {
    console.log("im in updateChatDatabase");
    chatRef.push({
        playerChat: playerChat,
        playerNumber: chatNumber,
        playerName: playerName,
        timestamp: timestamp
    });

}



function determineWhoWins() {
    console.log("im in determineWhoWins");
    gameRef.once("value", function (snapshot) {
        if (snapshot.val().player1ChoiceMade && snapshot.val().player2ChoiceMade) {
            console.log("the choices have both been made");
            if (snapshot.val().player1Choice === "r") {
                if (snapshot.val().player2Choice === "r") {
                    tieCntr = snapshot.val().tieCntr + 1;
                    $("#winMsg").text("It's a tie!  Pick again!");       
                    updateTieCntrInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    updateP2WinInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    updateP1WinInGameDatabase();
                    resetDatabaseForNextGame();
                }
            } else if (snapshot.val().player1Choice === "p") {
                if (snapshot.val().player2Choice === "r") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    updateP1WinInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    tieCntr = snapshot.val().tieCntr + 1;
                    $("#winMsg").text("It's a tie!  Pick again!");
                    updateTieCntrInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    updateP2WinInGameDatabase();
                    resetDatabaseForNextGame();
                }
            } else if (snapshot.val().player1Choice === "s") {

                if (snapshot.val().player2Choice === "r") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    $("#name2TieCntr").text(snapshot.val().tieCntr);
                    updateP2WinInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    updateP1WinInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    tieCntr = snapshot.val().tieCntr + 1;
                    $("#winMsg").text("It's a tie!  Pick again!");
                    updateTieCntrInGameDatabase();
                    resetDatabaseForNextGame();
                }
            }
            gameRef.once("value", function (snapshot) {
                $("#name1Wins").text(snapshot.val().player1WinCntr);
                $("#name1Losses").text(snapshot.val().player1LossCntr);
                $("#name1TieCntr").text(snapshot.val().tieCntr);
                $("#name2Wins").text(snapshot.val().player2WinCntr);
                $("#name2Losses").text(snapshot.val().player2LossCntr);
                $("#name2TieCntr").text(snapshot.val().tieCntr);
            });

        }
    });
}




function resetDatabaseForNextGame() {
    console.log("im in resetDatabaseForNextGame");
    player1ChoiceMade = false;
    player1Choice = "";
    player2ChoiceMade = false;
    player2Choice = "";
    updateGameDatabaseforPlayer1();
    updateGameDatabaseforPlayer2();
    $('#player1').removeClass("playerAlt");
    $('#player1').addClass("player");
    $('#player2').removeClass("playerAlt");
    $('#player2').addClass("player");

}

// function prepareGameBoard() {
//     gameRef.once("value", function (snapshot) {
//         if (snapshot.val().player1Ready && snapshot.val().player2Ready) {
//             console.log("players are ready");
//             $("#enterNames").remove();
//         }
//     });
// }


function prepareGameBoard() {
    console.log("players are ready");
    $("#enterNames").remove();
    console.log("about to get the player snapshot");

    playerQuery.on("child_added", function (snapshot) {
        console.log("snapshpt: " + snapshot.val());
        console.log("snapshot.val().playerNumber " + snapshot.val().playerNumber);
        console.log("snapshot.val().playerName " + snapshot.val().playerName);
        if (snapshot.val().playerNumber === 1) {
            $("#player1").text(snapshot.val().playerName + ":");
            $("#name1").text(snapshot.val().playerName);
            $("#chatName1").text(snapshot.val().playerName + ":");
            player1Name = snapshot.val().playerName;
            updateGameDatabaseP1Name();
            $("#chatForm1").show();
            // $("#rps1").show();
            $("#chatForm2").hide();
            // $("#rps2").hide();
            isPlayer1 = true;
        } else {
            $("#player2").text(snapshot.val().playerName + ":");
            $("#name2").text(snapshot.val().playerName);
            $("#chatName2").text(snapshot.val().playerName + ":");
            player2Name = snapshot.val().playerName;
            updateGameDatabaseP2Name();
            $("#chatForm2").show();
            // $("#rps2").show();
            $("#chatForm1").hide();
            // $("#rps1").hide();
            isPlayer2 = true;
        }
        

    });

}


function displayChat() {
    $("#chatbox").empty();
    chatQuery.on("child_added", function (snapshot) {
        chatbox = $("<p>");
        if (snapshot.val().playerNumber === 1) {
            chatbox.attr("id", 'play1Chat');
        } else if (snapshot.val().playerNumber === 2) {
            chatbox.attr("id", 'play2Chat');
        }
        chatbox.text(snapshot.val().playerName + ": " + snapshot.val().playerChat);
        $("#chatbox").append(chatbox);
    });
}


//----------------------//
// main processing
//----------------------//
$(document).ready(function () {

    if (brandNewGame) {
        //build the EnterNames Panel of HTML
        console.log("IN BRAND NEW GAME");
        initGameDatabase();
        displayEnterNamePanel();
        $("#chatForm2").hide();
        // $("#rps2").hide();
        // updateGameDatabase();
    } else {
        console.log("nothing");

        //remove the EnterNames Panel of HTML and 
        //Build the rpsEntry Panel and
        //Build the rpsStats Panel
    }

    //-------------------------------//
    // Players enter thier names
    //-------------------------------//
    $("#playerName").submit("#playerNme", function (event) {
        event.preventDefault();
        playerName = ($("#playerNme").val().trim().charAt(0).toUpperCase() +
            $("#playerNme").val().trim().substr(1).toLowerCase());
        console.log("player Name: " + playerName);
        playerReady = true;
        console.log("about to go into checkPlayerDatabase()");
        checkPlayerDatabase();
        console.log("about to go into addPlayerToDatabase");
        addPlayerToDatabase(playerName, playerReady, playerNumber);
        console.log("about to go into prepareGameBoard");
        prepareGameBoard();
    });

    //------------------------------------------------------------------------//
    // player1 and player2 play the game, capture thier selections here
    //------------------------------------------------------------------------//
    $('#rockP1').on('click', function (event) {
        player1Choice = $("#rockP1").val().trim();
        console.log("player1 choice is " + player1Choice);
        player1ChoiceMade = true;
        // updatePlayerDatabase(1);
        updateGameDatabaseforPlayer1();
        determineWhoWins();
        $("#selection1").text("ROCK");
        $('#player1').removeClass("player");
        $('#player1').addClass("playerAlt");

    });
    $('#paperP1').on('click', function (event) {
        player1Choice = $("#paperP1").val().trim();
        player1ChoiceMade = true;
        // updatePlayerDatabase(1);
        updateGameDatabaseforPlayer1();
        console.log("p1 paper clicked: " + player1Choice);
        determineWhoWins();
        $("#selection1").text("PAPER");
        $('#player1').removeClass("player");
        $('#player1').addClass("playerAlt");
    });
    $('#scissorsP1').on('click', function (event) {
        player1Choice = $("#scissorsP1").val().trim();
        player1ChoiceMade = true;
       // updatePlayerDatabase(1);
       updateGameDatabaseforPlayer1();
        console.log("p1 scissors clicked: " + player1Choice);
        determineWhoWins();
        $("#selection1").text("SCISSORS");
        $('#player1').removeClass("player");
        $('#player1').addClass("playerAlt");
    });

    $('#rockP2').on('click', function (event) {
        player2Choice = $("#rockP2").val().trim();
        player2ChoiceMade = true;
       // updatePlayerDatabase(1);
       updateGameDatabaseforPlayer2();
        console.log("p2 rock clicked: " + player2Choice);
        determineWhoWins();
        $("#selection2").text("ROCK");
        $('#player2').removeClass("player");
        $('#player2').addClass("playerAlt");
    });
    $('#paperP2').on('click', function (event) {
        player2Choice = $("#paperP2").val().trim();
        player2ChoiceMade = true;
        // updatePlayerDatabase(1);
        updateGameDatabaseforPlayer2();
        console.log("p2 paper clicked: " + player2Choice);
        determineWhoWins();
        $("#selection2").text("PAPER");
        $('#player2').removeClass("player");
        $('#player2').addClass("playerAlt");
    });
    $('#scissorsP2').on('click', function (event) {
        player2Choice = $("#scissorsP2").val().trim();
        player2ChoiceMade = true;
       // updatePlayerDatabase(1);
       updateGameDatabaseforPlayer2();
        console.log("p2 scissors clicked: " + player2Choice);
        determineWhoWins();
        $("#selection2").text("SCISSORS");
        $('#player2').removeClass("player");
        $('#player2').addClass("playerAlt");
    });


    //---------------------------------------------//
    // Players 1 and 2 enter thier chat messages
    //---------------------------------------------//
    $("#submitMsg1").on("click", function (event) {
        event.preventDefault();
        chatNumber = 1;
        playerChat = $("#userMsg1").val().trim();
        playerName = player1Name;
        $("#userMsg1").val("");
        timestamp = Date.now();
        updateChatDatabase(playerChat, chatNumber, playerName, timestamp);
        console.log("going into diplY CHAT1");
        displayChat();
    });


    $("#submitMsg2").on("click", function (event) {
        event.preventDefault();
        chatNumber = 2;
        playerChat = $("#userMsg2").val().trim();
        playerName = player2Name;
        $("#userMsg2").val("");
        timestamp = Date.now();
        updateChatDatabase(playerChat, chatNumber, playerName, timestamp);
        console.log("going into diplY CHAT2");
        displayChat();
    });


});