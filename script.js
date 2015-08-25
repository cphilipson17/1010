
// Global variables
var loadPatternsToMenu;
var gridArray = [];
var blockPatterns = ["<div class='blockPattern'><div class='b1 block'></div></div>",
                     "<div class='blockPattern'><div class='b1 block'></div></div>",
                     "<div class='blockPattern'><div class='b1 block'></div></div>",
                     "<div class='blockPattern'><div class='b1 block'></div></div>"];
var blocksInMenu = 0;
var score = 0;


$(document).ready(function() {

  // Set up 2D gridArray of 100 spaces
  var i = 0;
  for (i=0;i<10;i++) {
    gridArray.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }

  // Create grid of divs within #grid-container
  // Assign corresponding array ID's to each .grid-space
  var row = 0;
  var col = 0;
  for (row=0;row<10;row++) {
    for (col=0;col<10;col++) {
      $(".grid-container").append("<div class='grid-space' id='gridArray[" + row + "][" + col + "]'></div>");
    }
  }

  // Populate menu with three more blockPatterns
  loadPatternsToMenu = function(){
    for (i=1; i<=3; i++) {
      $(".menuItem" + i + " .blockContainer").append(blockPatterns[Math.floor(Math.random() * 4)]);
      $(".menuItem" + i + " .blockContainer .blockPattern").fadeIn();
      blocksInMenu++;

      // Make bottom three object containers draggable
      $(".blockPattern").draggable();
    }
  };

  loadPatternsToMenu();

  console.log($(".blockPattern"))


  $(document).on("mouseup", ".blockPattern", function() {
      console.log("mouseup")

      // FIND OUT WHICH GRID SPACE DIV THE LEFT CORNER IS TOUCHING
      var displayStyle = $(this).css("display")
      var color = $(this).find(".block").css("backgroundColor")
      console.log(color)
      var offset = $(this).offset()
      $(this).css("display", "none")
      var topLeftDiv =  document.elementFromPoint(offset.left, offset.top);
      $(this).css("display", displayStyle)

      var r = (topLeftDiv.id).charAt(10)
      var c = (topLeftDiv.id).charAt(13)

      switch ($(this).children().attr('class')) {
        case "b1 block":
          score++;

          if (gridArray[r][c] === 0) {

            // Modify 2-D grid
            gridArray[r][c] = !gridArray[r][c];

            // Delete block Patterns, and fill corresponding grid spaces
            $(this).remove()
            console.log(topLeftDiv)
            $(topLeftDiv).css("background-color", color)
            $(topLeftDiv).css("border-color", color)

            // Check if any lines are full
            var isFull = {r: true, c: true}

            for (i=0;i<10;i++) {
              // Check for horizontal
              if (gridArray[r][i] === 0) {
                isFull.r = false
              }

              // Check for vertical
              if (gridArray[i][c] === 0) {
                isFull.c = false
              }
            }

            // Fill in any row or column that is full
            for (var key in isFull) {
              if (isFull[key]) {
                switch (key) {
                  case "r":
                    console.log("row is full")
                    for (i=0;i<10;i++) {
                      gridArray[r][i] = 0
                      $("#gridArray\\["+r+"\\]\\["+i+"\\]").css("backgroundColor", "#e8e8e8")
                      $("#gridArray\\["+r+"\\]\\["+i+"\\]").css("borderColor", "#e8e8e8")
                    }
                    break;
                  case "c":
                    for (i=0;i<10;i++) {
                      gridArray[i][c] = 0
                      $("#gridArray\\["+r+"\\]\\["+i+"\\]").css("backgroundColor", "#e8e8e8")
                      $("#gridArray\\["+r+"\\]\\["+i+"\\]").css("borderColor", "#e8e8e8")
                    }
                  break;
                }
              }
            }
          }
          break;

        case "b2 block":
          score = score + 2;
          break;
        case "b3 block":
          score = score + 2;
          break;
        case "b4 block":
          score = score + 4;

          break;
      }

      // Ensure that menu is always populated when empty
      blocksInMenu--;
      if(blocksInMenu === 0) {
        loadPatternsToMenu();
      }
  })

//   $(".blockPattern").on({
//     // Lighten the color of the cubes within
//     mouseenter: function(){
//     },
//     // Revert the color of the cubes back to default
//     mouseleave: function(){
//     },
//     // On "unclick," check if blockPattern is placed within grid
//     // If Yes, add corresponding score to score [DONE]
//     // If Yes, paint corresponding grid spaces correct color
//     // If Yes, empty full vertical or horizontal lines
//     // If Yes, check if menu is empty - if empty, call loadPatternsToMenu()
//     mouseup: function(){
//     }
//   });

});