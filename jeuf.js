/*
NOM : Rizkallah
Prénom : Rouba

NOM : DIALLO 
Prénom : Abdoul Aziz

*/

function alea(min, max) {
  // [0;15[
  return Math.floor(Math.random() * (max - min) + min);
}

const POSITION_INITIALE = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
];

let randPosition = [];
function creationTuile(lst) {
  for (let i = 0; i <= 15; i++) {
    $("#puzzlearea").append(
      //'<div class="tuile"><div id="' + j + '"><p>' + j + "</p></div></div>"
      '<div class="tuile" id="tuile' + lst[i] + '"><p> ' + lst[i] + "</p></div>"
    );
  }
}

function chargementImage(lstPosition) {
  for (let i = 0; i <= 15; i++) {
    if (lstPosition[i] !== 15) {
      $("#tuile" + lstPosition[i] + "").css(
        "background-image",
        "url(/img/0" + lstPosition[i] + ".jpg"
      );
    }
  }
  console.log(lstPosition);
}

function creationRandomPosition() {
  let randomPosition = [];
  let e;

  for (let i = 0; i < 16; i++) {
    e = alea(0, 16);

    // Tant que e est dans la liste construite, on demende une autre valeur de alea

    while (randomPosition.indexOf(e) !== -1) {
      e = alea(0, 16);
    }
    randomPosition[i] = e;
  }
  return randomPosition;
}

// Cette fonction retourne les voisins accessibles de la cellules cliquées
// alealst : randPosition, crée globalement
// i : indice de la celulle cliquée dans le tableau randPosition
function voisinesAccessibles(alealst, i) {
  // equivaut à i in [5,6,9,10]
  if ([5, 6, 9, 10].indexOf(i) !== -1) {
    return [alealst[i - 1], alealst[i + 1], alealst[i - 4], alealst[i + 4]];
  } else if ([1, 2].indexOf(i) !== -1) {
    return [alealst[i - 1], alealst[i + 1], alealst[i + 4]];
  } else if ([4, 8].indexOf(i) !== -1) {
    return [alealst[i - 4], alealst[i + 4], alealst[i + 1]];
  } else if ([7, 11].indexOf(i) !== -1) {
    return [alealst[i - 4], alealst[i - 1], alealst[i + 4]];
  } else if ([13, 14].indexOf(i) !== -1) {
    return [alealst[i - 1], alealst[i + 1], alealst[i - 4]];
  } else if (i == 0) return [alealst[i + 1], alealst[i + 4]];
  else if (i == 3) return [alealst[i - 1], alealst[i + 4]];
  else if (i == 12) return [alealst[i - 4], alealst[i + 1]];
  else if (i == 15) return [alealst[i - 1], alealst[i - 4]];
}

// Cette fonction retourne True si la tuile vide se trouve parmis les voisins
// de la celulle cliquée
function yATelleTuileVide(vosinsA) {
  return vosinsA.indexOf(15) !== -1;
}
$(document).ready(function () {
  
  // Creation des tuiles avec une classe et un identifiant, et des paragraphes
  // avec du texte

  creationTuile(POSITION_INITIALE);

  chargementImage(POSITION_INITIALE);
});

