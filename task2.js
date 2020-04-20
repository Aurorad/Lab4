"use strict";
let colors = ['red', 'green', 'yellow', 'pink', 'blue'];

window.onload = function () {
    let cars = [];
    cars.push(new Car("Citroen", 10));
    cars.push(new Car("Opel",9));
    cars.push(new Car("Tesla",4));
    cars.push(new Car("Subaru",7));
    cars.push(new Car("Skoda",2));
    cars.forEach((item, index, array)=>{
        addNewRow(item, index);
    });
    document.getElementById('addRowBtn').addEventListener('click', function () {
        addNewRow(new Car('',''), document.querySelector('table').rows.length+1);
    });
    createDiagram();
};

function createTR() {
    return document.createElement('tr');
}

function createTDDelete(){
    let td = document.createElement('td');
    let a = document.createElement('a');
    a.setAttribute('href', '#task2');
    a.innerHTML = 'Видалити';
    td.append(a);
    return td;
}

function createTDBrand(brand='', index) {
    let td = document.createElement('td');
    td.addEventListener('input', function () {
        deleteDiagram();
        createDiagram();
    });
    td.setAttribute('contenteditable', 'true');
    td.innerHTML = brand;
    return td;
}
function createTDNumber(number='0') {
    let td = document.createElement('td');
    td.addEventListener('input', function () {
        deleteDiagram();
        createDiagram();
    });
    td.setAttribute('contenteditable', 'true');
    td.innerHTML = number;
    return td;
}

function createTDDiv(height, car, index) {
    let td = document.createElement('td');
    td.style.verticalAlign = 'bottom';
    let divNumber = document.createElement('div');
    divNumber.innerHTML = car.number;
    divNumber.style.textAlign = 'center';
    divNumber.style.visibility = 'hidden';
    td.append(divNumber);
    let div = document.createElement('div');
    if(colors.length<=index){
        colors.push (randColor());
    }
    div.style.backgroundColor = colors[index];
    div.style.border = '1px solid black';
    div.style.height = height+'px';
    div.style.paddingBottom = '0';
    td.append(div);
    div.addEventListener('mouseover', function () {
        divNumber.style.visibility = 'visible';
    });
    div.addEventListener('mouseout', function () {
        divNumber.style.visibility = 'hidden';
    });
    let divBrand = document.createElement('div');
    divBrand.innerHTML = car.brand;
    divBrand.style.textAlign = 'center';
    td.append(divBrand);
    return td;
}

function addNewRow(car, index) {
    let table = document.querySelector('table');
    let tr = createTR();
    tr.append(createTDDelete());
    tr.append(createTDBrand(car.brand, index));
    tr.append(createTDNumber(car.number));
    table.append(tr);
    tr.querySelector('a').addEventListener('click', function () {
        tr.remove();
        deleteDiagram();
        createDiagram();
    });
    //createNewColumnOnDiagram();
}

function Car(brand, number) {
    this.brand = brand;
    this.number = number;
}

function getElementsOfTable (){
    let table = document.querySelector('table');
    let cars = [];
    for(let i=1; i<table.rows.length; i++) {
        cars.push(new Car(table.rows[i].cells[1].innerHTML, table.rows[i].cells[2].innerHTML));
    }
    return cars;
}

function createDiagram(){
    let cars = getElementsOfTable();
    if(cars.length === 0) return;
    let diagramTable = document.getElementById('diagram');

    let max = cars.map(arr=>arr.number).
    reduce(( max, cur ) => Math.max( max, cur ));
    let tr = createTR();
    tr.setAttribute('valign', 'bottom');
    cars.forEach(function(item, i, cars) {
        let height = item.number*300/max;
        let td = createTDDiv(height, item, i);
        tr.append(td);
    });
    diagramTable.append(tr);
}
function deleteDiagram() {
    if(document.getElementById('diagram').rows.length>0){
        document.getElementById('diagram').rows[0].remove();
    }

}


function randColor() {
    let r = Math.floor(Math.random() * (256));
    let g = Math.floor(Math.random() * (256));
    let b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}



