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
var playerQuery = database.ref("player").orderByKey();
var chatQuery = database.ref("chat").orderByKey();
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
var name1Input;
var name1Submit;
var name1Label;
var name1Form;
var name2Input;
var name2Submit;
var name2Label;
var name2Form;
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
var chatbox1;
var chatbox2;
var playerChat = "";
var playerNumber = "";





function displayEnterNamePanel() {
    console.log("in displayEnterNamePanel");
    name1Label = $("<label>");
    name1Label.addClass("player1Name");
    name1Label.attr("for", "player1NameInput");
    name1Label.text("Player 1");
    name1Input = $("<input>");
    name1Input.attr("type", "text");
    name1Input.attr("id", "player1Nme");
    name1Input.addClass("form-control");
    name1Input.attr("placeholder", "Enter Player's name here");
    $("#player1Name").append(name1Label);
    $("#player1Name").append(name1Input);
    name2Label = $("<label>");
    name2Label.addClass("player2Name");
    name2Label.attr("for", "player2NameInput");
    name2Label.text("Player 2");
    name2Input = $("<input>");
    name2Input.attr("type", "text");
    name2Input.attr("id", "player2Nme");
    name2Input.addClass("form-control");
    name2Input.attr("placeholder", "Enter Player's name here");
    $("#player2Name").append(name2Label);
    $("#player2Name").append(name2Input);
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
            } else if (playerCount === 1) {
                playerNumber = 2;
                // existingPlayerNum = activePlayers[0];
                // if (existingPlayerNum === 1) {
                //     playerNumber = 2;
                // } else {
                //     playerNumber = 1;
                // }

            }
            console.log("playerCount " + playerCount);
            console.log("playerNumber " + playerNumber);
            playerRef.push({
                playerName: playerName,
                playerReady: playerReady,
                // playerChoiceMade: playerChoiceMade,
                // playerChoice: playerChoice,
                // playerWinCntr: playerWinCntr,
                // playerLossCntr: playerLossCntr,
                playerNumber: playerNumber
                // tieCntr: tieCntr
            });
        }
    });
}

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

function updateDatabase() {
    console.log("im in updateDatabase");
    gameRef.set({
        player1ChoiceMade: player1ChoiceMade,
        player1Choice: player1Choice,
        player1WinCntr: player1WinCntr,
        player1LossCntr: player1LossCntr,
        player2ChoiceMade: player2ChoiceMade,
        player2Choice: player2Choice,
        player2WinCntr: player2WinCntr,
        player2LossCntr: player2LossCntr,
        tieCntr: tieCntr,
        brandNewGame: brandNewGame
    });

}

function updateChatDatabase(playerChat, chatNumber) {
    console.log("im in updateChatDatabase");
    chatRef.push({
        playerChat: playerChat,
        playerNumber: chatNumber
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
                    updateDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    updateDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    updateDatabase();
                    resetDatabaseForNextGame();
                }
            } else if (snapshot.val().player1Choice === "p") {
                if (snapshot.val().player2Choice === "r") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    updateDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    tieCntr = snapshot.val().tieCntr + 1;
                    $("#winMsg").text("It's a tie!  Pick again!");
                    updateDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    updateDatabase();
                    resetDatabaseForNextGame();
                }
            } else if (snapshot.val().player1Choice === "s") {

                if (snapshot.val().player2Choice === "r") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    $("#name2TieCntr").text(snapshot.val().tieCntr);
                    updateDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    updateDatabase();
                    resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    tieCntr = snapshot.val().tieCntr + 1;
                    $("#winMsg").text("It's a tie!  Pick again!");
                    updateDatabase();
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
    updateDatabase();
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
    // $("#enterNames").remove();
    console.log("about to get the player snapshot");

    playerQuery.on("child_added", function (snapshot) {
        console.log("snapshpt: " + snapshot.val());
        console.log("snapshot.val().playerNumber " + snapshot.val().playerNumber);
        console.log("snapshot.val().playerName " + snapshot.val().playerName);
        if (snapshot.val().playerNumber === 1) {
            $("#player1").text(snapshot.val().playerName + ":");
            $("#name1").text(snapshot.val().playerName);
            $("#chatName1").text(snapshot.val().playerName + ":");
        } else {
            $("#player2").text(snapshot.val().playerName + ":");
            $("#name2").text(snapshot.val().playerName);
            $("#chatName2").text(snapshot.val().playerName + ":");
        }

    });

}

