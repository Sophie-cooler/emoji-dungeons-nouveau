const moves = [
        {
            "id":"blank",
            "name":"",
            "uses":0,
            "type":"status",
            "damage":0,
            "effect":"none",
            "chance":0,
            "potency":0,
            "target":2,
            "description":""
        },    
        {
            "id":"fierce_bark",
            "name":"Fierce Bark",
            "uses":8,
            "type":"status",
            "damage":0,
            "effect":"stat_lowered_defense",
            "chance":0,
            "potency":2,
            "target":2,
            "description":"Lower the target's defense by 2 stages. Targets an enemy."
        },
        {
            "id":"bite",
            "name":"Bite",
            "uses":21,
            "type":"physical",
            "damage":6,
            "effect":"flinch",
            "chance":9,
            "potency":1,
            "target":2,
            "description":"6 base physical damage. Has a 10% chance to flinch. Targets an enemy."
        },
        {
            "id":"grip_jaw",
            "name":"Grip Jaw",
            "uses":8,
            "type":"physical",
            "damage":10,
            "effect":"trap",
            "chance":0,
            "potency":3,
            "target":2,
            "description":"10 base physical damage. Has a 100% chance to trap. Targets an enemy."
        },
        {
            "id":"scratch",
            "name":"Scratch",
            "uses":32,
            "type":"physical",
            "damage":5,
            "effect":"none",
            "chance":0,
            "potency":1,
            "target":2,
            "description":"5 base physical damage. Targets an enemy."
        },
        {
            "id":"escape",
            "name":"Escape",
            "uses":4,
            "type":"status",
            "damage":5,
            "effect":"phase",
            "chance":0,
            "potency":2,
            "target":3,
            "description":"Phase out of the battlefield for 2 turns. Targets self."
        },
        {
            "id":"alien_blast",
            "name":"Alien Blast",
            "uses":6,
            "type":"magic",
            "damage":12,
            "effect":"none",
            "chance":0,
            "potency":0,
            "target":2,
            "description":"12 base magic damage. Targets an enemy."
        }
    ];