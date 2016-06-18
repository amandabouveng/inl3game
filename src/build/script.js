/*
* Catching DOM-elements
*/
var main = document.getElementById('main-container');
var boxes = document.getElementsByClassName('ibox');
var flippers = document.getElementsByClassName('flipper');
var fronts = document.getElementsByClassName('front');
var backs = document.getElementsByClassName('back');
var mainContent = document.getElementById('main-content');
var header = document.querySelector('header.header');
var addScore = document.getElementById('add-score');

/*
* Global variables
*/
var colors = ['rgba(0, 165, 191, 0.5)', 'rgba(0, 110, 127, 0.5)', 'rgba(0, 221, 255, 0.5)', 'rgba(0, 55, 64, 0.5)', 'rgba(0, 199, 229, 0.5)', 'rgba(27,120,127,0.5)'];
var prevLine = [];
var current;
var rows = 5;
var columns = 6;
var usedBoxes = [];
var matchedCards = [];
var points = 0; 
var viewCount = 0;
var gameStatus = 0;


/*
* XMLHttpRequest
*/
var xmlhttp = new XMLHttpRequest();
xmlhttp.overrideMimeType("application/json");
var url = "assets/memory.json";
var cards = [];
var initCards = [];
var highscore = []; 
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	var _gameBank = JSON.parse(xmlhttp.responseText);
        cards = _gameBank.Cards;
        initCards = cards.slice();
        highscore = _gameBank.Highscore;
        init();
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send(); 

function init() {
	var grid = cards.length*2;
    rows = Math.sqrt(grid);
    columns = rows;

    header.innerHTML = "Points: "+points;

	for(var i = 0; i < rows; i++) {
		var obox = document.createElement('div');
		var line = [];
		copyOfColors = colors.slice();
		obox.classList.add('obox');
		main.appendChild(obox);
		for(var j = 0; j < columns; j++) {
			var ibox = document.createElement('div');
			var flipper = document.createElement('div');
			var front = document.createElement('div');
			var back = document.createElement('div');
			var card_icon = document.createElement('span');

			ibox.classList.add('ibox');
			flipper.classList.add('flipper');
			front.classList.add('front');
			back.classList.add('back');
			card_icon.classList.add('card_icon');

			color = getRandomColor(i, j, line);
			front.style.background = color;
			
			obox.appendChild(ibox);
			ibox.appendChild(flipper);
			flipper.appendChild(front);
			flipper.appendChild(back);
			back.appendChild(card_icon);
			console.log(card_icon);
			
		}
		prevLine.push(line);
	}

	for(var i = 0; i < boxes.length; i++) {
		var _delay = Math.round(Math.random()*(boxes.length));
		
		boxes[i].style.opacity = '0';
		setTimeout(showBox, _delay*100, i);
	}

	cards.forEach(function(obj, index, array) {
    	obj.id = index;
    	array.push(obj);   
    });

	shuffle(cards);

	for (var i in cards) {
		backs[i].innerHTML = cards[i].icon;
		flippers[i].setAttribute('id', cards[i].id);
		boxes[i].addEventListener('click', flipCard);
		
	}

	/*
	* Set style
	*/
	mainContent.style.width = boxes[0].offsetWidth*2+'px';
	mainContent.style.height = boxes[0].offsetHeight*2+5+'px';
	mainContent.style.top = boxes[0].offsetHeight*2+'px';
}

function flipCard(e) {
	var _target = {
		flipper: e.path[1],
		box: e.path[2]
	}
	_target.flipper.style.transition = 'transform .6s';
	_target.flipper.style.transform = 'rotateY(180deg)';
	_target.box.removeEventListener('click', flipCard);
	viewCount++;
	matchedCards.push(_target);

	if (matchedCards.length == 2) {
		if(matchedCards[0].flipper.id === matchedCards[1].flipper.id && viewCount == 2) {
			points+=5;
			gameStatus++;
			viewCount = 0;
			if (gameStatus == cards.length/2) {
				// end game
				
				endGame();

			}
		}
		else if(matchedCards[0].flipper.id === matchedCards[1].flipper.id) {
			points++;
			gameStatus++;
			viewCount = 0;
			if (gameStatus == cards.length/2) {
				// end game
				
				endGame();

			}
		}
	}
	else if(matchedCards.length > 2) {
		if(matchedCards[0].flipper.id != matchedCards[1].flipper.id){
			matchedCards[0].flipper.style.transform = 'rotateY(0deg)';
			matchedCards[1].flipper.style.transform = 'rotateY(0deg)';
			matchedCards[0].box.addEventListener('click', flipCard);
			matchedCards[1].box.addEventListener('click', flipCard);
		}
		matchedCards.splice(0,2);
	}
	cardToMatch = _target;
	document.querySelector('header.header').innerHTML = "Points: "+points;
}

