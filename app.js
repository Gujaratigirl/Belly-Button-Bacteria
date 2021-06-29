// bring in data
d3.json("samples.json").then((data)=> {

    var samples = data.names;

    var otuID = data.samples.filter(row =>row.id === "940")[0].otu_ids;
    var otuValues = data.samples.filter(row =>row.id === "940")[0].sample_values;
    var otuLabels = data.samples.filter(row =>row.id === "940")[0].otu_labels;

    var otuName10 = otuID.slice(0,10);
    var otuValues10 = otuValues.slice(0,10);

    var newNames = otuName10.map(function(el){
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

    //Basic bubble
    var BUBBLE = d3.selectAll("#bubble").node();
    trace = [{
        x: otuID,
        y:otuValues,
        marker: {
            color: otuID,
            size: otuValues,
            //showscale=True
        },
        mode: 'markers',
        //text: otuLabels, 
    }]
    layout = {
        title: "Bacteria Cultures Per Sample",
        xaxis : {title: "OTU ID"}
        
    }
    Plotly.plot(BUBBLE,trace,layout)
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
    otuLabels = samples.filter(row =>row.id === sampleID)[0].otu_labels;
//Demographic chart
    d3.select('.panel-body').html('');
    Object.entries(demo).forEach(([key,val]) => { 
        d3.select('.panel-body').append('h5').text(key.toUpperCase() + ' : ' + val);});
    
//Update BAR    
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
//Update BUBBLE
    update = {
        x: sampleNames,
        y:otuValues,
    };
    Plotly.restyle(BUBBLE, update , [x , y]);
    });
};
