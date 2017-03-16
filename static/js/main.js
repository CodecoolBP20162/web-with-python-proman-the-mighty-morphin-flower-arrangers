
// RETRIEVE BOARD TITLE FROM URL
var getBoardNameFromUrl = function(){
    var urlParams = new URLSearchParams(window.location.search);
    var url_title = urlParams.get('title');
    $(".board_title").text(url_title);
    return url_title;
}

// SET BOARD TITLE
var board_title = getBoardNameFromUrl();


// ADD NEW CARD TO LIST
$(document.body).on("click", ".add_task", function (e) {
    var $x = $(e.target);
    $list = $x.prev();
    var new_item = "<div class='task'> <p contenteditable='true'; onclick='$(this).focus();'>click to edit</p></div>"
    $list.append(new_item);
    save_lists();

})

// ADD NEW LIST TO BOARD
$(".create_new").click(function () {
    $(".row").append(`<div class="card" data-board_name="`+ board_title +`">
                <div class="card_header">
                    <span class="circle"></span>
                    <p class="title" id="editable" contenteditable>New</p>
                    <i class="fa fa-arrows handle" aria-hidden="true"></i>
                </div>
                <div class="card_content drag_container" id="card_content">
                </div>
                <p class="add_task initial" id="add_task">add task ...</p>
            </div>`);
    save_lists();
})

// ADD DEFAULT LISTS
var add_default = function(){
    var title_list = ["New", "In progress", "Review", "Done"];
    for(var i = 0; i < title_list.length; i++) {
        $(".row").append(`<div class="card" data-board_name="`+ board_title +`">
                <div class="card_header">
                    <span class="circle"></span>
                    <p class="title" id="editable" contenteditable>`+ title_list[i] +`</p>
                    <i class="fa fa-arrows handle" aria-hidden="true"></i>
                </div>
                <div class="card_content drag_container" id="card_content">
                </div>
                <p class="add_task initial" id="add_task">add task ...</p>
            </div>`)
    }
}


// CARD OBJECT
function proman_list(title, cards, board_name) {
    this.title = title;
    this.cards = cards;
    this.board_name = board_name;
}

// SAVING ALL INFORMATION TO LOCALSTORAGE
function save_lists() {

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


    localStorage.setItem(board_title, JSON.stringify(obj_list));
}


// RETRIEVE LISTS FROM LOCAL STORAGE
var generate_from_local = function(){
    var data = JSON.parse(localStorage.getItem(board_title));
    for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            var title = obj.title;
            var cards = obj.cards;
            console.log(cards);
            var board_name = obj.board_name;
            console.log(title, cards);
            var prom_list = `<div class="card" data-board_name="`+ board_title +`">
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
            if (board_name === board_title) {
                $(".row").append(prom_list);
            }
        }
}

// CHECK FOR EMPTY BOARDS
var getLists = function () {
    var data = JSON.parse(localStorage.getItem(board_title));
    console.log(data);
    if(data === null || data === ""){
        add_default();
    }else{

    for(var i=0; i<data.length; i++){
        if(data[i].board_name === board_title){
            generate_from_local();
            console.log("saved");
            break;
        } else {
            add_default();
            console.log("default");
            break;
        }
    }

    }
}

// DELETE STORAGE FOR DEVELOPMENT PURPOSES
var deleteStorage = function () {
    localStorage.setItem(board_title, JSON.stringify(""));
}


$(".delete").click(function () {
    deleteStorage();
    console.log("deleted");
})

getLists();

// MAKE CARDS DRAGGABLE
var drake = dragula({
    isContainer: function (el) {
        return el.classList.contains('card_content');
    },
    removeOnSpill: true
})

drake.on('drop', function () {save_lists(); });
drake.on('remove', function () {save_lists(); });

var drake2 = dragula({
    isContainer: function (el) {
        return el.classList.contains('row');
    },
    moves: function (el, container, handle) {
        return handle.classList.contains('handle');
    },
    removeOnSpill: true
})

drake2.on('drop', function () { save_lists(); });
drake2.on('remove', function () {save_lists(); });

// SAVING TO LOCALSTORAGE AFTER EDITING
$(document).on("focusout", "p", function () {
    save_lists();
    console.log("focus out");
})




