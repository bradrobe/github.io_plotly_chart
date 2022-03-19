// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    var metadata = metadataArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;

    // 3. Create a variable that holds the washing frequency.
    d3.json("samples.json").then(function(data){
      wfreq = data.metadata.map(person => person.wfreq);
      console.log(wfreq);
  

    // Create the yticks for the bar chart.
      var yticks = otu_ids.slice(0, 10).reverse();

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("plot", barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot('myDiv', bubbleData, bubbleLayout);
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      x: otu_ids,//.map(row => row.sample_values),
      y: sample_vaules, //data.map(row => row.otu_ids),
      text: otu_labels,
      mode: "markers",
      marker: {color: red,
      size: otu_ids    
     
      }}];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      domain: { x: [0, 1], y: [0, 1] },
      value: 270,
      title: { text: "Speed" },
      type: "indicator",
      mode: "gauge+number"
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('myDiv', gaugeData, gaugeLayout);
  });
}
