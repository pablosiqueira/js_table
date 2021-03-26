function sort(field,type,asc,arr_id){
    search(0);
    arrow_styles(arr_id);
    var table = document.getElementById("my_table");
    var position;
    var new_rows = [];
    var names_size = table.rows.length - 1;
    var row_size = document.getElementById("my_table").rows[1].cells.length;
    for (var i = 0; i < table.rows.length-1; i++){
        position = i;
        var n_1 = document.getElementsByClassName("row_" + i)[field].textContent;
        if (type == 1){
            n_1 = n_1.toLocaleLowerCase();
            
        }else{
            n_1 = parseFloat(n_1);
        }
        
        for(var j = 0; j < table.rows.length-1; j++ ){
            if (j != i){
                var n_2 = document.getElementsByClassName("row_" + j)[field].textContent;
                if (type == 1){
                    n_2 = n_2.toLocaleLowerCase();
                }else{
                    n_2 = parseFloat(n_2);
                }
                if (asc == 1){
                    if (n_1 > n_2 && j > i){
                    position++;
                    }
                    if (n_1 < n_2 && j < i){
                    position--;
                    }
                }else if(asc == 0){
                    if (n_1 < n_2 && j > i){
                        position++;
                        }
                        if (n_1 > n_2 && j < i){
                        position--;
                        }
                }  
            }    
        }   

         new_rows[position] = table.rows[i+1].cells;

         
    }
    
    rewrite_values (new_rows);
    search(1);
    
    
}



function rewrite_values(pos){
    var table = document.getElementById("my_table");
    var table_rows = table.rows.length - 1;
    var total_cols = document.getElementsByClassName("row_0").length - 1;
    var matrix = Array(table_rows).fill(null).map(() => Array(total_cols).fill(0));
    
 for (var i = 0; i < table_rows; i++){
    
        for (var j = 0; j < total_cols; j++ ){
            matrix[i][j] = pos[i][j].textContent; 
        }
    }

    for (var i = 0; i < table_rows; i++){
        var trow = document.getElementsByClassName("row_" + i);
            for (var j = 0; j < total_cols; j++ ){
                trow[j+1].innerHTML = matrix[i][j]; 
            }
        }

    console.log (matrix);

}


function arrow_styles(id){
    
    for (var i = 0; i < 12; i++){
        var arrow = document.getElementById("arrow_" + i);
        if (i != id){
            arrow.style.fill = "black";
        }else{
            arrow.style.fill = "red";
        }

    }

}

function search(initial){
    var input;
    if (initial == 1){
        input = document.getElementById("find").value;
    }else{
        input = "";
    }
    
    var size = document.getElementById("my_table").rows.length - 1;

    for (var i = 0; i < size; i++){
        var tr_now = document.getElementById("tr_"+ i);
        var str = document.getElementById("name_person_" + i).textContent;
        str = str.toLowerCase();
        input = input.toLowerCase();
        var check = str.includes(input);
            
            if (check == false){
                tr_now.style.display = "none";
            }else{
                tr_now.style.display = "";
            }     
    
    }
        
}