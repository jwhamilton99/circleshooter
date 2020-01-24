/*function trackCursor(e) {
	y = (e.clientY-110);
	x = (e.clientX-130);
	
	if(y <= 12) {
		y = 12;
	} else if(y >= 488) {
		y = 488;
	}
	if(x >= 925) {
		x = 925;
	}
}*/

function trackCursor(evt) {
    var rect = document.getElementById("canvas").getBoundingClientRect();
	x = evt.clientX - rect.left;
	y = evt.clientY - rect.top;
	if(y <= 12) {
		y = 12;
	} else if(y >= 488) {
		y = 488;
	}
}

/*function saveCookie(cookieName, value) {
	document.cookie = (cookieName+"="+value);
	console.log("Saved cookie '"+cookieName+"' as "+value);
}*/

function showVariables() {
	var text = ("Points: "+points+"\nNight Mode: "+nightMode+'\nGoals: '+numGoals+'\nSpeed: '+speed+'\nSize: '+size+'\nReload: '+reload+'\nLauncher: '+launcherLevel+'\nAuto Aim: '+autoAimSpeed+'\nAuto Fire: '+autoFireSpeed+"\nNumber Of Balls: "+numBalls+"\nLaser: "+laser+"\nAuto Aim: "+autoAim+"\nAuto Fire: "+autoFire);
	alert(text);
}

function toggleNight() {
	nightMode = !nightMode;
	if(nightMode) {
		document.getElementById("toggleNightMode").innerHTML = "Day Mode";
		document.body.style.backgroundColor = "black";
		document.getElementById("canvas").style.borderColor = "white";
		saveCookie("nightMode",1);
	} else {
		document.getElementById("toggleNightMode").innerHTML = "Night Mode";
		document.body.style.backgroundColor = "white";
		document.getElementById("canvas").style.borderColor = "black";
		saveCookie("nightMode",0);
	}
}

function saveCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+Number(value)+expires+"; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function resetStats() {
	if(confirm("Are you sure?")) {
		saveCookie("numGoals",1);
		saveCookie("points",0);
		saveCookie("speed",1);
		saveCookie("size",5);
		saveCookie("reload",0);
		saveCookie("laser",0);
		saveCookie("autoAim",0);
		saveCookie("autoFire",0);
		saveCookie("autoAimSpeed",1);
		saveCookie("autoFireSpeed",0);
		resetStatsBool = true;
		location.reload();
	}
}

function generateNewGoal(y) {
	//Generate Coordinates For New Goal
	goalXList[y] = Math.floor((Math.random()*(750-thresh))+(40));
	goalYList[y] = Math.floor((Math.random()*(440))+(40));
	
	//Check If Goal Is Overlapping Corner Text
	if(start) {
		if(goalXList[y] <= (340+thresh) && goalYList[y] >= (400-thresh)) {
			goalXList[y] = Math.floor((Math.random()*(750-thresh))+(40));
			goalYList[y] = Math.floor((Math.random()*(440))+(40));
			while(goalXList[y] <= (340+thresh) && goalYList[y] >= (400-thresh)) {
				goalXList[y] = Math.floor((Math.random()*(750-thresh))+(40));
				goalYList[y] = Math.floor((Math.random()*(440))+(40));
			}
		}
	} else {
		if(goalXList[y] <= (250+thresh) && goalYList[y] >= (450-thresh)) {
			goalXList[y] = Math.floor((Math.random()*(750-thresh))+(40));
			goalYList[y] = Math.floor((Math.random()*(440))+(40));
			while(goalXList[y] <= (250+thresh) && goalYList[y] >= (450-thresh)) {
				goalXList[y] = Math.floor((Math.random()*(750-thresh))+(40));
				goalYList[y] = Math.floor((Math.random()*(440))+(40));
			}
		}
	}
}

function collide(x,y) {
	//Move Each Set Of Coordinates Down One In Array
	for(var j = x; j < numBalls; j++) {
		xList[j] = xList[j+1];
		yList[j] = yList[j+1];
	}
	
	//Remove A Launched Ball
	numBalls--;
	
	//Add A Point
	points++;
	
	saveCookie("points",points);
	
	//Generate New Coordinates
	if(goalRegen) {
		generateNewGoal(y);
	} else {
		for(var i = y; i <= numGoals; i++) {
			goalXList[i] = goalXList[i+1];
			goalYList[i] = goalYList[i+1];
		}
		numGoals--;
	}
}

