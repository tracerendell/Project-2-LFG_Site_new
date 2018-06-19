$(document).ready(function() {

    //getting jQuery ref to session name, platform, game_playing, form, and player select
    var playerSelect = $("#player");
    var sessionInput = $("#session_name");
    var cmsForm = $("#cms");
    var platformSelect = $("#platform");
    var gameSelect = $("#game");
    var playersTable = $("#players-table");

    //event listener for form submit
    $(cmsForm).on("submit", handleFormSubmit);

    //gets part of url that comes after the "?"
    var url = window.location.search;
    var sessionId;
    var playerId;

    //sets a flag for whether or not we're updating a post [to be false intially]
    var updating = false;

    //if we have this section in our url we pull post id from url
    if (url.indexOf("?session_id=") !== -1) {
        sessionId = url.split("=")[1];
        getSessionData(sessionId, "session");
    }
    // otherwise if we have player_id in our url, preset player select box to be our Player
    else if (url.indexOf("?player_id=") !== -1) {
        playerId = url.split("=")[1];
    }

    //getting players and their sessions
    getPlayers();

    //function to handle form submit
    function handleFormSubmit(event) {
        event.preventDefault();
        //wont submit post if we are missing anything
        if (!sessionInput.val().trim().trim() || !platformSelect.val() || !gameSelect.val() || !playerSelect.val()) {
            return;
        }

        //contructing a newSession object to hand to database
        var newSession = {
            name: sessionInput
                .val()
                .trim(),
            
            platform: platformSelect
                .val(),

            game_playing: gameSelect
                .val()

        };

        //if we are updating a session run updateSession, otherwise run submitSession
        if (updating) {
            newSession.id = sessionId;
            updateSession(newSession);
        }
        else {
            submitSession(newSession);
        }
    }

    //submits a new sesh and brings user to sessions page
    function submitSession(session) {
        $.post("/api/sessions", session, function() {
            window.location.href = "/session";
        });
    }

    //gets sesh data for current sesh if we're editing
    function getSessionData(id, type) {
        var queryUrl;
        switch (type) {
            case "session":
                queryUrl = "/api/sessions/" + id;
                break;
            case "player":
                queryUrl = "/api/players/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function(data) {
            if (data) {
                console.log(data.PlayerId || data.id);
                //if this session exists, prefill cms form
                sessionInput.val(data.name);
                platformSelect.val(data.platform);
                gameSelect.val(data.game_playing)
                playerId = data.PlayerId || data.id;
                //if we have a sesh with this id, set a flag for us to know to update the post when we hit submit
                updating = true;
            }
        });
    }

    //function to get players and render list of Players
    function getPlayers() {
        $.get("/api/players", renderPlayerList);
    }

    //function either renders player list or directs user to player creation page
    function renderPlayerList(data) {
        if (!data.length) {
            // window.location.href = "/players";
        }
        // $(".hidden").removeClass("hidden"); // @TODO this doesn't seem to do anything
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createPlayerRow(data[i]));
        }
        playersTable.empty();
        console.log(rowsToAdd);
        console.log(playerSelect);
        playersTable.append(rowsToAdd);
        // playerSelect.val(playerId);
    }

    //creates player options in the dropdown
    function createPlayerRow(player) {
        // var listOption = $("<option>");
        // listOption.attr("value", player.id);
        // listOption.text(player.name);
        // return listOption;

        var tr = $("<tr>");
        tr.append($("<td>").text(player.name));
        tr.append($("<td>").text(player.Sessions.length));
        tr.append($("<td>").html($("<a>").attr("href", "/players/" + player.id).text('See Sessions'))); // @TODO implement route
        tr.append($("<td>").html($("<a>").attr("href", "/players/" + player.id + "/sessions").text('Create Sessions'))); // @TODO implement
        tr.append($("<td>").html($("<a>").attr("href", "/players/delete/" + player.id).text('Delete Player'))); // @TODO implement

        return tr;
    }

    //update a given sesh, bring user to sesh page when done
    function updateSession(session) {
        $.ajax({
            method: "PUT",
            url: "/api/sessions",
            data: session
        })
        .then(function() {
            window.location.href = "/session";
        });
    }
});
