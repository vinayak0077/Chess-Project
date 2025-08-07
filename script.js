var alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
var primary_clr = "#000000"
var secondary_clr = "#FFFFFF"
var highlight_clr = ""
var location_folder = "pieces_png";
var extension = "svg"
var theme_on = false;
// var location_folder = "Themes/theme1";
// var extension = "png";

var all_available_positions = [];

var positions_of_all_dark_pieces = [];
var positions_of_all_light_pieces = [];


var selected_piece = null;

var first_player_active = true;

var chess_piece_move_sound_element = document.getElementById("chess_piece_move_sound")
var game_end_sound_element = document.getElementById("game_end_sound")

const palettes = {
  "p1": { // Classic black & white
    primary_clr: "#000000",
    secondary_clr: "#FFFFFF",
    highlight_clr: "#8BC34A" // Fresh green
  },

  "p2": { // Wooden
    primary_clr: "#8B5A2B",
    secondary_clr: "#F6E2B3",
    highlight_clr: "#FFD54F" // Warm amber
  },

  "p3": { // Green felt
    primary_clr: "#116530",
    secondary_clr: "#E9EDCC",
    highlight_clr: "#81C784" // Soft mint green
  },

  "p4": { // Blue ice
    primary_clr: "#2B4F81",
    secondary_clr: "#DCE8F2",
    highlight_clr: "#4FC3F7" // Bright icy blue
  },

  "p5": { // Stone & sand
    primary_clr: "#5B5B5B",
    secondary_clr: "#F4E9D8",
    highlight_clr: "#FFD180" // Soft orange
  },

  "p6": { // Solarized
    primary_clr: "#586E75",
    secondary_clr: "#EEE8D5",
    highlight_clr: "#B3E5FC" // Pale cyan
  },

  "p7": { // Midnight neon
    primary_clr: "#1F1B24",
    secondary_clr: "#FFB300",
    highlight_clr: "#00E5FF" // Neon blue
  },

  "p8": { // Rose & ivory
    primary_clr: "#7B3F61",
    secondary_clr: "#FFF8F0",
    highlight_clr: "#F48FB1" // Soft rose
  },

  "p9": { // Slate & mint
    primary_clr: "#324B4C",
    secondary_clr: "#CDE6D0",
    highlight_clr: "#a5d6a7a3" // Calming green
  }
};

function show_all_themes(){
  const themesDir = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/Themes';
  console.log(themesDir)

  while(true){
    let i = 1;

    let imgSrc = themesDir + `/theme${i}` + "theme_sample_image.png";
    img_element = `<div class="theme_select_option"><img src="${imgSrc}"></div>`
    if (img_element){
      console.log(document.querySelector(`.theme_select`)[0])
      // appendChild(`<div class="theme_select_option"><img src="${imgSrc}"></div>`) 
    }
    else{
      break;
    }
    i = i+1;
  }

  
}



function setChessPattern(){

    let first_clr = "";
    let second_clr = "";
    if (theme_on){
      first_clr = "Themes/theme1/light_background_block.png";
      second_clr = "Themes/theme1/dark_background_block.png";

      alphabets.forEach(e => {
        for (let i=1; i<=8; i++){

            if (i % 2 != 0){
                document.querySelector(`#board_btn_${e}${i}`).style.backgroundImage = `url("${first_clr}")`;
            }
            else{
                document.querySelector(`#board_btn_${e}${i}`).style.backgroundImage = `url("${second_clr}")`;
            }
            if (i % 8 == 0){
                let temp = first_clr;
                first_clr = second_clr;
                second_clr = temp;
            }

            if (document.querySelector(`#board_btn_${e}${i}`).classList.contains("highlight_block_class")){
              document.querySelector(`#board_btn_${e}${i}`).classList.remove("highlight_block_class")
            }
            if (document.querySelector(`#board_btn_${e}${i}`).classList.contains("possible_elimination_highlight_block_class")){
              document.querySelector(`#board_btn_${e}${i}`).classList.remove("possible_elimination_highlight_block_class")
            }
            if (document.querySelector(`#board_btn_${e}${i}`).classList.contains("disabled_btn_effect")){
              document.querySelector(`#board_btn_${e}${i}`).classList.remove("disabled_btn_effect")
            }

        }
    });
    }
    else{

      let pNo = "p9"
  
      first_clr = palettes[pNo]["primary_clr"];
      second_clr = palettes[pNo]["secondary_clr"];
      highlight_clr = palettes[pNo]["highlight_clr"];

      alphabets.forEach(e => {
        for (let i=1; i<=8; i++){

            if (i % 2 != 0){
                document.querySelector(`#board_btn_${e}${i}`).style.background = first_clr;
            }
            else{
                document.querySelector(`#board_btn_${e}${i}`).style.background = second_clr;
            }
            if (i % 8 == 0){
                let temp = first_clr;
                first_clr = second_clr;
                second_clr = temp;
            }

            if (document.querySelector(`#board_btn_${e}${i}`).classList.contains("highlight_block_class")){
              document.querySelector(`#board_btn_${e}${i}`).classList.remove("highlight_block_class")
            }
            if (document.querySelector(`#board_btn_${e}${i}`).classList.contains("possible_elimination_highlight_block_class")){
              document.querySelector(`#board_btn_${e}${i}`).classList.remove("possible_elimination_highlight_block_class")
            }
            if (document.querySelector(`#board_btn_${e}${i}`).classList.contains("disabled_btn_effect")){
              document.querySelector(`#board_btn_${e}${i}`).classList.remove("disabled_btn_effect")
            }

        }
    });
      
    }
     
    

    // document.getElementById("board_btn_a2").style.backgroundImage = 'url("cropped.jpg")';
}
// setChessPattern()

