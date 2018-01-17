$(document).ready(function () {
    $.ajax({
        url: "server.php?action=getMedia&type=photo",
        dataType: "JSON"
    }).done(function (data) {
        // console.log(data);

    });


    var isValidData = function () {
        var isMediaValid;
        if ($("#fileTitle").val().length === 0 || $("#media").val().length === 0 || $("#selectedMedia").val() === "default") {
            isMediaValid = false;
            errorMessage();
        }
        else {
            isMediaValid = true;

        }
        return isMediaValid
    };

    var errorMessage = function () {


        // return errorMessage;
        var error;
        if ($("#fileTitle").val().length === 0 && $("#media").val().length === 0) {
            error = "Both title and file is missing";
        } else if ($("#media").val().length > 0 && $("#fileTitle").val().length === 0 && $("#selectedMedia").val() === "default") {
            error = "You've forgotten to select both a title and a category";
        } else if ($("#media").val().length === 0 && $("#fileTitle").val().length > 0) {
            error = "You forgot to select a file!";
        } else if ($("#media").val().length > 0 && $("#fileTitle").val().length > 0 && $("#selectedMedia").val() === "default") {
            error = "You haven't selected a category";
        } else if ($("#media").val().length === 0 && $("#fileTitle").val().length > 0 && $("#selectedMedia").val() === "default") {
            error = "You've forgotten to select both a category and a file";
        } else if ($("#fileTitle").val().length === 0 && $("#media").val().length > 0) {
            error = "You forgot to select a title!";
        }


        return error;


    };

    $('#myForm').on("submit", function (e) {
        e.preventDefault();

        if (isValidData()) {
            $('#myForm').ajaxSubmit(function (data) {

                var result = JSON.parse(data);
                if (result.success === true) {
                    alert("Upload successful");
                } else {
                    alert("Upload failed");
                }
            });

        } else {
            alert(errorMessage());
        }
    });


    function getSelectValue() {

        var selectValue;
        selectValue = $("#mediatype option:selected").text().toLowerCase();

        return selectValue;
    }

    $("#get").on("click", function () {
        var value = getSelectValue();
        $("#results").html("");

        if ($("#mediatype").val() !== "") {

            $.get("server.php?action=getMedia&type=" + value, function (data, status) {
                var result = JSON.parse(data);
                var tag;

                if (typeof result.files !== "undefined") {
                    for (var i = 0; i < result.files.length; i++) {
                        var div = $('<div class = "result col-xs-12 col-sm-6 col-md-4 col-lg-4" >');
                        var assetTitle = $('<h4 class="h4">');
                        assetTitle.html(result.files[i].title);
                        div.html(assetTitle);

                        if (value === 'photo') {
                            tag = $('<img class = "img-responsive img-rounded">');
                            tag.attr('src', result.files[i].path);
                            tag.attr('text', result.files[i].title);


                        }
                        if (value === "video") {
                            tag = $('<video controls class = "img-responsive">');
                            tag.attr('src', result.files[i].path);

                        }
                        if (value === "audio") {
                            tag = $('<audio controls class = "embed-responsive-item">');
                            tag.attr('src', result.files[i].path);
                            tag.attr('text', result.files[i].title);

                        }

                        tag.appendTo(div);
                        div.appendTo("#results");
                    }
                } else {
                    alert("There's nothing here");
                }


            });

        } else {
            alert("You haven't chosen a category");
        }

    });


})
;