//------------------------------------//
// rps multiplayer game javascript
//------------------------------------//

//------------------------------------//
// Initialize Firebase
//------------------------------------//
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
var playerRef = database.ref("/player");
var playerQuery = database.ref("player").orderByKey();
var chatQuery = database.ref("chat").orderByChild("timestamp");
//--------------------------
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

//---------------------------//
// global variables
//---------------------------//
var playerName = "player";
var playerReady = false;
var playerChoiceMade = false;
var playerChoice = "";
var playerWinCntr = 0;
var playerLossCntr = 0;
var playerNumber = 0;
var playerCount = 0;
var activePlayers = [];
var removePlayerNumber;

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
var chatNumber = "";
var timestamp;



//------------------------------------------------------//
// display the panel for users to enter thier names
//------------------------------------------------------//
function displayEnterNamePanel() {
    console.log("im in displayEnterNamePanel();");
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
}

//------------------------------------------------------//
// display the rps panel for the game board
//------------------------------------------------------//
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

//------------------------------------------------------//
// display the panel to display game stats
//------------------------------------------------------//
function displayrpsStatsPanel() {}

//------------------------------------------------------//
// Remove a player if they click the exit button
// Remove a chats if they click the exit button
//------------------------------------------------------//
function removePlayerAndChats() {
    removePlayerNumber = parseInt($("#exit").val());
    console.log("removePlayerNumber " + removePlayerNumber);
    database.ref("player").orderByChild("playerNumber").equalTo(removePlayerNumber).once('child_added', function (snapshot) {
        snapshot.ref.remove();
    });
    console.log("removeChats ");
    database.ref("chat").on('child_added', function (snap) {
        snap.ref.remove();
    });
    window.location = 'close.html';
}


