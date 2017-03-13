
$( document ).ready(function() {

	var card = "<div class='card'><div class='card_header'><p id='todo'>To do</p></div><div class='card_content' id='card_content'></div> <p class='add_task' id='add_task'>add task</p></div>";

	$(document.body).on("click", ".add_task", function(e){
		var $x = $(e.target);
		console.log($x.parent());
		//$("#card_content").append("<div class='task'></div>");
	})


	$(".create_new").click(function(){
		$(".row").append(card);
	})

});