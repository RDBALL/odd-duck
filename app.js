'use strict';

// ---------Global Variables---------

let totalVotes = 25;
let productImgArray = [];

// ---------DOM references---------

let imgContainer = document.getElementById('imgContainer');
let imgOne = document.getElementById('imgOne');
let imgTwo = document.getElementById('imgTwo');
let imgThree = document.getElementById('imgThree');
let showResultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('resultsList');
let counter = document.getElementById('countNum');

// ---------Constructor Function---------

function Product(name, photoExtension = 'jpg') {
  this.name = name;
  this.photo =`img/${name}.${photoExtension}`;
  this.views = 0;
  this.votes = 0;

  productImgArray.push(this);
}

// ---------Object Creation---------
// if there is a format other than jpg such as PNG
// new Product('product name', 'png')

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');


// ---------Helper Functions---------

function randomIndexGenerator(){
  return Math.floor(Math.random() * productImgArray.length);
}

randomIndexGenerator();

function renderImages(){
  let productOne = randomIndexGenerator();
  let productTwo = randomIndexGenerator();
  let productThree = randomIndexGenerator();

  while (productOne === productTwo) {
    productTwo = randomIndexGenerator();
  }
  while (productOne === productThree) {
    productOne = randomIndexGenerator();
  }
  while (productTwo === productThree) {
    productThree = randomIndexGenerator();
  }

  imgOne.src = productImgArray[productOne].photo;
  imgOne.alt = productImgArray[productOne].name;
  imgOne.name = productImgArray[productOne].name;
  productImgArray[productOne].views++;

  imgTwo.src = productImgArray[productTwo].photo;
  imgTwo.alt = productImgArray[productTwo].name;
  imgTwo.name = productImgArray[productTwo].name;
  productImgArray[productTwo].views++;

  imgThree.src = productImgArray[productThree].photo;
  imgThree.alt = productImgArray[productThree].name;
  imgThree.name = productImgArray[productThree].name;
  productImgArray[productThree].views++;
}

renderImages();


// ---------Event Handlers---------

function handleProductClick(event){
  let imgClicked = event.target.name;
  console.dir(imgClicked);

  for (let i=0; i < productImgArray.length; i++){
    if(imgClicked === productImgArray[i].name){
      productImgArray[i].votes++;
    }
  } counter.innerHTML = `Rounds left: ${totalVotes-1}`;
  totalVotes--;

  renderImages();

  if(totalVotes === 0){
    imgContainer.removeEventListener('click', handleProductClick);
  }
}

function handleShowResults(){
  if(totalVotes === 0){
    for(let i = 0; i < productImgArray.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${productImgArray[i].name}: views: ${productImgArray[i].views}, votes: ${productImgArray[i].votes}`;
      resultsList.appendChild(liElem);
    }
    showResultsBtn.removeEventListener('click', handleShowResults);
  }
}

// ---------Event Listeners---------


imgContainer.addEventListener('click', handleProductClick);
showResultsBtn.addEventListener('click', handleShowResults);
