var roleRoom2 = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var roleHarvester = require('role.harvester'); 
        var roleTransport = require('role.transport');
        var roleBuilder = require('role.builder');        
        if (creep.room.name === 'E26S31') {
            creep.memory.target = 'E26S32';
        }
        let storageBigBoy = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType === STRUCTURE_STORAGE &&
                i.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        var energySource1 = Game.getObjectById('5bbcae759099fc012e639193');
        var energySource2 = Game.getObjectById('5bbcae759099fc012e639194');
        if(creep.room.name != creep.memory.target){
            var getMeOut = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(getMeOut));
        }
                // ----------------------------R2UPGRADER SECTION -----------------------------------------
        else if (creep.memory.role === 'R2Upgrader') {
            if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
                creep.memory.upgrading = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
                creep.memory.upgrading = true;
                creep.say('⚡ upgrade');
            }
            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(energySource2) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(energySource2, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (dropped) {
                creep.pickup(dropped);
            }
        }
        
                // ----------------------------R2BUILDER SECTION -----------------------------------------
        else if (creep.memory.role === 'R2Builder') {
            // If builder is not building and needs energy --> Harvest
            console.log(storageBigBoy);
            if (creep.memory.building == 'false') {
                if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
                    creep.say('🚧 build');
                    creep.memory.building = 'true';
                }
                else if(creep.transfer(storageBigBoy[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageBigBoy[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
            else if (creep.memory.building === 'true') {
                var targets = Game.rooms['E26S32'].find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                if (creep.store[RESOURCE_ENERGY] === 0) {
                    creep.say('🔄 harvest');
                    creep.memory.building = 'false';
                }
            }
        }
        
                // ----------------------------R2MINER SECTION -----------------------------------------
        else if (creep.memory.role === 'R2Miner') {
            var energySource = Game.getObjectById('5bbcae759099fc012e639193');
            if(creep.store.getFreeCapacity() > 0) { 
                if(creep.harvest(energySource) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(energySource, {visualizePathStyle: {stroke: '#ffaa00'}}); 
                } 
            }   
            else { 
                var targets = creep.room.find(FIND_STRUCTURES, { 
                        filter: (i) => { 
                            return (i.structureType === STRUCTURE_CONTAINER) &&
                                    i.store.getFreeCapacity(RESOURCE_ENERGY) > 0; 
                        } 
                }); 
                if(targets.length > 0) { 
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}}); 
                    } 
                } 
            }
        }
        
                // ----------------------------R2TRANSPORT SECTION -----------------------------------------
        else if (creep.memory.role === 'R2Transporter') {
            roleTransport.run(creep);
        }
        
        // ----------------------------R3TRANSPORT SECTION -----------------------------------------
        else if (creep.memory.role === 'R3Transporter') {
            var dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (dropped && creep.store.getFreeCapacity > 0) {
                creep.memory.target = 'E26S32';
                //creep.say('Dont drop it!');
                if (creep.pickup(dropped) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped, {visualizePathStyle: {stroke: '#000000'}});
                }
            }
            if (creep.store.getFreeCapacity() - creep.store.getCapacity() === 0) {  // If the creep has dropped off its energy and needs more --> change target room to resource room. 
                creep.memory.target = 'E26S33';
            }
            else if (creep.store.getFreeCapacity() - creep.store.getCapacity() != 0 && creep.room.name === 'E26S32') { // if the creep has some energy and is in the drop off room keep searching for places to drop energy off. 
                var dropOff = creep.room.find(FIND_STRUCTURES, { 
                        filter: (i) => { 
                            return (i.structureType === STRUCTURE_EXTENSION || 
                                    i.structureType === STRUCTURE_SPAWN || 
                                    i.structureType === STRUCTURE_STORAGE) &&
                                    i.store.getFreeCapacity(RESOURCE_ENERGY) > 0; 
                        } 
                });
                if(dropOff.length > 0) { 
                    if(creep.transfer(dropOff[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropOff[0], {visualizePathStyle: {stroke: '#ffffff'}}); 
                    } 
                }  
            }
            if(creep.room.name != creep.memory.target){ // If the creeps target room is not the room it is currently in --> move to the target room. 
                var getMeOut = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(getMeOut), {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else if (creep.room.name === 'E26S33') { // If the creep is in the resource room --> gather resources from available energy source.
                
                var energySource = creep.room.find(FIND_SOURCES_ACTIVE);
                if(creep.store.getFreeCapacity() > 0) { // if the creep has room in capacity --> gather more resources.
                    if(creep.harvest(energySource[0]) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(energySource[0], {visualizePathStyle: {stroke: '#ffaa00'}}); 
                    } 
                }
                else { // creep is full and needs to drop off resources --> change target room to drop off room. 
                    creep.memory.target = 'E26S32';
                    creep.say('Returning to Boss')
                }
            }    
        }
        
        // ------------------------ REPAIRER SECTION ------------------------------
        else if (creep.memory.role === 'R2Repairer') {
            
            var closestDamagedStructure = creep.room.find(FIND_STRUCTURES, {
            filter: (i) =>  i.structureType === STRUCTURE_CONTAINER //|| (i.hits < i.hitsMax) && !(i.structureType === STRUCTURE_WALL) && !(i.structureType === STRUCTURE_RAMPART)
            });
            var energySource = creep.room.find(FIND_STRUCTURES, { 
                        filter: (i) => { 
                            return (i.structureType === STRUCTURE_CONTAINER) &&
                                    i.store.getFreeCapacity(RESOURCE_ENERGY) > 0; 
                        } 
            });
            
            let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (dropped) {
                creep.say('Dont drop it!');
                if (creep.pickup(dropped) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropped, {visualizePathStyle: {stroke: '#000000'}});
                }
            }
            if(creep.store.getFreeCapacity() > 0) { 
            if (creep.withdraw(energySource[1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(energySource[1], {visualizePathStyle: {stroke: '#ffaa00'}}); 
                } 
            }
            //console.log(energySource[1]);
            if(closestDamagedStructure[0]) {
                if(creep.repair(closestDamagedStructure[0])) {
                    
                    creep.moveTo(closestDamagedStructure[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};



module.exports = roleRoom2;