$( document ).ready(function() {
	$(".initial").show(300);



    var board = "<a href='/card'><div class='board'><div class='board_header'><p id='title'>Title</p></div><div class='board_content' id='board_content'></div> <p class='add_task' id='team'>Team</p></div></a>";




    $(".create_new").click(function(){
        $(".row").append(board);
        //save();
    })
    dragula([document.querySelector('.row')], { staticClass: 'static', animation: 300 });
})   



    