//------------------------------------------------------//
// add players to the player database.  Player database
// allows only 2 players
//------------------------------------------------------//
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
                $("#exit").attr("value", playerNumber);
                console.log("added playerNumber to exit button");
                initGameBoardForPlayer1();
            } else if (playerCount === 1) {

                var existingPlayer = snapshot.val().playerNumber;
                if (existingPlayer === 1) {
                    playerNumber = 1;
                    $("#exit").attr("value", playerNumber);
                    initGameBoardForPlayer1();
                } else {
                    playerNumber = 2;
                    $("#exit").attr("value", playerNumber);
                    initGameBoardForPlayer2();
                }
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

//------------------------------------------------------//
// check the player database to make sure there are not
// already 2 players before adding the player
//------------------------------------------------------//
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

//------------------------------------------------------//
// Initialize the game database
//------------------------------------------------------//
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


//-------------------------------------------------//
// obsolete - this function is not being used
//-------------------------------------------------//
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

//-------------------------------------------------//
// Update player1 name in the game database
//-------------------------------------------------//
function updateGameDatabaseP1Name() {
    console.log("im in updateGameDatabaseeforPlayer1");
    gameRef.update({
        player1Name: player1Name
    });

}

//-------------------------------------------------//
// Update player2 name in the game database
//-------------------------------------------------//
function updateGameDatabaseP2Name() {
    console.log("im in updateGameDatabaseeforPlayer2");
    gameRef.update({
        player2Name: player2Name
    });

}

//-------------------------------------------------//
// Update player1 choice in the game database
//-------------------------------------------------//
function updateGameDatabaseforPlayer1() {
    console.log("im in updateGameDatabaseeforPlayer1");
    gameRef.update({
        player1ChoiceMade: player1ChoiceMade,
        player1Choice: player1Choice
    });

}

//-------------------------------------------------//
// Update player2 choice in the game database
//-------------------------------------------------//
function updateGameDatabaseforPlayer2() {
    console.log("im in updateGameDatabaseeforPlayer1");
    gameRef.update({
        player2ChoiceMade: player2ChoiceMade,
        player2Choice: player2Choice
    });

}

//-----------------------------------------------------//
// Update stats in the game database when player1 wins
//-----------------------------------------------------//
function updateP1WinInGameDatabase() {
    console.log("im in updateP1WinGameDatabase");
    gameRef.update({
        player1WinCntr: player1WinCntr,
        player2LossCntr: player2LossCntr

    });

}
//-----------------------------------------------------//
// Update stats in the game database when player2 wins
//-----------------------------------------------------//
function updateP2WinInGameDatabase() {
    console.log("im in updateP2WinGameDatabase");
    gameRef.update({
        player1LossCntr: player1LossCntr,
        player2WinCntr: player2WinCntr
    });

}

//----------------------------------------------------------//
// Update stats in the game database when there is a tie
//----------------------------------------------------------//
function updateTieCntrInGameDatabase() {
    console.log("im in updateTieCntrGameDatabase");
    gameRef.update({
        tieCntr: tieCntr
    });

}

//----------------------------------------------------------//
// Add a chat row to the chat database
//----------------------------------------------------------//
function updateChatDatabase(playerChat, chatNumber, playerName, timestamp) {
    console.log("im in updateChatDatabase");
    chatRef.push({
        playerChat: playerChat,
        playerNumber: chatNumber,
        playerName: playerName,
        timestamp: timestamp
    });

}

//--------------------------------------------------------------//
// determine who wins the game and update game database and
// send out winning message, then reset the game database so it
// is ready for the next game
//--------------------------------------------------------------//
function determineWhoWins() {
    console.log("im in determineWhoWins");
    gameRef.once("value", function (snapshot) {
        if (snapshot.val().player1ChoiceMade && snapshot.val().player2ChoiceMade) {
            console.log("the choices have both been made");
            $("#name1").text(snapshot.val().player1Name);
            $("#name2").text(snapshot.val().player2Name);
            if (snapshot.val().player1Choice === "r") {
                if (snapshot.val().player2Choice === "r") {
                    tieCntr = snapshot.val().tieCntr + 1;
                    $("#winMsg").text("It's a tie!  Pick again!");
                    $("#selection1").text("");
                    updateTieCntrInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    $("#selection1").text("");
                    updateP2WinInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    $("#selection1").text("");
                    $("#selection2").text("");
                    updateP1WinInGameDatabase();
                    resetDatabaseForNextGame();
                }
            } else if (snapshot.val().player1Choice === "p") {
                if (snapshot.val().player2Choice === "r") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    $("#selection1").text("");
                    $("#selection2").text("");
                    updateP1WinInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    tieCntr = snapshot.val().tieCntr + 1;
                    $("#winMsg").text("It's a tie!  Pick again!");
                    $("#selection1").text("");
                    $("#selection2").text("");
                    updateTieCntrInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    $("#selection1").text("");
                    $("#selection2").text("");
                    updateP2WinInGameDatabase();
                    resetDatabaseForNextGame();
                }
            } else if (snapshot.val().player1Choice === "s") {

                if (snapshot.val().player2Choice === "r") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    $("#selection1").text("");
                    $("#selection2").text("");
                    $("#name2TieCntr").text(snapshot.val().tieCntr);
                    updateP2WinInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    $("#selection1").text("");
                    $("#selection2").text("");
                    updateP1WinInGameDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    tieCntr = snapshot.val().tieCntr + 1;
                    $("#winMsg").text("It's a tie!  Pick again!");
                    $("#selection1").text("");
                    $("#selection2").text("");
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

//-----------------------------------------------------//
// reset the database so it is ready for the next game
//-----------------------------------------------------//
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


//--------------------------------------------------------//
// initialize the gameboard for player 1
//--------------------------------------------------------//
function initGameBoardForPlayer1() {
    console.log("players are ready1");
    // $("#enterNames").remove();
    $("#chatWindow").show();
    database.ref("player").orderByChild("playerNumber").equalTo(1).once('child_added', function (snapshot) {
        console.log("i got one row from player db");
        $("#player1").text(snapshot.val().playerName + ":");
        $("#name1").text(snapshot.val().playerName);
        $("#chatName1").text(snapshot.val().playerName + ":");
        $("#chatForm2").hide();
        $("#chatName2").hide();    
        $('#rpsStats').show();
        $('#rpsEntry').show();
        $("#rps2").hide();
        player1Name = snapshot.val().playerName;
        updateGameDatabaseP1Name();
    });
}
//--------------------------------------------------------//
// initialize the gameboard for player 2 
//--------------------------------------------------------//
function initGameBoardForPlayer2() {
    console.log("players are ready2");
    // $("#enterNames").remove();
    $("#chatWindow").show();
    database.ref("player").orderByChild("playerNumber").equalTo(2).once('child_added', function (snapshot) {
        console.log("i got second row from player db");
        console.log("snapshot.val()") + snapshot.val();
        if (!snapshot.val() == ""){
        $("#player2").text(snapshot.val().playerName + ":");
        $("#name2").text(snapshot.val().playerName);
        $("#chatName2").text(snapshot.val().playerName + ":");
        $("#chatForm1").hide();
        $("#chatName1").hide();
        $('#rpsStats').show();
        $("#rps1").hide();
        $('#rpsEntry').show();
        player2Name = snapshot.val().playerName;
        updateGameDatabaseP2Name();
        }
    });

}

//------------------------------------------------//
// display the chat messages in the chat window
//------------------------------------------------//
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

//------------------------------------------------------//
// Remove a chats if they click the exit button
//------------------------------------------------------//
function removeChats() {
    console.log("removeChats ");
    database.ref("chat").once('child_added', function (snapshot) {
        snapshot.ref.remove();
    });
}

//------------------------------------------------//
// process Player 1's rock paper scissor choice
//------------------------------------------------//
function processPlayer1Choice() {
    player1ChoiceMade = true;
    updateGameDatabaseforPlayer1();
    determineWhoWins();
    $('#player1').removeClass("player");
    $('#player1').addClass("playerAlt");
}

//------------------------------------------------//
// process Player 2's rock paper scissor choice
//------------------------------------------------//
function processPlayer2Choice() {
    player2ChoiceMade = true;
    updateGameDatabaseforPlayer2();
    determineWhoWins();
    $('#player2').removeClass("player");
    $('#player2').addClass("playerAlt");
}

//----------------------//
// main processing
//----------------------//
$(document).ready(function () {

    if (brandNewGame) {
        //build the EnterNames Panel of HTML
        console.log("IN BRAND NEW GAME");
        $('#rpsStats').hide();
        $('#rpsEntry').hide();
        $('#chatWindow').hide();
        initGameDatabase();
        displayEnterNamePanel();
        // $("#chatForm1").hide();
        // $("#chatForm2").hide();
        // $("#rps2").hide();
        // updateGameDatabase();
    } else {
        console.log("nothing");

        //remove the EnterNames Panel of HTML and 
        //Build the rpsEntry Panel and
        //Build the rpsStats Panel
    }

    //-----------------------------------//
    // Players enter thier names
    // and then prepare the gameboard
    //-----------------------------------//
    $("#playerName").submit("#playerNme", function (event) {
        event.preventDefault();
        playerName = ($("#playerNme").val().trim().charAt(0).toUpperCase() +
            $("#playerNme").val().trim().substr(1).toLowerCase());
        console.log("player Name: " + playerName);
        $("#playerTitle").attr("value", playerName);
        $("#playerTitle").text(playerName + "'s game");
        playerReady = true;
        console.log("about to go into checkPlayerDatabase()");
        checkPlayerDatabase();
        console.log("about to go into addPlayerToDatabase");
        addPlayerToDatabase(playerName, playerReady, playerNumber);
        console.log("about to go into prepareGameBoard");

    });


    //------------------------------------------------------------------------//
    // player1 and player2 play the game, capture thier selections here
    //------------------------------------------------------------------------//
    $('#rockP1').on('click', function (event) {
        event.preventDefault();
        player1Choice = $("#rockP1").val().trim();
        $("#selection1").text("ROCK");
        processPlayer1Choice();
    });

    $('#paperP1').on('click', function (event) {
        event.preventDefault();
        player1Choice = $("#paperP1").val().trim();
        $("#selection1").text("PAPER");
        processPlayer1Choice();
    });

    $('#scissorsP1').on('click', function (event) {
        event.preventDefault();
        player1Choice = $("#scissorsP1").val().trim();
        $("#selection1").text("SCISSORS");
        processPlayer1Choice();
    });

    $('#rockP2').on('click', function (event) {
        event.preventDefault();
        player2Choice = $("#rockP2").val().trim();
        $("#selection2").text("ROCK");
        processPlayer2Choice();
    });

    $('#paperP2').on('click', function (event) {
        event.preventDefault();
        player2Choice = $("#paperP2").val().trim();
        $("#selection2").text("PAPER");
        processPlayer2Choice();
    });

    $('#scissorsP2').on('click', function (event) {
        event.preventDefault();
        player2Choice = $("#scissorsP2").val().trim();
        $("#selection2").text("SCISSORS");
        processPlayer2Choice();
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