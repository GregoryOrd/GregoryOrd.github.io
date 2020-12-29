<template>
  <div class="page">
    <body>
        <div id="showcase">
            <a id="EnterSiteButton" href="https://gregoryord.github.io/home.html" class="button">Enter Site</a>
        </div>
    </body>
  </div>
</template>

<script>
import Vue from 'vue';
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  }
});
export default {
  name: 'Index',
  components: {
  },
  methods:{
      routeToHomePage(){
          this.$router.push("/Home");
      }
  }
}
</script>

<style>

button{
    all: unset;
}

 body{
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 17px;
    color: #c9731c;
    line-height: 1.6;
}


 #showcase{
    background-image: url('../assets/keyboard.jpg');
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 20px;
}

#showcase #EnterSiteButton{
	font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    text-decoration: none;
    color: #ebebeb;
    border: #fff7ef 1px solid;
    padding: 10px 20px;
    border-radius: 10px;
    margin-top: 55vh;
    margin-right: 55vw;
	width: 20vw;
}

#showcase #EnterSiteButton:hover{
    background: black;
    color: white;
    text-shadow: none;
}
</style>
