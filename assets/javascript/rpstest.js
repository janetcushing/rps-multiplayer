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
// var authorization = firebase.auth();

// Create a variable to reference specific sections of the database.
var chatRef = database.ref("/chat");
var gameRef = database.ref("/game");
var playersRef = database.ref("/players");
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

// Fetch the current user's ID from Firebase Authentication.

// When the client's connection state changes...
connectedRef.on("value", function(snap) {
    
      // If they are connected..
      if (snap.val()) {
    
        // Add user to the connections list.
        var con = connectionsRef.push(true);
    
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
      }
    });


// // When first loaded or when the connections list changes...
// connectionsRef.on("value", function(snap) {
    
//       // Display the viewer count in the html.
//       // The number of online users is the number of children in the connections list.
   
//     });
    

// global variables
// Fetch the current user's ID from Firebase Authentication.
var uid = "";
var uid1 = "";
var uid2 = "";

var playerName = "player";
var player1Name = "player1";
 var keyValue = "";
 var keyValue2 = "";

var player2Name = "player2";
var brandNewGame = true;


function displayEnterNamePanel() {
    console.log("in displayEnterNamePanel");
    nameLabel = $("<label>");
    nameLabel.addClass("playerName");
    nameLabel.attr("for", "playerNameInput");
    nameLabel.text("Player Name");
    nameInput = $("<input>");
    nameInput.attr("type", "text");
    nameInput.attr("id", "playerNme");
    nameInput.addClass("form-control");
    nameInput.attr("placeholder", "Enter Player's name here");
    $("#playerName").append(nameLabel);
    $("#playerName").append(nameInput);
    console.log("not using uid in this function");

}


function updateDatabase() {
    console.log("im in updateDatabase");
    playersRef.set({
        player1Name: player1Name,
        player2Name: player2Name,
        playerName: playerName
    });

}

 function getKey(){
    // playersRef.once("value", function (snapshot) {
        console.log("im in getKey");
    keyValue = playersRef.getKey();
    console.log("keyValue " + keyValue);
    keyValue2 = connectionsRef.getKey();
    console.log("keyValue2 " + keyValue2);         
        
    }





function prepareGameBoard() {
    gameRef.once("value", function (snapshot) {
        if (snapshot.val().player1Ready && snapshot.val().player2Ready) {
            console.log("players are ready");
            $("#enterNames").remove();
        }
    });
}


//----------------------//
// main processing
//----------------------//
$(document).ready(function () {


            if (brandNewGame) {
                //build the EnterNames Panel of HTML
                console.log("brand new game");
                displayEnterNamePanel();
            }
            

            // Players 1 and 2 enter thier names
    $("#player1Name").submit("#player1Nme", function (event) {
        event.preventDefault();
            playersRef.on("value", function (snapshot) {
                    playerName = ($("#playerNme").val().trim().charAt(0).toUpperCase() +
                    $("#playerNme").val().trim().substr(1).toLowerCase());
                     console.log("player Name: " + playerName);
                    // player1Ready = true;
                updateDatabase();
                getKey();
                prepareGameBoard();

    
    });
});

    //          // Players 1 and 2 enter thier names
    // $("#playerName").submit("#playerNme", function (event) {
    //     event.preventDefault();
    //     playerName = ($("#playerNme").val().trim().charAt(0).toUpperCase() +
    //         $("#player1Nme").val().trim().substr(1).toLowerCase());
    //     console.log("player Name: " + playerName);
      
    //     updateDatabase();
    //     playersRef.on("value", function (snapshot) {
    //     $("#player1").text(snapshot.val().player1Name + ":");
    //     getKey();
    //     prepareGameBoard();
    //     // $("#player1").text(snapshot.val().player1Name + ":");
    //     // $("#name1").text(snapshot.val().player1Name);
    // });
    //             // } else  if(uid = snapshot.val().player2Uid){
                //     player2Name = ($("#playerNme").val().trim().charAt(0).toUpperCase() +
                //     $("#playerNme").val().trim().substr(1).toLowerCase());
                //      console.log("player2 Name: " + player1Name);
                //     player2Ready = true;
                // updateDatabase();
                // prepareGameBoard();
                // }
            //     $("#player1").text(snapshot.val().player1Name + ":");
            //     $("#player2").text(snapshot.val().player2Name + ":");
            //     $("#name1").text(snapshot.val().player1Name);
            //     $("#name2").text(snapshot.val().player2Name);
            //     $("#chatName1").text(snapshot.val().player1Name + ":");
            //     $("#chatName2").text(snapshot.val().player2Name + ":");
            // });

 


            });