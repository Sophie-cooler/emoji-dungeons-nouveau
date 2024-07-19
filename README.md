# Emoji Dungeons Nouveau
Emoji Dungeons Nouveau is a revival of an old JavaScript project I had been working on for a couple of months.
It is a turn-based battling roguelike that uses no image files because I am extremely lazy.
Currently unfinished - if you try to play it in this state, it will not work well.
## How to play
### Basics
When loading into the game, there should be three emojis on the left side of the top rectangle, contained within a white box.
To select a Combatant, click on them. The game will confirm your action by displaying the moves of that Combatant on the pink buttons below the top recangle.
To use a move, click on the corresponding button and then select an enemy on the right side of the top rectangle.
### Feedback
After using a move, a chat message will appear in the left sidebar, confirming your action.
Repeat this for all of your units, then the enemies will attack. Their actions are also confirmed in the left sidebar.
You may have noticed the second right sidebar; it contains the description of whatever you have selected.
If you select a combatant, the sidebar will show its stats. If you select a move, the sidebar will show the move's description.
### Move Descriptions
The description shows the move's **base damage**. This is the value that all multipliers are based on, and this exact value is **not** reflected in the left sidebar.
The left sidebar shows the **calculated damage.**
