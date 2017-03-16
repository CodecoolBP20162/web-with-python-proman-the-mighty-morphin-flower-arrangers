$( document ).ready(function() {

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
                <a href='/card'>
                    <option class="btn btn btn-default">Create/Edit</option>                          
            </div>
            </a>`;

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
                <a href='/card'>
                    <option class="btn btn btn-default">Create/Edit</option>                          
            </div>
            </a>`);
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
    });

    $(".save").click(function () {
        saveBoard();
        console.log("saved");
    });
})   



    