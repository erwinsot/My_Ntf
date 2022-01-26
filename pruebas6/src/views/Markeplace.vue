<template>
  <div  class="container">
  <div id="Market" class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">

     </div>
     
    </div>
  
</template>


<script>
var connect=require("../eter")
export default {
  name:"Marketplace",
  mounted(){
      connect.connectWeb3().then(()=>{
      connect.getElemSale()
    })
  },
}
</script>

<style>

</style>
