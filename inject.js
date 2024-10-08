// Based on https://stackoverflow.com/questions/31947386/how-to-override-navigator-plugins-in-javascript, 
// https://stackoverflow.com/questions/19191679/chrome-extension-inject-js-before-page-load, 
// and https://jsfiddle.net/wtdvfy3n/1/

// This script is injected into the page to override the navigator.plugins object
// and make it appear as if the "Shockwave Flash" plugin is installed, even if it is not.
// This is useful to disable the Ruffle plugin on Wayback Machine when scraping. 

(function () {
    // Create a dummy plugin object to mimic the "Shockwave Flash" plugin
    const pluginData = {
      name: "Shockwave Flash",
      filename: "fakeflash.dll",
      description: "Fake Shockwave Flash Plugin"
    };
  
    if (!navigator.plugins.namedItem("Shockwave Flash")) {
        console.log("Flash does not exist.");
    }

    // Define the navigator.plugins object
    Object.defineProperty(navigator, 'plugins', {
      writeable: true,
      configurable: true,
      enumerable: true,
      value: {
        length: pluginData.length,
        refresh: function () {
          return;
        },
        item: function (index) {
          return this[index];
        },
        namedItem: function (name) {
          return this[name];
        }
      }
    });

    // Define the navigator.plugins array
    // Object.defineProperty(navigator.plugins, '0', {
    //   writeable: true,
    //   configurable: true,
    //   enumerable: true,
    //   value: pluginData[0]
    // });

    // Enable namedItem lookups
    Object.defineProperty(navigator.plugins, 'Shockwave Flash', {
      writeable: true,
      configurable: true,
      enumerable: true,
      value: pluginData
    });
    
  })();
  

console.log("injected");
console.log((navigator.plugins.namedItem("Shockwave Flash")?.filename ?? "ruffle.js") !== "ruffle.js"); //should return true if the plugin is not ruffle.js

