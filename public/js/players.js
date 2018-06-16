$(document).ready(function() {
<<<<<<< HEAD
    //get reference to name input and player cont, as well as table body
    var nameInput = $("#player-name");
    var playerList = $("#tbody");
    var playerContainer = $(".player-container");

    //add event listener for form to create new object/delete button
    $(document).on("submit", "player-form", handlePlayerFormSubmit);
    $(document).on("click", ".delete-player", handleDeleteButtonPress);

    //get the initial list of players
=======
    //getting ref to the name input and player container as well as table body
    var nameInput = $("#player-name");
    var playerList = $("tbody");
    var playerContainer = $(".player-container");

    //adding event listeners to form to creat new object
    $(document).on("submit", "#player-form", handlePlayerFormSubmit);
    $(document).on("click", ".delete-player", handleDeleteButtonPress);

    //getting the initial list of Players
>>>>>>> 5de0ce5a8f70d9967464e29edbeb52332961ba00
    getPlayers();

    //function to handle what happens when form is submitted
    function handlePlayerFormSubmit(event) {
        event.preventDefault();
<<<<<<< HEAD
        //dont do anything if the fields arent filled
        if (!nameInput.val().trim().trim()) {
            return;
        }
        //calling the upsertPlayer function
=======

        if (!nameInput.val().trim().trim()) {
            return;
        }

>>>>>>> 5de0ce5a8f70d9967464e29edbeb52332961ba00
        upsertPlayer({
            name: nameInput
                .val()
                .trim()
        });
    }

<<<<<<< HEAD
    //function to creat player
=======
    //function for creating player calls getPlayers on completion
>>>>>>> 5de0ce5a8f70d9967464e29edbeb52332961ba00
    function upsertPlayer(playerData) {
        $.post("/api/players", playerData)
        .then(getPlayers);
    }

<<<<<<< HEAD
    //function for creating a new list row for player
    function createPlayerRow(platerData) {
        var newTr = $("<tr>");
        newTr.data("player)
        newTr.append("<td>")
=======
    //function for creating new list row for players
    function createPlayerRow(playerData) {
        var new
>>>>>>> 5de0ce5a8f70d9967464e29edbeb52332961ba00
    }
})