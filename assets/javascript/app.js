   // Initial array of movies
      var topics = ["cat", "dog", "bird", "hamster"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayGifSet() {

       // var gifTopic = $(this).attr("data-name");
      //  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=N6BRZIEjEPqE4Wj9E3zpXDZqF3OvWe8p&q=" + gifTopic + "&limit=10&offset=0&rating=G&lang=en";

        /* Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          // Putting gifs in div
            
        
        });
        */
      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("topic-btn");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();

        // Adding movie from the textbox to our array
        topic.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".topic-btn", displayGifSet);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();