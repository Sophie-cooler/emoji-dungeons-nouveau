let selectedPlayer = null;
let selectedMove = null;

class Combatant {
    constructor(team, id, level) {
        const self = this;
        this.defenseMod = 0;
        this.magDefenseMod = 0;
        this.hasMoved = 0;
        this.combatantValue = 0;
        this.team = team;
        this.level = level;
        this.element = document.createElement("div");
        this.movesList = ["blank","blank","blank","blank"];
        this.currentPositionMoveList = 0;

        this.icon = document.createElement("button");
        this.statDisplay = document.createElement("p");
        this.element.appendChild(this.icon);
        this.element.appendChild(this.statDisplay);
        this.id = id;

        if (this.team == 1) {
            allPlayers.push(this);
            playerContainer.appendChild(this.element);
            this.icon.classList.add("playerButton");
            this.icon.onclick = function selectSelf() {
                if(self.hasMoved == 0){
                    self.select();
                    self.combatantValue = 0;
                    if(combatants[self.combatantValue].id == self.id) {
                        sidebar2.textContent = combatants[self.combatantValue].name;
                    };
                    while(combatants[self.combatantValue].id != self.id) {
                        self.combatantValue++;
                        if(combatants[self.combatantValue].id == self.id) {
                            sidebar2.textContent = combatants[self.combatantValue].name;
                            break;
                        };
                    };
                };
            };
        }

        else if (this.team == 2){
            allEnemies.push(this);
            enemyContainer.appendChild(this.element);
            this.icon.classList.add("enemyButton");
            this.icon.onclick = function selfWasAttacked() {
                if (selectedMove != null && selectedPlayer.hasMoved == 0) {
                    selectedPlayer.hasMoved = 1;
                    self.issueMove(0);
                    if (self.health <= 0) {
                        self.die(0);
                    };
                };
            };
        };

        if (combatants[this.combatantValue].id == this.id){
            this.display();
        };
        while(combatants[this.combatantValue].id != this.id){
            this.combatantValue++;
            if (combatants[this.combatantValue].id == this.id){
                this.display();
                break;
            };
        };

    };
    /*
    display displays the default visuals for a combatant, their health value
    and their icon as text in their button.
    */
    display() {

        this.icon.textContent = combatants[this.combatantValue].icon;
        this.maxHealth = Math.floor(combatants[this.combatantValue].maxHealth*(this.level*0.25)+30);
        this.statDisplay.textContent = this.maxHealth + "/" + this.maxHealth;
        this.health = this.maxHealth
    };
    /*
    learnMove pushes the move specified in id onto the combatant's movesList.
    */
    learnMove(id) {
        this.movesList.splice(this.currentPositionMoveList,1,id);
        if(this.currentPositionMoveList < 4) {
            this.currentPositionMoveList++;
        }
        else if (this.currentPositionMoveList >= 4) {
            console.log(combatants[this.combatantValue].name + " already has four moves. Delete one to add another.");
        };
    };
    /*
    buttonSwitch switches the moveButtons to display the current
    combatant's moves. That's it. Pretty redundant, might clean up
    later.
    */
    buttonSwitch(buttonSlot) {
        this.currentMoveValue = 0;
        if(moves[this.currentMoveValue].id == this.movesList[buttonSlot]) {
            if(buttonSlot == 0) {
                button1.textContent = moves[this.currentMoveValue].name;
            };
            if(buttonSlot == 1) {
                button2.textContent = moves[this.currentMoveValue].name;
            };
            if(buttonSlot == 2) {
                button3.textContent = moves[this.currentMoveValue].name;
            };
            if(buttonSlot == 3) {
                button4.textContent = moves[this.currentMoveValue].name;
            };
        };
        while(moves[this.currentMoveValue].id != this.movesList[buttonSlot]) {
            this.currentMoveValue++;
            if(moves[this.currentMoveValue].id == this.movesList[buttonSlot]) {
                if(buttonSlot == 0) {
                    button1.textContent = moves[this.currentMoveValue].name;
                };
                if(buttonSlot == 1) {
                    button2.textContent = moves[this.currentMoveValue].name;
                };
                if(buttonSlot == 2) {
                    button3.textContent = moves[this.currentMoveValue].name;
                };
                if(buttonSlot == 3) {
                    button4.textContent = moves[this.currentMoveValue].name;
                };
                break;
            };
        };
    };
    /*
    select is kind of needlessly redundant, but it works fine.
    It calls buttonSwitch.
    */
    select() {
        selectedMove = null;
        selectedPlayer = this;
        const me = this;

        sidebar2.textContent = "";
        button1.style.borderColor = "black";
        button2.style.borderColor = "black";
        button3.style.borderColor = "black";
        button4.style.borderColor = "black";

        button1.onclick = function selectMe() {
            if(me.hasMoved == 0){
                me.selectThisMove(0);
                button1.style.borderColor = "white";
                button2.style.borderColor = "black";
                button3.style.borderColor = "black";
                button4.style.borderColor = "black";
            }; 
        };
        button2.onclick = function selectMe() {
            if(me.hasMoved == 0){
                me.selectThisMove(1);
                button1.style.borderColor = "black";
                button2.style.borderColor = "white";
                button3.style.borderColor = "black";
                button4.style.borderColor = "black";
            }; 
        };
        button3.onclick = function selectMe() {
            if(me.hasMoved == 0){
                me.selectThisMove(2);
                button1.style.borderColor = "black";
                button2.style.borderColor = "black";
                button3.style.borderColor = "white";
                button4.style.borderColor = "black";
            }; 
        };
        button4.onclick = function selectMe() {
            if(me.hasMoved == 0){
                me.selectThisMove(3);
                button1.style.borderColor = "black";
                button2.style.borderColor = "black";
                button3.style.borderColor = "black";
                button4.style.borderColor = "white";
            }; 
        };

        this.buttonSwitch(0);
        this.buttonSwitch(1);
        this.buttonSwitch(2);
        this.buttonSwitch(3);
    };

