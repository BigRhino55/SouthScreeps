var roleClaimer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.target = 'E26S32';
        if(creep.room.name != creep.memory.target){
            var getMeOut = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(getMeOut));
        }
        else{
            creep.moveTo(creep.room.controller);
            creep.claimController(creep.room.controller);
        }
    }
};



module.exports = roleClaimer;