
$(document).ready(function() {
    $(".initial").show(300);

    var ListNames = []


    var card = "<div class='card'><div class='card_header'><p id='todo'>To do</p></div><div class='card_content' id='card_content'></div> <p class='add_task' id='add_task'>add task</p></div>";

    $(document.body).on("click", ".add_task", function(e) {
        var $x = $(e.target);
        console.log($x.parent());
        $list = $x.prev();
        console.log($list);
        $list.append("<div class='task'>" + Math.floor((Math.random() * 10) + 1) + "</div>");
    })


    $(".create_new").click(function() {
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

    function proman_list(id, title, order, cards) {
        this.id = id;
        this.title = title;
        this.order = order;
        this.cards = cards;

        this.save_as_json = function(name) {
            localStorage.setItem(name, JSON.stringify(this));
            ListNames.push(name);
            console.log(ListNames);
        }
    }

    var List1 = new proman_list("list1", "asd", 1, ["todo1", "todo2", "todo3"]);
    localStorage.setItem("List1", JSON.stringify(List1));
    var list1 = JSON.parse(localStorage.getItem("List1"));
    List1.save_as_json("list1");
    var list_obj = [];
    list_obj.push(List1);
    localStorage.setItem("obj_list", JSON.stringify(list_obj));

    var getCards = function() {
        var data = JSON.parse(localStorage.getItem("obj_list"));
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var title = obj.title;
            var cards = obj.cards;
            console.log(title, cards);
            var card = "<div class='card'><div class='card_header'><p id='todo'>" + title + "</p></div><div class='card_content' id='card_content'></div> <p class='add_task' id='add_task'>add task</p></div>";
            $(".row").append(card);
        }

    }
    getCards();
});
	/*
	var Lists = {

		"List1" : {

			"title" : '',
			"order" : 1,
			"cards" : ["todo 1", "todo 2", "todo3"]
		},

		"List2" : {

			"title" : '',
			"order" : 1,
			"cards" : ["todo 1", "todo 2", "todo3"]
		}
	}
	*/






