//STORE PRICES
var pointPrice = 5;
var speedPrice = 10;
var sizePrice = 10;
var reloadPrice = 20;
var launcherPrice = 50;
var autoAimPrice = 20;
var autoFirePrice = 20;

function updateText(elem,text) {
	elem.innerHTML = text;
}

function updateStore() {
	//Get Each Shop Button
	var pointElem = document.getElementById("upgradePoints");
	var speedElem = document.getElementById("upgradeSpeed");
	var sizeElem = document.getElementById("upgradeSize");
	var reloadElem = document.getElementById("upgradeReload");
	var launcherElem = document.getElementById("upgradeLauncher");
	var autoAimElem = document.getElementById("upgradeAutoAim");
	var autoFireElem = document.getElementById("upgradeAutoFire");
	
	if(numGoals != 1) {
		if(numGoals == 50) {
			updateText(pointElem,"Goals: Max");
			pointElem.className = "max";
		} else {
			if(numGoals >= 2) {
				pointPrice++;
			}
			pointPrice+=(2*(numGoals-2));
			updateText(pointElem,"More Goals: "+pointPrice+" points");
		}
	}
	
	if(speed != 1) {
		if(speed == 15) {
			updateText(speedElem,"Speed: Max");
			speedElem.className = "max";
		} else {
			speedPrice += (5*(speed-1));
			updateText(speedElem,"Increase Speed: "+speedPrice+" points");
		}
	}
	
	if(size != 5) {
		if(size == 11) {
			updateText(sizeElem,"Size: Max");
			sizeElem.className = "max";
		} else {
			sizePrice+=(5*(size-5));
			updateText(sizeElem,"Increase Size: "+sizePrice+" points");
		}
	}
	
	if(reload != 0) {
		if(reload == 10) {
			updateText(reloadElem,"Reload: Max");
			reloadElem.className = "max";
		} else if(reload == 9) {
			reloadPrice+=(5*(reload));
			updateText(reloadElem,"Remove Reload: "+reloadPrice+" points");
		} else {
			reloadPrice+=(5*(reload));
			updateText(reloadElem,"Faster Reload: "+reloadPrice+" points");
		}
	}
	
	if(launcherLevel != 1) {
		launcherPrice+=(10*(launcherLevel-1));
	}
	switch(launcherLevel) {
		case 2:
			updateText(launcherElem,"Auto Aim: "+launcherPrice+" points");
			break;
		case 3:
			updateText(launcherElem,"Auto Fire: "+launcherPrice+" points");
			break;
		case 4:
			updateText(launcherElem,"Launcher: Max");
			launcherElem.className = "max";
			break;
	}
	
	if(autoAim) {
		autoAimElem.className = "";
		if(autoAimSpeed != 6) {
			autoAimPrice += (5*(autoAimSpeed-1));
			updateText(autoAimElem,"Faster Auto Aim: "+autoAimPrice+" points");
		} else {
			updateText(autoAimElem,"Auto Aim: Max");
			autoAimElem.className = "max";
		}
	}
	
	if(autoFire) {
		autoFireElem.className = "";
		if(autoFireSpeed != 9) {
			autoFirePrice+=(5*(autoFireSpeed));
			updateText(autoFireElem,"Faster Auto Fire: "+autoFirePrice+" points");
		} else {
			updateText(autoFireElem,"Auto Fire: Max");
			autoFireElem.className = "max";
		}
	}
	
	
}

//Function To Write Message On Store Buttons
function writeMessage(elem,message,original) {
	//Change Text To Message
	elem.innerHTML = message;
	
	//After 1.5sec, Switch Back To Original Text
	setTimeout(function() {
		elem.innerHTML = original;
	},1500);
}

