

// Number Generator

RandomInteger = function(n, m) {
    if (! m) {m = 1;} // default range starts at 1
    var max = n > m ? n : m; // doesn<q>t matter which value is min or max
    var min = n === max ? m : n; // min is value that is not max
    var d = max - min + 1; // distribution range
    return Math.floor(Math.random() * d + min);
};


// Set up messaging and input functions

function say (output) {
  	$("#dialogue").html(output);
  }

var dead = true;
var roomentrances = 0;
var accuseready = false;
var rooms = ["","","","Ballroom", "Pantry", "Master Bedroom", "Guest Bedroom", "Scullery", "Dining Room", "Games Room", "Observatory", "Study", "Library"];
var room = "";
var warning = "";
var buffer = "";
var presence = "";
var tempmessage = "";
var lastkey = "";
var weaponpresence = "";
var currentroom = "";
var hasmagnifyingglass = false;
var magnifyingglassroom = -1;
var hasmurderweapon = false;
var score = 0;
var dead = false;

function refreshinput() {
	$("#commands").html("> " + buffer + "_");
}


// Set up Character Names

var character = []

character[0] = ['James', 'Smythe', 0, -1, -1, -1, -1,-1];
character[1] = ['Linda', 'Smythe', 0, -1, -1, -1, -1, -1];
character[2] = ['Trevor', 'Watson', 0, -1, -1, -1, -1, -1];
character[3] = ['Janet', 'Watson', 0, -1, -1, -1, -1, -1];
character[4] = ['Geoffrey', 'Gainsborough', 0, -1, -1, -1, -1, -1];
character[5] = ['Susan', 'Hamilton', 0, -1, -1, -1, -1, -1];
character[6] = ['Gareth', 'Hamilton', 0, -1, -1, -1, -1, -1];
character[7] = ['Laurence', 'DeTrothe', 0, -1, -1, -1, -1, -1];

// Choose victim

var victim = -1;
victim = RandomInteger(1,8) - 1;
console.log("Victim: " + victim);

// Place characters in rooms

var finished = false;
var characterchoice = 0;
var roomchoice = 0;
for (i=0; i<8; i++) {
	var j = i;
	roomchoice = RandomInteger(3,12);
	if (character[0][2] == roomchoice) { i = i - 1; }
	if (character[1][2] == roomchoice) { i = i - 1; }
	if (character[2][2] == roomchoice) { i = i - 1; }
	if (character[3][2] == roomchoice) { i = i - 1; }
	if (character[4][2] == roomchoice) { i = i - 1; }
	if (character[5][2] == roomchoice) { i = i - 1; }
	if (character[6][2] == roomchoice) { i = i - 1; }
	if (character[7][2] == roomchoice) { i = i - 1; }
	character[j][2] = roomchoice;
	if (j == victim) { character[j][2] = -1; }
}
for (i=0; i<8; i++) {
	console.log(character[i][0] + " " + character[i][1] + ": " + character[i][2]);
}

// Choose murderer

var murderer = victim;
while (murderer == victim) {
	murderer = RandomInteger(1,8) - 1;
}
console.log ("Murderer: " + murderer);

// Pair up suspects

var partner
for (i=0; i<8; i++) {
	if (i!=murderer && i!=victim && character[i][3] == -1) {
		partner = RandomInteger(0,7);
		if (partner == murderer || partner == victim) { i = i - 1; }
		else if (partner == i) { i = i - 1; }
		else if (character[0][3] == partner) { i = i - 1; }
		else if (character[1][3] == partner) { i = i - 1; }
		else if (character[2][3] == partner) { i = i - 1; }
		else if (character[3][3] == partner) { i = i - 1; }
		else if (character[4][3] == partner) { i = i - 1; }
		else if (character[5][3] == partner) { i = i - 1; }
		else if (character[6][3] == partner) { i = i - 1; }
		else if (character[7][3] == partner) { i = i - 1; }
		else {
			character[i][3] = partner;
			character[partner][3] = i;
			console.log(j + ":" + partner + "----" + i);
		}
	}
}
console.log("Pairs");
for (i=0; i<8; i++) {
	console.log(i + ": " + character[i][3]);
}

