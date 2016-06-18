<?php
$fruits = array("Apple", "Banana", "Tomato", "Orange");

if(array_search("Apple", $fruits, true )) {
	echo "found";
}
else {
	echo "not found";
}

?>
