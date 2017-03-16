
$(document).ready(function () {

    var card = "<div class='card'><div class='card_header'><p class='title'>To do</p></div><div class='card_content' id='card_content'></div> <p class='add_task' id='add_task'>add task</p></div>";

    // ADD NEW CARD TO LIST
    $(document.body).on("click", ".add_task", function (e) {
        var $x = $(e.target);
        $list = $x.prev();
        var new_item = "<div class='task'> <p contenteditable='true'; onclick='$(this).focus();'>task " + Math.floor((Math.random() * 10) + 1) + "</p></div>"
        $list.append(new_item);
        save_cards();

    })

    // ADD NEW LIST TO BOARD
    $(".create_new").click(function () {
        $(".row").append(card);
        save_cards();
    })



    // dragula([document.querySelector('.card_content')], { staticClass: 'static', animation: 300 })
    // .on('drop', function(){
    // 	save_cards();
    // });

    // CARD OBJECT
    function proman_list(title, cards, board_name) {
        this.title = title;
        this.cards = cards;
        this.board_name = board_name;
    }

    // SAVING ALL INFORMATION TO LOCALSTORAGE
    function save_cards() {

        var obj_list = [];

        $(".card").each(function () {
            var cards = [];
            var title = $(this).find(".title").text();
            var board_name = $(this).attr("data-board_name");
            $(this).find(".task").each(function () {
                cards.push($(this).text());
            });

            var card_obj = new proman_list(title, cards, board_name);
            obj_list.push(card_obj);
            // console.log(title);

        });

        localStorage.setItem("obj_list", JSON.stringify(obj_list));
        var x = JSON.parse(localStorage.getItem("obj_list"));
        console.log(x);
    }

    // RETRIEVE LISTS
    var getLists = function () {
        var data = JSON.parse(localStorage.getItem("obj_list"));
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var title = obj.title;
            var cards = obj.cards;
            console.log(cards);
            var board_name = obj.board_name;
            console.log(title, cards);
            var prom_list = `<div class="card" data-board_name="Welcome Board">
					<div class="card_header">
						<span class="circle"></span>
						<p class="title" id="editable" contenteditable>`+ title + `</p>
						<i class="fa fa-arrows handle" aria-hidden="true"></i>
					</div>`;
            prom_list += `<div class="card_content drag_container" id="card_content">`;
            for (var j = 0; j < cards.length; j++) {
                prom_list += '<div class="task"> <p contenteditable="true"; onclick="$(this).focus();">' + cards[j] + '</p></div>';
            }
            prom_list += `</div>`
            prom_list += `<p class="add_task initial" id="add_task">add task ...</p>
				</div>`;
            if (board_name === "Welcome Board") {
                $(".row").append(prom_list);
            }
        }

    }

    // SAVING TO LOCALSTORAGE AFTER EDITING
    $("p").focusout(function () {
        save_cards();
    })


    var y = JSON.parse(localStorage.getItem("obj_list"));
    for (var key in y) {
        if (key.board_name === "asd") {
            console.log("SUCCESS");
        }
    };

    var deleteStorage = function () {
        localStorage.setItem("obj_list", JSON.stringify(""));
    }


    $(".delete").click(function () {
        deleteStorage();
    })

    getLists();

    // MAKE CARDS DRAGGABLE
    var drake = dragula({
        isContainer: function (el) {
            return el.classList.contains('card_content');
        }
    }).on('drop', function () {
        save_cards();
    });

    var drake2 = dragula({
        isContainer: function (el) {
            return el.classList.contains('row');
        },
        moves: function (el, container, handle) {
            return handle.classList.contains('handle');
        }
    }).on('drop', function () {
        save_cards();
    });

});