// Choose murder room

console.log("Murder room");
var murderroom = -1;
while (murderroom == -1) {
	murderroom = RandomInteger(3,12);
	console.log("Trying " + murderroom);
	for (i=0; i<8; i++) {
		if (character[i][4] == murderroom) { murderroom = -1;}
	}
}
console.log ("Murder Room: " + murderroom);

// Choose alibi rooms

console.log("alibi rooms");
var alibiroom;
for (i=0; i<8; i++) {
	if (i!=murderer && i!=victim && character[i][4] == -1) {
		alibiroom = RandomInteger(3,12);
		if (character[0][4] == alibiroom) { i = i - 1; }
		else if (alibiroom == murderroom) { i = i - 1; }
		else if (character[1][4] == alibiroom) { i = i - 1; }
		else if (character[2][4] == alibiroom) { i = i - 1; }
		else if (character[3][4] == alibiroom) { i = i - 1; }
		else if (character[4][4] == alibiroom) { i = i - 1; }
		else if (character[5][4] == alibiroom) { i = i - 1; }
		else if (character[6][4] == alibiroom) { i = i - 1; }
		else if (character[7][4] == alibiroom) { i = i - 1; }
		else {
			character[i][4] = alibiroom;
			character[(character[i][3])][4] = alibiroom;
			console.log("Character " + i + " with character " + character[i][3] + " in the " + rooms[alibiroom]);
		}
	}
}

// Set up fake alibi - random room, fake person

fakealibiroom = RandomInteger(3,12);
var fakealibiperson = -1;
while (fakealibiperson == -1) {
	fakealibiperson = RandomInteger(1,8)-1;
	if (character[fakealibiperson][3] == -1) { fakealibiperson = -1 }; 
	if (fakealibiperson == murderer) {fakealibiperson = -1;}
}
character[murderer][3] = fakealibiperson;
character[murderer][4] = fakealibiroom;
console.log("Murderer fake room " + fakealibiroom + " and fake partner " + character[fakealibiperson][0] + " " + character[fakealibiperson][1]);

// Choose murder weapon

var weapons = ["Police Baton", "Lead pipe", "carafe", "kitchen knife", "uzi", "spanner", "razorblade", "bodkin"];
murderweapon = RandomInteger(1,8)-1;
var weaponlocations = [-1,-1,-1,-1,-1,-1,-1,-1];

console.log("Murder weapon: "+ weapons[murderweapon]);


// Choose weapon locations
console.log("Weapon locations"); 
for (var i = 0; i < 8; i++) {
	weaponlocations[i] = RandomInteger(3,12);
	for (var j = 0; j < i; j++) {
		if (weaponlocations[i] == weaponlocations[j]) { i = i - 1; }
	}
	if (weaponlocations[i] == magnifyingglassroom) { i = i - 1; }
}
for (var i = 0; i < 8; i++) {
	console.log(weapons[i] + ": " + weaponlocations[i]);
}

console.log("Magnifying glass location"); 
magnifyingglassroom = RandomInteger(3,12);
for (var i = 0; i < 8; i++) {
	if (magnifyingglassroom == weaponlocations[i]) { magnifyingglassroom = RandomInteger(3,12); i = -1; }
}
console.log(magnifyingglassroom);

// Define responses

