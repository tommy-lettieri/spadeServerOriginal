function Deck()
{//start deck function (object...)
	//this.cards = [52];//create an array of 52 strings
	this.cards = [52];

	for(var i = 0; i<52; i++)
	{//start for loop
		this.cards[i] = {};//make the array empty objects

		this.cards[i].value = i%13+2;//set value to position in deck mod 14 and then add 2
		//set up suits
		if(i<13)
			this.cards[i].suit = "s";
		else if(i<26)
			this.cards[i].suit = "d";
		else if(i<39)
			this.cards[i].suit = "c";
		else
			this.cards[i].suit = "h";
	}//ends for loop

	//create shuffle method
	this.shuffle = function()//the variable shuffle is a function with no parameters
	{//start shuffle
		for(var i=0;i<52;i++)
		{//start for loop
			//Math.floor(Math.random()*52);//generate random number from 0 to 51
			//perform swap of cards
			var rn = Math.floor(Math.random()*52);//generate a random number between 0 and 51 (inclusive)
			var temp = this.cards[i];//copy the card
			this.cards[i] = this.cards[rn];//put the card at the random location and move it into the card at the iteral
			this.cards[rn] = temp;//put temp into the card at rn
		}//end for loop
	}//end shuffle

	this.display = function()
	{//start display
		for(var i=0;i<52;i++)
		{//start for loop
			console.log((i+1) + " " + this.cards[i].suit + " " + this.cards[i].value);//display information about card
		}//end for loop
	}//end display

	this.deal = function()
	{//start deal
		var hand = [4];
		for(var handNumber = 0; handNumber<4;handNumber++)
		{//traverse hands
			hand[handNumber] = {};
			hand[handNumber].cards = [13];
			for(var i = 0; i<13;i++)
			{//traverse cards
				hand[handNumber].cards[i] = this.cards[i*4+handNumber];
			}//end card traverse
		}//end hand traverse
		return hand;//return the array of hands
	}//end deal
}//end deck

//function handFunctions()
var handFunctions = {};

{//this bracket does nothing.... using it to keep hand functions together
	handFunctions.sort = function(hnd)
	{//start sort
		bubbleSort();//sort by value
		sortBySuit();//sort suit

		function bubbleSort()
		{//start bubble sort
			var swap = true;
			var sorted = 0;//keeps track of sorted values
			while(swap)
			{//start while loop
				swap = false;
				for(var i = 0; i<12-sorted;i++)
				{//start traversing unsorted list
					if(hnd.cards[i].value > hnd.cards[i+1].value)
					{//check values
						//perform a swap
						var temp = hnd.cards[i];
						hnd.cards[i] = hnd.cards[i+1];
						hnd.cards[i+1] = temp;
						swap = true;
					}//end check values
				}//end traversing unsorted list
				sorted++;//increment sorted numbers
			}//end loop
		}//end bubble sorted

		function sortBySuit()
		{//start sort by suit
			var temp = [];//create an array to hold sorted cards

			for(var q = 0; q<4; q++)
			{//loop to traverse suits
				switch(q)
				{//checks suit
					case 0:
					var s = "s";//spades
					break;
					case 1:
					var s = "d";//diamonds
					break;
					case 2:
					var s = "c";//clubs
					break;
					case 3:
					var s = "h";//hearts
					break;
				}//end suit check
				for(var i = 0; i<13; i++)
				{//start traversing cards
					if(hnd.cards[i].suit == s)//if correct suit
						temp.push(hnd.cards[i]);//add it to sorted array
				}//end for loop
			}//done sorting

			hnd.cards = temp;//replace unsorted array with sorted array
		}//end sort by suit
	}//end sort

	handFunctions.handToString = function(hnd)
	{
		var s = "";
		for(var i = 0; i<hnd.cards.length; i++)
			s+= hnd.cards[i].value + " " + hnd.cards[i].suit + " ";
		return s;
	}

	handFunctions.display = function(hnd)
	{
		for(var i = 0; i<hnd.cards.length;i++)
			console.log((i+1) + " " + hnd.cards[i].suit + " " + hnd.cards[i].value);
	}

	handFunctions.removeCardByIndex = function(hnd, index)
	{//start removecardbyindex
		for(index;index<hnd.cards.length; index++)
			hnd.cards[index] = hnd.cards[index+1];
		hnd.cards.pop();
	}//end removecardbyindex

	handFunctions.removeCard = function(hnd, value, suit)
	{//start removecard
		var index=-1;
		for(var i = 0; i<hnd.cards.length; i++)
		{//start loop to traverse hand
			if((hnd.cards[i].value == value)&&(hnd.cards[i].suit == suit))
			{//start if to look for matching card
				index = i;//set the correct index
				break;//break the loop, your done
			}//end if
		}//end for loop
		if(index<0)//if you dont find the card
			console.log("ERROR");//display error
		else
			handFunctions.removeCardByIndex(hnd,index);//remove appropriate card
	}//end removecard
}//this bracket does nothing... using it to keep handFunctions together

