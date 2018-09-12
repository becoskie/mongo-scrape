$(document).ready(function() {
  $(".clear").on("click", function(event) {
    event.preventDefault();
    console.log("clicked!");
    $.ajax({
      method: "GET",
      url: "/clear"
    })
      // With that done, add the note information to the page
      .then(function(data) {
        location.reload();
        console.log(data);
      });
  });

  $(".scrape-new").on("click", function(event) {
    event.preventDefault();
    console.log("clicked!");
    $.ajax({
      method: "GET",
      url: "/scrape"
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        window.location.href = "/";
      });
  });

  $(".save_btn").on("click", function(event) {
    event.preventDefault();
    console.log($(this).attr("data-id"));
    $.ajax({
      method: "PUT",
      url: "/save/" + $(this).attr("data-id"),
      saved: true
    }).then(function() {
      window.location.href = "/";
    });
  });
}); // end document
