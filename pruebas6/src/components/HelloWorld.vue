<template>
  <div>
    <div>
      <video controls autoplay muted>
        <!-- <source src="@/assets/videos/jer.mp4"> -->
      </video>

    </div>
  <div>
    
  </div>
   
  </div>
</template>

<script>
var connect=require("../eter")
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    //connect()

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
    conectarmetasm2()
    {
      connect.connectWeb3()
    }
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
