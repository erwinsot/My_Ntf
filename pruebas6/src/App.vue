<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <ul class="nav">
  <router-link to="/">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  </router-link>
  <router-link to="/about">
  <li class="nav-item">
    <a class="nav-link" href="#">Ntfs</a>
  </li>
  </router-link>
  <router-link to="/Marketplace">
  <li class="nav-item">
    <a class="nav-link" href="#">Marketplace</a>
  </li>
  </router-link>
  <li class="nav-item">
    <a class="nav-link disabled">Disabled</a>
  </li>
  <li>
    <button v-on:click="balanceCuenta" type="button" class="btn btn-primary">
      <i class="fas fa-wallet"></i>
      Connect Wallet
    </button>
  </li>
  <li>
    <button v-on:click="ObtenerDataos" class="button"><span>
      <i class="fas fa-wallet"></i>
      Connect Wallet 2
      </span></button>
  </li>
</ul>
  </div>
  <router-view/>
</template>


<script>
var connect=require("./eter")
export default {
  name: "App",
  props: {
    msg: String
  },
  methods:{
    ConectarMeta(){
      if(window.ethereum){
        window.ethereum.request({method: "eth_requestAccounts"})
      }
      else{
        alert("instala Metamask")
      }
    },
    balanceCuenta(){
      //connect.balance()
      connect.getElemSale()
    },
    
    ObtenerDataos(){
      connect.getSale()
    }
  }

}
</script>


<style>

body{
  background: url("./assets/noche.jpg");
}

#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-size: cover;
  height: max-content;
}

#nav {
  padding: 30px;
}
#router-link{
  margin-left: 20px;
  margin-right: 20px;
}
.button {
  border-radius: 12px;
  background-color: #19cf84;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 17px;
  padding: 10px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 12px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