// Shuffle sans avoir besoin d'utiliser remove()
$("#shuffle").click(function shuffle() {
  randPosition = creationRandomPosition();
  let valTuile;
  for (let i = 0; i <= 15; i++) {
    valTuile = randPosition[i];
    if (valTuile == 15) {
      $(".tuile:nth-child(" + (i + 1) + ")").css("background-image", "none");
      $(".tuile:nth-child(" + (i + 1) + ")").attr("id", "tuile15");
    } else {
      $(".tuile:nth-child(" + (i + 1) + ")").attr(
        "id",
        "tuile" + valTuile + ""
      );
      $(".tuile:nth-child(" + (i + 1) + ")").css(
        "background-image",
        "url(/img/0" + valTuile + ".jpg)"
      );
    }
    $(".tuile:nth-child(" + (i + 1) + ")")
      .find("p")
      .text(valTuile);
  }
  //console.log(randPosition);
  //$(".tuile").remove();
  //melangeTuile(randPosition);
  //chargementImage(randPosition);

 


  // En mettant cet evenement dans l'evènement de shuflle le swap a lieu
  // pour toutes les tuiles adjacentes excepté celle qu'on vient d'échanger
  $(".tuile").on('click',function check_and_swap() {
    function tableauCheck() {
      let tab = [];
      $(".tuile p").each(function () {
        let t = $(this).text();
        tab +=[" "] +[t];
      });
      return (tab.split(" ").slice(1,17));
    }
    var lf=tableauCheck();

    function Verif(){
      let d;
      let m=true;
      for(d=0;d<15;d++){
        if (POSITION_INITIALE[d]==lf[d]){
          continue;
        }
        else{
          m=false;
        }
      }
      if (m==true){
        $("#output").append(
          "Puzzle solved!!"
        );

      }
      return m;
    }
    
    if (Verif()==true){
      $(".tuile").off();
    }
        console.log(tableauCheck());
    //randPosition est une liste d'entier, c'est pourquoi on utilise parseInt()
    // pour convertir les '0', '1', '2', ... contenu dans les paragraphes des
    // tuiles
    let indexOfTuileClicked = randPosition.indexOf(
      parseInt($(this).children().text())
    );

    console.log(indexOfTuileClicked);
    let voisins = voisinesAccessibles(randPosition, indexOfTuileClicked);
    console.log(voisins);
    //console.log(yATelleTuileVide(voisins));
    console.log(randPosition);

    // Si Y a la tuile vide parmis ces voisins on procède au changement
    if (yATelleTuileVide(voisins)) {
      let indTuile15 = randPosition.indexOf(15);
      console.log("--------------");
      console.log(indexOfTuileClicked);
      console.log(indTuile15);
      shuffle_deux_divs(
        randPosition[indexOfTuileClicked],
        randPosition[indTuile15]
      );
      //console.log(indTuile15);
      // On stocke les tuiles dans des variables pour ne pas perdre leurs tâches
      //let self = $(this);
      //let tuile15 = $("#tuile15");

      // Echange des tuiles
      //$(this).replaceWith('<div class="tuile" id="tuile15"><p>15</p></div>');
      //tuile15.replaceWith(self);
      //console.log(self);
      //console.log(tuile15);
      //console.log(indexOfTuileClicked);
      //$("#tuile" + randPosition[indTuile15] + "").css(
      //  "background-image",
      //  "url(/img/0" + randPosition[indexOfTuileClicked] + ".jpg"
      //);

      // Echange des positions dans randPosition

      //console.log(randPosition);
      //$(".tuile").remove();
      //melangeTuile(randPosition);
      //chargementImage(randPosition);
      //$(this).attr("id", "tuile15");
      //$(this).css("background-image", "none");
      //$(this).find("p").text("15");
      //tuile15.attr("id", "tuile" + randPosition[indexOfTuileClicked] + "");
      //tuile15.attr();
      //tuile15.css(
      //  "background-image",
      //  "url(/img/0" + randPosition[indexOfTuileClicked] + ".jpg"
      //);
      //tuile15.find("p").text(randPosition[indexOfTuileClicked]);

      // Une fois que l'echange à lieu, on echange aussi leurs positions dans
      // randPosition
      let temp = randPosition[indTuile15];
      randPosition[indTuile15] = randPosition[indexOfTuileClicked];
      randPosition[indexOfTuileClicked] = temp;
    }
    //console.log($(this).next().attr("id"));
    //console.log($(this).prev().attr("id"));
  });
});

function shuffle_deux_divs(a, b) {
  $(document).ready(function () {
    div1 = $(`#tuile${a}`);
    div2 = $(`#tuile${b}`);
    tdiv1 = div1.clone();
    tdiv2 = div2.clone();
    div1.replaceWith(tdiv2);
    div2.replaceWith(tdiv1);
  });
}


