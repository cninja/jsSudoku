
function create(tag){ return document.createElement(tag);}
function eId(id){ return document.getElementById(id);}
function buildBoard(e, doClear){
    if(doClear){
        e.innerHTML = '';
    }


    var t = create('table');
    t.className = 'sudoku';
    for(var x = 0; x < 9; x++){
        var tr = create('tr')
        for(var y = 0; y < 9; y++){
           var td = create('td');
            var input = create('input')
            input.style.width = '15px';
            td.appendChild(input);
            tr.appendChild(td);
        }
        t.appendChild(tr);
    }
    e.appendChild(t);
}
function readBoard(e){
    var inputs = e.getElementsByTagName('input');
    return [].map.call(inputs, function(input){return parseInt(input.value) || 0});
}
function printBoard(e, b, doClear){
    if(doClear){
        e.innerHTML = '';
    }

    var t = create('table');
    t.className = 'sudoku';
    for(var x = 0; x < 9; x++){
        var tr = create('tr')
        for(var y = 0; y < 9; y++){
           var td = create('td');
            td.innerHTML = b[x*9 + y];
            tr.appendChild(td);
        }
        t.appendChild(tr);
    }
    e.appendChild(t);
}
function assoc(a, i, d){
    var ans = a.slice(0);
    ans[i] = d;
    return ans;
}

var posibleDigits = [1,2,3,4,5,6,7,8,9];
var rowValidIdxs = [];
var colValidIdxs = [];
var gridValidIdxs = [];

for(var i = 0; i < 81; i++){
   rowValidIdxs[i] = [];
   colValidIdxs[i] = [];
   gridValidIdxs[i] = [];

   for(var j = 0; j < 9; j++){
       var row = parseInt(i / 9);
       var col = i % 9;
       rowValidIdxs[i][j] = row * 9 + j;
       colValidIdxs[i][j] = col + j * 9;
       gridValidIdxs[i][j] = parseInt(row / 3) * 3 * 9 + j % 3 + parseInt(col / 3) * 3 + parseInt(j / 3) * 9;
   }
}


function isNotIn(b, idxs, d){
    return b[idxs[0]] != d &&
           b[idxs[1]] != d &&
           b[idxs[2]] != d &&
           b[idxs[3]] != d &&
           b[idxs[4]] != d &&
           b[idxs[5]] != d &&
           b[idxs[6]] != d &&
           b[idxs[7]] != d &&
           b[idxs[8]] != d;
}
function isValidGuess(b, i, d){
    return isNotIn(b, rowValidIdxs[i], d) &&
           isNotIn(b, colValidIdxs[i], d) &&
           isNotIn(b, gridValidIdxs[i], d);
}
function posabilitySpace(b){
    return b.map(function(cell, i){
        if(cell == 0){
            var validDigits = posibleDigits.filter(function(d){return isValidGuess(b, i, d)});
            if(validDigits.length == 0){
              throw {name:'Invalid board',idx:i};
            }else{
                return [i,validDigits];
            }
        }else{
            //Already determined
            return [i,[]];
        }
    }).filter(function(a){return a[1].length >0}).sort(function(a,b){return a[1].length - b[1].length;});
}

function solveStep(b){
    var idxGuesses = posabilitySpace(b);

    if(idxGuesses.length){
      var idx = idxGuesses[0][0];
      var guesses = idxGuesses[0][1];

      return guesses.reduce(function(ans, d){
        if(ans){
          return ans;
        }else{
          try{
            return solveStep(assoc(b, idx, d));
          }catch(e){
            return null;
          }
        }
      }, null);
    }
    return b;
}

function solve(fromE, toE){
  var board = readBoard(fromE)
  printBoard(toE, solveStep(board), true);
}
function clearBoard(e){
  buildBoard(e, true);
}
board = readBoard(eId('divEntry'))
guesses = orderedIndexesToGuess(board);





