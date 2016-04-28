import { PyData, GraphClear } from  '../imports/api/pydata.js';

Meteor.methods({

    addPyData: function(num) {
        PyData.insert({data: num, createdAt: new Date()});
    },
    
    removePyData: function() {
        PyData.remove({});
    },

    enableGraphClear: function () {
        var clear = GraphClear.findOne({});

        if (clear === undefined)
        {
            GraphClear.insert({flag: false})
        } else {
            GraphClear.update(clear._id, {$set: {flag: false}})
        }
    },

    disableGraphClear: function () {
        var clear = GraphClear.findOne({});

        if (clear === undefined)
        {
            GraphClear.insert({flag: true})
        } else {
            GraphClear.update(clear._id, {$set: {flag: true}})
        }

    }

});
