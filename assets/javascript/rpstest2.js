//------------------------------------//
// rps multiplayer game javascript
//------------------------------------//

//------------------------------------//
// Initialize Firebase
//------------------------------------//
var config = {
    apiKey: "AIzaSyC4yhH7mbTZRBvoDeu3PeMbUBTSlFSIoP0",
    authDomain: "rockpaperscissorsgame-2915c.firebaseapp.com",
    databaseURL: "https://rockpaperscissorsgame-2915c.firebaseio.com",
    projectId: "rockpaperscissorsgame-2915c",
    storageBucket: "rockpaperscissorsgame-2915c.appspot.com",
    messagingSenderId: "64228922403"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Create a variable to reference specific sections of the database.
var chatRef = database.ref("/chat");
var gameRef = database.ref("/game");
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");


// global variables

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

var chatbox = 'chatbox';
var chatbox1 = '';
var chatbox2 = '';
var player1Chat = "";
var player2Chat = "";





function displayEnterNamePanel() {
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

function updateDatabase() {
    console.log("im in updateDatabase");
    gameRef.set({
        player1Name: player1Name,
        player1Ready: player1Ready,
        player1ChoiceMade: player1ChoiceMade,
        player1Choice: player1Choice,
        player1WinCntr: player1WinCntr,
        player1LossCntr: player1LossCntr,
        player2Name: player2Name,
        player2Ready: player2Ready,
        player2ChoiceMade: player2ChoiceMade,
        player2Choice: player2Choice,
        player2WinCntr: player2WinCntr,
        player2LossCntr: player2LossCntr,
        tieCntr: tieCntr,
        brandNewGame: brandNewGame
    });

}

function updateChatDatabase() {
    console.log("im in updateChatDatabase");
    chatRef.set({
        chatbox: chatbox,
        player1Chat: player1Chat,
        player2Chat: player2Chat
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

function prepareGameBoard() {
    gameRef.once("value", function (snapshot) {
        if (snapshot.val().player1Ready && snapshot.val().player2Ready) {
            console.log("players are ready");
            $("#enterNames").remove();
        }
    });
}

function getKey(){
    // playersRef.once("value", function (snapshot) {
        database.child("game");
       var clubkey = dataSnapshot.getKey();


        console.log("im in getKey");
    keyValue = gameRef.getKey();
    console.log("keyValue " + keyValue);
    keyValue2 = connectionsRef.getKey();
    console.log("keyValue2 " + keyValue2);         
        
    }

//----------------------//
// main processing
//----------------------//
$(document).ready(function () {

    if (brandNewGame) {
        //build the EnterNames Panel of HTML
        displayEnterNamePanel();
        updateDatabase();
    } else {
        console.log("nothing");
        //remove the EnterNames Panel of HTML and 
        //Build the rpsEntry Panel and
        //Build the rpsStats Panel
    }


    // Players 1 and 2 enter thier names
    $("#player1Name").submit("#player1Nme", function (event) {
        event.preventDefault();
        player1Name = ($("#player1Nme").val().trim().charAt(0).toUpperCase() +
            $("#player1Nme").val().trim().substr(1).toLowerCase());
        console.log("player1 Name: " + player1Name);
        player1Ready = true;
        updateDatabase();
        prepareGameBoard();
        getKey();
        
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

    gameRef.on("value", function (snapshot) {
        $("#player1").text(snapshot.val().player1Name + ":");
        $("#player2").text(snapshot.val().player2Name + ":");
        $("#name1").text(snapshot.val().player1Name);
        $("#name2").text(snapshot.val().player2Name);
        $("#chatName1").text(snapshot.val().player1Name + ":");
        $("#chatName2").text(snapshot.val().player2Name + ":");
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
        player1Chat = $("#userMsg1").val().trim();
        $("#userMsg1").val("");
        chatbox += player1Chat;
        updateChatDatabase();
        chatbox1 = $("<p>");
        chatbox1.attr("id", 'play1Chat');
        chatRef.once("value", function (snapshot) {
            chatbox1.text(snapshot.val().player1Chat);
        });
        $("#chatbox").append(chatbox1); 
    });

    $("#submitMsg2").on("click", function (event) {
        event.preventDefault();
        player2Chat = $("#userMsg2").val().trim();
        $("#userMsg2").val("");
        chatbox += player2Chat;
        updateChatDatabase();
        chatbox2 = $("<p>");
        chatbox2.attr("id", 'play2Chat');
        chatRef.once("value", function (snapshot) {
            chatbox2.text(snapshot.val().player2Chat);
        });
        $("#chatbox").append(chatbox2);   
    });

});