function fill_all_available_postions_list(){
  alphabets.forEach(e => {
    for (let i=1; i<=8; i++){
      all_available_positions.push(e + i);
    }
  })
}
// fill_all_available_postions_list()

function remove_onerror(){
  positions_of_all_light_pieces.forEach(arr => {
    img_element = document.querySelector(`#board_btn_${arr[0]} img`);
    img_element.removeAttribute("onerror");
    img_element.style.visibility = "visible";
  })

  positions_of_all_dark_pieces.forEach(arr => {
    img_element = document.querySelector(`#board_btn_${arr[0]} img`);
    img_element.removeAttribute("onerror");
    img_element.style.visibility = "visible";
  })

}

function arrange_pieces(){

  // let location_folder = "pieces_png";
  // let extension = "svg"

    // pawn pieces
    alphabets.forEach(e => {
        // for light colour pieces
        let btn_img_element = document.querySelector(`#board_btn_${e}2 img`);
        btn_img_element.setAttribute("src", `${location_folder}/pawn-w.${extension}`);
        positions_of_all_light_pieces.push([
          document.querySelector(`#board_btn_${e}2`).getAttribute("btn_name"),
          "pawn"
        ])

        // for dark colour pieces
        let btn_img_element_ = document.querySelector(`#board_btn_${e}7 img`);
        btn_img_element_.setAttribute("src", `${location_folder}/pawn-b.${extension}`);
        positions_of_all_dark_pieces.push([
          document.querySelector(`#board_btn_${e}7`).getAttribute("btn_name"), 
          "pawn"
        ])
            
    });

    //rook pieces
    document.querySelector(`#board_btn_a1 img`).setAttribute("src", `${location_folder}/rook-w.${extension}`);
    document.querySelector(`#board_btn_h1 img`).setAttribute("src", `${location_folder}/rook-w.${extension}`);

    document.querySelector(`#board_btn_a8 img`).setAttribute("src", `${location_folder}/rook-b.${extension}`);
    document.querySelector(`#board_btn_h8 img`).setAttribute("src", `${location_folder}/rook-b.${extension}`);

    positions_of_all_light_pieces.push([document.querySelector(`#board_btn_a1`).getAttribute("btn_name"), "rook"]);
    positions_of_all_light_pieces.push([document.querySelector(`#board_btn_h1`).getAttribute("btn_name"), "rook"]);
    positions_of_all_dark_pieces.push([document.querySelector(`#board_btn_a8`).getAttribute("btn_name"), "rook"]);
    positions_of_all_dark_pieces.push([document.querySelector(`#board_btn_h8`).getAttribute("btn_name"), "rook"]);


    //knight pieces
    document.querySelector(`#board_btn_b1 img`).setAttribute("src", `${location_folder}/knight-w.${extension}`);
    document.querySelector(`#board_btn_g1 img`).setAttribute("src", `${location_folder}/knight-w.${extension}`);

    document.querySelector(`#board_btn_b8 img`).setAttribute("src", `${location_folder}/knight-b.${extension}`);
    document.querySelector(`#board_btn_g8 img`).setAttribute("src", `${location_folder}/knight-b.${extension}`);

    positions_of_all_light_pieces.push([document.querySelector(`#board_btn_b1`).getAttribute("btn_name"), "knight"]);
    positions_of_all_light_pieces.push([document.querySelector(`#board_btn_g1`).getAttribute("btn_name"), "knight"]);
    positions_of_all_dark_pieces.push([document.querySelector(`#board_btn_b8`).getAttribute("btn_name"), "knight"]);
    positions_of_all_dark_pieces.push([document.querySelector(`#board_btn_g8`).getAttribute("btn_name"), "knight"]);


    //bishop pieces
    document.querySelector(`#board_btn_c1 img`).setAttribute("src", `${location_folder}/bishop-w.${extension}`);
    document.querySelector(`#board_btn_f1 img`).setAttribute("src", `${location_folder}/bishop-w.${extension}`);

    document.querySelector(`#board_btn_c8 img`).setAttribute("src", `${location_folder}/bishop-b.${extension}`);
    document.querySelector(`#board_btn_f8 img`).setAttribute("src", `${location_folder}/bishop-b.${extension}`);

    positions_of_all_light_pieces.push([document.querySelector(`#board_btn_c1`).getAttribute("btn_name"), "bishop"]);
    positions_of_all_light_pieces.push([document.querySelector(`#board_btn_f1`).getAttribute("btn_name"), "bishop"]);
    positions_of_all_dark_pieces.push([document.querySelector(`#board_btn_c8`).getAttribute("btn_name"), "bishop"]);
    positions_of_all_dark_pieces.push([document.querySelector(`#board_btn_f8`).getAttribute("btn_name"), "bishop"]);

    //king pieces
    document.querySelector(`#board_btn_e1 img`).setAttribute("src", `${location_folder}/king-w.${extension}`);

    document.querySelector(`#board_btn_e8 img`).setAttribute("src", `${location_folder}/king-b.${extension}`);

    positions_of_all_light_pieces.push([document.querySelector(`#board_btn_e1`).getAttribute("btn_name"), "king"]);
    positions_of_all_dark_pieces.push([document.querySelector(`#board_btn_e8`).getAttribute("btn_name"), "king"]);

    //queen pieces
    document.querySelector(`#board_btn_d1 img`).setAttribute("src", `${location_folder}/queen-w.${extension}`);

    document.querySelector(`#board_btn_d8 img`).setAttribute("src", `${location_folder}/queen-b.${extension}`);

    positions_of_all_light_pieces.push([document.querySelector(`#board_btn_d1`).getAttribute("btn_name"), "queen"]);
    positions_of_all_dark_pieces.push([document.querySelector(`#board_btn_d8`).getAttribute("btn_name"), "queen"]);

    
}
// arrange_pieces()

