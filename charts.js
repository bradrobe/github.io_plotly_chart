function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
      
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    //data.metadata
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    var metadata = metadataArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    //data.sort(function(a, b) {
      //return parseFloat(b.otu_ids) - parseFloat(a.otu_ids);
    //});

    var yticks = otu_ids.slice(0, 10).reverse();
    //data = data.reverse();

    // 8. Create the trace for the bar chart. 
    var barData = {
      x: sample_values.slice(0, 10).reverse(),//.map(row => row.sample_values),
      y:yticks, //data.map(row => row.otu_ids),
      text: otu_labels.slice(0, 10).reverse(),
      name: "OTU",
      type: "bar",
      orientation: "h"
    };
      
    
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("plot", barData, barLayout);
    var bubbleData = [{
      x: otu_ids,//.map(row => row.sample_values),
      y: sample_vaules, //data.map(row => row.otu_ids),
      text: otu_labels,
      mode: "markers",
      marker: {color: red,
      size: otu_ids
      //type: "bar",
      //orientation: "h"
  }}];


//}

// Bar and Bubble charts
// // Create the buildCharts function.
//function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
    

//     // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot("bar"); 

//     // 1. Create the trace for the bubble chart.
//     var bubbleData = [
   
//     ];

//     // 2. Create the layout for the bubble chart.
     var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: {t:0}, 
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      
     };

//     // 3. Use Plotly to plot the data with the layout.
     Plotly.newPlot('myDiv', bubbleData, bubbleLayout); 
   });


   
 }