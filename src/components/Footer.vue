<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{path:'/'}">Course Survey</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        &copy; Coded with
        <i class="fa fa-heart heart"></i> by
        <a href="https://github.com/wisdomtohe" target="_blank"> &nbsp; Wisdom Tohe</a>&nbsp;
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
</style>