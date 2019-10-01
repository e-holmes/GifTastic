$(document).ready(function(){
    var array=["Spider Man", "Supergirl", "Flash", "Iron Man", "The Rock", "Harry Potter", "Pickachu", "Batman", "Captain Kirk", "Matilda"];
    console.log(array.length);
    mkBtns();

    function mkBtns(i){
        $("#buttons").empty();
        for (i=0; i<array.length; i++){
            button=$("<button>");
            button.attr("class", "col-3 bttn");
            button.attr("value", array[i]);
            button.text(array[i]);
            $("#buttons").append(button);
            
        };
    };
    
    $(".bttn").on("click", function(event){
        event.preventDefault();
        $("#gifs").empty();
        var hero = $(this).val();
        console.log(hero);
        var key = "MveVrHBmkLYI7LhwENhWniJyNgWXbEYo";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +hero +"&api_key=" +key +"&limit=20"
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;
            console.log(results);
            // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div for the gif
              var gifDiv = $("<div>");
              gifDiv.attr("class", "col-3 justify");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_width_still.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs").prepend(gifDiv);
            }}
        })
        
    });
});



