$(document).ready(function() {
    //getting ref to the name input and player container as well as table body
    var nameInput = $("#player-name");
    var playerList = $("tbody");
    var playerContainer = $(".player-container");

    //adding event listeners to form to creat new object
    $(document).on("submit", "#player-form", handlePlayerFormSubmit);
    $(document).on("click", ".delete-player", handleDeleteButtonPress);

    //getting the initial list of Players
    getPlayers();

    //function to handle what happens when form is submitted
    function handlePlayerFormSubmit(event) {
        event.preventDefault();

        if (!nameInput.val().trim().trim()) {
            return;
        }

        upsertPlayer({
            name: nameInput
                .val()
                .trim()
        });
    }

    //function for creating player calls getPlayers on completion
    function upsertPlayer(playerData) {
        $.post("/api/players", playerData)
        .then(getPlayers);
    }

    //function for creating new list row for players
    function createPlayerRow(playerData) {
        var new
    }
})