// Initialize Firebase
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

var playerRef = database.ref("/player");

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

var playerName;
var playerNumber = 0;
var playerKey;
var player1Ready = false;
var brandNewGame = true;
var name1Input;
var name1Submit;
var name1Label;
var name1Form;
var name2Input;
var name2Submit;
var name2Label;
var name2Form;

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);

        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function (snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#watchers").text(snap.numChildren());
});


function updateDatabase() {
    console.log("im in updateDatabase");
    playerRef.push({
        playerName: player1Name,
        playerNumber: playerNumber
    });
}


// users.orderByChild('email').equalTo(authData.user.email).once('value').then(function(snapshot) {
//     console.log(snapshot.val());
//     console.log(snapshot.key); // 'users'
//     console.log(snapshot.child('email').key); 'email'
//     ...

function getKey() {
    console.log("im in getKey");
    // playerRef.once("value", function (snapshot) {
    // database.child("player");
    playerRef.orderByChild('playerName').once('value').then(function(snapshot){
        console.log("val " + snapshot.val());
        console.log("playerName" + snapshot.val().playerName);
        console.log("child " + snapshot.child('player1Name').key);
        // var playerKey = snapshot.getKey();
        // playerKey = playerRef.getKey();
        // console.log("keyValue " + playerKey);
    });

}


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

function prepareGameBoard() {
    playerRef.once("value", function (snapshot) {
        if (snapshot.val().player1Ready && snapshot.val().player2Ready) {
            console.log("players are ready");
            $("#enterNames").remove();
        }
    });
}


$(document).ready(function () {

    if (brandNewGame) {
        //build the EnterNames Panel of HTML
        displayEnterNamePanel();
        // updateDatabase();
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
        // player1Ready = true;
        updateDatabase();
        prepareGameBoard();
        getKey();

    });

});