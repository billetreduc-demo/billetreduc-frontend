<script setup>
import {ref, onMounted} from "vue";
import playsService from "@/api/PlaysApi";
import PlayList from "@/components/PlayList.vue";

const playList = ref([]);

const fetchPlays = async () => {
  try {
    const data = await playsService.getPlays();
    playList.value = data.plays;
  } catch (error) {
    console.error('Error fetching plays', error);
  }
}

/* The 'onMounted' hook is a lifecycle hook that is called after the component is mounted, specifically it runs after
      the initial rendering is completed and the component has been inserted into the DOM */
onMounted(fetchPlays);
</script>

<template>
  <main>
    <PlayList :plays="playList" :listTitle="'All Plays'" :listType="'ALL'"/>
    <PlayList :plays="playList" :listTitle="'Most Booked Plays'" :containerBackground="'#C10000'"
              :listType="'MOST_BOOKED'"/>
    <PlayList :plays="playList" :listTitle="'Search By Genre'" :listType="'SEARCH_BY_GENRE'"/>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: 80px auto 50px;
}
</style>
