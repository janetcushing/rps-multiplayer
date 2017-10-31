// rps multipllayer game javascript

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

var theInterval = 0;
var secondsToWait = 5;
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



// Initialize Firebase
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




function displayEnterNamePanel() {

    // build name1 input panel
    // name1Form = $("<form>");
    // name1Form.addClass("form-group");
    // name1Form.attr("id", "player1Name");

    name1Label = $("<label>");
    name1Label.addClass("player1Name");
    name1Label.attr("for", "player1NameInput");
    name1Label.text("Player 1");

    name1Input = $("<input>");
    name1Input.attr("type", "text");
    name1Input.attr("id", "player1Nme")
    name1Input.addClass("form-control");
    name1Input.attr("placeholder", "Enter Player's name here")

    // name1Submit = $("<input>");
    // name1Submit.attr("type", "submit");
    // name1Submit.attr("value", "Go");

    // name1Form.append(name1Label);
    // name1Form.append(name1Input);
    // name1Form.append(name1Submit);
    $("#player1Name").append(name1Label);
    $("#player1Name").append(name1Input);

    // build name2 input panel
    // name2Form = $("<form>");
    // name2Form.addClass("form-group");
    // name2Form.attr("id", "player2Name");

    name2Label = $("<label>");
    name2Label.addClass("player2Name");
    name2Label.attr("for", "player2NameInput");
    name2Label.text("Player 2");

    name2Input = $("<input>");
    name2Input.attr("type", "text");
    name2Input.attr("id", "player2Nme")
    name2Input.addClass("form-control");
    name2Input.attr("placeholder", "Enter Player's name here")

    //  name2Submit = $("<input>");
    //  name2Submit.attr("type", "submit");
    //  name2Submit.attr("value", "Go");
    $("#player2Name").append(name2Label);
    $("#player2Name").append(name2Input);
    // name2Form.append(name2Label);
    // name2Form.append(name2Input);
    //  name2Form.append(name2Submit);

    // $("#enterNames").append(name1Form);
    // $("#enterNames").append(name2Form);

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
    var rpsDiv;
    var rpsSpan;
    var rpsRockLabel;
    var rpsRockImg;
    var rpsPaperLabel;
    var rpsPaperImg;
    var rpsScissorsLabel;
    var rpsScissorsImg;
}

function displayrpsStatsPanel() {

}

function updateDatabase() {
    console.log("im in updateDatabase");
    database.ref().set({
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
        theInterval: theInterval,
        secondsToWait: secondsToWait,
        brandNewGame: brandNewGame
    });

}


