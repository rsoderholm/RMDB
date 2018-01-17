$(document).ready(function () {


        function createDiv(data) {
            $("#result").html("");
            var movieTitle;
            var movieYear;

            for (i = 0; i < data.Search.length; i++) {
                movieTitle = data.Search[i].Title;
                movieYear = data.Search[i].Year;

                var div = $('<div class = "movie">');
                var button = $('<button class = "btn btn-primary favButton">').text("Add favorite").attr('id', "favoriteButton" + i).attr('value', i);
                var text = $('<p>');
                text.html(movieTitle + ", " + movieYear);
                div.html(text);
                text.appendTo(div);
                button.appendTo(div);
                div.appendTo("#result");


            }
            $(".favButton").on("click", function () {
                var favoriteMovie = data.Search[this.value].Title + ' [' + data.Search[this.value].Year + ']';
                saveFavorite(favoriteMovie);

            })

        }

        $("#addArchive").on("click", function () {

            saveMovieToList(movieData);
            var movie = JSON.stringify(movies);
            localStorage.setItem("movies", movie);
        });

        var movieData;


        var movies = [];


        function init() {
            var oldItems = localStorage.getItem('movies');
            var item = JSON.parse(oldItems);
            if (item != null) {
                for (i = 0; i < item.length; i++) {
                    movies.push(item[i]);


                }
            }
            getFavorite();

        }

        init();


        function saveMovieToList(movie) {
            movies.push(movie.Title);
        }


        function saveFavorite(movie) {
            localStorage.setItem('favorite', JSON.stringify(movie));
            getFavorite();
            alert("Favorite saved!");

        }

        function getFavorite() {
            var oldFavorite = localStorage.getItem('favorite');

            if (oldFavorite != null) {
                $("#favoritemovie").text("Favorite movie: " + oldFavorite);
            } else {
                $("#favoritemovie").text("You have no favorite movie yet!");
            }


        }

        $("#buttonGet").on("click", function () {
            var apiKey = "38690727";
            var searchString = $("#searchmovie").val();

            $.ajax({
                url: "http://www.omdbapi.com/?apikey=" + apiKey + "&s=" + searchString,
                dataType: "JSON",
                data: {
                    escape: "javascript"
                }
            }).done(function (data) {
                if (data.Response === "False") {
                    alert("No search found!");
                } else {
                    createDiv(data);
                }
            });
        });
    }
)
;

