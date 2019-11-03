// Initial array of movies
var topics = ["cat", "dog", "bird", "hamster"];

//ready document for JQuery
$(document).ready(function() {
    // Button click functions Add button and Clear buttons
    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#topic-input")
            .val()
            .trim();

        // Adding movie from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    $("#clear").on("click", function(event) {
        clearButtons();
        renderButtons();
    });

    $("#delete").on("click", function(event) {
        deleteLast();
    });
    //unpauses/pauses gifs uses the attributes to manipulate the state
    //of the gif
    function unpause() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            var newSrc = $(this).attr("data-animate");
            $(this).attr("src", newSrc);
            $(this).attr("data-state", "animate");
        } else {
            var newSrc = $(this).attr("data-still");
            $(this).attr("src", newSrc);
            $(this).attr("data-state", "still");
        }
    }
    /*Display gif set resets the view to empty and then takes the 
    topic html text and pulls 10 gifs with that topic name at a G rating. 
    The gifs are given attributes for pausing and bootstraps css classes.
    */
    function displayGifSet() {
        $("#topic-view").empty();
        var gifTopic = $(this).attr("data-name");
        var queryURL =
            "https://api.giphy.com/v1/gifs/search?api_key=N6BRZIEjEPqE4Wj9E3zpXDZqF3OvWe8p&q=" +
            gifTopic +
            "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({ url: queryURL, method: "GET" }).done(function(response) {
            for (var x = 0; x < response.data.length; x++) {
                var gifDiv = $("<div>");
                var p = $("<div>").text("Rating: " + response.data[x].rating);
                var topicGifs = $("<img>");
                topicGifs.attr(
                    "src",
                    response.data[x].images.fixed_height_still.url
                );
                gifDiv.append(topicGifs);
                gifDiv.append(p);
                topicGifs.addClass("unpause");
                topicGifs.attr({
                    "data-still":
                        response.data[x].images.fixed_height_still.url,
                    "data-animate": response.data[x].images.fixed_height.url,
                    "data-state": "still",
                });

                gifDiv.addClass("card w-25");
                p.addClass("card-footer text-center");
                $("#topic-view").append(gifDiv);
            }
        });
    }

    // Function for displaying buttons
    function renderButtons() {
        // Deleting original button render to re-render
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {
            // Then dynamicaly generating buttons for each topic in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)

            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass(
                "testClass btn btn-dark bg-info btn-outline-dark btn m-3"
            );
            //Adding ID
            //a.attr("id", "topic-btn");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }
    //function for clearing buttons
    function clearButtons() {
        var length = topics.length;
        for (x = 0; x < length; x++) {
            topics.pop();
        }
    }
    //removes last topic button incase of typos!
    function deleteLast() {
        topics.pop();
        renderButtons();
    }
    // Adding a click event listener to all elements with a class of "#topic-btn"
    // $(document).on("click", "#topic-btn", displayGifSet);
    $(document).on("click", ".testClass", displayGifSet);
    $(document).on("click", ".unpause", unpause);
    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});
