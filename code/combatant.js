let selectedPlayer = null;
let selectedMove = null;

class Combatant {
    constructor(team, id, level) {
        this.startMovementAsEnemy = 0
        const self = this;
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
                    const damageDealt = Math.round((selectedMove.damage * combatants[selectedPlayer.combatantValue].damageMultiplier * combatants[self.combatantValue].defenseMultiplier));
                    self.health = self.health - damageDealt;
                    self.statDisplay.textContent = self.health + "/" + self.maxHealth;
                    const moveMessage = document.createElement("p");
                    sidebar1.appendChild(moveMessage);
                    moveMessage.textContent = "Player " + combatants[selectedPlayer.combatantValue].name + " used " + moves[selectedPlayer.currentMoveValue].name + " on " + combatants[self.combatantValue].name + ", dealing " + damageDealt + " damage. ";
                    const lineBreak1 = document.createElement("br");
                    sidebar1.appendChild(lineBreak1);
                    const lineBreak2 = document.createElement("br");
                    sidebar1.appendChild(lineBreak2);
                    
                    if (self.health <= 0) {
                        const battleMessage = document.createElement("p");
                        sidebar1.appendChild(battleMessage);
                        battleMessage.textContent = "Enemy " + combatants[self.combatantValue].name + " has died. ";
                        const lineBreak1 = document.createElement("br");
                        sidebar1.appendChild(lineBreak1);
                        const lineBreak2 = document.createElement("br");
                        sidebar1.appendChild(lineBreak2);
                        self.icon.remove();
                        self.statDisplay.remove();
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

    display() {

        this.icon.textContent = combatants[this.combatantValue].icon;
        this.maxHealth = Math.floor(combatants[this.combatantValue].maxHealth*(this.level*0.25)+30);
        this.statDisplay.textContent = this.maxHealth + "/" + this.maxHealth;
        this.health = this.maxHealth
    };

    learnMove(id) {
        this.movesList.splice(this.currentPositionMoveList,1,id);
        if(this.currentPositionMoveList < 4) {
            this.currentPositionMoveList++;
        }
        else if (this.currentPositionMoveList >= 4) {
            console.log(combatants[this.combatantValue].name + " already has four moves. Delete one to add another.");
        };
    };

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
    performActionAsEnemy() {
        const self = this;
        self.randomMoveValue = Math.floor(Math.random() * (3))
        self.currentMoveValue = 0;
        self.victim = allPlayers[Math.floor(Math.random() * (allPlayers.length - 1))];

        if(this.health != 0 && this.health > 0){
            if(moves[self.currentMoveValue].id == self.movesList[self.randomMoveValue]){
                const damageDealt = Math.round((moves[self.currentMoveValue].damage * combatants[self.victim.combatantValue].defenseMultiplier * combatants[self.combatantValue].damageMultiplier));
                self.victim.health = self.victim.health - damageDealt;
                self.victim.statDisplay.textContent = self.victim.health + "/" + self.victim.maxHealth;
                const moveMessage = document.createElement("p");
                sidebar1.appendChild(moveMessage);
                moveMessage.textContent = "Enemy " + combatants[self.combatantValue].name + " used " + moves[self.currentMoveValue].name + " on " + combatants[self.victim.combatantValue].name + ", dealing " + damageDealt + " damage.";
                const lineBreak1 = document.createElement("br");
                sidebar1.appendChild(lineBreak1);
                const lineBreak2 = document.createElement("br");
                sidebar1.appendChild(lineBreak2);
            };
            while(moves[self.currentMoveValue].id != self.movesList[self.randomMoveValue]) {
                self.currentMoveValue++;
                if(moves[self.currentMoveValue].id == self.movesList[self.randomMoveValue]){
                    const damageDealt = Math.round((moves[self.currentMoveValue].damage * combatants[self.victim.combatantValue].defenseMultiplier * combatants[self.combatantValue].damageMultiplier));
                    self.victim.health = self.victim.health - damageDealt;
                    self.victim.statDisplay.textContent = self.victim.health + "/" + self.victim.maxHealth;
                    const moveMessage = document.createElement("p");
                    sidebar1.appendChild(moveMessage);
                    moveMessage.textContent = "Enemy " + combatants[self.combatantValue].name + " used " + moves[self.currentMoveValue].name + " on " + combatants[self.victim.combatantValue].name + ", dealing " + damageDealt + " damage.";
                    const lineBreak1 = document.createElement("br");
                    sidebar1.appendChild(lineBreak1);
                    const lineBreak2 = document.createElement("br");
                    sidebar1.appendChild(lineBreak2);
                    break;
                };
            };
            if(self.victim.health <= 0){
                const battleMessage = document.createElement("p");
                sidebar1.appendChild(battleMessage);
                battleMessage.textContent = "Player " + combatants[self.victim.combatantValue].name + " has died. ";
                const lineBreak1 = document.createElement("br");
                sidebar1.appendChild(lineBreak1);
                const lineBreak2 = document.createElement("br");
                sidebar1.appendChild(lineBreak2);
                self.victim.icon.remove();
                self.victim.statDisplay.remove();
            };
        };
    };
};