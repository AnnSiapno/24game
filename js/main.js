// Declare global variables (the four numbers)
var a;
var b;
var c;
var d;
var randomNumbers;

// Create the instructions function
function instructions() {
	$('#instructions').removeClass('hidden');
	$('#headerContents').removeClass('hidden');  
	$('#instructionsButton').hide(); 
	$('#homepageTitle').hide(); 
}

//Create the go function
function go() {

		// Puts equation into a variable
		var equation = document.getElementById("equation").value;

		var numbers = equation.replace(/[^0-9]/g,"");  

		// Checks if the equation contains 4 integers
		if (numbers.length !== 4 && numbers.length < 4) {

			// Displays error message if less than 4 integers have been used
			document.getElementById("errorMessage").innerHTML = '<h2>OOPS!</h2><p>Please use all the given four numbers</p>'; 
			$('#errorMessage').show(); 
		} else if (numbers.length !== 4 && numbers.length > 4) {
			//Displays error message if more than 4 integers have been used
			document.getElementById("errorMessage").innerHTML = '<h2>OOPS!</h2><p>Please only use the given four numbers</p>'; 
			$('#errorMessage').show(); 
		} else {
			// Seperates each digits in 'numbers' and turns into an array of integers
			numbers = numbers.split("").map(function(t){return parseInt(t)})
			
			// Sort the to arrays ready to compare
			numbers = numbers.sort();
			randomNumbers = randomNumbers.sort();

			// Test of user input contains only the given numbers
			for (i = 0; i < 4; i++) {
				if (numbers[i] !== randomNumbers[i]) {
					document.getElementById("errorMessage").innerHTML = '<h2>OOPS!</h2><p>Please only use the given four numbers</p>'; 
					$('#errorMessage').show(); 
					break;
				} 

				// Continues only when all numbers have been tested
				else if (i === 3){
					$('#answer').children('#equation').val(''); 

					if (eval(equation) === 24) {
						document.getElementById("yourAnswer").innerHTML = '<h2>Your said: </h2>' + '<p>' + equation + '</p>';
						document.getElementById("results").innerHTML = '<h2>CONGRATULATIONS!</h2><p>That was correct</p><input id="new" type="button" value="NEW CHALLENGE"/>'

						// show() to overcome 'tryAgain --> go' error
						$("#yourAnswer").show();
						$("#results").show();
						$("#yourNumbers").hide(); 
						$('#answer').hide();
						document.getElementById("new").onclick = function(){newChallenge()};
					} else {
						document.getElementById("yourAnswer").innerHTML = '<h2>Your said: </h2>' + '<p>' + equation + '</p>';
						document.getElementById("results").innerHTML = '<h2>OH NO!</h2><p>Sorry, that was incorrect</p><input id="tryAgain" type="button" value="TRY AGAIN"/><input id="new" type="button" value="NEW CHALLENGE"/>'

						// show() to overcome 'tryAgain --> go' error
						$("#yourAnswer").show();
						$("#results").show();
						$('#yourNumbers').hide(); 
						$('#answer').hide();
						$('#errorMessage').hide(); 

						document.getElementById("tryAgain").onclick = function(){tryAgain()}; 
						document.getElementById("new").onclick = function(){newChallenge()}; 
					}
				}
			}
			
			
		}

	}


// Create the newChallenge function
function newChallenge() {

	//Generate four random numbers between 1 and 9 inclusive 
	a = Math.floor(Math.random() * (10 - 1)) + 1;
	b = Math.floor(Math.random() * (10 - 1)) + 1;
	c = Math.floor(Math.random() * (10 - 1)) + 1;
	d = Math.floor(Math.random() * (10 - 1)) + 1;

	randomNumbers = [a, b, c, d];

	// Hides all divs but yourNumbers and answer
	$("#play").hide(); 
	$("#homepageTitle").hide(); 
	$("#instructions").hide(); 
	$("#instructionsButton").hide(); 
	$("#yourAnswer").hide();
	$("#results").hide(); 
	$("#errorMessage").hide(); 
	$("#yourNumbers").show(); 
	$("#answer").show(); 
	$('#headerContents').removeClass('hidden'); 

	// Displays the numbers
	document.getElementById("yourNumbersContainer").innerHTML = '<h2>Your numbers are: </h2> <p>' + a + ", " + b + ", " + c + ", " + d + '</p>'; 

	// Displays input box and GO button
	document.getElementById("answer").innerHTML = '<input type="text" id="equation" placeholder="Type your answer here"/>' + '<input type="button" id="go" name="go" value="GO"/>'; 


	// When the GO button is clicked
	document.getElementById("go").onclick = function(){go()}; 
}


// Create the tryAgain function
function tryAgain(){
	$("#yourAnswer").hide();
	$("#results").hide();
	$("#answer").show(); 
	$('#yourNumbers').show(); 
	document.getElementById("go").onclick = function(){go()}; 
}


// Create the help function 

function help(){
	$("#modalBox").removeClass("modalHide");
	$("#modalBox").addClass("modalShow");
}


// Create close function

function close(){
	$("#modalBox").removeClass("modalShow");
	$("#modalBox").addClass("modalHide");
}

// When helpButton is clicked
document.getElementById("helpButton").onclick = function(){help()}; 


// When close is clicked 
document.getElementById("close").onclick = function(){close()};

// When PLAY button is clicked
document.getElementById("play").onclick = function(){newChallenge()}; 


// When INSTRUCTIONS button is clicked
document.getElementById("instructionsButton").onclick = function(){instructions()};  