    selectThisMove(buttonSlot) {
        this.currentMoveValue = 0;

        if(moves[this.currentMoveValue].id == this.movesList[buttonSlot]) {
            selectedMove = moves[this.currentMoveValue];
            sidebar2.textContent = moves[this.currentMoveValue].description;
        };
        while(moves[this.currentMoveValue].id != this.movesList[buttonSlot]) {
            this.currentMoveValue++;
            if(moves[this.currentMoveValue].id == this.movesList[buttonSlot]) {
                selectedMove = moves[this.currentMoveValue];
                sidebar2.textContent = moves[this.currentMoveValue].description;
            };
        };
    };
    /*
    performActionAsEnemy is called in game.js. It calls issueMove on a random victim.
    That's mostly it.
    */
    performActionAsEnemy() {
        const self = this;
        self.randomMoveValue = Math.floor(Math.random() * (3))
        self.currentMoveValue = 0;
        self.victim = allPlayers[Math.floor(Math.random() * (allPlayers.length - 1))];

        if(this.health != 0 && this.health > 0){
            if(moves[self.currentMoveValue].id == self.movesList[self.randomMoveValue]){
                self.issueMove(1);
            };
            while(moves[self.currentMoveValue].id != self.movesList[self.randomMoveValue]) {
                self.currentMoveValue++;
                if(moves[self.currentMoveValue].id == self.movesList[self.randomMoveValue]){
                    self.issueMove(1);
                    break;
                };
            };            
            if(self.victim.health <= 0){
                self.die(1);
            };
        };
    };
    /*
    issueMove takes 0 or 1. 0 issues the move to self, and 1
    issues a random move to a random victim. I don't think it
    works with combatants on player team. (Untested)
    */
    issueMove(usingVictim){
        let issuer = this
        if(usingVictim == 1){
            if(moves[issuer.currentMoveValue].type == "magic"){
                const damageDealt = Math.round((moves[issuer.currentMoveValue].damage * combatants[issuer.victim.combatantValue].defenseMultiplier * (combatants[issuer.combatantValue].damageMultiplier + issuer.victim.magDefenseMod)));
                issuer.victim.health = issuer.victim.health - damageDealt;
                issuer.victim.statDisplay.textContent = issuer.victim.health + "/" + issuer.victim.maxHealth;
                const moveMessage = document.createElement("p");
                sidebar1.appendChild(moveMessage);
                moveMessage.textContent = "Enemy " + combatants[issuer.combatantValue].name + " used " + moves[issuer.currentMoveValue].name + " on " + combatants[issuer.victim.combatantValue].name + ", dealing " + damageDealt + " damage.";
                const lineBreak1 = document.createElement("br");
                sidebar1.appendChild(lineBreak1);
                const lineBreak2 = document.createElement("br");
                sidebar1.appendChild(lineBreak2);
            }
            else if(moves[issuer.currentMoveValue].type == "physical"){
                const damageDealt = Math.round((moves[issuer.currentMoveValue].damage * combatants[issuer.victim.combatantValue].defenseMultiplier * (combatants[issuer.combatantValue].damageMultiplier + issuer.victim.defenseMod)));
                issuer.victim.health = issuer.victim.health - damageDealt;
                issuer.victim.statDisplay.textContent = issuer.victim.health + "/" + issuer.victim.maxHealth;
                const moveMessage = document.createElement("p");
                sidebar1.appendChild(moveMessage);
                moveMessage.textContent = "Enemy " + combatants[issuer.combatantValue].name + " used " + moves[issuer.currentMoveValue].name + " on " + combatants[issuer.victim.combatantValue].name + ", dealing " + damageDealt + " damage.";
                const lineBreak1 = document.createElement("br");
                sidebar1.appendChild(lineBreak1);
                const lineBreak2 = document.createElement("br");
                sidebar1.appendChild(lineBreak2);
            };
        }
        else if(usingVictim == 0){
            if(moves[selectedPlayer.currentMoveValue].type == "magic"){
                const damageDealt = Math.round((selectedMove.damage * combatants[selectedPlayer.combatantValue].damageMultiplier * (combatants[issuer.combatantValue].magDefenseMultiplier + issuer.magDefenseMod)));
                issuer.health = issuer.health - damageDealt;
                issuer.statDisplay.textContent = issuer.health + "/" + issuer.maxHealth;
                const moveMessage = document.createElement("p");
                sidebar1.appendChild(moveMessage);
                moveMessage.textContent = "Player " + combatants[selectedPlayer.combatantValue].name + " used " + moves[selectedPlayer.currentMoveValue].name + " on " + combatants[issuer.combatantValue].name + ", dealing " + damageDealt + " damage. ";
                const lineBreak1 = document.createElement("br");
                sidebar1.appendChild(lineBreak1);
                const lineBreak2 = document.createElement("br");
                sidebar1.appendChild(lineBreak2);
            }
            else if(moves[selectedPlayer.currentMoveValue].type == "physical"){
                const damageDealt = Math.round((selectedMove.damage * combatants[selectedPlayer.combatantValue].damageMultiplier * (combatants[issuer.combatantValue].defenseMultiplier + issuer.defenseMod)));
                issuer.health = issuer.health - damageDealt;
                issuer.statDisplay.textContent = issuer.health + "/" + issuer.maxHealth;
                const moveMessage = document.createElement("p");
                sidebar1.appendChild(moveMessage);
                moveMessage.textContent = "Player " + combatants[selectedPlayer.combatantValue].name + " used " + moves[selectedPlayer.currentMoveValue].name + " on " + combatants[issuer.combatantValue].name + ", dealing " + damageDealt + " damage. ";
                const lineBreak1 = document.createElement("br");
                sidebar1.appendChild(lineBreak1);
                const lineBreak2 = document.createElement("br");
                sidebar1.appendChild(lineBreak2);
            };
        };
    };
    /*
    die kills the combatant that calls it. Not much else, it deletes
    the data of the combatant.
    */
    die(usingVictim){
        let issuer = this
        if(usingVictim == 1){
            const battleMessage = document.createElement("p");
            sidebar1.appendChild(battleMessage);
            battleMessage.textContent = "Player " + combatants[issuer.victim.combatantValue].name + " has died. ";
            const lineBreak1 = document.createElement("br");
            sidebar1.appendChild(lineBreak1);
            const lineBreak2 = document.createElement("br");
            sidebar1.appendChild(lineBreak2);
            issuer.victim.icon.remove();
            issuer.victim.statDisplay.remove();
            allPlayers.splice(issuer.victim.posInList, 1);
        }
        else if(usingVictim == 0){
            const battleMessage = document.createElement("p");
            sidebar1.appendChild(battleMessage);
            battleMessage.textContent = "Enemy " + combatants[issuer.combatantValue].name + " has died. ";
            const lineBreak1 = document.createElement("br");
            sidebar1.appendChild(lineBreak1);
            const lineBreak2 = document.createElement("br");
            sidebar1.appendChild(lineBreak2);
            issuer.icon.remove();
            issuer.statDisplay.remove();
        };
    };
};