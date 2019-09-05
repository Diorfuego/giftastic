window.onload = function () {

  let interestArray = ["Wolf", "Baseball", "Basketball", "Tigers", "Fashion", "Cars", "Nature", "Lions", "Bears", "Snowboarding", "Surfing", "Beach", "Ocean", "Space", "Stars", ]


  // Make Buttons & Add Onclick Function

  function makeButtons() {
    $("#got-buttons").empty();

    for (i = 0; i < interestArray.length; i++) {

      let b = $("<button>");

      b.addClass("favorites-btn");
      b.attr("data-name", interestArray[i]);
      b.text(interestArray[i]);

      $("#got-buttons").append(b);
    };
  };

  $("#add-favorites").on("click", function (event) {

    event.preventDefault();

    let favorites = $("#got-input").val().trim();

    interestArray.push(favorites)
    
    $("#got-input").val("");

    makeButtons();

    console.log(interestArray);

  });

  makeButtons();

  //FUNCTION FOR GRABBING GIPHY API CONTENT

  function datapull() {

    let favoriteName = $(this).attr("data-name");
    let favoriteSTR = favoriteName.split(" ").join("+");
    let giphyURL = "https://api.giphy.com/v1/gifs/search?q="+ favoriteSTR + "&api_key=AHg2aSQqMHNlVckkDBc0lIAA752J65LO"

      $.ajax({
        url: giphyURL,
        method: "GET",
        
      }).done(function (response) {

        console.log(giphyURL);
        console.log(response);

        results = response.data;

        $("#gifs").empty();
        for (var i = 0; i < results.length; i++) {

          let favoriteDiv = $("<div>");
          let favoriteP = $("<p class='rating'>").text("Rating: " + results[i].rating);
          
          
          let favoirteImg = $("<img>", {
            class : "image-gifs",
            src : results[i].images.fixed_height_small_still.url,
            click : function(event){
              
              if( $(this).attr('data-state') == 'move' ) {
                console.log('is moving')
                $(this).attr('data-state', 'still')
                $(this).attr('src', $(this).attr('data-still') )
              }

              else if ( $(this).attr('data-state') == 'still') {
                console.log('is still')

                $(this).attr('data-state', 'move')
                $(this).attr('src', $(this).attr('data-move') )
              }
            }
          })
          .attr('data-state', 'still')
          .attr('data-position', i)
          .attr('data-still', results[i].images.fixed_height_small_still.url)
          .attr('data-move', results[i].images.fixed_height_small.url)

          favoriteP.addClass("rating-text")


          /* 
          favoirteImg.addClass("image-gifs")
          favoirteImg.attr("src", results[i].images.fixed_height_small_still.url);
          favoirteImg.attr("data-state", "still");
          favoirteImg.attr("data-position", i);
          */



          favoriteDiv.append(favoriteP);
          favoriteDiv.append(favoirteImg);
          favoriteDiv.addClass("individual-gifs")

          $("#gifs").prepend(favoriteDiv);

        }; // ENDS FOR LOOP

      }); // ENDS AJAX FUNCTION
  };

  // USE DOCUENT ON CLINK FUNTION TO APPLY FUNCTION FOR ELEMENT AFTER THE PAGE HAS LOADED

  $(document).on("click", ".favorites-btn", datapull);

  //MOVING GIFS

  function gifAni() {
    let vin = $(this).attr("data-vin");
    let position = $(this).atrr("data-position"); // This will return a string
    position = paraseInt(position); //string

    if (vin === "still") {

      $(this).attr("src", results[positin].images.fixed_height.url);
      $(this).attr("data-vin", "still");
    }
  };

  $(document).on("click", ".images-gifs", gifAni);


}



document.addEventListener("click", myFunction);

function myFunction() {
  document.getElementsByClassName("wolf").innerHTML = "Hello World";
}