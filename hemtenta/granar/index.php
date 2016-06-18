<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>


<script>
var tree = new Tree({
	iterations: 9,
	branch: 0
});

function Tree(settings) {
	this.iterations = settings.iterations;
	this.branch = settings.branch;

	for (i = 0; i <= this.iterations; i++) {
		for (j = 1+this.branch; j <= 11+this.branch; j++) { 
			for (k=1; k<=j*2-1; k++){
				document.write("*");
			}
		document.write('<br>');
	}
	this.branch +=5;
	}
}
</script>
</body>
</html>



