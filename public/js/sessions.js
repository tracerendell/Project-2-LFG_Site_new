$(document).ready(function () {
    /* global moment */

    // blogContainer holds all of our posts
    var blogContainer = $(".blog-container");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleSessionDelete);
    $(document).on("click", "button.edit", handleSessionEdit);
    // Variable to hold our posts
    var sessions;

    // The code below handles the case where we want to get blog posts for a specific author
    // Looks for a query param in the url for author_id
    var url = window.location.search;
    var authorId;
    if (url.indexOf("?player_id=") !== -1) {
        authorId = url.split("=")[1];
        getSessions(playerId);
    }
    // If there's no authorId we just get all posts as usual
    else {
        getSessions();
    }


    // This function grabs posts from the database and updates the view
    function getSessions(player) {
       playerId = player || "";
        if (playerId) {player
            playerId = "/?player_id=" + playerId;
        }
        $.get("/api/sessions" + authorId, function (data) {
            console.log("Sessions", data);
            posts = data;
            if (!sessions || !sessions.length) {
                displayEmpty(profile);
            }
            else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deleteSession(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/sessions/" + id
        })
            .then(function () {
                getSessions(sessionCategorySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
        blogContainer.empty();
        var sessionToAdd = [];
        for (var i = 0; i < sessions.length; i++) {
            sessionToAdd.push(createNewRow(sessions[i]));
        }
        blogContainer.append(sessionsToAdd);
    }

    // This function constructs a post's HTML
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
        var newSessionTitle = $("<h2>");
        var newSessionDate = $("<small>");
        var newSessionProfile = $("<h5>");
        newSessionProfile.text("Written by: " + session.Profile.name);
        newSessionProfile.css({
            float: "right",
            color: "blue",
            "margin-top":
                "-10px"
        });
        var newSessionCardBody = $("<div>");
        newSessionCardBody.addClass("card-body");
        var newSessionBody = $("<p>");
        newSessionTitle.text(session.title + " ");
        newSessionBody.text(session.body);
        newSessionDate.text(formattedDate);
        newSessionTitle.append(newSessionDate);
        newSessionCardHeading.append(deleteBtn);
        newSessionCardHeading.append(editBtn);
        newSessionCardHeading.append(newSessionTitle);
        newSessionCardHeading.append(newSessionAuthor);
        newSessionCardBody.append(newSessionBody);
        newSessionCard.append(newSessionCardHeading);
        newSessionCard.append(newSessionCardBody);
        newSessionCard.data("session", session);
        return newSessionCard;
    }

    // This function figures out which post we want to delete and then calls deletePost
    function handleSessionDelete() {
        var currentSession = $(this)
            .parent()
            .parent()
            .data("post");
        deleteSession(currentSession.id);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handleSessionEdit() {
        var currentSession = $(this)
            .parent()
            .parent()
            .data("session");
        window.location.href = "/cms?session_id=" + currentSession.id;
    }

    // This function displays a message when there are no posts
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Player #" + id;
        }
        blogContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No sesions yet" + partial + ", navigate <a href='/cms" + query +
            "'>here</a> in order to get started.");
        blogContainer.append(messageH2);
    }

});
