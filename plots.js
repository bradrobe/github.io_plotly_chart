function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  // The below function is called when a change takes place in the 
  // dropdown menu in the browser, e.g., a user selects a menu option.
  // The value of the menu option is passed in as the function’s argument.

  // This function is called when a change takes place in the dropdown menu 
  // in the browser, e.g., a user selects a menu option. The value of 
  // the menu option is passed in as the function’s argument.
  function optionChanged(newSample) {
    console.log(newSample);
  }  

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }
  
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        
        PANEL.append("h6").text(`${key}:${value}`);
    });
  });
}





//   // Demographics Panel
// function buildMetadata(sample) {
//    d3.json("samples.json").then((data) => {
//      var metadata = data.metadata;
//      // Filter the data for the object with the desired sample number
//      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//      var result = resultArray[0];
//      // Use d3 to select the panel with id of #sample-metadata
//      var PANEL = d3.select("#sample-metadata");
//      // Use `.html("") to clear any existing metadata
//      PANEL.html("");
//      // Use Object.entries to add each key and value pair to the panel
//      // Hint: Inside the loop, you will need to use d3 to append new
//      // tags for each key-value in the metadata.
//      Object.entries(result).forEach(([key, value]) => {
//        PANEL.append("h6").text(${key.toUpperCase()}: ${value});
//      });
//    });
//   }
