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
var showScore = document.getElementById('show-score');

/*
* Global variables
*/
var colors = ['#CC6996', '#8D4867', '#40212F', '#4D2838', '#331A25', '#FF85BB'];
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

/*
* Draw game board / grid and Shuffle cards
*/
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
		boxes[i].addEventListener('click', flipCard);
	}

	/*
	* Set style
	*/
	mainContent.style.width = boxes[0].offsetWidth*2+'px';
	mainContent.style.top = boxes[0].offsetHeight*2+'px';
}

/*
* Logic when card flips
*/
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
		/*
		*If cards match on first try
		*/
		if(matchedCards[0].flipper.id === matchedCards[1].flipper.id && viewCount == 2) {
			setTimeout(function(){
				animationPoints(0);
				animationPoints(1);
			}, 400);

			points+=5;
			gameStatus++;
			viewCount = 0;
			if (gameStatus == cards.length/2) {
				/*
				* Game is finished
				*/
				endGame();
			}
		}
		/*
		*If cards match (not first try)
		*/
		else if(matchedCards[0].flipper.id === matchedCards[1].flipper.id) {
			setTimeout(function(){
				animationPoints(0);
				animationPoints(1);
			}, 400);

			points++;
			gameStatus++;
			viewCount = 0;
			if (gameStatus == cards.length/2) {
				/*
				* Game is finished
				*/
				endGame();
			}
		}
	}

	/*
	* If cards doesn't match flip them back
	*/
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

/*
* Logic when game ends
*/
function endGame() {
	mainContent.style.display = 'block';
	showScore.querySelector('p').innerHTML = points;
	/*
	* Sort highscore array
	*/
	var _sortedHighscore = highscore.sort(function (a, b) {
		return b.score-a.score;
	});
	
	/*
	* Check if game score is qualified for highscore
	*/
	if (_sortedHighscore.length > 0) {
		for (var i in _sortedHighscore) {
			if (points > _sortedHighscore[i].score) {
				showScore.style.display = 'none';
				addScore.style.display = 'block';
				document.getElementById('button').addEventListener('click', function() {addToHighscore(i, _sortedHighscore)});
				
				break;
			}
			else if (i == _sortedHighscore.length-1) {
				showScore.style.display = 'none';
				addScore.style.display = 'block';
				document.getElementById('button').addEventListener('click', function() {addToHighscore(i, _sortedHighscore)});
			}
		}
	}
	else {
		showScore.style.display = 'none';
		addScore.style.display = 'block';
		document.getElementById('button').addEventListener('click', function() {addToHighscore(i, _sortedHighscore)});
	}

	/*
	* Print highscore to highscore list
	*/
	var scoreboard = [].slice.call(document.querySelectorAll( '#highscore-board ul li' ));

	console.log(scoreboard.length);
	for (var li in scoreboard) {
		if (li < _sortedHighscore.length) {
			scoreboard[li].innerHTML = highscore[li].name + ": " +	highscore[li].score;
		}
		
	}
}

/*
* Logic for adding player to highscore list
*/
function addToHighscore(index, highscore) {
	var playerName = document.getElementById('nameInput').value;
	highscore.splice(index, 0, {name: playerName, score: points});

	if (highscore.length > 10) {
		highscore.pop();
	}				
	
	var scoreboard = [].slice.call(document.querySelectorAll( '#highscore-board ul li' ));

	for (var li in scoreboard) {
		if (li < highscore.length) {
			scoreboard[li].innerHTML = highscore[li].name + ": " +	highscore[li].score;
		}
	}	

	scoreboard[index].style.background = '#FF3800';
	scoreboard[index].style.color = '#FFF';
	scoreboard[index].style.padding = '5px';

	addScore.style.display = 'none';
	saveJSONtoServer(highscore);
}

/*
* Save highscore result to server
*/
function saveJSONtoServer(input) {
	var str_json = JSON.stringify({
		Cards: initCards,
		Highscore: input
	});

	var request = new XMLHttpRequest();

    request.open("POST", "../../assets/JSONhandler.php", true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(str_json);
}

/*
* Logic to shuffle card array
*/
function shuffle(a) {
    var j, x, i;

    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

/*
* Set card style
*/
function showBox(i) {
	boxes[i].style.transition = "opacity 0.5s linear 0s";
	boxes[i].style.opacity = '1';
	flippers[i].style.height = boxes[i].offsetHeight+'px';
	fronts[i].style.width = boxes[i].offsetWidth+'px';
	fronts[i].style.height = boxes[i].offsetHeight+'px';
	backs[i].style.width = boxes[i].offsetWidth+'px';
	backs[i].style.height = boxes[i].offsetHeight+'px';
}

/*
* Logic for random card colors
*/
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

/*
* Logic for animation when card match 
* source: http://tympanus.net/Development/Animocons/
*/

function animationPoints(index) {
	var el = matchedCards[index].flipper.querySelector('div.back'), eli = el.querySelector('i');
	new Animocon(el, {
		tweens : [
			// burst animation
			new mojs.Burst({
				parent: el,
				duration: 1500,
				shape : 'circle',
				fill : [ '#7F344D', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
				x: '50%',
				y: '50%',
				opacity: 0.6,
				childOptions: { radius: {20:0} },
				radius: {40:120},
				count: 6,
				isSwirl: true,
				isRunLess: true,
				easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
			}),
			// ring animation
			new mojs.Transit({
				parent: el,
				duration: 750,
				type: 'circle',
				radius: {0: 50},
				fill: 'transparent',
				stroke: '#40212F',
				strokeWidth: {15:0},
				opacity: 0.6,
				x: '50%',     
				y: '50%',
				isRunLess: true,
				easing: mojs.easing.bezier(0, 1, 0.5, 1)
			}),
		],
		onCheck : function() {
			el.style.color = '#40212F';
		},
		onUnCheck : function() {
			el.style.color = '#C0C1C3';	
		}
	});
}

function Animocon(el, options) {
	this.el = el;
	this.options = extend( {}, this.options );
	extend( this.options, options );

	this.checked = false;

	this.timeline = new mojs.Timeline();
		
	for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
		this.timeline.add(this.options.tweens[i]);
	}

	var self = this;
	matchHandler();
	function matchHandler() {
		if( self.checked ) {
			self.options.onUnCheck();
		}
		else {
			self.options.onCheck();
			self.timeline.start();
		}
		self.checked = !self.checked;
	};
}

Animocon.prototype.options = {
	tweens : [
		new mojs.Burst({
			shape : 'circle',
			isRunLess: true
		})
	],
	onCheck : function() { return false; },
	onUnCheck : function() { return false; }
};

function extend( a, b ) {
	for( var key in b ) { 
		if( b.hasOwnProperty( key ) ) {
			a[key] = b[key];
		}
	}
	return a;
}






