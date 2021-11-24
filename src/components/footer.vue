<template>
  <footer>
    <a href="#home" class="active">Logo</a>
   </footer>
</template>

<script>
  export default { 
    name: "Footer"
  }
</script>

<style>
  footer {
    background-color:#304238;
    position:relative;
    display:flex;
    min-height: 150px;
    position: relative;
    justify-content: center;
    align-items: center;
  }
  footer a {
    color:#9FD5BB;
    padding:14px 16px;
    text-decoration:none;
    font-size:17px;
    display:block;
  }
  footer a:hover {
    background-color:#ddd;
    color:black;
  }
  .active {
    background-color:#304238;
    color:white;
  }
 </style>
