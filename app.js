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
  let imgOneIndex = randomIndexGenerator();
  let imgTwoIndex = randomIndexGenerator();
  let imgThreeIndex = randomIndexGenerator();

  while ((imgOne.id === imgTwo.id) || (imgOne.id === imgThree.id)) {
    imgOne = randomIndexGenerator();
  }
  while (imgTwo.id === imgThree.id) {
    imgTwo = randomIndexGenerator();
  }

  imgOne.src = productImgArray[imgOneIndex].photo;
  imgOne.alt = productImgArray[imgOneIndex].name;
  productImgArray[imgOneIndex].views++;
  imgTwo.src = productImgArray[imgTwoIndex].photo;
  imgTwo.alt = productImgArray[imgTwoIndex].name;
  productImgArray[imgTwoIndex].views++;
  imgThree.src = productImgArray[imgThreeIndex].photo;
  imgThree.alt = productImgArray[imgThreeIndex].name;
  productImgArray[imgThreeIndex].views++;
}

renderImages();

// ---------Event Handlers---------

function handleProductClick(event){
  let imgClicked = event.target.name;

  for (let i=0; i < productImgArray.length; i++){
    if(imgClicked === productImgArray[i].name){
      productImgArray[i].votes++
    }
  }
  totalVotes--;

  renderImages();

  if(totalVotes === 0){
    imgContainer.removeEventListener('click', handleProductClick)
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
