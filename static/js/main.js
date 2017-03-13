
$( document ).ready(function() {

	
	var card = "<div class='card'><div class='card_header'><p id='todo'>To do</p></div><div class='card_content' id='card_content'></div> <p class='add_task' id='add_task'>add task</p></div>";

	$(document.body).on("click", ".add_task", function(e){
		var $x = $(e.target);
		console.log($x.parent());
		$list = $x.prev();
		console.log($list);
		$list.append("<div class='task'>" + Math.floor((Math.random() * 10) + 1) + "</div>");
	})


	$(".create_new").click(function(){
		$(".row").append(card);
		//save();
	})

	dragula([document.querySelector('.card_content')], { staticClass: 'static', animation: 300 });
	

	/*
	var cards = []
	function save(){
		$(".card").each(function(){
			cards.push($(this).html());
			console.log(cards);
		});
	}
	*/
});