function resetting_onclicks(){
  positions_of_all_dark_pieces.forEach(arr => {
    btn_element = document.querySelector(`#board_btn_${arr[0]}`);
    btn_element.setAttribute("onclick", `${arr[1]}_btn(this)`); //pawn_btn, rook_btn etc
  });

  positions_of_all_light_pieces.forEach(arr => {
    btn_element = document.querySelector(`#board_btn_${arr[0]}`);
    btn_element.setAttribute("onclick", `${arr[1]}_btn(this)`); //pawn_btn, rook_btn etc
  });
}

function disable_all_btns(){
  alphabets.forEach(e => {
    for (let i=1; i<=8; i++){
      document.querySelector(`#board_btn_${e}${i}`).disabled = true;
    }
  })
}
disable_all_btns()

function setting_initial_onclick(){

    alphabets.forEach(e => {
    for (let i=1; i<=8; i++){
      document.querySelector(`#board_btn_${e}${i}`).setAttribute("onclick", "empty_btn(this)");
    }
  })

  // pawn pieces
  alphabets.forEach(e => {
    // for light colour pieces
    let btn_element = document.querySelector(`#board_btn_${e}2`);
    btn_element.setAttribute("onclick", "pawn_btn(this)");
    btn_element.disabled = false;

    // for dark colour pieces
    let btn_element_ = document.querySelector(`#board_btn_${e}7`);
    btn_element_.setAttribute("onclick", "pawn_btn(this)");
    btn_element_.disabled = false;

  });


  //rook pieces
  document.querySelector(`#board_btn_a1`).setAttribute("onclick", "rook_btn(this)");
  document.querySelector(`#board_btn_h1`).setAttribute("onclick", "rook_btn(this)");
  document.querySelector(`#board_btn_a1`).disabled = false;
  document.querySelector(`#board_btn_h1`).disabled = false;

  document.querySelector(`#board_btn_a8`).setAttribute("onclick", "rook_btn(this)");
  document.querySelector(`#board_btn_h8`).setAttribute("onclick", "rook_btn(this)");
  document.querySelector(`#board_btn_a8`).disabled = false;
  document.querySelector(`#board_btn_h8`).disabled = false;


  //knight pieces
  document.querySelector(`#board_btn_b1`).setAttribute("onclick", "knight_btn(this)");
  document.querySelector(`#board_btn_g1`).setAttribute("onclick", "knight_btn(this)");
  document.querySelector(`#board_btn_b1`).disabled = false;
  document.querySelector(`#board_btn_g1`).disabled = false;

  document.querySelector(`#board_btn_b8`).setAttribute("onclick", "knight_btn(this)");
  document.querySelector(`#board_btn_g8`).setAttribute("onclick", "knight_btn(this)");
  document.querySelector(`#board_btn_b8`).disabled = false;
  document.querySelector(`#board_btn_g8`).disabled = false;


  //bishop pieces
  document.querySelector(`#board_btn_c1`).setAttribute("onclick", "bishop_btn(this)")
  document.querySelector(`#board_btn_f1`).setAttribute("onclick", "bishop_btn(this)")
  document.querySelector(`#board_btn_c1`).disabled = false;
  document.querySelector(`#board_btn_f1`).disabled = false;

  document.querySelector(`#board_btn_c8`).setAttribute("onclick", "bishop_btn(this)")
  document.querySelector(`#board_btn_f8`).setAttribute("onclick", "bishop_btn(this)")
  document.querySelector(`#board_btn_c8`).disabled = false;
  document.querySelector(`#board_btn_f8`).disabled = false;

  //king pieces
  document.querySelector(`#board_btn_e1`).setAttribute("onclick", "king_btn(this)")
  document.querySelector(`#board_btn_e1`).disabled = false;

  document.querySelector(`#board_btn_e8`).setAttribute("onclick", "king_btn(this)")
  document.querySelector(`#board_btn_e8`).disabled = false;


  //queen pieces
  document.querySelector(`#board_btn_d1`).setAttribute("onclick", "queen_btn(this)")
  document.querySelector(`#board_btn_d1`).disabled = false;

  document.querySelector(`#board_btn_d8`).setAttribute("onclick", "queen_btn(this)")
  document.querySelector(`#board_btn_d8`).disabled = false;

}
// setting_initial_onclick();

