var roleAttack = { 
    /** @param {Creep} creep **/ 
    run: function(creep) {
        //var exit = creep.pos.findPathTo(32, 48);
        creep.memory.target = 'E26S33';
        if(creep.room.name != creep.memory.target){
            var getMeOut = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(getMeOut));
            console.log(creep.moveTo(creep.pos.findClosestByRange(getMeOut)));
        }
        else{
            var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(target) {
                    if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                }
            }
            //var target = creep.room.find(FIND_STRUCTURES, {
            //    filter: (i) => {
            //        return (i.structureType === STRUCTURE_SPAWN)
            //    }
           // });
           // if (creep.attack(target[0]) === ERR_NOT_IN_RANGE){
           //     creep.moveTo(target[0]);
           // }
        }
    }    
}; 

  

module.exports = roleAttack; 