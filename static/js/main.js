var $sampleCard = $("#sample-card");
// $("#sample-card").remove();
$sampleCard.attr('data-board_name', "asd");
$sampleCard.attr('data-order_id', "asd");


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
    var new_item = "<div class='task'> <p contenteditable='true'; onclick='$(this).selectText();'>click to edit</p></div>"
    $list.append(new_item);
    save_lists();

})

// ADD NEW LIST TO BOARD
$(".create_new").click(function () {
    var newOrderNum = $row.children().length + 1;

    $(".row").append(`<div class="card" data-board_name="`+ board_title +`" data-order_id="`+ board_title +`-`+newOrderNum+`">
                <div class="card_header">
                    <span class="circle"></span>
                    <p class="title" id="editable" contenteditable="true"; onclick="$(this).selectText();">New</p>
                    <i class="fa fa-arrows handle" aria-hidden="true"></i>
                </div>
                <div class="card_content drag_container" id="card_content">
                </div>
                <p class="add_task initial" id="add_task">add task ...</p>
            </div>`);

    var card_data = JSON.stringify({"board_name":board_title, "order_id":board_title+"-"+newOrderNum})
    sendNewCardData(card_data)
})


// CARD OBJECT
function proman_list(title, cards, board_name, order_id) {
    this.title = title;
    this.cards = cards;
    this.board_name = board_name;
    this.order_id = order_id;
}


// SAVING ALL INFORMATION TO DATABASE
function save_lists() {

    var obj_list = [];
    var related_board = '';

    $(".card").each(function () {
        var cards = new Array;
        var title = $(this).find(".title").text();
        var board_name = $(this).attr("data-board_name");
        var order_id = $(this).attr("data-order_id");
        related_board = board_name;
        $(this).find(".task").each(function () {
            cards.push($(this).text());
        });

        var card_obj = new proman_list(title, cards, board_name, order_id);
        obj_list.push(card_obj);
        // console.log(title);

    });

    sendCardData(JSON.stringify(obj_list), related_board);
}


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


// SAVING TO DATABASE AFTER EDITING
$(document).on("focusout", "p", function () {
    save_lists();
    console.log("focus out");
})

// SELECT ALL TEXT IN CONTENTEDITABLE
$.fn.selectText = function(){
    var doc = document;
    var element = this[0];
    //console.log(this, element);
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();        
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};



// SEND DATA WITH AJAX  
var sendCardData = function(data, related_board) {
    var request = new XMLHttpRequest();
    request.open("POST", "/api?action=saveCards&related_board="+related_board);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(data));
}

var sendNewCardData = function(card_data) {
    var request = new XMLHttpRequest();
    request.open("POST", "/api?action=saveNewCard");
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(card_data));
}

