function disable_dark_positions(){
  positions_of_all_dark_pieces.forEach(arr => {
    document.querySelector(`#board_btn_${arr[0]}`).disabled = true;
  })
}
// disable_dark_positions();

function find_piece_clr(btn){
  // 1 - light piece
  // 0 - dark piece
  if (positions_of_all_light_pieces.some(arr => arr[0] === btn.getAttribute("btn_name"))){
    return 1;
  }
  else if (positions_of_all_dark_pieces.some(arr => arr[0] === btn.getAttribute("btn_name"))){
    return 0;
  }
  else{
    return 2;
  }
}

function end_game(){

  alphabets.forEach(e => {
    for (let i=1; i<=8; i++){
      document.querySelector(`#board_btn_${e}${i}`).classList.add("disabled_btn_effect")
    }
  })

  disable_all_btns();
  game_end_sound_element.play()
}

function highlight_given_btns(highlighting_list){
  let possible_elimination_positions = [];

  highlighting_list.forEach(position => {

    if (first_player_active){
      if (positions_of_all_dark_pieces.some(arr => arr[0] === position) && !possible_elimination_positions.includes(position)){
        possible_elimination_positions.push(position)
      }
    }
    else{ // first player not active
      if (positions_of_all_light_pieces.some(arr => arr[0] === position) && !possible_elimination_positions.includes(position)){
        possible_elimination_positions.push(position)
      }
    }
  })

  highlighting_list.forEach(e => {
    document.querySelector(`#board_btn_${e}`).classList.add("highlight_block_class")
  })

  possible_elimination_positions.forEach(e => {
    document.querySelector(`#board_btn_${e}`).classList.add("possible_elimination_highlight_block_class")
  })
}

function able_highlighted_given_btns(highlighting_list){

  let possible_elimination_positions = [];

  highlighting_list.forEach(position => {

    if (first_player_active){
      if (positions_of_all_dark_pieces.some(arr => arr[0] === position) && !possible_elimination_positions.includes(position)){
        possible_elimination_positions.push(position)
      }
    }
    else{ // first player not active
      if (positions_of_all_light_pieces.some(arr => arr[0] === position) && !possible_elimination_positions.includes(position)){
        possible_elimination_positions.push(position)
      }
    }
    document.querySelector(`#board_btn_${position}`).disabled = false;
  })

  possible_elimination_positions.forEach(position => {
    btn_element = document.querySelector(`#board_btn_${position}`);
    btn_element.setAttribute("onclick", "empty_btn(this)")
  });

  // console.log("highlighting_list: ", highlighting_list)
  // console.log("possible_elimination_positions: ", possible_elimination_positions)

}

function disable_non_active_player(){

  first_player_active = !first_player_active;

  // console.log(first_player_active)

  if (first_player_active){
    positions_of_all_light_pieces.forEach(arr => {
      document.querySelector(`#board_btn_${arr[0]}`).disabled = false;
      // console.log("currently active white pieces: ", document.querySelector(`#board_btn_${arr[0]}`).getAttribute("btn_name"));
    });

    positions_of_all_dark_pieces.forEach(arr => {
      document.querySelector(`#board_btn_${arr[0]}`).disabled = true;
      // console.log("currently unactive dark pieces: ", document.querySelector(`#board_btn_${arr[0]}`).getAttribute("btn_name"));
    });
  }

  else{ // first player not active
    positions_of_all_light_pieces.forEach(arr => {
      document.querySelector(`#board_btn_${arr[0]}`).disabled = true;
    });

    positions_of_all_dark_pieces.forEach(arr => {
      document.querySelector(`#board_btn_${arr[0]}`).disabled = false;
    });
  }

}

function handling_piece_elimination(from_moved_to, piece_moved_to){

}

function replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, piece_type = null){

  resetting_onclicks()

  chess_piece_move_sound_element.play()
  console.log("played")

  if (piece_moved_to.getAttribute("onclick") == "king_btn(this)"){
    end_game();
  }

  let new_from_moved_to_src = "";

  if(positions_of_all_light_pieces.some(arr => arr[0] == from_moved_to.getAttribute("btn_name"))){
    // console.log("from moved to piece is: light")
    targeted_position_array_from_positions_array = positions_of_all_light_pieces.find(arr => arr[0] === from_moved_to.getAttribute("btn_name"));
    
    positions_of_all_light_pieces.splice(positions_of_all_light_pieces.indexOf(targeted_position_array_from_positions_array), 1);
    positions_of_all_light_pieces.push([piece_moved_to.getAttribute("btn_name"), piece_type])

    if (document.querySelector(`#${piece_moved_to.getAttribute("id")} img`).getAttribute("src") != ""){
      dark_position_array_to_remove = positions_of_all_dark_pieces.find(arr => arr[0] === piece_moved_to.getAttribute("btn_name")); 
      // console.log("removing black piece position: ", dark_position_array_to_remove, document.querySelector(`#${piece_moved_to.getAttribute("id")} img`).getAttribute("src"))
      positions_of_all_dark_pieces.splice(positions_of_all_dark_pieces.indexOf(dark_position_array_to_remove), 1);
    }

  }

  if(positions_of_all_dark_pieces.some(arr => arr[0] == from_moved_to.getAttribute("btn_name"))){
    // console.log("from moved to piece is: dark")
    targeted_position_array_from_positions_array = positions_of_all_dark_pieces.find(arr => arr[0] === from_moved_to.getAttribute("btn_name"));
    
    positions_of_all_dark_pieces.splice(positions_of_all_dark_pieces.indexOf(targeted_position_array_from_positions_array), 1);
    positions_of_all_dark_pieces.push([piece_moved_to.getAttribute("btn_name"), piece_type])


    if (document.querySelector(`#${piece_moved_to.getAttribute("id")} img`).getAttribute("src") != ""){
      light_position_array_to_remove = positions_of_all_light_pieces.find(arr => arr[0] === piece_moved_to.getAttribute("btn_name"));
      console.log("removing light piece position: ", light_position_array_to_remove) 
      positions_of_all_light_pieces.splice(positions_of_all_light_pieces.indexOf(light_position_array_to_remove), 1);
    }
  }

    let new_piece_moved_to_src = document.querySelector(`#${from_moved_to.getAttribute("id")} img`).getAttribute("src");

    document.querySelector(`#${from_moved_to.getAttribute("id")} img`).setAttribute("src", new_from_moved_to_src);
    document.querySelector(`#${piece_moved_to.getAttribute("id")} img`).setAttribute("src", new_piece_moved_to_src);


    document.querySelector(`#${from_moved_to.getAttribute("id")} img`).style.visibility = "hidden";
    document.querySelector(`#${piece_moved_to.getAttribute("id")} img`).style.visibility = "visible";

    from_moved_to.disabled = true;

    let new_from_moved_to_onclick = "empty_btn(this)";
    let new_piece_moved_to_onclick = from_moved_to.getAttribute("onclick");
    from_moved_to.setAttribute("onclick", new_from_moved_to_onclick);
    piece_moved_to.setAttribute("onclick", new_piece_moved_to_onclick);

    // console.log("from moved_to: ", from_moved_to)
    // console.log("piece_moved_to :", piece_moved_to)
    // console.log("end of replace fn: ")
    // console.log("light: ", positions_of_all_light_pieces)
    // console.log("dark: ", positions_of_all_dark_pieces)


    disable_non_active_player()
}

function empty_btn(btn){

  // console.log("entered empty btn")
  // console.log(selected_piece)

  if (selected_piece.getAttribute("onclick") == "pawn_btn(this)"){
    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "pawn"){
        pawn_btn(null, btn, selected_piece);
      }
    })
  
    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "pawn"){
        pawn_btn(null, btn, selected_piece);
      }
    })
  }


  if (selected_piece.getAttribute("onclick") == "knight_btn(this)"){
    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "knight"){
        knight_btn(null, btn, selected_piece);
      }
    })
  
    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "knight"){
        knight_btn(null, btn, selected_piece);
      }
    })
  }


  if (selected_piece.getAttribute("onclick") == "rook_btn(this)"){
    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "rook"){
        rook_btn(null, btn, selected_piece);
      }
    })
  
    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "rook"){
        rook_btn(null, btn, selected_piece);
      }
    })
  }


  if (selected_piece.getAttribute("onclick") == "bishop_btn(this)"){
    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "bishop"){
        bishop_btn(null, btn, selected_piece);
      }
    })
  
    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "bishop"){
        bishop_btn(null, btn, selected_piece);
      }
    })
  }


  if (selected_piece.getAttribute("onclick") == "queen_btn(this)"){
    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "queen"){
        queen_btn(null, btn, selected_piece);
      }
    })
  
    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "queen"){
        queen_btn(null, btn, selected_piece);
      }
    })
  }


  if (selected_piece.getAttribute("onclick") == "king_btn(this)"){
    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "king"){
        king_btn(null, btn, selected_piece);
      }
    })
  
    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == selected_piece.getAttribute("btn_name") && arr[1] == "king"){
        king_btn(null, btn, selected_piece);
      }
    })
  }

}

