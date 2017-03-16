$( document ).ready(function() {
	$(".initial").show(300);



    var board = `<div class='board'>  
                 <div class='board_header'>
                    <p id='title' contenteditable='true' onclick='$(this).focus();'>Title</p>
                </div>
                <div class='board_content' id='board_content'>
                </div>      
                   <label for="inputTeam" class="sr-only">Team</label> 
                    <select  class="btn btn-primary btn-block select_field" name="inputTeam">
                        <option class="btn btn btn-default btn-block" >The_MMFA</option>      
                    </select>               
                   </label>  
                <a href='{{url_for("index")}}'>
                    <option class="btn btn btn-default">Create</option>                          
            </div>`;




    $(".create_new").click(function(){
        $(".row").append(board);
        //save();
    })
    dragula([document.querySelector('.row')], { staticClass: 'static', animation: 300 });
})   



    