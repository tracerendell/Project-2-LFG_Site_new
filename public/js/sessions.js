$(document).ready(function () {
    /* global moment */

    // blogContainer holds all of our sessions
    var sessionContainer = $(".session-container");
    var sessionCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleSessionDelete);
    $(document).on("click", "button.edit", handleSessionEdit);
    // Variable to hold our sessions
    var sessions;

    // The code below handles the case where we want to get blog sessions for a specific player
    // Looks for a query param in the url for player_id
    var url = window.location.search;
    var playerId;
    if (url.indexOf("?playerId=") !== -1) {
        playerId = url.split("=")[1];
        getSessions(playerId);
    }
    // If there's no playerId we just get all sessions as usual
    else {
        getSessions();
    }


    // This function grabs sessions from the database and updates the view
    function getSessions(player) {
       playerId = player || "";
        if (playerId) {
            playerId = "/?player_id=" + playerId;
        }
        $.get("/api/sessions" + playerId, function (data) {
            console.log("Sessions", data);
            sessions = data;
            if (!sessions || !sessions.length) {
                displayEmpty(player);
            }
            else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete sessions
    function deleteSession(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/sessions/" + id
        })
            .then(function () {
                getSessions(sessionCategorySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed session HTML inside blogContainer
    function initializeRows() {
        sessionContainer.empty();
        var sessionsToAdd = [];
        for (var i = 0; i < sessions.length; i++) {
            sessionsToAdd.push(createNewRow(sessions[i]));
        }
        sessionContainer.append(sessionsToAdd);
    }

    // This function constructs a session's HTML
    function createNewRow(session) {
        var formattedDate = new Date(session.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newSessionCard = $("<div>");
        newSessionCard.addClass("card");
        var newSessionCardHeading = $("<div>");
        newSessionCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        var newSessionName = $("<h2>");
        var newSessionDate = $("<small>");
        var newSessionPlayer = $("<h5>");
        newSessionPlayer.text("Written by: " + session.Player.name);
        newSessionPlayer.css({
            float: "right",
            color: "blue",
            "margin-top":
                "-10px"
        });
        var newSessionCardBody = $("<div>");
        newSessionCardBody.addClass("card-body");
        var newSessionBody = $("<p>");
        newSessionName.text(session.title + " ");
        newSessionBody.text(session.body);
        newSessionDate.text(formattedDate);
        newSessionName.append(newSessionDate);
        newSessionCardHeading.append(deleteBtn);
        newSessionCardHeading.append(editBtn);
        newSessionCardHeading.append(newSessionName);
        newSessionCardHeading.append(newSessionPlayer);
        newSessionCardBody.append(newSessionBody);
        newSessionCard.append(newSessionCardHeading);
        newSessionCard.append(newSessionCardBody);
        newSessionCard.data("session", session);
        return newSessionCard;
    }

    // This function figures out which session we want to delete and then calls deletePost
    function handleSessionDelete() {
        var currentSession = $(this)
            .parent()
            .parent()
            .data("session");
        deleteSession(currentSession.id);
    }

    // This function figures out which session we want to edit and takes it to the appropriate url
    function handleSessionEdit() {
        var currentSession = $(this)
            .parent()
            .parent()
            .data("session");
        window.location.href = "/cms?session_id=" + currentSession.id;
    }

    // This function displays a message when there are no sessions
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Player #" + id;
        }
        sessionsContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No sessions yet" + partial + ", navigate <a href='/cms" + query +
            "'>here</a> in order to get started.");
        sessionsContainer.append(messageH2);
    }

});
