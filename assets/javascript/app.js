$(document).ready(function(){
    var array=["Spider Man", "Supergirl", "Flash", "Iron Man", "The Rock", "Harry Potter", "Pickachu", "Batman", "Captain Kirk", "Matilda"];
    console.log("Initial Array Length" +array.length);
    mkBtns();

    function mkBtns(){
        $("#buttons").empty();
        console.log("Array length: " +array.length);
        for (i=0; i<array.length; i++){
            button=$("<button>");
            button.attr("class", "col-2 bttn");
            button.attr("value", array[i]);
            button.text(array[i]);
            $("#buttons").append(button);
            
        };
        attachClickHandlers();
    };


    $(".submit").on("click", function(){
        var item = $(".usrHero").val();
        console.log(item);
        array.push(item);
        console.log(array);
        mkBtns();
        $(".usrHero").val(" ");
    });

    
    function attachClickHandlers() {
        $(".bttn").on("click", function(event){
            console.log("Fetching Photos");
            event.preventDefault();
            $("#gifs").empty();
            var hero = $(this).val();
            console.log(hero);
            var key = "MveVrHBmkLYI7LhwENhWniJyNgWXbEYo";
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +hero +"&rating=pg" +"&api_key=" +key +"&limit=10"
            
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                var results = response.data;
                console.log(results);
                // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Creating a div for the gif
                var gifDiv = $("<div>");
                //   gifDiv.attr("class", "col-3 justify");

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var personImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                personImage.attr("src", results[i].images.fixed_height_still.url);
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.attr("data-state", "still");
                personImage.attr("class", "gif");

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.attr("class", "floaty");
                gifDiv.append(p);
                gifDiv.append(personImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs").prepend(gifDiv);
                }
                $(".gif").on("click", function() {
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    var state = $(this).attr("data-state");
                    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                    // Then, set the image's data-state to animate
                    // Else set src to the data-still value
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    };
                });
            });
            
        });
}
});



