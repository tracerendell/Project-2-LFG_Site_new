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
            if (!sessions || !seessions.length) {
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
        var newCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var newPostProfile = $("<h5>");
        newPostProfile.text("Written by: " + session.Profile.name);
        newPostProfile.css({
            float: "right",
            color: "blue",
            "margin-top":
                "-10px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(post.title + " ");
        newPostBody.text(post.body);
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        newPostCardHeading.append(deleteBtn);
        newPostCardHeading.append(editBtn);
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(newPostAuthor);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("post", post);
        return newPostCard;
    }

    // This function figures out which post we want to delete and then calls deletePost
    function handlePostDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handlePostEdit() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        window.location.href = "/cms?post_id=" + currentPost.id;
    }

    // This function displays a message when there are no posts
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Author #" + id;
        }
        blogContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
            "'>here</a> in order to get started.");
        blogContainer.append(messageH2);
    }

});
