<!DOCTYPE html>
<html>
<head>
	<title>Bankomat</title>
	<meta charset="utf-8">
	<style type="text/css">
	.wrapper {
		margin: 0 auto;
	}

	.atm-display {
		background: grey;
		width: 50%;
		height: 20em;
		margin: 0 auto;
		position: relative;
	}

	.atm-display h1 {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-family: helvetica;
		font-size: 1.5em;
		color: white;
		text-transform: uppercase;
	}
	.atm-display h3 {
		position: absolute;
		top: 3em;
		left: 50%;
		transform: translateX(-50%);
		font-family: helvetica;
		font-size: 1em;
		color: white;
		text-transform: uppercase;
	}

	.show-numbers {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		color: white;
		text-align: center;
	}

	.btn-container {
		position: absolute;
		bottom: 0.2em;
		width: 100%;
		padding: 0;
	}

	.btn-container li {
		float: left;
		list-style: none;
		text-align: center;
		width: 33%;
		font-family: helvetica;
		font-size: 1em;
		color: white;
		text-transform: uppercase;
		cursor: pointer;
	}

	.atm-keyboard {
		position: relative;
		margin: 0 auto;
		width: 50%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row-reverse;
		justify-content: space-around;
	}

	.atm-btn {
		flex: 1 1 auto;
		padding: 1.6em 3em;
		background: tomato;
		text-align: center;
		font-family: helvetica;
		font-size: 2em;
		color: white;
		cursor: pointer;
	}

	.clear-btn {
		font-family: helvetica;
		font-size: 2em;
		color: white;
		position: absolute;
		bottom: 1.5em;
		left: 2.2em;
		text-transform: uppercase;
		cursor: pointer;
	}

	.ok-btn {
		font-family: helvetica;
		font-size: 2em;
		color: white;
		position: absolute;
		bottom: 1.5em;
		right: 3em;
		text-transform: uppercase;
		cursor: pointer;
	}
	</style>
</head>
<body>
	<div class="wrapper">
		<div class="atm-display">
			<h1>Bankomat</h1>
			<h3 id="show-balance"></h3>
			<div class="show-numbers">
				<p id="show-text">Välkommen!</p>
				<p id="show-numbers">
			</div>
			<ul class="btn-container">
				<li id="balance">Saldo</li>
				<li id="deposit">Insättning</li>
				<li id="withdrawal">Uttag</li>
			</ul>
		</div>
		<div id="keyboard" class="atm-keyboard">
			<div id="clear-btn" class="clear-btn">clear</div>
			<div id="ok-btn" class="ok-btn">ok</div>
		</div>
	</div>

	<script type="text/javascript">
	var atm = new AtmMachine({
		balance: 1000,
		maxDeposit: 20000,
		el: document.getElementById('show-balance')
	}),	
	amount, mode,
	showNumbers 	= document.getElementById('show-numbers'),
	showText		= document.getElementById('show-text'), 
	okBtn 			= document.getElementById('ok-btn'),
	clearBtn 		= document.getElementById('clear-btn'),
	checkBalanceBtn = document.getElementById('balance')
	withdrawalBtn	= document.getElementById('withdrawal'),
	depositBtn		= document.getElementById('deposit');

	checkBalanceBtn.addEventListener('click', changeMode);
	withdrawalBtn.addEventListener('click', changeMode);
	depositBtn.addEventListener('click', changeMode);


console.log("1"+2);
	okBtn.addEventListener('click', function(e) {

		 console.log(mode);
		 if (mode === 'deposit') {
		 	showText.innerHTML = atm.makeDeposit(amount);
		 	showNumbers.innerHTML = '';
		 	amount = 0;
		}
		 else if (mode === 'withdrawal') {
		 	showText.innerHTML = atm.makeWithdrawal(amount);
		 	showNumbers.innerHTML = '';
		 	amount = 0;
		 }
		 atm.animateBalance(mode, amount);
	});

	clearBtn.addEventListener('click', function(e) {
		if (mode != 'balance') {
			amount = 0;
		 	showNumbers.innerHTML = amount;
		}
		 
	});

	for(var i = 9; i >= 0; i--) {
		var keyboard = document.getElementById('keyboard');
		var btn = document.createElement('div');
		btn.classList.add('atm-btn');
		btn.innerHTML = i;
		keyboard.appendChild(btn);
		btn.addEventListener('click', function(e) {
			if (amount == undefined || amount == 0) {
				amount = e.target.innerHTML;
			}
			else {
				amount += e.target.innerHTML;
			}
			showNumbers.innerHTML = amount;
		});
	}

	function changeMode(e) {
		mode = e.target.getAttribute('id');
		if (mode === 'deposit') {
			showText.innerHTML = 'Sätt in summa:';
			showNumbers.innerHTML = '';
		}
		else if (mode === 'withdrawal') {
		 	showText.innerHTML = 'Ta ut summa:';
		 	showNumbers.innerHTML = '';
		}
		else if (mode === 'balance') {
		 	showText.innerHTML = atm.balanceMessage;
		 	showNumbers.innerHTML = atm.balance;
		 }
	}

	function AtmMachine(settings) {
		this.balance = settings.balance;
		this.balanceMessage = 'Ditt nuvarande saldo är:';
		this.withdrawal = 0;
		this.deposit = 0;
		this.maxDeposit = settings.maxDeposit;
		this.animateBalanceFrom;
		this.el = settings.el;

		this.el.innerHTML = this.balance;

		this.makeWithdrawal = function(input) {
			this.withdrawal = Number(input);
			this.animateBalanceFrom = this.balance;
			var message = this.withdrawalMessage();
			if (this.withdrawal <= this.balance) {
				this.balance -= this.withdrawal;
			}

			return message;

		}
		
		this.withdrawalMessage = function() {
			if (this.withdrawal <= this.balance) {
				return 'Godkänt!<br>Du har tagit ut '+this.withdrawal+' SEK från ditt konto';
			}
			else {
				return 'Fel!<br>Summan överskrider ditt nuvarande saldo';
			}
		}
		
		this.makeDeposit = function(input) {
			this.deposit = Number(input);
			this.animateBalanceFrom = this.balance;
			if (this.deposit < this.maxDeposit) {
				this.balance += this.deposit;
			}

			return this.depositMessage();

		}
		
		this.depositMessage = function() {
			if (this.deposit <= this.maxDeposit) {
				return 'Godkänt!<br>Du har satt in '+this.deposit+' SEK på ditt konto';
			}
			else {
				return 'Insättning misslyckades!<br>Summan överskrider '+this.maxDeposit+' SEK';
			}
		}

		this.animateBalance = function(mode, amount) {
			
			if (mode === 'deposit') {
				var progress = this.animateBalanceFrom,
				limit = this.balance,
				interval = setInterval(function(el) {
					if (progress != limit) {
						progress++;
					}
					
					el.innerHTML = progress;
					if ( progress >= limit ) {
						clearInterval(interval);
					}
				}, 0.1, this.el);
			}
			else if (mode === 'withdrawal') {
				var progress = this.animateBalanceFrom,
				limit = this.balance,
				interval = setInterval(function(el) {
					if (progress != limit) {
						progress--;
					}
					
					el.innerHTML = progress;
					if ( progress <= limit ) {
						clearInterval(interval);
					}
				}, 0.1, this.el);
			}
		}
	}
	</script>
</body>
</html>