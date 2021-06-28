// bring in data
d3.json("samples.json").then((data)=> {

var samples = data.names;
// console.log(samples);
var test = data.samples;
var filterTest = test.filter(row => row.id === "941")
console.log(filterTest); //This pulls data but I can't seem to do anything with it.

//Trying to figure out how to pull data!!!

// var x = filterTest.otu_ids.values;
//Different way   var x = object.value(filterTest.otu_ids);
// var y = filterTest.samples_values.values;
//console.log(x);
// console.log(y);


buildDropDown(samples);
});

function init() {
data = [{ 
    x: ["OTU 1167", " OTU 2859", "O482", "O2264", "O41", "O1189", "O352", "O189", "O2318", "O1977"],
    y: [163, 126, 113, 78, 71, 51, 50, 47, 40, 40],
    type: "bar" }];

    var BAR = d3.selectAll("#bar").node();
    var layout = {
      title: "Top 10 Bacteria Cultures Found"
        };

    Plotly.newPlot(BAR, data, layout);



    
}


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

    var x = [];  //samples.otu_ids  slice(0,10)
    var y = [];  //samples.out_values slice(0,10)
    
    // Integer to string? Still doesn't work
    var stringNum = sampleID.toString()
    console.log(stringNum);




       


};

init ();