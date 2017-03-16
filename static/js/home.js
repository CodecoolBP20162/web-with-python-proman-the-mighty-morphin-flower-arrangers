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
                <form method="POST">
                    <input type="text" name="ttle" value="`+boardsList[i]+`" style="display: none;">
                    <input type="submit" name="" value="Create/Edit">
                </form>                        
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
})   



    