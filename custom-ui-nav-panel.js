// ==UserScript==
// @name     Custom UI Navigation Panel
// @version  1
// @grant    none
// ==/UserScript==

var forbiddenMeals = [
  "Gegrilltes Hähnchenbrustfilet \"California Style\"",
  "Edles Festtagstöpfchen",
  "Käsespätzle \"Allgäuer Art\"- Vegetarisch",
  "Shrimps",
  "Wildlachs",
  "Sahnesoße",
  "Köttbullar",
  "Sauerkraut",
  "Speck",
  "Seelachs",
  "Kartoffelsuppe \"Norddeutsche Art\"",
  "Kohlrouladen",
  "Käsesoße",
  "Frischkäse",
  "Hollandaise",
  "Königsberger Klopse",
  "Gransole Limone Basilico - Vegetarisch",
  "Kabeljau",
  "Vit-Schnitzel-Vegetarisch",
  "Champignons",
  "Spinat",
  "Nudelauflauf",
  "Rinderleber",
  "fischfile",
  "Hirtenkäse",
  "Sauerrahm",
  "Herzhafter Linseneintopf",
  "Chili-Käse-Bällchen",
  "Kräuterdip",
  "Sauerbraten",
  "Käsespätzle",
  "Scholle",
  "Pecorino-Käse",
  "Erbseneintopf",
  "Schinken",
  "Blumenkohl",
  "Riesen-Rostbratwurst",
  "Hähnchen-Kebab",
  "Zartes Kalbsschnitzel paniert",
  "Hausgemachte Schnitzel-Taler",
  "Bami Goreng",
  "Käse-Schnitzel",
  "Rote Linsen-Curry",
  "Schweineschnitzel \"Mailänder Art\"",
  "Gransole Limone Basilico- Vegetarisch",
  "Champignon",
  "Hartkäse",
  "Röstzwiebeln",
  "Kokosnussmilch",
  "\"Vit\"-Schnitzel",
  "Hausmacher Bratwurst",
  "pilz",
  "Süßkartoffel-Curry-Vegan",
  "Süßer Apfelmilchreis",
  "Rinderhacksteak \"Rot-Weiß\"",
  "Garnele",
  "Feine Falafelbällchen- Vegan",
];
var badMeals = [
  "Erdnuss",
  "Bratreis Bowl - Vegan",
  "Kartoffelpuffer",
  "Hähnchenbrust \"Caprese\"",
  "Pesto",
  "Gefüllte Hefeklöße",
  "Bio Penne Caprese",
  "Zimt",
  "Hacksteak \"Gipfelstürmer\"",
  "Vanille",
];

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function markMeal(mealTitle, mealText, item, i, count) {
  //console.log("mealTitle:", mealTitle);
  if(forbiddenMeals.find(el => {
    return mealTitle.toLowerCase().includes(el.toLowerCase()) || mealText.toLowerCase().includes(el.toLowerCase());
  }) != undefined) {
    item.style.setProperty("background-color", "rgba(255,0,0,0.125)");
    item.style.setProperty("display", "none");
    //item.style.setProperty("max-height", "10px");
    //item.style.setProperty("height", "10px");
  } else if(badMeals.find(el => { return mealTitle.toLowerCase().includes(el.toLowerCase()) || mealText.toLowerCase().includes(el.toLowerCase()); }) != undefined) {
    item.style.setProperty("background-color", "rgba(255,255,0,0.125)");     
  } else {
   	item.style.setProperty("background-color", "rgba(0,255,0,0.125)");
  }
  // add index/count to each item:
  var labelItem = document.createElement('span');
  var isOneOfTheRarest = (i+1.0)/count > 0.75;
  labelItem.innerText = "["+(i+1)+"/"+count+"]"+(isOneOfTheRarest ? " !" : "");
  labelItem.style.setProperty("color", isOneOfTheRarest ? "red" : "inherit");
  item.prepend(labelItem);
}

function ExecExt2() {
  //console.log("ExecExt2-->");
  var items = document.querySelectorAll('.essensliste');
  // var nowIs = Date.now();
  //console.log("diff:", nowIs-window.lastTimeUpdated);
  if(/*nowIs-window.lastTimeUpdated >= 2000*/items.length != window.lastTimeUpdated2) {
    window.lastTimeUpdated2 = items.length;// nowIs;
    // console.log("lastItemsCount:", lastItemsCount);
    setTimeout(() => {
      var items = document.querySelectorAll('.essensliste');
      //console.log("items:", items);
      for(var i=0;i<items.length;i++) {
        //console.log("i:", i);
        var item = items[i];
        var title = item.querySelector('h3');
        //console.log("title:", title);
        var mealTitle = title.innerText;
        var mealText = title.nextElementSibling.innerText;
        //console.log("mealText:", mealText);
        markMeal(mealTitle, mealText, item, i, items.length);
      }
    }, 250);
  }
}

if(true || location.host == "vrg.system4food.de") {
   // ...:
  var css = '#outerContainer { margin: auto; }',
  head = document.head || document.getElementsById('head')[0],
  style = document.createElement('style');
  head.appendChild(style);
  style.type = 'text/css';
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  // get all meal-items and mark them:
  /*var ref = setInterval(() => {
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById("content");
    console.log("targetNode:", targetNode);
    if(targetNode != null) {
      // clear initial searcher:
     	clearInterval(ref);
      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true };
      
      window.lastTimeUpdated2 = 0;

      // Callback function to execute when mutations are observed
      const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "childList") {
            // console.log("A child node has been added or removed.");
            ExecExt2();
          } else if (mutation.type === "attributes") {
            // console.log(`The ${mutation.attributeName} attribute was modified.`);
            ExecExt2();
          }
        }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);
    }
  }, 250);*/
  ExecExt2();
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
