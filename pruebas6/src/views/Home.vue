<template>
  <div class="home">
    <div class="card" style="width: 18rem;">
    <img src="../assets/logo.png" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" v-on:click="capturar" class="btn btn-primary">Adoptame</a>
  </div>
</div>
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
var connect=require("../eter")
let ntfs=["QmWKF2He1sR3QFFDF3ZqW4v1fkvjrWQVrzKd3YjXkee5ff",
"QmacDxJFxdWXwf2t1wJF7PBGt5xhH53X4EJvo6aGv3Njkp",
"QmZkkEeoHq4a651izTs9giXvJjdVnzycW9VUpNvp3xxSSH",
"QmbqQoieYoa6h9e6HwnS6ty1pBjvwXmwi1jMQYEctFU3AB"]

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted(){
    connect.connectWeb3()
    
  },
  methods:{
    async capturar(){
    var randi= connect.getRandomInt(0,3);
    console.log(randi)
    await connect.capture([ntfs[randi]])
    }
  }
}
</script>
<style>
.card{
  padding: 30px;
  margin:15px
}

</style>