<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import playsService from "@/api/PlaysApi";
import PlayList from "@/components/PlayList.vue";

const route = useRoute();
const searchTerm = computed(() => route.query.searchTerm);
const searchResults = ref([]);

const getSearchResults = async () => {
  try {
    const data = await playsService.searchPlays(searchTerm.value);
    searchResults.value = data.plays;
  } catch (error) {
    console.error('Error fetching plays', error);
  }
};

// Call getSearchResults when the component mounts
onMounted(getSearchResults);

// Watch the searchTerm computed property for changes, and call getSearchResults again when it changes
watch(searchTerm, async (newTerm, oldTerm) => {
  if (newTerm !== oldTerm) {
    await getSearchResults();
  }
});
</script>

<template>
  <main>
    <PlayList :plays="searchResults" :listTitle="'Search Results'" :listType="'ALL'"/>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: 80px auto 140px;
}

@media screen and (max-width: 768px) {
  main {
    margin: 180px auto 0;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
