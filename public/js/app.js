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
    const data_id = $(this).attr("data-id");
    $.ajax({
      method: "PUT",
      url: "/save/" + data_id,
      saved: true
    }).then(function() {
      $(`#${data_id}`).hide();
    });
  });
}); // end document