function click() {
	//If Not Reloading, Launch A New Ball At Y Coordinate
	if(reloading == false) {
		numBalls++;
		if(placing == false) {
			if(autoAim) {
				if(numBalls!=0) {
					xList[numBalls-1] = 10;
					yList[numBalls-1] = launcherY;
				} else {
					xList[0] = 10;
					yList[0] = launcherY;
				}
			} else {
				if(numBalls!=0) {
					xList[numBalls-1] = ((placing)?(1000-x):10);
					yList[numBalls-1] = y;
				} else {
					xList[0] = ((placing)?(1000-x):10);
					yList[0] = y;
				}
			}
		} else {
			if(numBalls!=0) {
				xList[numBalls-1] = ((placing)?(1000-x):10);
				yList[numBalls-1] = y;
			} else {
				xList[0] = ((placing)?(1000-x):10);
				yList[0] = y;
			}
		}
		
		if(start) {
			start = !start;
		}
		reloading = true;
		setTimeout(function(){reloading=false;},(2000-(2000*(reload/10))));
	}
}

function autoFireFunc() {
	if(autoFire) {
		//Run Click Function
		if(placing == false) {
			click();
		}
		
		//Run This Function Again In 2.5sec/Autofire Speed
		setTimeout(function() {
			autoFireFunc();
		}, (2500-(2500*(autoFireSpeed/10))));
	}
}

function autoAimFunc() {
	//Create List Of Y Coordinates For All Goals
	var goalYArray = [];
	for(var i = 0; i < numGoals; i++) {
		goalYArray[i] = goalYList[i];
	}
	
	//Get Current Y Coordinate
	var currentY = launcherY;
	
	//Calculate Distance Between Each Goal And Launcher
	var distanceArray = [];
	for(var i = 0; i < goalYArray.length; i++) {
		distanceArray[i] = Math.abs(currentY-goalYArray[i]);
	}
	
	//Get Lowest Value Of Array (Which Goal Is Closest)
	var nearestDistance = Math.min(...distanceArray);
	
	//Get Y Coordinate Of Closest Goal
	var nearest;
	for(var i = 0; i < distanceArray.length; i++) {
		if(distanceArray[i] == nearestDistance) {
			nearest = goalYArray[i];
		}
	}
	
	//Returns Nearest Y Coordinate To Move To
	return nearest;
}