var deck;
var hands;


var spadesBroken;
var winningCard = {};
var winningID;
var leadSuit = " ";
var cardsPlayed = 0;
var NS = {};
NS.score = 0;
NS.scoreHistory = "0<NEWLINE>";
var EW = {};
EW.score = 0;
EW.scoreHistory = "0<NEWLINE>";
var lastTrick = " ";
var turn=0;


var messages = "";
var plays = {};
plays.plays = [4];
plays.bet = [4];
plays.tricks = [4];
nil = [4];
dn = [4];
var dealer = 0;
var seats = [4];
var actives = [4];

for(var i = 0; i<4;i++)
{
	seats[i] = " ";
	actives[i] = false;
}

function init()
{
	deck = new Deck();
	deck.shuffle();
	hands = deck.deal();

	for(var i = 0; i<4;i++)
	{
		handFunctions.sort(hands[i]);
		plays.tricks[i] = 0;
		plays.bet[i] = "";
		plays.plays[i] = "";
		nil[i] = false;
		dn[i] = false;
	}

	turn = dealer;

	NS.tricks = 0;
	NS.Bet = "";

	EW.tricks = 0;
	EW.Bet = "";

	leadSuit = " ";
	winningID=-1;

	spadesBroken = false;

	plays.nplays = 0;
	plays.string = "";
	plays.detailString = "";

}

init();







var http = require('http');//same as importing http
var qs = require('querystring');//import query string
var url = require('url');//import url

http.createServer(function(req, res)//create a listening sockets with objects (request, response)
{//start create server
	console.log('request recieved');//the console with write 'request recieved

	var body = '';//store request data;

	//upon recieving data
	req.on('data', function(chunk)//"on" is a function equivilant to add action listener, parameters: first is string of type of event to listen for, second is a function that takes in a single arg depending to notification
	{//start action listener equiv
		body+=chunk;
	});//end action listener equiv

	//upon finishing the data collection
	req.on('end', function()
	{//start req.on
		var postData = qs.parse(body);//create variable post data from the string of data collected which was parsed into a query string
		//console.log(JSON.stringify(postData));//data in string version

		switch(postData.type)
		{
			case "sendMessage":
				handleSentMessage(req,res,postData);
				break;
			case "getMessages":
				sendMessage(req,res, postData);
				break;
			case "sendCard":
				handlePlay(req,res,postData);
				break;
			case "getHand":
				sendHand(req,res,postData);
				break;
			case "sendBet":
				setBet(req,res,postData);
				break;
			case "takeSeat":
				takeSeat(req,res,postData);
				break;
			case "get":
				send(req,res);
				break;
			case "checkSeats":
				checkSeats(req,res);
				break;
			default:
				res.write("TommyTOMTOM");
				res.end();
	}
	});//end req.on

	//var queryData = url.parse(req.url, true).query;
	//res.write("Hello World");//the browser that called the request will write hello world/
	//res.end();//end the request
}).listen(process.env.SPADES_PORT || 80);//end create server

