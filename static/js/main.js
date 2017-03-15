
$( document ).ready(function() {

	
	var card = "<div class='card'><div class='card_header'><p class='title'>To do</p></div><div class='card_content' id='card_content'></div> <p class='add_task' id='add_task'>add task</p></div>";

	$(document.body).on("click", ".add_task", function(e){
		var $x = $(e.target);
		//console.log($x.parent());
		$list = $x.prev();
		//console.log($list);
		var new_item = "<div class='task'> <p contenteditable='true'; onclick='$(this).focus();'>task " + Math.floor((Math.random() * 10) + 1) + "</p></div>"
		$list.append(new_item);
		save_cards();
		
	})


	$(".create_new").click(function(){
		$(".row").append(card);
		//save();
	})

	dragula([document.querySelector('.card_content')], { staticClass: 'static', animation: 300 })
	.on('drop', function(){
		save_cards();
	});
	

	/*
	var cards = []
	function save(){
		$(".card").each(function(){
			cards.push($(this).html());
			console.log(cards);
		});
	}
	*/

	function proman_list(title, cards){
		this.title = title;
		this.cards = cards;

		this.save_as_json = function(name){
			localStorage.setItem(name, JSON.stringify(this));
			ListNames.push(name);
			console.log(ListNames);
		}
	}


	function save_cards(){

		var obj_list = [];

		$(".card").each(function(){
			var cards = [];
			var title = $(this).find(".title").text();
			$(this).find(".task").each(function(){
				cards.push($(this).text());
			});

			var card_obj = new proman_list(title, cards);
			obj_list.push(card_obj);
			
		});

		localStorage.setItem("obj_list", JSON.stringify(obj_list));
		var x = JSON.parse(localStorage.getItem("obj_list"));
		console.log(x);
	}






});











