$(document).ready(function() {

    //getting jQuery ref to group name, platform, game_playing, form, and player select
    var playerSelect = $("#player");
    var groupInput = $("#group");
    var cmsForm = $("#cms");
    var platformSelect = $("#platform");
    var gameSelect = $("#game");
    //var playersTable = $("#players-table");

    //event listener for form submit
    $(cmsForm).on("submit", handleFormSubmit);

    //gets part of url that comes after the "?"
    var url = window.location.search;
    var groupId;
    var playerId;

    //sets a flag for whether or not we're updating a post [to be false intially]
    var updating = false;

    //if we have this section in our url we pull post id from url
    if (url.indexOf("?group_id=") !== -1) {
        groupId = url.split("=")[1];
        getGroupData(GroupId, "group");
    }
    // otherwise if we have player_id in our url, preset player select box to be our Player
    else if (url.indexOf("?player_id=") !== -1) {
        playerId = url.split("=")[1];
    }

    //getting players and their groupList
    getPlayers();

    //function to handle form submit
    function handleFormSubmit(event) {
        event.preventDefault();
        //wont submit post if we are missing anything
        if (!playerSelect.val() || !platformSelect.val() || !gameSelect.val()) {
            return;
        }

        //contructing a newGroup object to hand to database
        var newGroup = {
            name: groupInput
                .val()
                .trim(),
            
            platform: platformSelect
                .val(),

            game_playing: gameSelect
                .val()
        };

        //if we are updating a group run updateSession, otherwise run submitSession
        if (updating) {
            newGroup.id = groupId;
            updateGroup(newGroup);
        }
        else {
            submitGroup(newGroup);
        }
    }

    //submits a new sesh and brings user to groupList page
    function submitGroup(group) {
        $.post("/api/groupList", group, function(res, err) {
            window.location.href = "/groupList";
        });
    }

    //gets sesh data for current sesh if we're editing
    function getGroupData(id, type) {
        var queryUrl;
        switch (type) {
            case "group":
                queryUrl = "/api/groupList/" + id;
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
                //if this group exists, prefill cms form
                groupInput.val(data.group);
                platformSelect.val(data.platform);
                gameSelect.val(data.game_playing);
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
             window.location.href = "/players";
        }
         $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createPlayerRow(data[i]));
        }
        playerSelect.empty();
        console.log(rowsToAdd);
        console.log(playerSelect);
        playerSelect.append(rowsToAdd);
        playerSelect.val(playerId);
    }

    //creates player options in the dropdown
    function createPlayerRow(player) {
        var listOption = $("<option>");
        listOption.attr("value", player.id);
        listOption.text(player.name);
        return listOption;
    }
        // var tr = $("<tr>");
        // tr.append($("<td>").text(player.name));
        // tr.append($("<td>").text(player.Sessions.length));
        // tr.append($("<td>").html($("<a>").attr("href", "/players/" + player.id).text('See Sessions'))); // @TODO implement route
        // tr.append($("<td>").html($("<a>").attr("href", "/players/" + player.id + "/sessions").text('Create Sessions'))); // @TODO implement
        // tr.append($("<td>").html($("<a>").attr("href", "/players/delete/" + player.id).text('Delete Player'))); // @TODO implement

        // return tr;
    // }

    //update a given sesh, bring user to sesh page when done
    function updateGroup(group) {
        $.ajax({
            method: "PUT",
            url: "/api/groupList",
            data: group
        })
        .then(function() {
            window.location.href = "/groupList";
        });
    }
});
