


class Card{
    constructor(num,type,img){
        this.num=num;
        this.img=img;
        this.type=type;
        this.cardImg= document.createElement('img');
        this.cardImg.src=`img/cards/JPEG/${img}`;
    }
    gizle(){
        this.cardImg.src='img/cards/JPEG/Red_back.jpg';
    }
    goster(){
        this.cardImg.src=`img/cards/JPEG/${this.img}`;
    }
    
};

let cardType=['C','D','H','S'];
let specialType=['A','J','K','Q'];
let deck ={
   cards:[],
   fillDeck:()=>{
        for(let i=0;i<4;i++){
           let currentType=cardType[i];
           for(let j=2;j<=14;j++){
              if(j<11){
                  imgsrc=`${j}${currentType}.jpg`
                  let card = new Card((j),currentType,imgsrc);
                  deck.cards.push(card);      
              }else{
                  imgsrc=`${specialType[j-11]}${currentType}.jpg`;
                  let card = new Card((j),currentType,imgsrc);
                  deck.cards.push(card);               }
           }
        }
   },
   ekle:(card,parent)=>{
      parent.appendChild(card.cardImg);
   }
}

deck.fillDeck();


//

let giveRandomCard = () => {
   
   let card = Math.floor(Math.random()*deck.cards.length);
   return deck.cards[card];
}

let getCard=(foo,parent)=>{
   foo.push(giveRandomCard());
   deck.ekle(foo[foo.length-1],parent);
}

let totalPoint=(foo,text)=>{
   let toplam =0;
   for(let i=0;i<foo.length;i++){
       toplam=toplam+foo[i].num;
   }
   text.innerText=toplam;
}

let playerHand = [];
let dealerHand = [];

let oyunOynanıyor=false;
let reload=false;

let startAudio = new Audio('sounds/start.wav');
let cardsSound = new Audio('sounds/cards-sound.wav');
let winAudio= new Audio('sounds/win.wav');
let loseAudio= new Audio('sounds/lose.wav');

const playerToplam_p=document.getElementById('player-toplam');
const dealerToplam_p=document.getElementById('dealer-toplam');
const kartAl_button =document.getElementById('kart-al');
const kal_button=document.getElementById('kal');
const basla_button=document.getElementById('basla');
const cards_div=document.getElementsByClassName('cards');
const modalHeader_h2=document.getElementById('title')
const modalText_p=document.getElementById('text');
const closeModalButtons_button = document.getElementById('close-button');
const overlay = document.getElementById('overlay');

function openModal(modal){
    if(modal==null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
};

function closeModal(modal){
    if(modal==null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
};
let modalOpen= ()=>{
    const modal = document.getElementById('modal');
    openModal(modal);
}
let modelClose= ()=>{
    const modal = document.getElementById('modal');
    closeModal(modal);
}

let winner = ()=>{
    if(parseInt(playerToplam_p.innerText)>21 && parseInt(dealerToplam_p.innerText)<=21){
        modalHeader_h2.innerText='Üzgünüm!';
        modalText_p.innerText=`Puanınız:${parseInt(playerToplam_p.innerText)} Kasa:${parseInt(dealerToplam_p.innerText)}`;
        loseAudio.play();
    }else if((parseInt(playerToplam_p.innerText)<=21 && parseInt(dealerToplam_p.innerText)>21)){
        modalHeader_h2.innerText='Tebrikler!';
        modalText_p.innerText=`Puanınız:${parseInt(playerToplam_p.innerText)} Kasa:${parseInt(dealerToplam_p.innerText)}`;
        winAudio.play();
    } else{
        if(Math.abs((21-parseInt(playerToplam_p.innerText)))<Math.abs((21-parseInt(dealerToplam_p.innerText)))){
            modalHeader_h2.innerText='Tebrikler!';
            modalText_p.innerText=`Puanınız:${parseInt(playerToplam_p.innerText)} Kasa:${parseInt(dealerToplam_p.innerText)}`;
            winAudio.play();
        }else if(Math.abs((21-parseInt(playerToplam_p.innerText)))>Math.abs((21-parseInt(dealerToplam_p.innerText)))){
         modalHeader_h2.innerText='Üzgünüm!';
         modalText_p.innerText=`Puanınız:${parseInt(playerToplam_p.innerText)} Kasa:${parseInt(dealerToplam_p.innerText)}`;
         loseAudio.play();
        }
    }
  
}

overlay.addEventListener('click',()=>{
    const modals= document.querySelectorAll('.modal.active');
    modals.forEach(modal =>{
        closeModal(modal);
    })
})
kal_button.addEventListener('click',()=>{
    let dealerPoint=parseInt(playerToplam_p.innerText);
    dealerHand[0].goster();
    while(dealerPoint<17) {
        setTimeout(cardsSound.play(),3000);
        console.log(dealerPoint);
        setTimeout(getCard(dealerHand,cards_div[0]),3000); 
        totalPoint(dealerHand,dealerToplam_p);
        dealerPoint=dealerPoint+dealerHand[dealerHand.length-1].num;
    }
    oyunOynanıyor=false;
    reload=true;
    setTimeout( modalOpen(), 2000);
    winner();
 
})

closeModalButtons_button.addEventListener('click',()=>{
    const modals= document.querySelectorAll('.modal.active');
    modals.forEach(modal =>{
        closeModal(modal);
    })
    location.reload();
})
basla_button.addEventListener('click',()=>{

    if(reload===true){
        console.log(reload);
      location.reload();
      reload=false;
    }else if(oyunOynanıyor===false)
  {   
      startAudio.play();
   
    getCard(playerHand,cards_div[1]);
    getCard(playerHand,cards_div[1]);
    getCard(dealerHand,cards_div[0]);
    getCard(dealerHand,cards_div[0]);
    dealerHand[0].gizle();
    totalPoint(playerHand,playerToplam_p);
    oyunOynanıyor=true;
    let point =parseInt(playerToplam_p.innerText);
    if(point>=21){
        console.log(point); 
        dealerHand[0].goster();
        dealerHand[1].goster();
        totalPoint(dealerHand,dealerToplam_p);
        oyunOynanıyor=false;
        reload=true;
        setTimeout( modalOpen(), 4000);
        winner();
    }
  }
  
});
kartAl_button.addEventListener('click',()=>{
    let point =parseInt(playerToplam_p.innerText);
    console.log(point); 
    if(oyunOynanıyor===true){
        cardsSound.play();
        if(point<21){
            getCard(playerHand,cards_div[1]);
            totalPoint(playerHand,playerToplam_p);
            point =parseInt(playerToplam_p.innerText);
            if(point>=21){
                console.log(point); 
                dealerHand[0].goster();
                dealerHand[1].goster();
                totalPoint(dealerHand,dealerToplam_p);
                oyunOynanıyor=false;
                reload=true;
                setTimeout( modalOpen(), 4000);
                winner();
            }
           } else {
            console.log(point); 
            dealerHand[0].goster();
            dealerHand[1].goster();
            totalPoint(dealerHand,dealerToplam_p);
            oyunOynanıyor=false;
            reload=true;
            setTimeout( modalOpen(), 4000);
            winner();
        }
    }
})



console.log(deck.cards);
