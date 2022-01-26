<template>
  <div  class="container">
  <div id="about" class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
  </div>
  <div id="overlay" class="overlay">
  <div class="popUp">
  <a href="#" v-on:click="alerta" id="btn-cerrar" class="btn-cerrar"><i class="fas fa-times"></i></a>
  <h3>Suscribete</h3>
  <div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <span class="input-group-text">0.00</span>
  <input id="price" type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
  <button v-on:click="price" type="button" class="btn btn-primary">Connect Wallet</button>
</div>
</div>

</div>

    </div>
  
</template>


<script>
var connect=require("../eter")
export default {
  name:"about",
  mounted(){
    connect.connectWeb3().then(()=>{
      connect.getData()
    })
    
  },
  methods:{
    alerta(){
      connect.cerrarPop()
    },
    price(){
      connect.obtenerPrice()
    },
    vender(address, tokendi,precio){
      console.log("entre ")
      connect.getSale(address,tokendi,precio )
    }
  }
}
</script>

<style>
.overlay{
  background: rgba(0,0,0,.4);
  position:fixed;
  top: 0;
  bottom:0;
  left:0;
  right:0;
  display:flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
}
.overlay.active{
  visibility:visible;
}
.popUp{
  background:white;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,.4);
  border-radius: 3px;
  padding:20px;
  text-align: center;
  width: 600px;
}

</style>
