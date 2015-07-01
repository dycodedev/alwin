$(function(){
	$("#popo").on('click', function(e){
		e.preventDefault();
		return false;
	});

	var searchform = 
		"<form method='POST' action=''>\
		<input type='text' class='form-control' name='keywords' placeholder='Kata Kunci'>\
		<div class='clearfix'></div>\
		<button style='margin-top:5px' type='submit' class='btn btn-block btn-primary'>\
			<span class='glyphicon glyphicon-search'></span>\
		</button>\
		</form>";


	$("#popo").popover({
		content:searchform,
		html:"true",
		placement:"bottom",
		container:"nav",
		trigger:"click",
		delay:50,
	});
});