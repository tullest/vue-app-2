<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/history">History</router-link> |
      <router-link to="/test">Test</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.chart{
  display: flex;
  justify-content: center;
}

.price{
  font-size: 30px;
  font-weight: bold;
}

.positif{
  color:#42b983;
}
.negatif{
  color: #ea3943;
}

.change{
  font-size: 19px;
  font-weight: 500;
}

.betButton{
  width: 125px;
  height: 40px;
  cursor: pointer;
  margin-left: 10px ;
  margin-right: 10px;
}

.up{
  color: #42b983;
  border: 2px solid #42b983;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  background-color: #ffffff;
}

.down{
  color: #ea3943;
  border: 2px solid #ea3943;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  background-color: #ffffff;
}

.balance{
  display: flex;
  flex-direction: column;
}

.info{
  font-size: 15px;
  font-weight: bold;
}

.amount span{
  font-size: 20px;

}

.containerButton{
  padding: 10px;
}

.history{
  display: flex;
  flex-direction: column;
}

.containerHistory{
  width: 1000px;
  margin: auto;
}

</style>
