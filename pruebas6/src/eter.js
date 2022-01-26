const Web3 = require('web3');
const contract=require("../build/contracts/NftBuySucess.json")
console.log(contract)
let web3;
let Myntf;
let visibilityid;

function cerrarPop(){
  const overlay=document.getElementById("overlay")
  overlay.classList.remove("active")
}
function obtenerPrice(){
  const price=document.getElementById("price").value
  document.getElementById(visibilityid).disabled=true
  alert(price)
  getSale(visibilityid,price)
  document.getElementById("price").value="";
  cerrarPop()
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const getSale=async(tokenid,precio)=>{   ///pone en venta el ntf
  const accounts = await web3.eth.getAccounts();
  const bal=await Myntf.methods.createSell(accounts[0],tokenid,precio).send({
    from: accounts[0]
  })
  console.log(bal)
  return bal
}

window.visibil=(id)=>{
  visibilityid=id
  console.log(visibilityid)
 const overlay= document.getElementById("overlay")
 overlay.classList.add("active")
 
}
const getElemSale=async()=>{
  const accounts = await web3.eth.getAccounts();
  const container=document.getElementById("Market")
  container.innerHTML="";
  const bal=await Myntf.methods.paint().call({
    from: accounts[0]
  })
  console.log(bal)
  console.log(bal.length)
  console.log(typeof(bal))
  for(var i=0; i<bal.length;i++){
    const bal2=await Myntf.methods.tokenURI(bal[i][1]).call({
    from: accounts[0]
   })
   fetch (bal2)
   .then(response=> response.json())
   .then(data=>{
     container.insertAdjacentHTML(
        'beforeend',
        `<div class="col" style="width: 20rem;">
        <div class="card" style="width: 18rem;">
        <img src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Comprar</a>
        </div>
      </div>

        </div>
        `
      )
   })
  }
    
}
window.alerta=async() => {
  alert("fumar")
}

const getData=async () => {  //obtiene y pinta los ntf de cada uno
  const accounts = await web3.eth.getAccounts();
  const container=document.getElementById("about")
  container.innerHTML="";
  var direcc=accounts[0];
  console.log(direcc)
  const bal= await Myntf.methods.dataUri(accounts[0]).call({
    from: accounts[0]
   });
   const bal2=await Myntf.methods.walletOfOwner(accounts[0]).call({
    from: accounts[0]
   });
   const bal3=await Myntf.methods.viewOnSale(accounts[0]).call({
    from: accounts[0]
   });
   console.log(bal3)
   console.log("los id de los iten son " + bal2)
   console.log("bal2 es "+ typeof(bal2))
   console.log(bal)
   console.log("el tamaño es "+ bal.length)
   const ids=bal2
   console.log("los ids son "+ ids)
   for(var i=0;i<bal.length;i++){
     const start=async function(){
       const jsodata=await fetch(bal[i])
       .then(response => response.json())
       .then(data=>{
         return JSON.stringify(data)
       })
       
       return JSON.parse(jsodata);
     }
     const t =await start();
     console.log(t)
     
     
    container.insertAdjacentHTML(
      'beforeend',
      `<div class="col" style="width: 20rem;">
      <div class="card" style="width: 18rem;">
      <img src="${t.image}" class="card-img-top" alt="...">
      <div  class="card-body" >
        <h5 class="card-title"  >Card title</h5>
        <p class="card-text">id del ntf ${bal2[i]} </p>
        <button ${bal3[i] ? 'disabled' : ''} onclick="visibil('${bal2[i]}')"  id="${bal2[i]}" type="button" class="btn btn-primary">
        Vender Ntf
        </button>
      </div>
    </div>

      </div>
      `
    )
   }
}

const connectWeb3 = async () => {
    let web3Provider;

    // Modern dapp browsers...
    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error('User denied account access');
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganached
    else {
      web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
  
    web3 = new Web3(web3Provider);
    console.log(web3)
    Myntf = new web3.eth.Contract(
      contract.abi,
      contract.networks[5777].address
    );
  };

const capture = async pokemonName => { //permite mintear 
    const accounts = await web3.eth.getAccounts();
    console.log("el pokewt es "+ Myntf)
    console.log(accounts)
   /*  if (
      await Myntf.methods.isOwned(pokemonName).call({
        from: accounts[0]
      })
    ) {
      alert('Este pokemon ya ha sido tomado');
    } else { */
      try {
        console.log("instentando acceder al metodo")
        await Myntf.methods.mint(pokemonName).send({ from: accounts[0],value: 50000000000000 });
        alert(`Listo, ahora eres dueño de ${pokemonName}`);
      } catch (err) {
        alert(err.message);
      
    }
  };
  
window.balance=async() =>{
    const accounts = await web3.eth.getAccounts();
    console.log("entrando en balnce")
    try{
      const bal= await Myntf.methods.balance().call({
        from: accounts[0]
       });
       console.log(bal)
    }catch (err){
      alert(err.message);
    }
  }


  /* window.checkOwnership = async pokemonName => {
    const accounts = await web3.eth.getAccounts();
    return PokeCatcher.methods.isOwned(pokemonName).call({
      from: accounts[0]
    });
  }; */

  module.exports={connectWeb3, capture,getRandomArbitrary,getRandomInt,getData,getElemSale, cerrarPop,obtenerPrice};