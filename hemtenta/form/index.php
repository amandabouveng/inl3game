<!DOCTYPE html>
<html>
<head>
	<title>Formulär till JSON</title>
</head>
<body>
	<form method="get">
		<fieldset>
			<label for="text">Skriv lite text här</label><br>
			<input type="text" name="text" value="Some text one 2 III" id="textInput">
		</fieldset>
		
		<fieldset>
			<label for="radio">Te eller kaffe?</label><br>
		 	<input class="radio" type="radio" name="radio" value="te" checked> Te<br>
		  	<input class="radio" type="radio" name="radio" value="kaffe"> Kaffe<br>
	  	</fieldset>

	  	<fieldset>
	  		<label for="dropdown">Välj en frukt</label><br>
		  	<select id="dropdown" name="dropdown">
		  		<option value="banana">Banan</option>
		  		<option value="apple" selected>Äpple</option>
		  		<option value="orange">Apelsin</option>
			</select>
		</fieldset>
		<br>
	  	<button type="submit" value="Submit" id="submitBtn">Hämta JSON-objekt</button>
	</form>

<script>
var obj = {text:"text", radio:"radio", select:"select"};
var submitBtn = document.getElementById('submitBtn');
	
submitBtn.addEventListener('click', getForm);

function getForm(e) {
	e.preventDefault();

	
	var radio = document.getElementsByClassName('radio');
	var select = document.getElementById('dropdown').getElementsByTagName('option');
	var text = document.getElementById('textInput');

	
	obj.text = text.value;

	for (var o in radio) {
    	if (radio[o].checked) {
        	obj.radio = radio[o].value;
    	}
    }

    for ( var o in select ) {
		if (select[o].selected) {
    		obj.select = select[o].value;
    	}
    }
	
	objToJSON();  
}
	
function objToJSON() {
	var objJSON = JSON.stringify(obj);
	console.log(objJSON); 
}
</script>

</body>
</html>