function endGame() {
	mainContent.style.display = 'block';
	
	var _sortedHighscore = highscore.sort(function (a, b) {
		return b.score-a.score;
	});
	
	for (var obj in _sortedHighscore) {
		console.log('hej');
		if (points > _sortedHighscore[obj].score) {
			// create and append input and button
<<<<<<< HEAD
			var nameInput = document.createElement('input');
			nameInput.setAttribute('type', 'text');
			nameInput.setAttribute('id', 'nameInput');
			var button = document.createElement('button');
			button.setAttribute('id', 'button');
			mainContent.appendChild(nameInput);
			mainContent.appendChild(button);

			button.addEventListener('click', function() {addToHighscore(obj, _sortedHighscore)});
=======
			addScore.style.display = 'block'
			document.getElementById('button').addEventListener('click', function() {addToHighscore(obj, _sortedHighscore)});
>>>>>>> 37004af7f052c456f6031b60aa26061512d113d4
			
			break;
		}
	}
<<<<<<< HEAD
	console.log(_sortedHighscore);

	
=======

	for (var obj in _sortedHighscore) {
		var listitem = document.createElement('li');

		listitem.innerHTML = _sortedHighscore[obj].name + ": " + _sortedHighscore[obj].score;

		document.querySelector('#highscore-board ul').appendChild(listitem);
	}
	

>>>>>>> 37004af7f052c456f6031b60aa26061512d113d4
}

function addToHighscore(index, highscore) {
	var playerName = document.getElementById('nameInput').value;
	highscore.splice(index, 0, {name: playerName, score: points});
<<<<<<< HEAD
	if (highscore.length > 10) {
		highscore.pop();
	}				
	console.log(playerName);
=======
	console.log(highscore);
	if (highscore.length > 10) {
		highscore.pop();
	}				
	
	var scoreboard = [].slice.call(document.querySelectorAll( '#highscore-board ul li' ));

	for (var li in scoreboard) {
		scoreboard[li].innerHTML = highscore[li].name + ": " +	highscore[li].score;
	}
>>>>>>> 37004af7f052c456f6031b60aa26061512d113d4

	saveJSONtoServer(highscore);
}

function saveJSONtoServer(input) {

	var str_json = JSON.stringify({
		Cards: initCards,
		Highscore: input
	});

	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
	    if (request.readyState == 4 && request.status == 200) {
	    	console.log('yay');
	    }
	};

    request.open("POST", "../../assets/JSONhandler.php", true);

    request.setRequestHeader("Content-type", "application/json");

    request.send(str_json);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function showBox(i) {
	boxes[i].style.transition = "opacity 0.5s linear 0s";
	boxes[i].style.opacity = '1';
	flippers[i].style.height = boxes[i].offsetHeight+'px';
	fronts[i].style.width = boxes[i].offsetWidth+'px';
	fronts[i].style.height = boxes[i].offsetHeight+'px';
	backs[i].style.width = boxes[i].offsetWidth+'px';
	backs[i].style.height = boxes[i].offsetHeight+'px';
}


function getRandomColor(i, j, line) {
	var _randomNumber = Math.round(Math.random()*(copyOfColors.length-1));
	var _color;	
	if (prevLine.length > 0) {
		if (j == 0) {
			_color = prevLine[i-1][columns-1];
			_randomNumber = copyOfColors.indexOf(prevLine[i-1][columns-1]);
		}
 		else if ( j > 0 && prevLine[i-1][j] === copyOfColors[_randomNumber] ) {
	 		if (_randomNumber < copyOfColors.length-1 ) {
				_color = copyOfColors[_randomNumber += 1];
			}
			else if (copyOfColors.length != 1){
				_color = copyOfColors[_randomNumber -= 1];
			}
		}
		else {
			_color = copyOfColors[_randomNumber];
		}
	} else {
		_color = copyOfColors[_randomNumber];
	}
	line.push(copyOfColors[_randomNumber]);
	copyOfColors.splice(_randomNumber, 1);

	return _color;
}

function getRandomFlipper() {
	var _obj = {
		randomNumber: Math.round(Math.random()*flippers.length),
		flipper: function() {
			return flippers[this.randomNumber];
		}
	};
	return _obj;
}






