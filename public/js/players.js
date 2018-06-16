$(document).ready(function() {
    //get reference to name input and player cont, as well as table body
    var nameInput = $("#player-name");
    var playerList = $("#tbody");
    var playerContainer = $(".player-container");

    //add event listener for form to create new object/delete button
    $(document).on("submit", "player-form", handlePlayerFormSubmit);
    $(document).on("click", ".delete-player", handleDeleteButtonPress);

    //get the initial list of players
    getPlayers();

    //function to handle what happens when form is submitted
    function handlePlayerFormSubmit(event) {
        event.preventDefault();
        //dont do anything if the fields arent filled
        if (!nameInput.val().trim().trim()) {
            return;
        }
        //calling the upsertPlayer function
        upsertPlayer({
            name: nameInput
                .val()
                .trim()
        });
    }

    //function to creat player
    function upsertPlayer(playerData) {
        $.post("/api/players", playerData)
        .then(getPlayers);
    }

    //function for creating a new list row for player
    function createPlayerRow(platerData) {
        var newTr = $("<tr>");
        newTr.data("player)
        newTr.append("<td>")
    }
})