$( document ).ready(function() {
	$(".initial").show(300);



    var board = `<div class='board'>
                <div class='board_header'>
                    <p id='title' contenteditable='true' onclick='$(this).focus();'>Title</p>
                </div>
                <div class='board_content' id='board_content'>
                </div>
                <div>      
                    <option class="btn btn btn-default">The_MMFA_Team</option>
                                
                 </div>       
                <div> 
                <a href='/card'>
                    <option class="btn btn btn-default">Create</option>                          
            </div>
            </a>`;




    $(".create_new").click(function(){
        $(".row").append(board);
        //save();
    })
    dragula([document.querySelector('.row')], { staticClass: 'static', animation: 300 });
})   



    