var response = []
response[0] = '@suspect turns to you slowly, and looks you in the eye. "I had no reason to help @victim or you, Boy! @victim had many enemies, but I wasn`t one of them. I spent the entire evening with @partner looking for a way out of @room".';
response[1] = '"A lot of us wanted @victim dead, C.O, but I`m no killer even if Jeronimo. I spent the whole night with @partner in the @room, so you`ll have to look elsewhere for the way out".';
response[2] = '@suspect turns away from you, and quietly, begins to talk. "@victim and I were the best of friends. I`m overwhelmed with grief, ONEy. Fortunately I have an alibi. I was with @partner in the @room while the test was taking place".';
response[3] = '"I`m not the one you should be talking to, player. @accusation had far more reason to kill @victim than me. I suggest you follow that lead and stop bothering me. I was with @partner in the @room all night".';
response[4] = '@suspect laughs lightly. "Oh goodness no! Getting out? ya plus it`s a miracle @victim didn`t turn up dead sooner, but really, me? I was with @partner. We were in the @room for the whole 15 years this thing as been built."';
response[5] = '@suspect gives you a stony expression."I was with @partner in the @room at the time. Perhaps you ought to be speaking to @accusation."';
response[6] = "I had no reason for hiding the exit or murdering @victim, playa. @victim had many enemies, but I wasn't one of them I lovee that dolt. I spent the entire evening with mi new bestie @partner in the @room.";
response[7] = '"I hope you can be discreet, player. You see, @partner and I were in the @room for the whole time. I wouldn`t want that becoming common knowledge cause things will be cray".';
response[8] = '@suspect stares at you angrily. "Do you know what breh? I`m glad @victim is dead. That little manipulator obviously crossed one too many people this time. I suppose you want to know where I was at the time of the murder? Well I was in the @room with @partner."';
response[9] = "I had no reason for hiding the exit and @victim knew tons of ways , A.L.O.M. @victim had many enemies, but I wasn't one of them. I spent the entire evening with @partner in the @room.";
response[10] = "I have only like two reasons for murdering @victim those were just dreams right, my lord and saviour. @victim had many enemies, yeah I was one of the main ones but ONLY IN MY DREAMS RIGHT?!?!. I spent the entire evening with @partner in the @room. All night";
response[11] = "I had no reason for murdering @victim, player. @victim had many enemies not me but a ton of people in the next room , all of them actually are nuts. One of them told me he loves to eat crickets not needs to or did it once, loves it like its in his diet or something that dude is probably nah totallly the killer and he knows the way out but he wont tell us cause he likes the 'way people grow here'. I spent the entire evening with @partner talking about that creep in the @room.";
response[12] = "Really, G.O.A.T love that outfit by the way, do you think I had something to do us being trapped here? I was with @partner in the @room the whole time. Perhaps you might talk to @accusation, who had far more reason for wanting @victim dead than I plus I loved that ole so and so.";
response[13] = "@partner and I were in the @room all night, Breh. So you can take your suspicions elsewhere. Goodnight I know the secrects to the universe but since I said Goodnight this convo is over. You missing out to I had grade A info";

// Allocate responses

console.log("Responses");
var responsenumber;
for (i=0; i<8; i++) {
	if (i!=victim && character[i][7] == -1) {
		responsenumber = RandomInteger(0,13);
		if (character[0][7] == responsenumber) { i = i - 1; }
		else if (character[1][7] == responsenumber) { i = i - 1; }
		else if (character[2][7] == responsenumber) { i = i - 1; }
		else if (character[3][7] == responsenumber) { i = i - 1; }
		else if (character[4][7] == responsenumber) { i = i - 1; }
		else if (character[5][7] == responsenumber) { i = i - 1; }
		else if (character[6][7] == responsenumber) { i = i - 1; }
		else if (character[7][7] == responsenumber) { i = i - 1; }
		else {
			var accusation = victim;
			while (accusation == victim) {
				accusation = RandomInteger(0,7);
				if (accusation == i) { accusation = victim; }
				if (accusation == character[i][3]) { accusation = victim; }
			}
			character[i][7] = responsenumber;
			character[i][5] = response[responsenumber]
			character[i][5] = character[i][5].replace("@victim", character[victim][0]);
			character[i][5] = character[i][5].replace("@victim", character[victim][0]);
			character[i][5] = character[i][5].replace("@partner", character[(character[i][3])][0]);
			character[i][5] = character[i][5].replace("@room", rooms[(character[i][4])]);
			character[i][5] = character[i][5].replace("@suspect", character[i][0]);
			character[i][5] = character[i][5].replace("@accusation", character[accusation][0]);
			console.log("Character " + i + ": " + character[i][5]);
		}
	}
}


// Set up map of mansion

