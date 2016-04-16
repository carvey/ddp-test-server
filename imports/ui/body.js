import { Template } from 'meteor/templating';

import { PyData } from '../api/pydata';

import './body.html';


Template.body.helpers({
   pydata() {
       return PyData.find({});
   }
});

var line_chart;


PyData.find().observeChanges({
    added: function (id, user) {
        console.log("Updating!");
        // line_chart.update();
        var canvas = $("#chart");
    var context = canvas[0].getContext('2d');

    console.log(get_data());
    // console.log(pydata);
    var labels_list = [];
    
    for (var i = 0; i < 30; i++){
        labels_list.push(i);
    }
        
    
    var data = {
        // labels: ["January", "February", "March", "April", "May", "June", "July"],
        labels: labels_list,
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: get_data()
            }
        ]
    };

    line_chart = new Chart(context).Line(data);
    line_chart.update();
    console.log(line_chart);
    }
});


function get_data() {
    var pydata_list = [];
    var pydata = PyData.find({});
    pydata.forEach(function (pydata_instance) {
        pydata_list.push(pydata_instance.data);
    });
    console.log(pydata_list);

    return pydata_list;
}

Template.graph.rendered = function(){
    var canvas = $("#chart");
    var context = canvas[0].getContext('2d');

    console.log(get_data());
    // console.log(pydata);
    
    var labels_list = [];
    
    for (var i = 0; i < 30; i++){
        labels_list.push(i);
    }
        
    
    var data = {
        // labels: ["January", "February", "March", "April", "May", "June", "July"],
        labels: labels_list,
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: get_data()
            }
        ]
    };

    line_chart = new Chart(context).Line(data);
    line_chart.update();
    console.log(line_chart);
};