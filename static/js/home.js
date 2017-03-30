$( document ).ready(function() {

    var $board = $(document.getElementById("board_template"));
    $board.hide();
    var boardCounter = 0;
    
    var saveBoard = function() {
        var boardsList = [];
        $('.board').each(function(){
          var title =  $(this).find("#title").text();
          console.log(title);
          boardsList.push(title);
        });
        localStorage.setItem('boards',JSON.stringify(boardsList));
        console.log(JSON.parse(localStorage.getItem('boards')));
    }        

    var BoardRequest = new XMLHttpRequest();
    BoardRequest.open('GET' , "/boardapi?action=saveBoards")
    BoardRequest.onload = function() {
        var boardsList = JSON.parse(BoardRequest.responseText);
        getBoard(boardsList);
    }
    BoardRequest.send();
    
    var getBoard = function() {
        var boardsList = JSON.parse(localStorage.getItem('boards'));
        console.log(boardsList);
        for (var i = 0; i<boardsList.length;i++) {
            $(".row").append(`<div class='board'>
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

    var deleteBoard = function() {
        localStorage.setItem("boards", JSON.stringify(""));
    }


    $(".create_new").click(function(){
       // $(".row").append(board)
       //$board.appendTo('.row');
       $board.attr("id", "board" + (++boardCounter)).appendTo(".row").show();    
       // $board.clone().attr("id", "board" + (++boardCounter)).appendTo(".row").show();
       // saveBoard();
        //save();
    })
    
    dragula([document.querySelector('.row')], { staticClass: 'static', animation: 300 });

    getBoard();

    $(".delete").click(function(){
        deleteBoard();
        location.reload();
    });

    $(".save").click(function () {
        saveBoard();
        console.log("saved");
        location.reload();
    });

    $(document).on("focusout", "p", function(){
        saveBoard();
        console.log("saved");
        location.reload();
    });
})   