function pawn_btn(btn, piece_moved_to = null, from_moved_to = null){
  setChessPattern();
  // console.log("entered pawn btn");

  if (btn){

    if (first_player_active){

      let available_positions_to_move = [];
      let btn_name = btn.getAttribute("btn_name");
      
      if (parseInt(btn_name[1]) + 1 <= 8){
        available_positions_to_move.push(btn_name[0] + (parseInt(btn_name[1]) + 1))
        // console.log(available_positions_to_move); 
      }
    
      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);
    
      selected_piece = btn;
    }
    else{ // first player not active

      let available_positions_to_move = [];
      let btn_name = btn.getAttribute("btn_name");
      
      if (parseInt(btn_name[1]) - 1 >= 1){
        available_positions_to_move.push(btn_name[0] + (parseInt(btn_name[1]) - 1))
        console.log(available_positions_to_move); 
      }
    
      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);
    
      selected_piece = btn;

    }
  }
  else{

    // console.log("entered else of pawn")

    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "pawn"){
        // console.log("entered light condition of else of pawn")
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "pawn");
      }
    })

    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "pawn"){
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "pawn");
      }
    })
  }

}

//btn personalization pending..
function rook_btn(btn, piece_moved_to = null, from_moved_to = null){
  setChessPattern();
  console.log("entered rook btn");

  if (btn){

    let probable_positions_to_move = [];
    let available_positions_to_move = [];
    let btn_name = btn.getAttribute("btn_name");

    if (first_player_active){

      for (let i = parseInt(btn_name[1]) + 1; i<=8; i++){ // forward movement
        let probable_position = btn_name[0] + i;

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = parseInt(btn_name[1]) - 1; i>=1; i--){ // backward movement
        let probable_position = btn_name[0] + i;

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let a = alphabets.indexOf(btn_name[0]) + 1; a <= alphabets.length -1  ; a++){ // rightside movement
        let probable_position = alphabets[a] + btn_name[1];

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let a = alphabets.indexOf(btn_name[0]) - 1; a >= 0  ; a--){ // leftside movement
        let probable_position = alphabets[a] + btn_name[1];

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      console.log("from rook: ", available_positions_to_move)

      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);

      selected_piece = btn;
    }
    else{ // first player not active

      for (let i = parseInt(btn_name[1]) + 1; i<=8; i++){ // forward movement
        let probable_position = btn_name[0] + i;

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = parseInt(btn_name[1]) - 1; i>=1; i--){ // backward movement
        let probable_position = btn_name[0] + i;

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let a = alphabets.indexOf(btn_name[0]) + 1; a <= alphabets.length -1  ; a++){ // rightside movement
        let probable_position = alphabets[a] + btn_name[1];

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let a = alphabets.indexOf(btn_name[0]) - 1; a >= 0  ; a--){ // leftside movement
        let probable_position = alphabets[a] + btn_name[1];

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);

      selected_piece = btn;
    }
  }

  else{

    console.log("entered else of rook")

    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "rook"){
        console.log("entered light condition of else of knight")
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "rook");
      }
    })

    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "rook"){
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "rook");
      }
    })
  }

}

function knight_btn(btn, piece_moved_to = null, from_moved_to = null){
  setChessPattern();
  // console.log("entered knight btn");

  if (btn){

    let probable_positions_to_move = [];
    let available_positions_to_move = [];
    let btn_name = btn.getAttribute("btn_name");

    probable_positions_to_move.push((alphabets[alphabets.indexOf(btn_name[0]) + 1]) + (parseInt(btn_name[1]) + 2))
    probable_positions_to_move.push((alphabets[alphabets.indexOf(btn_name[0]) - 1]) + (parseInt(btn_name[1]) + 2))

    probable_positions_to_move.push((alphabets[alphabets.indexOf(btn_name[0]) + 2]) + (parseInt(btn_name[1]) + 1))
    probable_positions_to_move.push((alphabets[alphabets.indexOf(btn_name[0]) + 2]) + (parseInt(btn_name[1]) - 1))

    probable_positions_to_move.push((alphabets[alphabets.indexOf(btn_name[0]) + 1]) + (parseInt(btn_name[1]) - 2))
    probable_positions_to_move.push((alphabets[alphabets.indexOf(btn_name[0]) - 1]) + (parseInt(btn_name[1]) - 2))

    probable_positions_to_move.push((alphabets[alphabets.indexOf(btn_name[0]) - 2]) + (parseInt(btn_name[1]) + 1))
    probable_positions_to_move.push((alphabets[alphabets.indexOf(btn_name[0]) - 2]) + (parseInt(btn_name[1]) - 1))

    if (first_player_active){

      probable_positions_to_move.forEach(position => {
        if (all_available_positions.includes(position) && !positions_of_all_light_pieces.some(arr => arr[0] === position)){
          available_positions_to_move.push(position)
        }
      });

      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);

      selected_piece = btn;
    }
    else{ // first player not active
      probable_positions_to_move.forEach(position => {
        if (all_available_positions.includes(position) && !positions_of_all_dark_pieces.some(arr => arr[0] === position)){
          available_positions_to_move.push(position)
        }
      });
      // console.log(available_positions_to_move)

      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);

      selected_piece = btn;
    }
  }

  else{

    // console.log("entered else of knight")

    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "knight"){
        console.log("entered light condition of else of knight")
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "knight");
      }
    })

    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "knight"){
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "knight");
      }
    })
  }

}

