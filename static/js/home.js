jQuery( document ).ready(function($) {

    var board = `<div class='board'>
                    <div class='board_header'>
                        <p id='title' contenteditable='true' onclick='$(this).selectText();'>click to edit</p>
                    </div>
                    <div class='board_content' id='board_content'>
                        <a href="/cards?title={{board}}" class="link-btn open-btn">OPEN</a>
                        <a href="#" class="link-btn delete-btn">Delete</a>
                    </div>                       
                </div>`

    var saveBoard = function() {
        var boardsList = [];
        $('.board').each(function(){
          var title =  $(this).find("#title").text();
          console.log(title);
          boardsList.push(title);
        });
        // localStorage.setItem('boards',JSON.stringify(boardsList));
        // console.log(JSON.parse(localStorage.getItem('boards')));
        sendBoardData(JSON.stringify(boardsList));
    }        


    var getBoard = function() {
        var boardsList = JSON.parse(localStorage.getItem('boards'));
        // console.log(boardsList);
        for (var i = 0; i<boardsList.length;i++) {
            $(".wrap-row").append(`<div class='board'>
                <div class='board_header'>
                    <p id='title' contenteditable='true' onclick='$(this).focus();'>`+ boardsList[i] +`</p>
                </div>
                <div class='board_content' id='board_content'>
                </div>
                <div>      
                    <option class="btn btn btn-primary">The_MMFA_Team</option>
                                
                 </div>       
                <div> 
                <div class="submit_div">
                    <a href="/cards?title=`+boardsList[i]+`" class="submit">open</a>
                </div>

            </div>`);
        }
    }


    $(".create_new").click(function(){
        $(".wrap-row").append(board);
        saveBoard();
        //save();
    })
    
    dragula([document.querySelector('.row')], { staticClass: 'static', animation: 300 });

    $(".save").click(function () {
        saveBoard();
        console.log("saved");
    });

    $(document).on("focusout", "p", function(){
        var board_name = $(this).html();
        $(this).parent().next().find('.open-btn').attr('href', '/cards?title='+board_name);
        saveBoard();
        // console.log("saved");
    });

    $(document).on("click", ".delete-btn", function(){
        related_board = $(this).parent().prev().find('p').html();
        deleteBoard(related_board);
        $(this).parent().parent().remove();
        saveBoard();
    });


    var sendBoardData = function(data) {
        var request = new XMLHttpRequest();
        request.open("POST", "/api?action=saveBoard");
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify(data));
    }

    var deleteBoard = function(related_board) {
        var request = new XMLHttpRequest();
        request.open("POST", "/api?action=deleteBoard");
        console.log(related_board);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify(related_board));
    }

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
})   



    