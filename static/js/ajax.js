$(document).ready(function() {
  $("button#clickprint").click(function() {
    $.ajax({
      type: "GET",
      url: "../../misc/test.txt",
      success: function(result) {
        $("#weapon_display").html(result).toggle();
      }
    });
  });
});
