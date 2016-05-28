/*
* Catching DOM-elements
*/
var main = document.getElementById('main-container');
var boxes = document.getElementsByClassName('ibox');
var flippers = document.getElementsByClassName('flipper');
var fronts = document.getElementsByClassName('front');
var backs = document.getElementsByClassName('back');
var mainContent = document.getElementById('main-content');

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

/*
* XMLHttpRequest
*/
var xmlhttp = new XMLHttpRequest();
xmlhttp.overrideMimeType("application/json");
var url = "assets/cards.json";
var cards = []; 
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	var _cardBank = JSON.parse(xmlhttp.responseText);
        cards = _cardBank.Cards;
        
        init();
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send(); 

function init() {
	var grid = cards.length*2;
    rows = Math.sqrt(grid);
    columns = rows;

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
			ibox.classList.add('ibox');
			flipper.classList.add('flipper');
			front.classList.add('front');
			back.classList.add('back');

			color = getRandomColor(i, j, line);
			front.style.background = color;
			
			obox.appendChild(ibox);
			ibox.appendChild(flipper);
			flipper.appendChild(front);
			flipper.appendChild(back);
			
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
		boxes[i].addEventListener('click', function(e) {
			var _target = e.path[1];
			_target.style.transition = 'transform .6s';
			_target.style.transform = 'rotateY(180deg)';

			matchedCards.push(_target);
			console.log(matchedCards);
			if(matchedCards.length == 3){
				if(matchedCards[0].id === matchedCards[1].id){
					matchedCards.splice(0,2);
				}
				else {
					matchedCards[0].style.transform = 'rotateY(0deg)';
					matchedCards[1].style.transform = 'rotateY(0deg)';
					matchedCards.splice(0,2);
				}
			}
			cardToMatch = _target;
			
		});
	}

	/*
	* Set style
	*/
	/*mainContent.style.width = boxes[0].offsetWidth*2+'px';
	mainContent.style.height = boxes[0].offsetHeight*2+5+'px';
	mainContent.style.top = boxes[0].offsetHeight*2+'px';*/
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






