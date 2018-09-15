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
      url: "/newScrape"
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
      url: "/save/" + data_id
    }).then(function() {
      $(`#${data_id}`).hide();
    });
  });

  $(".delete").on("click", function(event) {
    event.preventDefault();
    const target = $(this)
      .parents(":eq(2)")
      .attr("data-_id");
    $.ajax({
      method: "PUT",
      url: "/deleteSaved/" + target
    }).then(function() {
      $(`div > [data-_id="${target}"]`).hide();
      location.reload();
    });
  });

  $(".save_note").on("click", function(e) {
    e.preventDefault();
    const target = $(this).attr("data-target");
    const note = $("#noteId_" + target).val();
    $.ajax({
      method: "POST",
      url: "/noteSaved/" + target,
      data: {
        body: note.trim()
      }
    }).then(function() {
      $("#Modal_" + target).on("hidden.bs.modal", function(e) {
        // note.val('');
        location.reload();
      });
    });
  });

  $(".note-delete").on("click", function(e) {
    e.preventDefault();
    const target = $(this).attr("data-delete");
    $("#noteItem_" + target).hide();
    $.ajax({
      method: "PUT",
      url: "/deleteNote/" + target
    }).then(function() {
      $("#Modal_" + target).on("hidden.bs.modal", function(e) {
        // note.val('');
        location.reload();
      });
    });
  });

  $(".save_note").attr("disabled", "true");
  $(".savedNoteText").keyup(function() {
    $(".save_note").removeAttr("disabled");
  });
}); // end document
