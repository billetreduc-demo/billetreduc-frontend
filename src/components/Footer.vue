<script setup>
import { ref } from 'vue';
const year = ref(new Date().getFullYear());
</script>

<template>
  <footer class="footer">
    <div class="content">
      <h2 class="company-name">BilletRéduc</h2>
      <p class="rights">© {{ year }} All Rights Reserved</p>
      <p class="note">Thank you for choosing BilletReduc for your ticketing needs.</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: #C10000;
  color: #ffffff;
  padding: 20px;
  text-align: center;
  width: 100%;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  margin: 0;

  .content {
    max-width: 1200px;
    margin: auto;
  }

  .company-name {
    font-style: italic;
    font-size: 1.5em;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .rights, .note {
    font-size: 0.875em;
    margin-bottom: 5px;
  }
}
</style>
