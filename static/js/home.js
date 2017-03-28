jQuery( document ).ready(function($) {

    var board = `<div class='board'>
                <div class='board_header'>
                    <p id='title' contenteditable='true' onclick='$(this).focus();'>Title</p>
                </div>
                <div class='board_content' id='board_content'>
                </div>
                <div>      
                    <option class="btn btn btn-primary">The_MMFA_Team</option>
                                
                 </div>       
                <div> 
                <span>Please edit your title first</span>                       
            </div>`;

    var saveBoard = function() {
        var boardsList = [];
        $('.board').each(function(){
          var title =  $(this).find("#title").text();
          console.log(title);
          boardsList.push(title);
        });
        localStorage.setItem('boards',JSON.stringify(boardsList));
        console.log(JSON.parse(localStorage.getItem('boards')));
        sendBoardData(JSON.stringify(boardsList));
    }        


    var getBoard = function() {
        var boardsList = JSON.parse(localStorage.getItem('boards'));
        // console.log(boardsList);
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
        $(".row").append(board);
        saveBoard();
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

    var sendBoardData = function(data) {
        var request = new XMLHttpRequest();
        request.open("POST", "/api?action=saveBoard&asd=haha");
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify(data));
    }
})   



    