function displayChat() {
    console.log("im in displaY CHAT");
    $("#chatbox").empty();
    chatQuery.on("child_added", function (snapshot) {
        chatbox = $("<p>");
        console.log("snapshpt: " + snapshot.val());
        console.log("snapshot.val().chatNumber " + snapshot.val().chatNumber);
        if (snapshot.val().playerNumber === 1) {
            console.log("snapshot.val().chatNumber is 1");
            chatbox.attr("id", 'play1Chat');
            chatbox.text("Player1: " + snapshot.val().playerChat);
        } else if (snapshot.val().playerNumber === 2) {
            console.log("snapshot.val().chatNumber is 2");
            chatbox.attr("id", 'play2Chat');
            chatbox.text("Player2: " + snapshot.val().playerChat);
            // $("#play2Chat").text("Player2: " + snapshot.val().playerChat);
        }
        $("#chatbox").prepend(chatbox);
    });
}


//----------------------//
// main processing
//----------------------//
$(document).ready(function () {

    if (brandNewGame) {
        //build the EnterNames Panel of HTML
        console.log("IN BRAND NEW GAME");
        displayEnterNamePanel();
        // updateDatabase();
    } else {
        console.log("nothing");

        //remove the EnterNames Panel of HTML and 
        //Build the rpsEntry Panel and
        //Build the rpsStats Panel
    }


    // Players enter thier names
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


    // Players 1 and 2 enter thier names
    $("#player1Name").submit("#player1Nme", function (event) {
        event.preventDefault();
        player1Name = ($("#player1Nme").val().trim().charAt(0).toUpperCase() +
            $("#player1Nme").val().trim().substr(1).toLowerCase());
        console.log("player1 Name: " + player1Name);
        player1Ready = true;
        updateDatabase();
        prepareGameBoard();
        // $("#player1").text(snapshot.val().player1Name + ":");
        // $("#name1").text(snapshot.val().player1Name);
    });

    $("#player2Name").submit("#player2Nme", function (event) {
        event.preventDefault();
        player2Name = ($("#player2Nme").val().trim().charAt(0).toUpperCase() +
            $("#player2Nme").val().trim().substr(1).toLowerCase());
        console.log("player2 Name: " + player2Name);
        player2Ready = true;
        updateDatabase();
        prepareGameBoard();
        // $("#player2").text(snapshot.val().player2Name + ":");
        // $("#name2").text(snapshot.val().player2Name);
    });



    // player1 and player2 play the game, capture thier selections here
    $('#rockP1').on('click', function (event) {
        player1Choice = $("#rockP1").val().trim();
        player1ChoiceMade = true;
        updateDatabase();
        console.log("p1 rock clicked: " + player1Choice);
        determineWhoWins();
        $('#player1').removeClass("player");
        $('#player1').addClass("playerAlt");

    });
    $('#paperP1').on('click', function (event) {
        player1Choice = $("#paperP1").val().trim();
        player1ChoiceMade = true;
        updateDatabase();
        console.log("p1 paper clicked: " + player1Choice);
        determineWhoWins();
        $('#player1').removeClass("player");
        $('#player1').addClass("playerAlt");
    });
    $('#scissorsP1').on('click', function (event) {
        player1Choice = $("#scissorsP1").val().trim();
        player1ChoiceMade = true;
        updateDatabase();
        console.log("p1 scissors clicked: " + player1Choice);
        determineWhoWins();
        $('#player1').removeClass("player");
        $('#player1').addClass("playerAlt");
    });

    $('#rockP2').on('click', function (event) {
        player2Choice = $("#rockP2").val().trim();
        player2ChoiceMade = true;
        updateDatabase();
        console.log("p2 rock clicked: " + player2Choice);
        determineWhoWins();
        $('#player2').removeClass("player");
        $('#player2').addClass("playerAlt");
    });
    $('#paperP2').on('click', function (event) {
        player2Choice = $("#paperP2").val().trim();
        player2ChoiceMade = true;
        updateDatabase();
        console.log("p2 paper clicked: " + player2Choice);
        determineWhoWins();
        $('#player2').removeClass("player");
        $('#player2').addClass("playerAlt");
    });
    $('#scissorsP2').on('click', function (event) {
        player2Choice = $("#scissorsP2").val().trim();
        player2ChoiceMade = true;
        updateDatabase();
        console.log("p2 scissors clicked: " + player2Choice);
        determineWhoWins();
        $('#player2').removeClass("player");
        $('#player2').addClass("playerAlt");
    });


    // Players 1 and 2 enter thier chats
    $("#submitMsg1").on("click", function (event) {
        event.preventDefault();
        chatNumber = 1;
        playerChat = $("#userMsg1").val().trim();
        $("#userMsg1").val("");
        updateChatDatabase(playerChat, chatNumber);
        console.log("going into diplY CHAT1");
        displayChat();     
        });
    

    $("#submitMsg2").on("click", function (event) {
        event.preventDefault();
        chatNumber = 2;
        playerChat = $("#userMsg2").val().trim();
        $("#userMsg2").val("");
        updateChatDatabase(playerChat, chatNumber);
        console.log("going into diplY CHAT2");
        displayChat();
        });


});