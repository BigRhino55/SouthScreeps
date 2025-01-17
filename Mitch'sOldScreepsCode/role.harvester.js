var roleHarvester = { 

    /** @param {Creep} creep **/ 
    run: function(creep) { 

        var energySource = Game.getObjectById('5bbcae759099fc012e639191');
        if(creep.store.getFreeCapacity() > 0) { 
            if(creep.harvest(energySource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(energySource, {visualizePathStyle: {stroke: '#ffaa00'}}); 
            } 
        }   
        else { 
            var targets = creep.room.find(FIND_STRUCTURES, { 
                    filter: (structure) => { 
                        return (structure.structureType === STRUCTURE_CONTAINER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; 
                    } 
            }); 
            if(targets.length > 0) { 
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}}); 
                } 
            } 
        }
    } 
}; 

  

module.exports = roleHarvester; 