function handleSentMessage(req,res,postData)
{
		messages+=postData.name + ": " + postData.message + "NEWLINE";
		sendMessage(req,res, postData)
}

function sendMessage(req,res, postData)
{
	checkIn(postData);
	res.write(messages);
	res.end();//send the response
}

function handlePlay(req,res,postData)
{
	plays.plays[postData.id] = postData.id + " " + postData.value + " " + postData.suit + "END-PLAY";
	handFunctions.removeCard(hands[postData.id], postData.value, postData.suit);
	plays.string="";
	for(var i = 0; i<4;i++)
		if(plays.plays[i]!="")
			plays.string+=plays.plays[i];
	var c = {};
	c.value = parseInt(postData.value,10);
	c.suit = postData.suit;
	gamePlay(c, postData.id);
	res.end();
}

function sendHand(req,res,postData)
{
	res.write(handFunctions.handToString(hands[postData.id]));
	res.end();
}

function setBet(req, res, postData)
{
	turn++;
	turn%=4;

	plays.bet[postData.id] = postData.bet;
	if(postData.id%2==0)
	{
		if(NS.Bet=="")
			NS.Bet = 0;

		if(postData.bet==14)
			nil[postData.id]=true;
		else if(postData.bet==15)
			dn[postData.id]=true;
		else
			NS.Bet+=parseInt(postData.bet,10);
	}
	else
	{
		if(EW.Bet=="")
			EW.Bet = 0;

		if(postData.bet==14)
			nil[postData.id]=true;
		else if(postData.bet==15)
			dn[postData.id]=true;
		else
			EW.Bet+=parseInt(postData.bet,10);
	}
	res.end();
}

function gamePlay(card, id)
{
	if (plays.nplays==0)
	{
		winningCard = card;
		winningID = id;
		leadSuit = card.suit;
	}
	else if(((winningCard.suit == card.suit)&&(card.value > winningCard.value))||
			((winningCard.suit != 's')&&(card.suit == 's')))
	{
		winningCard = card;
		winningID = id;
	}

	if((!spadesBroken)&&(winningCard.suit== 's'))
		spadesBroken=true;

	plays.nplays++;
	turn++;
	turn%=4;

	if(plays.nplays==4)
	{
		plays.nplays=0;

		leadSuit = " ";
		turn = winningID;

		lastTrick = plays.string;

		for(var i = 0; i<4;i++)
			plays.plays[i] = "";
		plays.string = "";

		if((winningID==0)||(winningID==2))
			NS.tricks++;
		else
			EW.tricks++;

		plays.tricks[winningID]++;

		if(NS.tricks + EW.tricks == 13)
			endHand();
	}
}

