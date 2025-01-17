var roleTransport = {

    /** @param {Creep} creep **/
    run: function(creep) {
        /*
// __________________________________________________________________________________________________
        
        
        // ----------------- Work in progress for dropped resources or ruins -------------------
        let droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        let ruin = creep.pos.findClosestByRange(FIND_RUINS);

        let altResource = [
            storageContainers[0],
            droppedResource,
            ruin
        ];
        let closest = creep.pos.findClosestByPath(altResource);
        if (closest) {
            if (creep.pickup(closest) === ERR_NOT_IN_RANGE) {
                creep.moveTo(storage[0], {visualizePathStyle: {stroke: '#ffff00'}});
            }
            else if ()
        }
        //------------------------------- End of work in progress ----------------------------
        */
        //let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        //if (dropped) {
        //    creep.say('Dont drop it!');
        //    if (creep.pickup(dropped) === ERR_NOT_IN_RANGE) {
        //        creep.moveTo(dropped, {visualizePathStyle: {stroke: '#000000'}});
        //    }
        //}
        let storageContainers = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType === STRUCTURE_CONTAINER &&
                i.store[RESOURCE_ENERGY] > 0
        });
        let storageBigBoy = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType === STRUCTURE_STORAGE &&
                i.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        let extensions = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType === STRUCTURE_EXTENSION &&
                i.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        let localSpawn = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType === STRUCTURE_SPAWN &&
                i.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        let towers = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType === STRUCTURE_TOWER &&
                i.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        // If creeps have energy --> fill structures in order; extentions, spawn, tower, storageBigBoy
        if (creep.store.getUsedCapacity() > 0) {
            if (extensions[0]) {
                if (creep.transfer(extensions[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(extensions[0], {visualizePathStyle: {stroke: '#000000'}});
                }
            }  
            else if (localSpawn[0]) {
                if (creep.transfer(localSpawn[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(localSpawn[0], {visualizePathStyle: {stroke: '#000000'}});
                }
            }
            else if (towers[0]) {
                /*var target;
                let tower1 = towers[0].store.getFreeCapacity(RESOURCE_ENERGY);
                let tower2 = towers[1].store.getFreeCapacity(RESOURCE_ENERGY);
                if (tower1 > tower2) {
                    target = towers[1];
                }
                else if (tower1 < tower2) {
                    target = towers[0];
                }*/
                if (creep.transfer(towers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#000000'}});
                }
            }
            else if (storageBigBoy[0]) {
                if (creep.transfer(storageBigBoy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageBigBoy[0], {visualizePathStyle: {stroke: '#000000'}});
                }
            }
        }
        
        // If creeps need energy --> grab from containers or storage if containers are empty or gone. 
        else if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            if (creep.withdraw(storageContainers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(storageContainers[0], {visualizePathStyle: {stroke: '#ffff00'}});
            }
            else if (extensions[0] || localSpawn[0] || towers[0]) {
                if (creep.withdraw(storageBigBoy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storageBigBoy[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
            
        }
                }
};



module.exports = roleTransport;