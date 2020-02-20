// check off specific todos by clicking
$("ul").on("click", "li", function() {
  $(this).toggleClass("completed");
});

// click on X to delete // TODO:
$("ul").on("click", "span", function(event) {
  $(this).parent().fadeOut(500, function() {
    $(this).remove();
  });
  event.stopPropagation();
});
// add new task in TODO List
$("input[type='text']").keypress(function(event) {
  if (event.which === 13) {
    //grabing new todo text from input
    var todoText = $(this).val();
    $(this).val("");
    //create a new li and add to ul
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
  }
});

$(".fa-plus").click(function(){
  $("input[type='text']").fadeToggle();
});


 function getCounter(){
      var count = $(this).find(".jquery-accordion-menu").children('li').length;
      $(this).find("span.counter").text(count);
  }

  $(".jquery-accordion-menu").each(getCounter);