
$( document ).ready(function() {

	
	var card = "<div class='card'><div class='card_header'><p class='title'>To do</p></div><div class='card_content' id='card_content'></div> <p class='add_task' id='add_task'>add task</p></div>";

	// ADD NEW CARD TO LIST
	$(document.body).on("click", ".add_task", function(e){
		var $x = $(e.target);
		$list = $x.prev();
		var new_item = "<div class='task'> <p contenteditable='true'; onclick='$(this).focus();'>task " + Math.floor((Math.random() * 10) + 1) + "</p></div>"
		$list.append(new_item);
		save_cards();
		
	})

	// ADD NEW LIST TO BOARD
	$(".create_new").click(function(){
		$(".row").append(card);
		save_cards();
	})

	// MAKE CARDS DRAGGABLE

	var drake = dragula({
		isContainer: function (el) {
			return el.classList.contains('card_content');
		}}).on('drop', function(){
				save_cards();
			});

	var drake2 = dragula({
		isContainer: function (el) {
			return el.classList.contains('row');
		},
		moves: function (el, container, handle) {
			return handle.classList.contains('handle');
		}}).on('drop', function(){
				save_cards();
			});

	// dragula([document.querySelector('.card_content')], { staticClass: 'static', animation: 300 })
	// .on('drop', function(){
	// 	save_cards();
	// });

	// CARD OBJECT
	function proman_list(title, cards){
		this.title = title;
		this.cards = cards;
	}

	// SAVING ALL INFORMATION TO LOCALSTORAGE
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
			// console.log(title);
			
		});

		localStorage.setItem("obj_list", JSON.stringify(obj_list));
		var x = JSON.parse(localStorage.getItem("obj_list"));
		console.log(x);
	}

	// SAVING TO LOCALSTORAGE AFTER EDITING
	$("p").focusout(function(){
		save_cards();
	})




});