function bishop_btn(btn, piece_moved_to = null, from_moved_to = null){
  setChessPattern();
  console.log("enter bishop btn");

  if (btn){

    let probable_positions_to_move = [];
    let available_positions_to_move = [];
    let btn_name = btn.getAttribute("btn_name");

    if (first_player_active){

      for (let i = 1; i<=8; i++){ // top right movement
        let probable_position = ( alphabets[alphabets.indexOf(btn_name[0]) + i]) + (parseInt(btn_name[1]) + i);
        console.log("bihsop's probable positions: ", probable_position)

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          console.log("not a white piece position")
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          console.log("yes a black position going to break after this")
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // top left
        let probable_position = ( alphabets[alphabets.indexOf(btn_name[0]) - i]) + (parseInt(btn_name[1]) + i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // bottom right
        let probable_position = ( alphabets[alphabets.indexOf(btn_name[0]) + i]) + (parseInt(btn_name[1]) - i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // bottom left
        let probable_position = ( alphabets[alphabets.indexOf(btn_name[0]) - i]) + (parseInt(btn_name[1]) - i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      console.log("from bishop: ", available_positions_to_move)

      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);

      selected_piece = btn;
    }
    else{ // first player not active

      for (let i = 1; i<=8; i++){ // top right movement
        let probable_position = (alphabets[alphabets.indexOf(btn_name[0]) + i]) + (parseInt(btn_name[1]) + i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // top left movement
        let probable_position = (alphabets[alphabets.indexOf(btn_name[0]) - i]) + (parseInt(btn_name[1]) + i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // bottom right
        let probable_position = (alphabets[alphabets.indexOf(btn_name[0]) + i]) + (parseInt(btn_name[1]) - i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // bottom left movement
        let probable_position = (alphabets[alphabets.indexOf(btn_name[0]) - i]) + (parseInt(btn_name[1]) - i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);

      selected_piece = btn;
    }
  }

  else{

    console.log("entered else bishop")

    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "bishop"){
        console.log("entered light condition of else of knight")
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "bishop");
      }
    })

    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "bishop"){
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "bishop");
      }
    })
  }

}

// pending for queen
function queen_btn(btn, piece_moved_to = null, from_moved_to = null){
  setChessPattern();
  // console.log("enter queen btn");

  if (btn){

    let probable_positions_to_move = [];
    let available_positions_to_move = [];
    let btn_name = btn.getAttribute("btn_name");

    if (first_player_active){


      // ~~~ replicating bishop's movement ~~~
      for (let i = 1; i<=8; i++){ // top right movement
        let probable_position = ( alphabets[alphabets.indexOf(btn_name[0]) + i]) + (parseInt(btn_name[1]) + i);
        // console.log("queen's probable positions: ", probable_position)

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          // console.log("not a white piece position")
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          // console.log("yes a black position going to break after this")
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // top left
        let probable_position = ( alphabets[alphabets.indexOf(btn_name[0]) - i]) + (parseInt(btn_name[1]) + i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // bottom right
        let probable_position = ( alphabets[alphabets.indexOf(btn_name[0]) + i]) + (parseInt(btn_name[1]) - i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // bottom left
        let probable_position = ( alphabets[alphabets.indexOf(btn_name[0]) - i]) + (parseInt(btn_name[1]) - i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }


      // ~~~ replicating rook's movement ~~~
      for (let i = parseInt(btn_name[1]) + 1; i<=8; i++){ // forward movement
        let probable_position = btn_name[0] + i;

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          // console.log("black piece detected in queen's: ", probable_position)
          break;
        }
      }

      for (let i = parseInt(btn_name[1]) - 1; i>=1; i--){ // backward movement
        let probable_position = btn_name[0] + i;

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let a = alphabets.indexOf(btn_name[0]) + 1; a <= alphabets.length -1  ; a++){ // rightside movement
        let probable_position = alphabets[a] + btn_name[1];

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let a = alphabets.indexOf(btn_name[0]) - 1; a >= 0  ; a--){ // leftside movement
        let probable_position = alphabets[a] + btn_name[1];

        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      // console.log("from queen: ", available_positions_to_move)

      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);

      selected_piece = btn;
    }
    else{ // first player not active

      // ~~~ replicating bishop's movement ~~~
      for (let i = 1; i<=8; i++){ // top right movement
        let probable_position = (alphabets[alphabets.indexOf(btn_name[0]) + i]) + (parseInt(btn_name[1]) + i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // top left movement
        let probable_position = (alphabets[alphabets.indexOf(btn_name[0]) - i]) + (parseInt(btn_name[1]) + i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // bottom right
        let probable_position = (alphabets[alphabets.indexOf(btn_name[0]) + i]) + (parseInt(btn_name[1]) - i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = 1; i<=8; i++){ // bottom left movement
        let probable_position = (alphabets[alphabets.indexOf(btn_name[0]) - i]) + (parseInt(btn_name[1]) - i);

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }


      // ~~~ replicating rook's movement
      for (let i = parseInt(btn_name[1]) + 1; i<=8; i++){ // forward movement
        let probable_position = btn_name[0] + i;

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let i = parseInt(btn_name[1]) - 1; i>=1; i--){ // backward movement
        let probable_position = btn_name[0] + i;

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let a = alphabets.indexOf(btn_name[0]) + 1; a <= alphabets.length -1  ; a++){ // rightside movement
        let probable_position = alphabets[a] + btn_name[1];

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      for (let a = alphabets.indexOf(btn_name[0]) - 1; a >= 0  ; a--){ // leftside movement
        let probable_position = alphabets[a] + btn_name[1];

        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
        }
        if (positions_of_all_dark_pieces.some(arr => arr[0] === probable_position)){
          break;
        }
        if (positions_of_all_light_pieces.some(arr => arr[0] === probable_position)){
          available_positions_to_move.push(probable_position);
          break;
        }
      }

      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);

      selected_piece = btn;
    }
  }

  else{

    // console.log("entered else queen")

    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "queen"){
        // console.log("entered light condition of else of queen")
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "queen");
      }
    })

    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "queen"){
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "queen");
      }
    })
  }

}


