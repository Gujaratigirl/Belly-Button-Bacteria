// bring in data
d3.json("samples.json").then((data)=> {

    var samples = data.names;

    var testing = data.samples.filter(row =>row.id === "940")[0].otu_ids;
    var otuValues = data.samples.filter(row =>row.id === "940")[0].sample_values;

    var testing10 = testing.slice(0,10);
    var otuValues10 = otuValues.slice(0,10);

    var newNames = testing10.map(function(el){
        return 'OTU ' + el;
    });
    var reverseNames = newNames.reverse();
    var reverseOTU = otuValues10.reverse();
    console.log(newNames);


    d3.json("samples.json").then(({metadata, samples})=> {
        demo = metadata.filter(obj =>obj.id == 940)[0];
        sample = samples.filter(obj => obj.id == 940)[0];

        d3.select('.panel-body').html('');
        Object.entries(demo).forEach(([key,val]) => { 
            d3.select('.panel-body').append('h5').text(key.toUpperCase() + ' : ' + val);});

        console.log(demo, sample);
    });

    buildDropDown(samples);
//Build initial plot
    data = [{ 
        x: reverseOTU ,
        y: newNames,
        type: "bar" ,
        orientation: "h"}];

    var BAR = d3.selectAll("#bar").node();
    var layout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis : {title: "Value"},
      yaxis : {title: "OTU ID"}
        };

    Plotly.newPlot(BAR, data, layout);


    // Create a bubble chart that displays each sample.
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.
    //Basic bubble
    trace = [{
        x: otu_ids,
        y:otu_labels,
        marker: {
            color: otu_ids,
            size: samples_values,
        },
        mode: 'markers',
        text: otu_labels, 
    }]
    layout = {
        title: "",
        xaxis : {title: ""}
    }
    Plotly.plot("bubble",trace,layout)
});


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

//Make demographics update
    d3.json("samples.json").then(({metadata, samples})=> {
    demo = metadata.filter(obj =>obj.id == sampleID)[0];
    sampleNames = samples.filter(obj => obj.id == sampleID)[0].otu_ids;
    otuValues = samples.filter(obj => obj.id == sampleID)[0].sample_values;
//Demographic chart
    d3.select('.panel-body').html('');
    Object.entries(demo).forEach(([key,val]) => { 
        d3.select('.panel-body').append('h5').text(key.toUpperCase() + ' : ' + val);});
    
    var sampleName10 = sampleNames.slice(0,10);
    var otuValues10 = otuValues.slice(0,10);

    var newNames = sampleName10.map(function(el){
        return 'OTU ' + el;
    });
    var reverseNames = newNames.reverse();
    var reverseOTU = otuValues10.reverse();
    console.log(reverseNames); 

    var x = reverseOTU;  
    var y = reverseNames;  
    
        Plotly.restyle(BAR, "x", [x]);
        Plotly.restyle(BAR, "y", [y]);

    });
};
