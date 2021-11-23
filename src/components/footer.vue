<template>
    <div>
       <div class="footer">
          <a href="#home" class="active">Logo</a>
         </div>
    </div>
</template>

<script>
  export default { 

  }
</script>

<style>
  .footer {
    background-color:#304238;
    position:relative;
    display:flex;
    min-height: 110px;
    position: relative;
    justify-content: center;
    align-items: center;
  }
  #links{
    background-color:#304238;
      display:flex;
      align-content:center;
      justify-content:space-around;
      color:#304238;
  }
  .footer a {
    color:white;
    padding:14px 16px;
    text-decoration:none;
    font-size:17px;
    display:block;
  }
  .footer .icon {
      display:block;
      right:0;
      top:0;
      background-color:transparent;
      border:none;
      color:black;
      min-width:50px
  }
  .footer a:hover {
    background-color:#ddd;
    color:black;
  }
  .active {
    background-color:#304238;
    color:white;
  }
  #links a {
      color:#9FD5BB;
      text-decoration:none;
  }
</style>
