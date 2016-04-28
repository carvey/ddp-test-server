import { Template } from 'meteor/templating';

import { PyData, GraphClear } from '../api/pydata';

import './body.html';

var line_chart;
var graph_count = 10;


Template.body.helpers({
   pydata() {
       return PyData.find({});
   },

});

Template.graph.helpers({
    clearGraph() {
        var clear = GraphClear.findOne({});

        // if (clear === undefined)
        // {
        //     GraphClear.insert({flag: false});
        //     clear = GraphClear.findOne({});
        // }

        if (clear.flag){
            return "disabled";
        } else {
            return "";
        }

    }
});

Template.graph.events({
    "click #clear": function() {
        console.log("clearing");
        Meteor.call('removePyData');

        for (i in get_data())
        {
            line_chart.removeData();
        }

        labels_list = [];
        for (var i = 0; i < graph_count; i++){
            labels_list.push(i);
        }

        line_chart.scale.xLabels = labels_list;
        line_chart.update();
    }
});

PyData.find().observeChanges({
    added: function (id, data) {

        if (line_chart === undefined)
        {
            console.log("Graph is empty");
        }
        else
        {
            line_chart.addData([data.data], graph_count.toString());
            line_chart.update();

            graph_count = graph_count + 1;
        }

    }
});


Template.graph.rendered = function()
{
    draw_chart();
};

function draw_chart() {
    var labels_list = [];
    var raw_data = get_data();
    // graph_count = raw_data.length;

    for (var i = 0; i < graph_count; i++){
        labels_list.push(i);
    }

    var data = {
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
                data: raw_data
            }
        ]
    };

    var canvas = $('#chart');
    var context = canvas[0].getContext('2d');

    line_chart = new Chart(context).Line(data);
}

function get_data() {
    var pydata_list = [];
    var pydata = PyData.find({});
    pydata.forEach(function (pydata_instance) {
        pydata_list.push(pydata_instance.data);
    });

    return pydata_list;
}