function determineWhoWins() {
    console.log("im in determineWhoWins");
    database.ref().once("value", function (snapshot) {
        if (snapshot.val().player1ChoiceMade && snapshot.val().player2ChoiceMade) {
            console.log("the choices have both been made");
            if (snapshot.val().player1Choice === "r") {
                if (snapshot.val().player2Choice === "r") {
                    tieCntr = snapshot.val().tieCntr + 1;
                    // alert("its a tie!");
                    $("#winMsg").text("It's a tie!  Pick again!");
                    updateDatabase();
                    // $("#name1Wins").text(snapshot.val().player1WinCntr);
                    // $("#name1Losses").text(snapshot.val().player1LossCntr);
                    // $("#name1TieCntr").text(snapshot.val().tieCntr);
                    // $("#name2Wins").text(snapshot.val().player2WinCntr);
                    // $("#name2Losses").text(snapshot.val().player2LossCntr);
                    // $("#name2TieCntr").text(snapshot.val().tieCntr);
                    // resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    updateDatabase();
                    // $("#name1Wins").text(snapshot.val().player2WinCntr);
                    // $("#name1Losses").text(snapshot.val().player2LossCntr);
                    // $("#name1TieCntr").text(snapshot.val().tieCntr);
                    // $("#name2Wins").text(snapshot.val().player2WinCntr);
                    // $("#name2Losses").text(snapshot.val().player2LossCntr);
                    // $("#name2TieCntr").text(snapshot.val().tieCntr);
                    // resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    updateDatabase();
                    // $("#name1Wins").text(snapshot.val().player2WinCntr);
                    // $("#name1Losses").text(snapshot.val().player2LossCntr);
                    // $("#name1TieCntr").text(snapshot.val().tieCntr);
                    // $("#name2Wins").text(snapshot.val().player2WinCntr);
                    // $("#name2Losses").text(snapshot.val().player2LossCntr);
                    // $("#name2TieCntr").text(snapshot.val().tieCntr);
                    // resetDatabaseForNextGame();
                }
            } else if (snapshot.val().player1Choice === "p") {
                if (snapshot.val().player2Choice === "r") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    updateDatabase();
                    // $("#name1Wins").text(snapshot.val().player2WinCntr);
                    // $("#name1Losses").text(snapshot.val().player2LossCntr);
                    // $("#name1TieCntr").text(snapshot.val().tieCntr);
                    // $("#name2Wins").text(snapshot.val().player2WinCntr);
                    // $("#name2Losses").text(snapshot.val().player2LossCntr);
                    // $("#name2TieCntr").text(snapshot.val().tieCntr);
                    // resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    tieCntr = snapshot.val().tieCntr + 1;
                    $("#winMsg").text("It's a tie!  Pick again!");
                    updateDatabase();
                    // $("#name1Wins").text(snapshot.val().player2WinCntr);
                    // $("#name1Losses").text(snapshot.val().player2LossCntr);
                    // $("#name1TieCntr").text(snapshot.val().tieCntr);
                    // $("#name2Wins").text(snapshot.val().player2WinCntr);
                    // $("#name2Losses").text(snapshot.val().player2LossCntr);
                    // $("#name2TieCntr").text(snapshot.val().tieCntr);
                    // resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    updateDatabase();
                    // $("#name1Wins").text(snapshot.val().player2WinCntr);
                    // $("#name1Losses").text(snapshot.val().player2LossCntr);
                    // $("#name1TieCntr").text(snapshot.val().tieCntr);
                    // $("#name2Wins").text(snapshot.val().player2WinCntr);
                    // $("#name2Losses").text(snapshot.val().player2LossCntr);
                    // $("#name2TieCntr").text(snapshot.val().tieCntr);
                    // resetDatabaseForNextGame();
                }
            } else if (snapshot.val().player1Choice === "s") {

                if (snapshot.val().player2Choice === "r") {
                    player1LossCntr = snapshot.val().player1LossCntr + 1;
                    player2WinCntr = snapshot.val().player2WinCntr + 1;
                    $("#winMsg").text(snapshot.val().player2Name + " Wins!  Pick again!");
                    updateDatabase();
                    // $("#name1Wins").text(snapshot.val().player2WinCntr);
                    // $("#name1Losses").text(snapshot.val().player2LossCntr);
                    // $("#name1TieCntr").text(snapshot.val().tieCntr);
                    // $("#name2Wins").text(snapshot.val().player2WinCntr);
                    // $("#name2Losses").text(snapshot.val().player2LossCntr);
                    $("#name2TieCntr").text(snapshot.val().tieCntr);
                    // resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "p") {
                    player1WinCntr = snapshot.val().player1WinCntr + 1;
                    player2LossCntr = snapshot.val().player2LossCntr + 1;
                    $("#winMsg").text(snapshot.val().player1Name + " Wins!  Pick again!");
                    updateDatabase();
                    // $("#name1Wins").text(snapshot.val().player2WinCntr);
                    // $("#name1Losses").text(snapshot.val().player2LossCntr);
                    // $("#name1TieCntr").text(snapshot.val().tieCntr);
                    // $("#name2Wins").text(snapshot.val().player2WinCntr);
                    // $("#name2Losses").text(snapshot.val().player2LossCntr);
                    // $("#name2TieCntr").text(snapshot.val().tieCntr);
                    // resetDatabaseForNextGame();
                } else if (snapshot.val().player2Choice === "s") {
                    tieCntr = snapshot.val().tieCntr + 1;
                    $("#winMsg").text("It's a tie!  Pick again!");
                    updateDatabase();
                    // $("#name1Wins").text(snapshot.val().player2WinCntr);
                    // $("#name1Losses").text(snapshot.val().player2LossCntr);
                    // $("#name1TieCntr").text(snapshot.val().tieCntr);
                    // $("#name2Wins").text(snapshot.val().player2WinCntr);
                    // $("#name2Losses").text(snapshot.val().player2LossCntr);
                    // $("#name2TieCntr").text(snapshot.val().tieCntr);
                    // resetDatabaseForNextGame();
                }
            }
            database.ref().once("value", function (snapshot) {
                $("#name1Wins").text(snapshot.val().player1WinCntr);
                $("#name1Losses").text(snapshot.val().player1LossCntr);
                $("#name1TieCntr").text(snapshot.val().tieCntr);
                $("#name2Wins").text(snapshot.val().player2WinCntr);
                $("#name2Losses").text(snapshot.val().player2LossCntr);
                $("#name2TieCntr").text(snapshot.val().tieCntr);
            });
            resetDatabaseForNextGame();
        }
    });
}




function resetDatabaseForNextGame() {
    console.log("im in resetDatabaseForNextGame");
    player1ChoiceMade = false;
    player1Choice = "";
    player2ChoiceMade = false;
    player2Choice = "";
    theInterval = 0;
    secondsToWait = 5;
    updateDatabase();

}

function prepareGameBoard() {
    database.ref().once("value", function (snapshot) {
        if (snapshot.val().player1Ready && snapshot.val().player2Ready) {
            console.log("players are ready");
            $("#enterNames").remove();
            //     // theInterval = setInterval(countDown, 1000);
        }
    });
}