function upgrade(x) {
	//Get Each Shop Button
	var pointElem = document.getElementById("upgradePoints");
	var speedElem = document.getElementById("upgradeSpeed");
	var sizeElem = document.getElementById("upgradeSize");
	var reloadElem = document.getElementById("upgradeReload");
	var launcherElem = document.getElementById("upgradeLauncher");
	var autoAimElem = document.getElementById("upgradeAutoAim");
	var autoFireElem = document.getElementById("upgradeAutoFire");
	
	/*Sort Which Button Was Pressed
	KEY
	0: More Point Balls
	1: Faster Balls
	2: Bigger Balls
	3: Faster Reload
	4: New Launcher Features
	5: Faster Auto Aim
	6: Faster Auto Fire
	*/
	
	var text;
	
	switch(x) {
		case 0:
			if(numGoals != 50) {
				if(points >= pointPrice) {
					numGoals++;
					points-=pointPrice;
					if(numGoals == 2) {
						pointPrice++;
					} else {
						pointPrice+=2;
					}
					generateNewGoal(numGoals-1);
					text = ("More Goals: "+pointPrice+" points");
					if(numGoals != 50) {
						writeMessage(pointElem,"One Goal Added",text);
					} else {
						writeMessage(pointElem,"One Goal Added","Goals: Max");
						pointElem.className = "max";
					}
					saveCookie("numGoals",numGoals);
				} else {
					text = ("More Goals: "+pointPrice+" points");
					writeMessage(pointElem,"Not Enough Points",text);
				}
			}
			break;
		case 1:
			if(speed != 15) {
				text = ("Increase Speed: "+speedPrice+" points");
				if(points >= speedPrice) {
					points-=speedPrice;
					speedPrice+=5;
					speed++;
					if(speed != 15) {
						writeMessage(speedElem,"Increased Speed",("Increase Speed: "+speedPrice+" points"));
					} else {
						writeMessage(speedElem,"Increased Speed",("Speed: Max"))
						speedElem.className = "max";
					}
					saveCookie("speed",speed);
				} else {
					writeMessage(speedElem,"Not Enough Points",("Increase Speed: "+speedPrice+" points"));
				}
			}
			break;
		case 2:
			if(size != 11) {
				text = ("Increase Size: "+sizePrice+" points");
				if(points >= sizePrice) {
					points-=sizePrice;
					sizePrice+=5;
					size++;
					thresh++;
					if(size != 11) {
						writeMessage(sizeElem,"Increased size",("Increase size: "+sizePrice+" points"));
					} else {
						writeMessage(sizeElem,"Increased size",("Size: Max"));
						sizeElem.className = "max";
					}
					saveCookie("size",size);
				} else {
					writeMessage(sizeElem,"Not Enough Points",("Increase size: "+sizePrice+" points"));
				}
			}
			break;
		case 3:
			if(reload != 10) {
				text = ("Faster reload: "+reloadPrice+" points");
				if(points >= reloadPrice) {
					points-=reloadPrice;
					reloadPrice+=5;
					reload++;
					if(reload != 10 && reload != 9) {
						writeMessage(reloadElem,"Decreased reload",("Faster reload: "+reloadPrice+" points"));
					} else if(reload == 9) {
						writeMessage(reloadElem,"Decreased reload",("Remove Reload: "+reloadPrice+" points"));
					} else {
						writeMessage(reloadElem,"Removed reload",("Reload: Max"));
						reloadElem.className = "max";
					}
					saveCookie("reload",reload);
				} else {
					writeMessage(reloadElem,"Not Enough Points",("Faster reload: "+reloadPrice+" points"));
				}
			}
			break;
		case 4:
			if(points >= launcherPrice) {
				if(launcherLevel != 5) {
					points-=launcherPrice;
					launcherPrice+=10;
					launcherLevel++;
					switch(launcherLevel) {
						case 2:
							laser=true;
							writeMessage(launcherElem,"Added Laser Sight",("Auto Aim: "+launcherPrice+" points"));
							saveCookie("laser",Number(laser));
							//Laser
							break;
						case 3:
							autoAim = true;
							launcherY = y;
							autoAimElem.className = "";
							autoAimElem.innerHTML = ("Faster Auto Aim: "+autoAimPrice+" points");
							writeMessage(launcherElem,"Added Auto Aim",("Auto Fire: "+launcherPrice+" points"));
							saveCookie("autoAim",Number(autoAim));
							//AutoAim
							break;
						case 4:
							autoFire = true;
							autoFireFunc();
							autoFireElem.className = "";
							autoFireElem.innerHTML = ("Faster Auto Fire: "+autoFirePrice+" points");
							writeMessage(launcherElem,"Added Auto Fire",("Launcher: Max"));
							launcherElem.className = "max";
							saveCookie("autoFire",Number(autoFire));
							//Autofire
							break;
					}
				}
			} else {
				if(launcherLevel != 5) {
					switch(launcherLevel) {
						case 1:
							writeMessage(launcherElem,"Not Enough Points",("Laser Sight: "+launcherPrice+" points"));
							break;
						case 2:
							writeMessage(launcherElem,"Not Enough Points",("Auto Aim: "+launcherPrice+" points"));
							break;
						case 3:
							writeMessage(launcherElem,"Not Enough Points",("Auto Fire: "+launcherPrice+" points"));
							break;
					}
				}
			}
			break;
		case 5:
			if(autoAimSpeed != 6) {
				text = ("Faster Auto Aim: "+autoAimPrice+" points");
				if(autoAimElem.className != "disabled") {
					if(points >= autoAimPrice) {
						points-=autoAimPrice;
						autoAimPrice+=5;
						autoAimSpeed++;
						if(autoAimSpeed != 6) {
							writeMessage(autoAimElem,"Increased Auto Aim Speed", ("Faster Auto Aim: "+autoAimPrice+" points"));
						} else {
							writeMessage(autoAimElem,"Increased Auto Aim Speed", "Auto Aim: Max");
							autoAimElem.className = "max";
						}
						saveCookie("autoAimSpeed",autoAimSpeed);
					} else {
						writeMessage(autoAimElem,"Not Enough Points", text);
					}
				}
			}
			break;
		case 6:
			if(autoFireSpeed != 9) {
				if(autoFireElem.className != "disabled") {
					text = ("Faster Auto Fire: "+autoFirePrice+" points");
					if(points >= autoFirePrice) {
						points-=autoFirePrice;
						autoFirePrice+=5;
						autoFireSpeed++;
						if(autoFireSpeed != 9) {
							writeMessage(autoFireElem,"Increased Auto Fire Speed", ("Faster Auto Fire: "+autoFirePrice+" points"));
						} else {
							writeMessage(autoFireElem,"Increased Auto Fire Speed", "Auto Fire: Max");
							autoFireElem.className = "max";
						}
						saveCookie("autoFireSpeed",autoFireSpeed);
					} else {
						if(autoFireElem.className != "disabled") {
							writeMessage(autoFireElem,"Not Enough Points", text);
						}
					}
				}
			}
			break;
	}
	saveCookie("points",points);
}