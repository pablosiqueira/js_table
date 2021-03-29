var people = document.querySelectorAll(".person");
let requestURL = "https://raw.githubusercontent.com/pablosiqueira/data/main/people.json";
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'text';
request.send();


request.onload = function() {
    const celebtext = request.response;
    const celeb = JSON.parse(celebtext);
    create_person(celeb);
  }



function create_person(input){
    var size = input.length;
    for (var i = 0; i < size; i++ ){
        var table = document.getElementById("celeb_table");
        var mytr = document.createElement("tr");
        var id_number = document.createElement("th");
        var td_name = document.createElement("td");
        var td_age = document.createElement("td");
        var td_weight = document.createElement("td");
        var td_height = document.createElement("td");
        var td_imc = document.createElement("td");
        var td_status = document.createElement("td");
        mytr.class = "person";
        id_number.scope = "row";
        var cel_now = input[i];
        id_number.textContent = (i+1);
        td_name.textContent = cel_now.name;
        var year = cel_now.birthday[0].year;
        var age = 2021 - Number(year);
        td_age.textContent = age;
        td_weight.textContent = cel_now.weight;
        td_height.textContent = cel_now.height;
        var weight_now = cel_now.weight;
        var height_now = cel_now.height;
        var celeb_imc = calc_imc(weight_now,height_now);
        td_imc.textContent = celeb_imc;
        td_status.textContent = classification_imc(celeb_imc);
        table.appendChild(mytr);
        mytr.classList.add("row_" + i);
        mytr.id = ("tr_" + i);
        mytr.appendChild(id_number);
        id_number.classList.add("row_" + i);
        mytr.appendChild(td_name);
        td_name.id = "name_person_" + i; 
        td_name.classList.add("row_" + i);
        mytr.appendChild(td_age);
        td_age.classList.add("row_" + i);
        mytr.appendChild(td_weight);
        td_weight.classList.add("row_" + i);
        mytr.appendChild(td_height);
        td_height.classList.add("row_" + i);
        mytr.appendChild(td_imc);
        td_imc.classList.add("row_" + i);
        mytr.appendChild(td_status);
        td_status.classList.add("row_" + i);
    }
    
}

for (var i = 0 ; i < people.length ; i++){
    
    var person = people[i];

    var height = person.querySelector(".info-height").textContent;
    var weight = person.querySelector(".info-weight").textContent;
    var p_imc =  person.querySelector(".info-imc");
    var stat_imc = person.querySelector(".info-status");

        var temp = calc_imc(weight, height);
        p_imc.textContent = temp;
        var status_imc = classification_imc(temp);
        stat_imc.textContent = status_imc;

}



function calc_imc(weight, height){
    var imc = 0;
    imc = weight/(height*height);
    return imc.toFixed(2);
}

function classification_imc(imc){
    var r = imc;
    var msg;
    if (imc < 17){
        msg = "Very Underweight"
    }else if (imc < 18.5){
        msg = "Underweight"
    }else if(imc < 25){
        msg = "Normal"
    }else if(imc < 30){
        msg = "Overweight"
    }else if(imc < 35){
        msg = "Obesity Grade I"
    }else if(imc < 40){
        msg = "Obesity Grade II"
    }else {
        msg = "Obesity Grade III"
    }
    return msg;
}

function calculate(){
    var my_weight = document.getElementById("input_weight").value;
    var my_height = document.getElementById("input_height").value;
    var msg_place = document.getElementById("bmi_result");

    if (!validate(my_weight) || !validate(my_height)){
        if (!validate(my_weight) && !validate(my_height)){
            msg_place.innerHTML = "Invalid weight and height"; 
        }else if (!validate(my_weight)){
            msg_place.innerHTML = "Invalid weight!"; 
        }else{
            msg_place.innerHTML = "Invalid height!";
        }
    }else{
        var my_imc = calc_imc(my_weight, my_height);
        var status = classification_imc(my_imc);
        if (my_imc > 0){
            msg_place.innerHTML = "Your BMI is " + my_imc + " and that means " + "'" + status + "'."; 
        }
    }
    
}

function validate(number){
    if (number <= 0 || number == "" || isNaN(number)){
        return false;
    }else{
        return true;
    }
}