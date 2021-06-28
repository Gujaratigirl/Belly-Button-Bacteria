// bring in data
d3.json("samples.json").then((data)=> {

var samples = data.names;
// console.log(samples);
var test = Object.entries(data.samples).map(row => row);
var filterTest = test.filter(row => row.id === "941");
// console.log(filterTest); //This pulls data but I can't seem to do anything with it.  Always 'undefined'

//Trying to figure out how to pull data!!!
var xtest = Object.entries(filterTest).map(entry=> entry[1]);
//   undefined  var x = Object.entries(filterTest[1]);
//var testing = x[0].otu_ids;
// var ytest = x.otu_ids;
// var x = filterTest.otu_ids.values;
//Different way   var x = object.value(filterTest.otu_ids);
// var y = filterTest.samples_values.values;
var testing = data.samples.filter(row =>row.id === "941")[0].otu_ids;
var otuValues = data.samples.filter(row =>row.id === "941")[0].sample_values;
// console.log(xtest);
// console.log(ytest);
var testing10 = testing.slice(0,10);
var otuValues10 = otuValues.slice(0,10);
// console.log(testing10);
// console.log(otuValues10);
var newNames = testing10.map(function(el){
    return 'OTU ' + el;
});

console.log(newNames);

var demographics = data.metadata;
//console.log(demographics);
var demo1 = Object.entries(demographics[0]);
// console.log(demo1);
// alert(Object.entries(demo1));
var demoLoc = d3.selectAll("panel-heading").node();
// demo1.forEach(row => {
//         var h5 = demoLoc.append("h3");
//         console.log(row)
//         Object.values(row).forEach((value)=> {
//             h5.append("h3").text(value);
//         });
// });

buildDropDown(samples);
//Build initial plot
data = [{ 
    x: newNames,
    y: otuValues10,
    type: "bar" }];

    var BAR = d3.selectAll("#bar").node();
    var layout = {
      title: "Top 10 Bacteria Cultures Found"
        };

    Plotly.newPlot(BAR, data, layout);

});

// function init() {
// data = [{ 
//     // x: ["OTU 1167", " OTU 2859", "O482", "O2264", "O41", "O1189", "O352", "O189", "O2318", "O1977"],
//     // y: [163, 126, 113, 78, 71, 51, 50, 47, 40, 40],
//     // type: "bar" }];

//     x: testing10,
//     y: otuValues10,
//     type: "bar" }];


//     var BAR = d3.selectAll("#bar").node();
//     var layout = {
//       title: "Top 10 Bacteria Cultures Found"
//         };

//     Plotly.newPlot(BAR, data, layout);

// }


function buildDropDown(samples){
    var select = d3.select("#selDataset");
    select.html("")
    // //remove any children from the list -CLEAR old data
    // dateInfo.html("");
    samples.forEach(sample => {
        select.append("option").property("value",sample).text(sample);  
    });}

d3.selectAll("body").on("change", makeBar);

function makeBar(){
    var dropdownMenu = d3.select("#selDataset");
    var sampleID = dropdownMenu.node().value;

    var BAR = d3.selectAll("#bar").node();
    console.log(sampleID);

    var x = [];  //samples.otu_ids  slice(0,10)  with === sampleID 
    var y = [];  //samples.out_values slice(0,10) with === sampleID
//UPDATE plot here when change occurs
        // Plotly.restyle(CHART, "x", [x]);
        // Plotly.restyle(CHART, "y", [y]);

    
    // not working var testing = test.filter(row =>row.id === sampleID)[0].otu_ids;

    // // Integer to string? Still doesn't work
    // var stringNum = sampleID.toString()
    // console.log(stringNum);

    console.log(samples);




       


};

// init ();