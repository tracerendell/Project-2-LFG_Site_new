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
        var newTr = $("<tr>");
        newTr.data("player", playerData);
        newTr.append("<td>" + playerData.name + "</td>");
        newTr.append("<td>" + playerData.Sessions.length + "</td>");
        newTr.append("<td><a href='/sessions?player_id=" + playerData.id + "'>Go to Sessions</a></td>");
        newTr.append("<td><a href='/cms?player_id=" + playerData.id + "'>Create a Session</a></td>");
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-player'>Delete Player</a></td>");
        return newTr;
    }

    //function for retrieving players and getting them ready to be rendered
    function getPlayers() {
        $.get("/api/players", function(data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createPlayerRow(data[i]));
            }
            renderPlayerList(rowsToAdd);
            nameInput.val("");
        });
    }

    //function for rendering list of players to page
    function renderPlayerList(rows) {
        playerList.children().not(":last").remove();
        playerContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            playerList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    //function for handling empty render
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create a Player before you create a Session");
        playerContainer.append(alertDiv);
    }

    //function for handling delete
    function handleDeleteButtonPress() {
        var listItemData = $(this).parent("td").parent("tr").data("player");
        var id = listItemData.id;
        $.ajax({
            method: "DELETE",
            url: "/api/players/" + id
        })
        .then(getPlayers);
    }
});