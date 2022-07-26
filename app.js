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

let productIndexArr = [];

function renderImages(){

  while (productIndexArr.length < 6){
    let randomNumber = randomIndexGenerator();
    if (!productIndexArr.includes(randomNumber)){
      productIndexArr.push(randomNumber);
    }
  }

  let productOne = productIndexArr.shift();
  let productTwo = productIndexArr.shift();
  let productThree = productIndexArr.shift();

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



// Refactor into chart

function handleShowResults(){
  if(totalVotes === 0){
    // for(let i = 0; i < productImgArray.length; i++){
    //   let liElem = document.createElement('li');
    //   liElem.textContent = `${productImgArray[i].name}: views: ${productImgArray[i].views}, votes: ${productImgArray[i].votes}`;
    //   resultsList.appendChild(liElem);
    // }
    showResultsBtn.removeEventListener('click', handleShowResults);
    renderChart();
  }
}

//chart demo

let canvasElem = document.getElementById('myChart');

function renderChart(){

  let productName = [];
  let productVotes = [];
  let productViews = [];

  for(let i = 0; i <productImgArray.length; i++){
    productName.push(productImgArray[i].name);
    productVotes.push(productImgArray[i].votes);
    productViews.push(productImgArray[i].views);
  }
  const ctx = document.getElementById('myChart').getContext('2d');

  let myChart =  {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of views',
        data: productViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(canvasElem, myChart);
}


// function handleShowResults(){
//   if(totalVotes === 0){
//     for(let i = 0; i < productImgArray.length; i++){
//       let liElem = document.createElement('li');
//       liElem.textContent = `${productImgArray[i].name}: views: ${productImgArray[i].views}, votes: ${productImgArray[i].votes}`;
//       resultsList.appendChild(liElem);
//     }
//     showResultsBtn.removeEventListener('click', handleShowResults);
//   }
// }



randomIndexGenerator();
renderImages();

// ---------Event Listeners---------

imgContainer.addEventListener('click', handleProductClick);
showResultsBtn.addEventListener('click', handleShowResults);