var map = [];
map[0] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
map[1] = [1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,1,10,10,10,10,10,10,10,10,10,10,10,1];
map[2] = [1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,1,10,10,10,10,10,10,10,10,10,10,10,1];
map[3] = [1,3,3,3,3,3,3,0,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,1,10,10,10,10,10,10,10,10,10,10,10,1];
map[4] = [1,3,3,3,3,3,3,3,3,3,3,3,3,3,40,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,40,10,10,10,10,10,10,10,10,10,10,10,1];
map[5] = [1,3,3,3,3,3,3,3,3,3,3,3,3,3,40,0,0,0,0,0,0,0,0,0,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,0,0,0,0,0,0,0,0,40,10,10,10,10,10,10,10,10,10,10,10,1];
map[6] = [1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,40,40,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,10,10,10,10,10,10,10,10,10,10,10,1];
map[7] = [1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1];
map[8] = [1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,11,11,11,11,11,11,11,11,11,11,11,1];
map[9] = [1,3,3,3,3,41,41,41,41,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,11,11,11,11,11,11,11,11,11,11,11,1];
map[10] = [1,1,1,1,1,20,20,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,40,11,11,11,11,11,11,11,11,11,11,11,1];
map[11] = [1,7,7,7,41,41,41,41,7,7,7,7,7,7,1,0,0,0,0,0,0,0,0,0,1,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,0,0,0,0,1,9,9,9,9,9,9,9,9,9,9,9,9,9,1,0,0,0,0,0,0,0,0,1,11,11,11,11,11,11,11,11,11,11,11,1];
map[12] = [1,7,7,7,7,7,7,7,7,7,7,7,7,7,1,0,0,0,0,0,0,0,0,0,40,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,0,0,0,0,1,9,9,9,9,9,9,9,9,9,9,9,9,9,1,0,0,0,0,0,0,0,0,1,11,11,11,11,11,11,11,11,11,11,11,1];
map[13] = [1,7,7,7,7,7,7,7,7,7,7,7,7,7,1,0,0,0,0,0,0,0,0,0,40,6,6,6,6,6,6,6,6,6,6,6,6,6,6,1,0,0,0,0,1,9,9,9,9,9,9,9,9,9,9,9,9,9,1,0,0,0,0,0,0,0,0,1,11,11,11,11,11,11,11,11,11,11,11,1];
map[14] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,9,9,9,9,9,9,9,9,9,9,9,9,9,1,0,0,0,0,0,0,0,0,1,11,11,11,11,11,11,11,11,11,11,11,1];
map[15] = [1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,9,9,9,9,9,9,9,9,9,9,9,9,9,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1];
map[16] = [1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,9,9,9,9,9,9,9,9,9,9,9,9,9,1,0,0,0,0,0,0,0,0,1,12,12,12,12,12,12,12,12,12,12,12,1];
map[17] = [1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,9,9,9,9,9,9,9,9,9,40,0,0,0,0,0,0,0,0,40,12,12,12,12,12,12,12,12,12,12,12,1];
map[18] = [1,5,5,5,5,5,5,5,5,5,5,5,5,5,40,0,0,0,0,0,0,0,0,0,1,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,1,9,9,9,9,9,9,9,9,9,9,9,9,9,40,0,0,0,0,0,0,0,0,40,12,12,12,12,12,12,12,12,12,12,12,1];
map[19] = [1,5,5,5,5,5,5,5,5,5,5,5,5,5,40,0,0,0,0,0,0,0,0,0,40,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,1,9,9,9,9,9,9,9,9,9,9,9,9,9,1,0,0,0,0,0,0,0,0,1,12,12,12,12,12,12,12,12,12,12,12,1];
map[20] = [1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,0,0,0,0,0,0,0,0,0,40,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,1,9,9,9,9,9,9,9,9,9,9,9,9,9,1,0,0,0,0,0,0,0,0,1,12,12,12,12,12,12,12,12,12,12,12,1];
map[21] = [1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,2,2,2,2,2,2,2,2,2,1,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,1,9,9,9,9,9,9,9,9,9,9,9,9,9,1,2,2,2,2,2,2,2,2,1,12,12,12,12,12,12,12,12,12,12,12,1];
map[22] = [1,5,5,5,5,5,5,5,5,5,5,5,5,5,1,2,2,2,2,2,2,2,2,2,1,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,1,9,9,9,9,9,9,9,9,9,9,9,9,9,1,2,2,2,2,2,2,2,2,1,12,12,12,12,12,12,12,12,12,12,12,1];
map[23] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
map[24] = [30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30];

