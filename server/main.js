import { PyData } from  '../imports/api/pydata.js';

Meteor.methods({

    addPyData: function(num) {
        console.log(num);
        PyData.insert({data: num, createdAt: new Date()});
    }

});
