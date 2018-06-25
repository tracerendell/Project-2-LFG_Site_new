$(document).ready(function () {
    /* global moment */

    // blogContainer holds all of our groupList
    var groupListContainer = $(".groupList-container");
    var groupCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleGroupDelete);
    $(document).on("click", "button.edit", handleGroupEdit);
    // Variable to hold our groupList
    var groupList;

    // The code below handles the case where we want to get blog groupList for a specific player
    // Looks for a query param in the url for player_id
    var url = window.location.search;
    var playerId;
    if (url.indexOf("?playerId=") !== -1) {
        playerId = url.split("=")[1];
        getGroupList(playerId);
    }
    // If there's no playerId we just get all groupList as usual
    else {
        getGroupList();
    }


    // This function grabs groupList from the database and updates the view
    function getGroupList(player) {
       playerId = player || "";
        if (playerId) {
            playerId = "/?playerId=" + playerId;
        }
        $.get("/api/groupList" + playerId, function (data) {
            console.log("GroupList", data);
            groupList = data;
            if (!groupList || !groupList.length) {
                displayEmpty(player);
            }
            else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete groups
    function deleteGroup(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/groupList/" + id
        })
            .then(function () {
                getGroupList(groupCategorySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed session HTML inside blogContainer
    function initializeRows() {
        groupListContainer.empty();
        var groupToAdd = [];
        for (var i = 0; i < groupList.length; i++) {
            groupToAdd.push(createNewRow(groupList[i]));
        }
        groupListContainer.append(groupToAdd);
    }

    // This function constructs a session's HTML
    function createNewRow(group) {
        var formattedDate = new Date(group.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newGroupCard = $("<div>");
        newGroupCard.addClass("card");
        var newGroupCardHeading = $("<div>");
        newGroupCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        var newGroupName = $("<h2>");
        var newGroupDate = $("<small>");
        var newGroupProfile = $("<h5>");
        newGroupProfile.text("Written by: " + group.Player.name);
        newGroupProfile.css({
            float: "right",
            color: "blue",
            "margin-top":
                "-10px"
        });
        var newGroupCardBody = $("<div>");
        newGroupCardBody.addClass("card-body");
        var newGroupBody = $("<p>");
        newGroupName.text(group.title + " ");
        newGroupBody.text(group.body);
        newGroupDate.text(formattedDate);
        newGroupName.append(newGroupDate);
        newGroupCardHeading.append(deleteBtn);
        newGroupCardHeading.append(editBtn);
        newGroupCardHeading.append(newGroupName);
        newGroupCardHeading.append(newGroupProfile);
        newGroupCardBody.append(newGroupBody);
        newGroupCard.append(newGroupCardHeading);
        newGroupCard.append(newGroupCardBody);
        newGroupCard.data("group", group);
        return newGroupCard;
    }

    // This function figures out which session we want to delete and then calls deletePost
    function handleGroupDelete() {
        var currentGroup = $(this)
            .parent()
            .parent()
            .data("group");
        deleteGroup(currentGroup.id);
    }

    // This function figures out which session we want to edit and takes it to the appropriate url
    function handleGroupEdit() {
        var currentGroup = $(this)
            .parent()
            .parent()
            .data("group");
        window.location.href = "/cms?group_id=" + currentGroup.id;
    }

    // This function displays a message when there are no groupList
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Player #" + id;
        }
        groupListContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No groups yet" + partial + ", navigate <a href='/cms" + query +
            "'>here</a> in order to get started.");
        groupListContainer.append(messageH2);
    }

});
