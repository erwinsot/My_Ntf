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
const obtenerPrice=async()=>{
  const price=document.getElementById("price").value
  const buttonCancel=document.getElementById("Sell"+visibilityid)
  console.log("el id visibel es "+visibilityid)
  console.log(buttonCancel.value)
  //document.getElementById(visibilityid).disabled=true
  alert(price)
  var index=await getSale(visibilityid,price)
  console.log("el indice es "+ index)
  buttonCancel.value=index
  console.log("el valor ahora del boton es "+buttonCancel.value)
  document.getElementById("price").value="";
  cerrarPop()
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

window.Buyntf=async(tokenid, precio) => {
  console.log(typeof(tokenid,precio))
  const accounts = await web3.eth.getAccounts();
  const index=await Myntf.methods.indexSell(tokenid).call({
    from: accounts[0]
  })
  try {
    console.log("instentando acceder al metodo")
    await Myntf.methods.buyNtf(index).send({ from: accounts[0],value: precio });

  } catch (err) {
    alert(err.message);
  
}

}

const getSale=async(tokenid,precio)=>{   ///pone en venta el ntf
  const accounts = await web3.eth.getAccounts();
  const bal=await Myntf.methods.createSell(tokenid,precio).send({
    from: accounts[0]
  })
  return bal.events.Index.returnValues.index
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
  console.log("el elemnto de venta es "+ bal)
  console.log(bal.length)
  console.log(typeof(bal))
  for(var i=0; i<bal.length;i++){
    if(bal[i][0]==0){
      continue
    }
    const bal2=await Myntf.methods.tokenURI(bal[i][1]).call({
    from: accounts[0]
   })
   const start=async function(){
    const jsodata=await fetch(bal2)
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
    <div class="card-body">
      <h5 class="card-title">Nyf numero ${bal[i][1]}</h5>
      <p class="card-text">${bal[i][2]}</p>
      <button onclick="Buyntf('${bal[i][1]}','${bal[i][2]}')" type="button" class="btn btn-primary">
        Buy now
        </button>
    </div>
  </div>

    </div>
    `
  )
  }
    
}

window.cancelSell=async(id)=>{
  console.log("el id de cancellsell es "+id)
  const accounts = await web3.eth.getAccounts();
  const bal3=await Myntf.methods.cancelSale(id).send({
    from: accounts[0]
   });
   console.log(bal3)
}
window.alerta=async(id) => {

  alert("el id del axie es"+ id)
  var idser=document.getElementById("Sell"+ id)
  console.log(idser.value)
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
    console.log("el valor del id es "+ bal2[i])
    const bal4 =await Myntf.methods.indexSell(bal2[i]).call({
      from: accounts[0]
     });
     console.log("el indice de la carat 2 es "+ bal4)
    const start=async function(){
      
      const jsodata=await fetch(bal[i])
      .then(response => response.json())
      .then(data=>{
        return JSON.stringify(data)
      })
      
      return JSON.parse(jsodata);
    }
    const t =await start();
    container.insertAdjacentHTML(
      'beforeend',
      `<div class="col" style="width: 20rem;">
      <div class="card" style="width: 18rem;">
      <img src="${t.image}" class="card-img-top" alt="...">
      <div  class="card-body" >
        <h5 class="card-title"  >Card title</h5>
        <p class="card-text">id del ntf ${bal2[i]} </p>
        <button  ${bal3[i] ? 'style="display:none"' : 'style="background-color:blue"'} onclick=" visibil('${bal2[i]}')" id="${bal2[i]}" type="button" class="btn btn-primary">
        ${bal3[i] ? 'Cancel Sell' : 'Sell'}
        </button>
        <button  ${bal3[i] ?'style="background-color:red"' : 'style="display:none"'} onclick=" cancelSell('${bal4}')" id=" rojo ${bal2[i]}"  type="button" class="btn btn-primary">
        ${bal3[i] ? 'Cancel Sell' : 'Sell'}
        <input id="Sell${bal2[i]}"  style="display:none" value="John">
        </button>
      </div>
    </div>
    

      </div>
      `
    )
   }
}
/* visibil('${bal2[i]}') */

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
        const fer=await Myntf.methods.mint(pokemonName).send({ from: accounts[0],value: 50000000000000 });
        alert(`Listo, ahora eres dueño de ${pokemonName}`);
        console.log(fer.events.Sold.returnValues)
      } catch (err) {
        alert(err.message);
      
    }
    
    
  };
  
const balance=async() =>{
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
  
  module.exports={connectWeb3, capture,getRandomArbitrary,getRandomInt,getData,getElemSale,balance ,cerrarPop,obtenerPrice};