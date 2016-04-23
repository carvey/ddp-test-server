import { PyData } from  '../imports/api/pydata.js';

Meteor.methods({

    addPyData: function(num) {
        PyData.insert({data: num, createdAt: new Date()});
    },
    
    removePyData: function() {
        console.log("dropping");
        PyData.remove({});
    }

});