function update() {
	//Clear Canvas
	ctx.clearRect(0,0,1000,500);
	
	//Set Stroke To White
	ctx.strokeStyle = "#FFFFFF"
	
	//Draw Laser Sight (If Applicable)
	if(laser) {
		if(placing == false) {
			var grd = ctx.createLinearGradient(520,0,800,0);
			if(nightMode) {
				grd.addColorStop(0,"black");
			} else {
				grd.addColorStop(0,"white");
			}
			grd.addColorStop(1,"red");
			ctx.fillStyle=grd;
			if(autoAim) {
				ctx.fillRect(500,launcherY,500,1);
			} else {
				ctx.fillRect(500,y,500,1);
			}
		}
	}
	
	//Set Fill To Blue
	ctx.fillStyle = "#0000FF";
	
	//Draw Point Ball(s)
	for(var i = 0; i < numGoals; i++) {
		ctx.beginPath();
		ctx.arc(goalXList[i],goalYList[i],size,0,2*Math.PI);
		ctx.fill();
	}
	
	//Set Fill To Red
	ctx.fillStyle = "#FF0000";
	
	//Draw Fired Ball(s)
	for(var i = 0; i < numBalls; i++) {
		xList[i] += speed;
		ctx.beginPath();
		ctx.arc((1000-xList[i]),yList[i],size,0,2*Math.PI);
		ctx.fill();
		if(xList[i] == 1020) {
			for(var j = 0; j < numBalls; j++) {
				xList[j] = xList[j+1];
				yList[j] = yList[j+1];
			}
			numBalls--;
		}
	}
	
	//Search For Collisions
	for(var i = 0; i < numBalls; i++) {
		for(var j = 0; j < numGoals; j++) {
			if((1000-xList[i]-thresh <= (goalXList[j]+thresh) && (1000-xList[i]) >= (goalXList[j]-thresh))) {
				if(yList[i]-thresh <= (goalYList[j]+thresh) && yList[i]+thresh >= (goalYList[j]-thresh)) {
					collide(i,j);
				}
			}
		}
	}
	
	//Set Fill To Black
	if(nightMode) {
		ctx.fillStyle = "#FFFFFF";
	} else {
		ctx.fillStyle = "#000000";
	}
	
	//Draw Text In Corner
	if(start) {
		ctx.fillText("Fire: Click",5,490);
		ctx.fillText("Up/Down: Move Mouse",5,450);
	} else {
		ctx.fillText(("Points: "+points),5,(490));
	}
	
	//DEV TOOLS
	if(coords) {
		document.getElementById("canvas").style.cursor = "crosshair";
		ctx.fillText((Math.floor(x)+", "+Math.floor(y)), 5, 30);
		ctx.font = "30px Arial";
	} else {
		if(placing == false) {
			document.getElementById("canvas").style.cursor = "none";
		}
	}
	if(placing) {
		ctx.fillStyle = "#FF0000";
		if(reloading==false) {
			document.getElementById("canvas").style.cursor = "none";
			ctx.beginPath();
			if(x <= 12) {
				ctx.arc(x,y,size,0,2*Math.PI);
			} else {
				ctx.arc(x,y,size,0,2*Math.PI);
			}
			ctx.fill();
		} else {
			ctx.fillStyle = "#000000";
			document.getElementById("canvas").style.cursor = "crosshair";
		}
	} else {
		if(coords == false) {
			ctx.fillStyle = "#000000";
			document.getElementById("canvas").style.cursor = "none";
		}
	}
	//END DEV TOOLS
	
	//Set Fill To Black
	if(nightMode) {
		ctx.fillStyle = "#FFFFFF";
	}  else {
		ctx.fillStyle = "#000000";
	}
	
	//Move Launcher (If Auto Aim Is Purchased)
	if(autoAim) {
		var goal = autoAimFunc();
		if(goal < launcherY) {
			if((Math.abs(launcherY-goal)) <= 10) {
				launcherY--;
			} else {
				launcherY-=autoAimSpeed;
			}
		} else if(goal > launcherY) {
			if((Math.abs(launcherY-goal)) <= 10) {
				launcherY++;
			} else {
				launcherY+=autoAimSpeed;
			}
		}
	}
	
	//Draw Launcher
	if(placing == false) {
		if(nightMode) {
			ctx.fillStyle = "#FFFFFF";
		} else {
			ctx.fillStyle = "#000000";
		}
		if(autoAim) {
			ctx.fillRect(950,(launcherY-12),50,24);
		} else {
			ctx.fillRect(950,(y-12),50,24);
		}
	}
	
	//Draw Reloading Text
	if(reloading) {
		if(placing == false) {
			ctx.font = "10px Arial";
			if(nightMode) {
				ctx.fillStyle = "#000000";
			} else {
				ctx.fillStyle = "#FFFFFF";
			}
			if(autoAim) {
				ctx.fillText("Reloading",953,(launcherY+3));
			} else {
				ctx.fillText("Reloading",953,(y+3));
			}
			ctx.font = "30px Arial";
			if(nightMode) {
				ctx.fillStyle = "#FFFFFF";
			} else {
				ctx.fillStyle = "#000000";
			}
		}
	}
	
	if(nightMode) {
		document.getElementById("endmessage").style.color = "white";
		document.getElementById("devheader").style.color = "white";
		document.getElementById("title").style.color = "white";
	} else {
		
	}
	
	if(numGoals == 50 && speed == 15 && size == 11 && reload == 10 && launcherLevel == 4 && autoAimSpeed == 6 && autoFireSpeed == 9) {
		document.getElementById("endmessage").style.visibility = "visible";
		document.getElementById("devtools").style.visibility = "visible";
	}
	
	document.cookie = ("points="+points-1+";numGoals="+numGoals);
	
	//Set Refresh Timer (Run This Function Again In 1ms)
	setTimeout(function() { update(); }, 1);
}