function endHand()
{
	if(NS.tricks>=NS.Bet)
	{
		var q;
		q=NS.Bet*10;
		q+=NS.tricks-NS.Bet;

		NS.scoreHistory+="+" + q + "<NEWLINE>";
		if(NS.score%10+NS.tricks-NS.Bet>9)
		{
				NS.score-=110;
				NS.scoreHistory+="-110<NEWLINE>";
		}
		NS.score+=q;
	}
	else
	{
		NS.score-=NS.Bet*10;
		NS.scoreHistory+="-"+(NS.Bet*10) + "<NEWLINE>";
	}

	if(EW.tricks>=EW.Bet)
	{
		var q;
		q=EW.Bet*10;
		q+=EW.tricks-EW.Bet;
		EW.scoreHistory+= "+" + q + "<NEWLINE>";

		if(EW.score%10+EW.tricks-EW.Bet>9)
		{
			EW.score-=110;
			EW.scoreHistory+= "-110<NEWLINE>";
		}

		EW.score+=q;

	}
	else
	{
		EW.score-=EW.Bet*10;
		EW.scoreHistory+= "-" + (EW.Bet*10) +"<NEWLINE>";
	}

	for(var i = 0; i<4; i++)
	{
		//HANDLE NIL
		if(nil[i])
		{
			if(plays.tricks[i]>0)
			{
				if(i%2==0)
				{
					NS.score-=100;
					NS.scoreHistory+="-100<NEWLINE>"
				}
				else
				{
					EW.score-=100;
					EW.scoreHistory+="-100<NEWLINE>";

				}
			}
			else
			{
				if(i%2==0)
				{
					NS.scoreHistory+="+100<NEWLINE>"
					NS.score+=100;
				}
				else
				{
					EW.scoreHistory+="+100<NEWLINE>";
					EW.score+=100;
				}

			}
		}

		//HANDLE DOUBLE NIL
		if(dn[i])
		{
			if(plays.tricks[i]>0)
			{
				if(i%2==0)
				{
					NS.score-=200;
					NS.scoreHistory+="-200<NEWLINE>"
				}
				else
				{
					EW.score-=200;
					EW.scoreHistory+="-200<NEWLINE>";

				}
			}
			else
			{
				if(i%2==0)
				{
					NS.scoreHistory+="+200<NEWLINE>"
					NS.score+=200;
				}
				else
				{
					EW.scoreHistory+="+200<NEWLINE>";
					EW.score+=200;
				}
			}
		}
	}

	NS.scoreHistory+= "=" + NS.score + "<NEWLINE>";
	EW.scoreHistory+= "=" + EW.score + "<NEWLINE>";

	dealer++;
	dealer%=4;

	if(!(EW.score>500||NS.score>500))
		init();
}

function takeSeat(req,res,postData)
{
	seats[postData.id] = postData.name;
	actives[postData.id] = true;
	res.end();
}

function checkIn(postData)
{
	actives[postData.id] = true;
}

function removeInactive()
{
	for(var i = 0; i<4;i++)
	{
		if(!actives[i])
		{
			seats[i] = " ";
		}
		actives[i] = false;
	}
}

setInterval(removeInactive, 5000);


function checkSeats(req,res)
{
	res.write(seats[0] + "<NAME-SPLIT>" + seats[1] + "<NAME-SPLIT>" + seats[2] + "<NAME-SPLIT>" + seats[3]);
	res.end();
}

function addTurn()
{
	resp+= turn;
}

function addPlay()
{
	resp+= "<SPLIT>" + plays.string;
}

function addDetails()
{
	plays.detailString = "";
	for(var i = 0; i<4;i++)
	{
		plays.detailString+= plays.tricks[i] + "<TB>" + plays.bet[i] + "<END-PLAYER>";
	}


	plays.detailString+= NS.tricks + "<TB>" + NS.Bet + "<END-PLAYER>" + EW.tricks + "<TB>" + EW.Bet;


	resp+= "<SPLIT>" + plays.detailString;
}

function addLastTrick()
{
	resp+= "<SPLIT>" + lastTrick
}

function addLeadSuit()
{
	resp+= "<SPLIT>" + leadSuit;
}

function addSpadesBroken()
{
	if(spadesBroken)
		resp+= "<SPLIT>1";
	else
		resp+= "<SPLIT>0";
}

function addScore()
{
	resp+= "<SPLIT>" + NS.score + "<SCORE>" + EW.score;
}

function addScoreHistory()
{
	resp+= "<SPLIT>" + NS.scoreHistory + "<SCORE>" + EW.scoreHistory;
}

function addSeats()
{
	resp+= "<SPLIT>" + seats[0] + "<NAME-SPLIT>" + seats[1] + "<NAME-SPLIT>" + seats[2] + "<NAME-SPLIT>" + seats[3];
}

function send(req,res)
{
	resp = "";
	addTurn();
	addPlay();
	addLastTrick();
	addDetails();
	addScore();
	addScoreHistory();
	addLeadSuit();
	addSeats();
	addSpadesBroken();
	res.write(resp);
	res.end();
}
