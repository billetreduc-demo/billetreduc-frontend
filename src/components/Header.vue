<script setup>
import {ref} from 'vue';
import {Icon} from "@iconify/vue";
import router from "@/router";

const searchQuery = ref('');
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'results', query: { searchTerm: searchQuery.value } });
  }
};
</script>

<template>
  <header class="header">
    <div class="content">
      <RouterLink class="company-name" to="/">BilletRéduc</RouterLink>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search for plays ...">
        <button @click="handleSearch">
          <Icon icon="carbon:search" width="28"/>
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #C10000;
  color: #ffffff;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 300;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: auto;
  }

  .company-name {
    font-style: italic;
    font-size: 2em;
    font-weight: 600;
    margin: 0;
    text-decoration: none;
    color: #ffffff;
  }

  .search-bar {
    display: flex;

    input {
      padding: 10px;
      border: none;
      border-radius: 10px 0 0 10px;
      outline: none;
      width: 400px;
      height: 55px;
      font-size: 1.2em;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 0 10px 10px 0;
      background-color: #ffffff;
      color: #C10000;
      cursor: pointer;
      font-weight: bold;
      font-size: 1.2em;
    }
  }
}

@media screen and (max-width: 768px) {
  .header {
    .content {
      flex-direction: column;
      align-items: flex-start;
    }

    .search-bar {
      margin-top: 20px;
      width: 100%;

      input {
        width: 100%;
      }
    }
  }
}
</style>