function king_btn(btn, piece_moved_to = null, from_moved_to = null){
  setChessPattern();
  console.log("entered king btn");

  if (btn){

    let probable_positions_to_move = [];
    let available_positions_to_move = [];
    let btn_name = btn.getAttribute("btn_name");

    if (first_player_active){

      let alphabet_char_index = alphabets.indexOf(btn_name[0]);
      let position_index = parseInt(btn_name[1])

      probable_positions_to_move.push(alphabets[alphabet_char_index] + (position_index + 1)) //top
      probable_positions_to_move.push(alphabets[alphabet_char_index + 1] + (position_index)) //right
      probable_positions_to_move.push(alphabets[alphabet_char_index - 1] + (position_index)) //left
      probable_positions_to_move.push(alphabets[alphabet_char_index] + (position_index -1)) //bottom
      probable_positions_to_move.push(alphabets[alphabet_char_index + 1] + (position_index + 1)) //top right
      probable_positions_to_move.push(alphabets[alphabet_char_index - 1] + (position_index + 1)) //top left
      probable_positions_to_move.push(alphabets[alphabet_char_index + 1] + (position_index - 1)) //bottom right
      probable_positions_to_move.push(alphabets[alphabet_char_index - 1] + (position_index - 1)) //bottom left

      probable_positions_to_move.forEach(probable_position => {
        if (all_available_positions.includes(probable_position) && !positions_of_all_light_pieces.some(arr => arr[0] === probable_position) && !available_positions_to_move.includes(probable_position)){
          available_positions_to_move.push(probable_position)
        }
      })

      console.log("from king: ", available_positions_to_move)

      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);

      selected_piece = btn;
    }
    else{ // first player not active

      probable_positions_to_move.push(alphabets[alphabet_char_index] + (position_index + 1)) //top
      probable_positions_to_move.push(alphabets[alphabet_char_index +1] + (position_index)) //right
      probable_positions_to_move.push(alphabets[alphabet_char_index -1] + (position_index)) //left
      probable_positions_to_move.push(alphabets[alphabet_char_index] + (position_index -1)) //bottom
      probable_positions_to_move.push(alphabets[alphabet_char_index + 1] + (position_index + 1)) //top right
      probable_positions_to_move.push(alphabets[alphabet_char_index - 1] + (position_index + 1)) //top left
      probable_positions_to_move.push(alphabets[alphabet_char_index + 1] + (position_index - 1)) //bottom right
      probable_positions_to_move.push(alphabets[alphabet_char_index - 1] + (position_index - 1)) //bottom left

      probable_positions_to_move.forEach(probable_position => {
        if (all_available_positions.includes(probable_position) && !positions_of_all_dark_pieces.some(arr => arr[0] === probable_position) && !available_positions_to_move.includes(probable_position)){
          available_positions_to_move.push(probable_position)
        }
      })

      highlight_given_btns(available_positions_to_move);
      able_highlighted_given_btns(available_positions_to_move);

      selected_piece = btn;
    }
  }

  else{

    console.log("entered else of king")

    positions_of_all_light_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "king"){
        console.log("entered light condition of else of king")
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "king");
      }
    })

    positions_of_all_dark_pieces.forEach(arr => {
      if (arr[0] == from_moved_to.getAttribute("btn_name") && arr[1] == "king"){
        replace_images_on_move_done_and_handling(from_moved_to, piece_moved_to, "king");
      }
    })
  }

}

// arrange_pieces();
// document.getElementById("board_btn_a2").style.backgroundImage = url("pieces_png/rook-w.svg")

document.addEventListener("DOMContentLoaded", () => {
  setChessPattern();
  fill_all_available_postions_list();
  arrange_pieces();
  setting_initial_onclick();
  disable_dark_positions();
  remove_onerror();
  // show_all_themes();
});