function message() {
	if (tempmessage.length > 0) {
		return tempmessage + warning;
	}
	else {
		return room + presence + "<br/>" + weaponpresence + warning;	
	}
}



Game = {
  // This defines our grid's size and the size of each of its tiles
  map_grid: {
    width:  80,
    height: 25,
    tile: {
      width:  16,
      height: 16
    }
  },
 
  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },
 
  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },
 
  // Initialize and start our game
  start: function() {
    
    $("#dialogue").html("You shouldn't have answered that question correctly , " + character[victim][0] + " " + character[victim][1] + " was just like you looking for trouble, Tryin to learn javascript and as a result they were trapped and killed in this palace, yes this is a palace admire the lush paintings and subversive 'decor', by me. Have a nice life oh yea , Wise One. The door to the " + character[victim][1] + " estate lays open before you, there is your freedom");
    
    Crafty.init(Game.width(), Game.height());
    Crafty.background('rgb(0, 0, 0)');
    
    $(document).keypress(function(event){if (event.keyCode == 8) {return false;}});
	$(document).keydown(function(event){if (event.keyCode == 8) {return false;}});
    
    // Load and initialise graphics
    
    Crafty.sprite(20, "doc.png", {
	    spr_player: [2, 0, 0, 0],
	});
    Crafty.sprite(50, 30, "floor.png", {
	    spr_char: [4, 5, 0, 0],
	});
	Crafty.sprite(16, 18, "doorstep.png", {
	    spr_doorstep: [0, 0],
	});

	// Load and initialise sounds
	
	Crafty.audio.add("strings", "psycho1.wav");
 	
 	// Create Characters in Rooms

	for (var x = 0; x < Game.map_grid.width; x++) {
		for (var y = 0; y < Game.map_grid.height; y++) {
			for (var placecharacter = 0; placecharacter < 8; placecharacter++) {
				if (map[y][x] == character[placecharacter][2] && character[placecharacter][6]==-1) { console.log("Placed " + character[placecharacter][0] + " " + character[placecharacter][1] + " at " + (x+2) + "," + (y+2)); character[placecharacter][6] = Crafty.e('Character').at(x+2, y+2); character[placecharacter][6].z = 0; };
			}
		}
	}
	 	
	 	
 	
 	
 	// Place a wall at every edge square on our grid of 16x16 tiles
    for (var x = 0; x < Game.map_grid.width; x++) {
      for (var y = 0; y < Game.map_grid.height; y++) {
        if (map[y][x] == 0) {
        	Crafty.e('Hallway').at(x,y);
        }
        if (map[y][x] == 1) {
        	Crafty.e('Wall').at(x,y);
        } 
        if (map[y][x] == 2) {
        	Crafty.e('Doorstep').at(x,y);
        }
        if (map[y][x] == 3) {
        	Crafty.e('Ballroom').at(x,y);
        }
        if (map[y][x] == 4) {
        	Crafty.e('Pantry').at(x,y);
        }
        if (map[y][x] == 5) {
        	Crafty.e('Master Bedroom').at(x,y);
        }
        if (map[y][x] == 6) {
        	Crafty.e('Guest Bedroom').at(x,y);
        }
        if (map[y][x] == 7) {
        	Crafty.e('Scullery').at(x,y);
        }
        if (map[y][x] == 8) {
        	Crafty.e('Dining Room').at(x,y);
        }
        if (map[y][x] == 9) {
        	Crafty.e('Games Room').at(x,y);
        }
        if (map[y][x] == 10) {
        	Crafty.e('Observatory').at(x,y);
        }
        if (map[y][x] == 11) {
        	Crafty.e('Study').at(x,y);
        }
        if (map[y][x] == 12) {
        	Crafty.e('Library').at(x,y);
        }
        if (map[y][x] == 20) {
        	Crafty.e('Hidden Door').at(x,y);
        }
      }
    }
    
    Crafty.e('PlayerCharacter').at(19, 24);
      
       }
   }
