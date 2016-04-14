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

        line_chart.update();
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

    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
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
            // {
            //     label: "My Second dataset",
            //     fillColor: "rgba(151,187,205,0.2)",
            //     strokeColor: "rgba(151,187,205,1)",
            //     pointColor: "rgba(151,187,205,1)",
            //     pointStrokeColor: "#fff",
            //     pointHighlightFill: "#fff",
            //     pointHighlightStroke: "rgba(151,187,205,1)",
            //     data: [28, 48, 40, 19, 86, 27, 90]
            // }
        ]
    };

    line_chart = new Chart(context).Line(data);
};