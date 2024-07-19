const playerContainer = document.getElementById("CID1");
const enemyContainer = document.getElementById("CID2");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const sidebar1Container = document.getElementById("sidebar1Container");
const sidebar1 = document.getElementById("battleText");
const sidebar2 = document.getElementById("selectedMoveText");
let haveAllEnemiesStarted;
var allCombatants = [];
var allPlayers = [];
var allEnemies = [];

newCombatant(1, "dog", 1);
newCombatant(1, "cat", 1);
newCombatant(1, "cat", 1);

newCombatant(2, "cat", 1);
newCombatant(2, "cat", 1);
newCombatant(2, "alien", 1);
newCombatant(2, "cat", 1);

allCombatants[0].learnMove("bite");
allCombatants[0].learnMove("bite");
allCombatants[0].learnMove("bite");
allCombatants[0].learnMove("grip_jaw");

allCombatants[1].learnMove("bite");
allCombatants[1].learnMove("bite");
allCombatants[1].learnMove("fierce_bark");
allCombatants[1].learnMove("grip_jaw");

allCombatants[2].learnMove("grip_jaw");

allCombatants[3].learnMove("bite");
allCombatants[3].learnMove("scratch");
allCombatants[3].learnMove("fierce_bark");
allCombatants[3].learnMove("grip_jaw");

allCombatants[4].learnMove("bite");
allCombatants[4].learnMove("scratch");
allCombatants[4].learnMove("fierce_bark");
allCombatants[4].learnMove("grip_jaw");

allCombatants[5].learnMove("bite");
allCombatants[5].learnMove("scratch");
allCombatants[5].learnMove("alien_blast");
allCombatants[5].learnMove("grip_jaw");

allCombatants[6].learnMove("bite");
allCombatants[6].learnMove("scratch");
allCombatants[6].learnMove("fierce_bark");
allCombatants[6].learnMove("grip_jaw");

battleFlow();

function newCombatant(team, id, level) {
    let combatant = new Combatant(team, id, level)
    allCombatants.push(combatant);
    combatant.posInList = allCombatants[allCombatants.length-1]
};

function battleFlow() {
    setTimeout(function() {
        removeBattleText();
        if (allPlayers.every(combatant => combatant.hasMoved == 1)){
            allEnemies.forEach(combatant => combatant.performActionAsEnemy());
            allPlayers.forEach(combatant => combatant.hasMoved = 0);
        };
    }, 50);
};

function removeBattleText() {
    if (sidebar1.offsetHeight > sidebar1Container.offsetHeight - 24) {
        if (sidebar1.firstChild.nodeName != 'BR') {
            sidebar1.removeChild(sidebar1.firstChild);
        };
        sidebar1.removeChild(sidebar1.firstChild);
    };
    battleFlow();
};