// //---------------------------------------//
// // count down the seconds of the timer
// //---------------------------------------//
// function countDown() {
//     $("#secondsLeft").html(tracker.secondsToWait);
//     if (secondsToWait === 0) {
//         countDownIsZero();
//     } else {
//         secondsToWait--;
//     }
// }

// //---------------------------------------//
// // stop the timer
// //---------------------------------------//
// function stopCountDown() {
//     clearInterval(theInterval);
// }

//--------------------------------------------------------------//
// function countDownIsZero() {
//     stopCountDown();
//     $("#secondsLeft").html("GO!");
//     player1Ready = true;
//     player2Ready = true;
//     updateDatabase();
// }

//----------------------//
// main processing
//----------------------//
$(document).ready(function () {

    if (brandNewGame) {
        //build the EnterNames Panel of HTML
        displayEnterNamePanel();
        player1Name = "player1";
        player1Ready = false;
        player1ChoiceMade = false;
        player1Choice = "";
        player1WinCntr = 0;
        player1LossCntr = 0;
        player2Name = "player2";
        player2Ready = false;
        player2ChoiceMade = false;
        player2Choice = "";
        player2WinCntr = 0;
        player2LossCntr = 0;
        tieCntr = 0;
        theInterval = 0;
        secondsToWait = 5;
        brandNewGame = false;
        updateDatabase();
    } else {
        console.log("nothing");

        //remove the EnterNames Panel of HTML and 
        //Build the rpsEntry Panel and
        //Build the rpsStats Panel
    }

    // $('#dance-view').on('click', '.dance', function () {
    // $("#textbox1").keyup(function(){
    //     value = $("#textbox1").attr('value');   
    //     alert(value);
    // });
    $("#player1Name").submit("#player1Nme", function (event) {
        event.preventDefault();
        player1Name = ($("#player1Nme").val().trim().charAt(0).toUpperCase() +
            $("#player1Nme").val().trim().substr(1).toLowerCase());
        console.log("player1 Name: " + player1Name);
        player1Ready = true;
        updateDatabase();
        prepareGameBoard();
    });

    // $("#player2Name").submit(function (event) {
    $("#player2Name").submit("#player2Nme", function (event) {
        event.preventDefault();
        player2Name = ($("#player2Nme").val().trim().charAt(0).toUpperCase() +
            $("#player2Nme").val().trim().substr(1).toLowerCase());
        console.log("player2 Name: " + player2Name);
        player2Ready = true;
        updateDatabase();
        prepareGameBoard();
    });



    // player1 and player2 play the game, capture thier selections
    $('#rockP1').on('click', function (event) {
        player1Choice = $("#rockP1").val().trim();
        player1ChoiceMade = true;
        updateDatabase();
        console.log("p1 rock clicked: " + player1Choice);
        determineWhoWins();
    });
    $('#paperP1').on('click', function (event) {
        player1Choice = $("#paperP1").val().trim();
        player1ChoiceMade = true;
        updateDatabase();
        console.log("p1 paper clicked: " + player1Choice);
        determineWhoWins();
    });
    $('#scissorsP1').on('click', function (event) {
        player1Choice = $("#scissorsP1").val().trim();
        player1ChoiceMade = true;
        updateDatabase();
        console.log("p1 scissors clicked: " + player1Choice);
        determineWhoWins();
    });

    $('#rockP2').on('click', function (event) {
        player2Choice = $("#rockP2").val().trim();
        player2ChoiceMade = true;
        updateDatabase();
        console.log("p2 rock clicked: " + player2Choice);
        determineWhoWins();
    });
    $('#paperP2').on('click', function (event) {
        player2Choice = $("#paperP2").val().trim();
        player2ChoiceMade = true;
        updateDatabase();
        console.log("p2 paper clicked: " + player2Choice);
        determineWhoWins();
    });
    $('#scissorsP2').on('click', function (event) {
        player2Choice = $("#scissorsP2").val().trim();
        player2ChoiceMade = true;
        updateDatabase();
        console.log("p2 scissors clicked: " + player2Choice);
        determineWhoWins();
    });


    // database.ref().once(function (snapshot) {
    //     if (snapshot.val().player1ChoiceMade && snapshot.val().player2ChoiceMade) {
    //         determineWhoWins(snapshot);
    //     }
    // });

    // Firebase watcher + initial loader HINT: This code behaves 
    // similarly to .on("value")
    database.ref().on("value", function (snapshot) {

        $("#player1").text(snapshot.val().player1Name + ":");
        $("#player2").text(snapshot.val().player2Name + ":");
        $("#name1").text(snapshot.val().player1Name);
        $("#name2").text(snapshot.val().player2Name);

        // if (snapshot.val().player1ChoiceMade && snapshot.val().player2ChoiceMade) {
        //             determineWhoWins(snapshot);
        //         }



    });
});