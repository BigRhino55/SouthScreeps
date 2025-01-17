var roleBuilder = { 
    /** @param {Creep} creep **/ 
    run: function(creep) {
        
        let storage = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType === STRUCTURE_STORAGE &&
                            i.store[RESOURCE_ENERGY] > 0
        });
        //var storage = Game.getObjectById('61b9c50eeca7e2d7a14fb030');
        // If builder is not harvesting --> build
        if(creep.store.getUsedCapacity() > 0) {

            //creep.say('🚧 build');
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        // If builder is not building and needs energy --> Harvest
        else if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            //creep.say('🔄 harvest');
            if(creep.withdraw(storage[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(storage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }

        }
        // If creeps are full and nothing to do --> move to flag.
        //else {
        //    creep.moveTo(Game.flags.Flag1, {visualizePathStyle: {stroke: '#ffffff'}})
        //}

//       let dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
//       if (dropped) {
//            if (creep.pickup(dropped) === ERR_NOT_IN_RANGE) {
//                creep.moveTo(dropped, {visualizePathStyle: {stroke: '#ffffff'}});
//            }
//        }
    } 

}; 

  

module.exports = roleBuilder; 