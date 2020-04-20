"use strict";

function changeImage() {
    let image = document.forms[0].EnotImage;
    changeWidth(image);
    changeHeight(image);
    changeBorderWidth(image);
    changeBorderColor(image);
    changeAlternativeText(image);
}

function changeWidth (image) {
    let width = getWidthFromInput();
    if (width !== getWidthOfImage(image)) {
        image.style.width = width+'px';
    }
}

function changeHeight(image) {
    let height = getHeightFromInput();
    if (height !== getHeightOfImage(image)) {
        image.style.height = height+'px';
    }
}

function changeBorderWidth(image) {
    let borderWidth = getBorderWidthFromInput();
    if (borderWidth !== getBorderWidthOfImage(image)) {
        image.style.borderWidth = borderWidth+'px';
    }
}

function changeBorderColor(image) {
    let borderColor = getBorderColorFromInput();
    if (borderColor !== getBorderColor(image)) {
        image.style.borderColor = borderColor;
    }
}

function changeAlternativeText(image) {
    let alternativeText = getAlternativeTextFromInput();
    if (alternativeText !== getAlternativeText(image)) {
        image.setAttribute('alt', alternativeText);
    }
}

function getWidthOfImage(image) {
    let width = getComputedStyle(image).width;
    return Math.round(+width.slice(0, width.indexOf('px')));
}

function getWidthFromInput() {
    return document.forms[0].widthInput.value;
}

function getHeightOfImage(image) {
    let height = getComputedStyle(image).height;
    return Math.round(+height.slice(0, height.indexOf('px')));
}

function getHeightFromInput() {
    return document.forms[0].heightInput.value;
}

function getBorderWidthOfImage(image) {
    let borderWidth = getComputedStyle(image).borderWidth;
    return  borderWidth.slice(0, borderWidth.indexOf('px'));
}

function getBorderWidthFromInput() {
    return document.forms[0].borderInput.value;
}

function getBorderColor(image) {
    let borderColor = getComputedStyle(image).borderColor;
    borderColor = borderColor.slice(borderColor.indexOf('(')+1, borderColor.indexOf(')'));
    let arr = borderColor.split(', ');
    return rgbToHex(+arr[0], +arr[1], +arr[2]);
}

function getBorderColorFromInput() {
    return document.forms[0].borderColorInput.value;
}

function getAlternativeText(image) {
    return image.getAttribute('alt');
}

function getAlternativeTextFromInput () {
    return document.forms[0].alternativeInput.value;
}
function widthValidation (width){
    let widthError = document.createElement('p');
    width.addEventListener('input', function () {
        if(!width.validity.valueMissing && !width.validity.patternMismatch){
            widthError.remove();
            width.classList.add('is-valid');
            width.classList.remove('is-invalid');
            //document.getElementById('btnChangeImage').classList.remove('disabled');
        }
        else {
           //document.getElementById('btnChangeImage').classList.add('disabled');
            width.classList.add('is-invalid');
            width.classList.remove('is-valid');
            widthError.innerHTML = 'Поле "ширина" має бути заповненим і бути числом';
            widthError.classList.add('text-danger');
            document.forms[0].querySelector('div').after(widthError);
        }
        btnValidation();
    });
}

function heigthValidation(height) {
    let heightError = document.createElement('p');

    height.addEventListener('input', function () {
        if(!height.validity.valueMissing && !height.validity.patternMismatch){
            heightError.remove();
            height.classList.add('is-valid');
            height.classList.remove('is-invalid');
        }
        else {
            height.classList.add('is-invalid');
            height.classList.remove('is-valid');
            heightError.innerHTML = 'Поле "висота" має бути заповненим і бути числом';
            heightError.classList.add('text-danger');
            document.forms[0].querySelectorAll('div')[1].after(heightError);
        }
        btnValidation();
    });
}

function borderWidthValidation(borderWidth) {
    let borderWidthError = document.createElement('p');
    borderWidth.addEventListener('input', function () {
        if(!borderWidth.validity.valueMissing && !borderWidth.validity.patternMismatch){
            borderWidthError.remove();
            borderWidth.classList.add('is-valid');
            borderWidth.classList.remove('is-invalid');
        }
        else {
            borderWidth.classList.add('is-invalid');
            borderWidth.classList.remove('is-valid');
            borderWidthError.innerHTML = 'Поле "товщина рамки" має бути заповненим і бути числом';
            borderWidthError.classList.add('text-danger');
            document.forms[0].querySelectorAll('div')[2].after(borderWidthError);
        }
        btnValidation();
    });
}

function alternativeTextValidation(alternativeText){
    let alternativeError = document.createElement('p');
    alternativeText.addEventListener('input', function () {
        if(!alternativeText.validity.valueMissing && !alternativeText.validity.patternMismatch){
            alternativeError.remove();
            alternativeText.classList.add('is-valid');
            alternativeText.classList.remove('is-invalid');
        }
        else {
            alternativeText.classList.add('is-invalid');
            alternativeText.classList.remove('is-valid');
            alternativeError.innerHTML = 'Поле "альтернативний текст" має бути заповненим латиницею';
            alternativeError.classList.add('text-danger');
            document.forms[0].querySelectorAll('div')[4].after(alternativeError);
        }
        btnValidation();
    });
}
function btnValidation(){
    if(document.forms[0].widthInput.classList.contains('is-invalid')
        || document.forms[0].heightInput.classList.contains('is-invalid')
        || document.forms[0].borderInput.classList.contains('is-invalid')
        || document.forms[0].alternativeInput.classList.contains('is-invalid')) {
        document.getElementById('btnChangeImage').classList.add('disabled');
    }
    else {
        document.getElementById('btnChangeImage').classList.remove('disabled');
    }
}
window.onload = function () {
    let image = document.forms[0].EnotImage;
    let width = document.forms[0].widthInput;
    let height = document.forms[0].heightInput;
    let borderWidth = document.forms[0].borderInput;
    let alternative = document.forms[0].alternativeInput;
    width.setAttribute('value', getWidthOfImage(image));
    height.setAttribute('value',getHeightOfImage(image));
    borderWidth.setAttribute('value', getBorderWidthOfImage(image));
    document.forms[0].borderColorInput.setAttribute('value', getBorderColor(image));
    alternative.setAttribute('value', getAlternativeText(image));
    widthValidation(width);
    heigthValidation(height);
    borderWidthValidation(borderWidth);
    alternativeTextValidation(alternative);

};

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
