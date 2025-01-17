var roleHarvester = require('role.harvester'); 
var roleTransport = require('role.transport');
var roleUpgrader = require('role.upgrader'); 
var roleBuilder = require('role.builder');
var roleClaimer = require('role.Claimer');
var roleAttack = require('role.attack');
var roleRanged = require('role.ranged');
var roleRoom2 = require('role.room2');
var roleHeal = require('role.heal');



module.exports.loop = function () { 
    //Game.creeps.Harvester34106686.moveTo(25,25, {visualizePathStyle: {stroke: '#ffaa00'}});
    let towers = Game.rooms['E26S31'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    for(let id in towers) {
        var tower = towers[id];
        var limit = 100000; // 50k --> 100k
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (i) =>  (i.hits < i.hitsMax) && !(i.structureType === STRUCTURE_WALL) && !(i.structureType === STRUCTURE_RAMPART)
        });
        var closestDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (i) => (i.structureType === STRUCTURE_WALL && i.hits < limit)
        });
        var closestDamagedRampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (i) => (i.structureType === STRUCTURE_RAMPART && i.hits < limit)
        });

        if(closestHostile) { 
            tower.attack(closestHostile); 
        }
        else if (closestDamagedWall) {
            tower.repair(closestDamagedWall);
            //console.log('Wall: ' + tower.repair(closestDamagedWall));
        }
        else if (closestDamagedRampart) {
            tower.repair(closestDamagedRampart);
            //console.log('Rampart: '+ tower.repair(closestDamagedRampart));
        }
        else if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
            //console.log('Structure: ' + tower.repair(closestDamagedStructure));
        }
    }
    
    let towers2 = Game.rooms['E26S32'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    for(let id in towers) {
        var tower = towers2[id];
        var limit = 0; // 50k --> 100k
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (i) =>  (i.hits < i.hitsMax) && !(i.structureType === STRUCTURE_WALL) && !(i.structureType === STRUCTURE_RAMPART)
        });
        var closestDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (i) => (i.structureType === STRUCTURE_WALL && i.hits < limit)
        });
        var closestDamagedRampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (i) => (i.structureType === STRUCTURE_RAMPART && i.hits < limit)
        });

        if(closestHostile) { 
            tower.attack(closestHostile); 
        }
        else if (closestDamagedWall) {
            tower.repair(closestDamagedWall);
            //console.log('Wall: ' + tower.repair(closestDamagedWall));
        }
        else if (closestDamagedRampart) {
            tower.repair(closestDamagedRampart);
            //console.log('Rampart: '+ tower.repair(closestDamagedRampart));
        }
        else if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
            //console.log('Structure: ' + tower.repair(closestDamagedStructure));
        }
    }
    
    /* 
    
    var tower = Game.getObjectById('61c21a89dc9052c1768f632a');
    if(tower) { 

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (i) => (i.hits < i.hitsMax) && !(i.structureType === STRUCTURE_WALL) && !(i.structureType === STRUCTURE_RAMPART)
        });

        if(closestHostile) { 
            tower.attack(closestHostile); 
        }
        else if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
    } 
    */
    
    for(var name in Memory.creeps) { 
        if(!Game.creeps[name]) { 
            delete Memory.creeps[name]; 
            console.log('Clearing non-existing creep memory:', name); 
        } 
    }

    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role === 'transport');
    //console.log('Transport: ' + transporters.length);

    if(transporters.length < 4) {
        var newName = 'Transport' + Game.time;
        console.log('Spawning new transporter: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'transport', transporting: 'false'}});
    }

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    //console.log('Builders: ' + builders.length); 

    if(builders.length < 0) {
        var newName = 'Builder' + Game.time; 
        console.log('Spawning new builder: ' + newName); 
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'builder', building: 'false'}}); 
    } 

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    //console.log('Upgraders: ' + upgraders.length); 

    if(upgraders.length < 1) { 
        var newName = 'Upgrader' + Game.time; 
        console.log('Spawning new upgrader: ' + newName); 
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'upgrader'}}); 
    } 
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    //console.log('Harvesters: ' + harvesters.length); 

    if(harvesters.length < 1) { 
        var newName = 'Harvester' + Game.time; 
        console.log('Spawning new harvester: ' + newName); 
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'harvester', harvesting: 'false'}}); 
    } 
    
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role === 'attack');
    //console.log('Attackers: ' + builders.length); 
    if(attackers.length < 0) {
        var newName = 'Attacker' + Game.time; 
        console.log('Spawning new attacker: ' + newName); 
        Game.spawns['Spawn1'].spawnCreep([ATTACK,TOUGH,TOUGH,ATTACK,TOUGH,TOUGH,ATTACK,TOUGH,TOUGH,ATTACK,TOUGH,TOUGH,ATTACK,TOUGH,TOUGH,ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'attack'}});
    }
    
    var ranged = _.filter(Game.creeps, (creep) => creep.memory.role === 'ranged');
    //console.log('Rangers: ' + ranged.length); 
    if(ranged.length < 0) {
        var newName = 'Ranger' + Game.time; 
        console.log('Spawning new ranger: ' + newName); 
        Game.spawns['Spawn1'].spawnCreep([RANGED], newName, {memory: {role: 'ranged'}}); 
    }
    
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role === 'heal');
    //console.log('Healers: ' + healers.length); 
    if(healers.length < 0) {
        var newName = 'Healer' + Game.time; 
        console.log('Spawning new healer: ' + newName); 
        Game.spawns['Spawn1'].spawnCreep([HEAL], newName, {memory: {role: 'heal'}}); 
    }

    var claimer = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer');
    //console.log('Claimer: ' + claimer.length);
    if(claimer.length < 0) {
        var newName = 'claimer' + Game.time;
        console.log('Spawning new claimer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'claimer'}});
    }

    var R2Upgrader = _.filter(Game.creeps, (creep) => creep.memory.role === 'R2Upgrader');
    //console.log('R2Upgrader: ' + claimer.length);
    if(R2Upgrader.length < 3) {
        var newName = 'R2Upgrader' + Game.time;
        console.log('Spawning new R2Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'R2Upgrader', upgrading: 'false'}});
    }

    var R2Builder = _.filter(Game.creeps, (creep) => creep.memory.role === 'R2Builder');
    //console.log('R2Builder: ' + claimer.length);
    if(R2Builder.length < 0) {
        var newName = 'R2Builder' + Game.time;
        console.log('Spawning new R2Builder: ' + newName);
        Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'R2Builder', building: 'false', target: "E26S32"}});
    }
    
    var R2Miner = _.filter(Game.creeps, (creep) => creep.memory.role === 'R2Miner');
    //console.log('R2Miner: ' + R2Miner.length); 
    
     if(R2Miner.length < 3) { 
        var newName = 'R2Miner' + Game.time; 
        console.log('Spawning new R2Miner: ' + newName); 
        Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'R2Miner', mining: 'false', target: 'E26S32'}}); 
    }
    
    var R2Transporter = _.filter(Game.creeps, (creep) => creep.memory.role === 'R2Transporter');
    //console.log('R2Transporter: ' + R2Transporter.length); 
    
     if(R2Transporter.length < 3) { 
        var newName = 'R2Transporter' + Game.time; 
        console.log('Spawning new R2Transporter: ' + newName); 
        Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'R2Transporter', transporting: 'false', target: "E26S32"}}); 
    }
    
    var R3Transporter = _.filter(Game.creeps, (creep) => creep.memory.role === 'R3Transporter');
    //console.log('R3Transporter: ' + R3Transporter.length); 
    
     if(R3Transporter.length < 0) { 
        var newName = 'R3Transporter' + Game.time; 
        console.log('Spawning new R3Transporter: ' + newName); 
        Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'R3Transporter', transporting: 'false', target: "E26S33"}}); 
    }
    
    var R2Repairer = _.filter(Game.creeps, (creep) => creep.memory.role === 'R2Repairer');
    //console.log('R2Repairer: ' + R2Repairer.length); 
    
     if(R2Repairer.length < 0) { 
        var newName = 'R2Repairer' + Game.time; 
        console.log('Spawning new R2Repairer: ' + newName); 
        Game.spawns['Spawn2'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'R2Repairer', repairing: 'false', target: "E26S32"}}); 
    }

    if(Game.spawns['Spawn1'].spawning) {  
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name]; 
        Game.spawns['Spawn1'].room.visual.text( 
            '🛠️' + spawningCreep.memory.role, 
            Game.spawns['Spawn1'].pos.x - 1,
            Game.spawns['Spawn1'].pos.y,  
            {align: 'left', opacity: 0.8}); 
    } 

    for(var name in Game.creeps) { 
        var creep = Game.creeps[name]; 
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep); 
        } 
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep); 
        } 
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep); 
        }
        if(creep.memory.role === 'transport') {
            roleTransport.run(creep); 
        }
        if(creep.memory.role === 'attack') {
            roleAttack.run(creep);
        }
        if(creep.memory.role === 'ranged') {
            roleRanged.run(creep);
        }
        if(creep.memory.role === 'heal') {
            roleHeal.run(creep);
        }
        if(creep.memory.role === 'claimer') {
            roleClaimer.run(creep);
        }

        if(creep.memory.role === 'R2Upgrader') {
            roleRoom2.run(creep);
        }

        if(creep.memory.role === 'R2Builder') {
            roleRoom2.run(creep);
        }
        
        if(creep.memory.role === 'R2Miner') {
            roleRoom2.run(creep);
        }
        
        if(creep.memory.role === 'R2Transporter') {
            roleRoom2.run(creep);
        }
        
        if(creep.memory.role === 'R3Transporter') {
            roleRoom2.run(creep);
        }
        
        if(creep.memory.role === 'R2Repairer') {
            roleRoom2.run(creep);
        }
    } 
} 