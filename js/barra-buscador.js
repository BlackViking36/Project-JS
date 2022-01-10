$(document).ready(function(){
    $("#btnsearch").on('click', function() {
        $("#searchbar").slideToggle("50");
        $("#searchbar").css('display','flex');
    });
});