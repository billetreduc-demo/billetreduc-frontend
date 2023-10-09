<script setup>
import PlayItem from "@/components/PlayItem.vue";
import playsService from "@/api/PlaysApi";
import {computed, ref, watch} from "vue";

const props = defineProps({
  plays: {
    type: Array,
    required: true,
  },
  listTitle: {
    type: String,
    required: true,
  },
  listType: {
    type: String,
    required: false,
    default: 'ALL',
  },
});

const selectedGenre = ref('');

const showImageNumber = (props.listType === 'MOST_BOOKED');

// Items in 'sortedPlays' are updated when the 'plays' prop changes, because it is a dependency of the computed property
const sortedPlays = computed(() => {
  let playsToShow = props.plays;
  if (props.listType === 'SEARCH_BY_GENRE' && selectedGenre.value) {
    playsToShow = props.plays.filter(play => play.genre === selectedGenre.value);
  }
  if (props.listType === 'MOST_BOOKED') {
    return playsToShow.slice().sort((a, b) => b.numberOfReservations - a.numberOfReservations);
  }
  return playsToShow;
});

const genres = computed(() => {
  return [...new Set(props.plays.map((play) => play.genre))];
});

const addReservation = async (playId) => {
  try {
    const data = await playsService.addPlayReservation(playId);
    const playIndex = props.plays.findIndex((play) => play.id === playId);
    if (playIndex !== -1) {
      const updatedPlay = {...props.plays[playIndex], numberOfReservations: data.numberOfReservations};
      props.plays.splice(playIndex, 1, updatedPlay);
    }
  } catch (error) {
    console.error('Error fetching plays', error);
  }
}

watch(() => props.plays, (newPlays) => {
  if (newPlays.length > 0) {
    selectedGenre.value = newPlays[0].genre;
  }
}, {immediate: true});
</script>

<template>
  <div class="plays-container">
    <h1>{{ listTitle }}</h1>
    <div class="divider"></div>
    <ul v-if="listType === 'SEARCH_BY_GENRE'" class="genre-list">
      <li v-for="genre in genres" :key="genre">
        <button type="button" :class="{ selected: genre === selectedGenre }" @click="selectedGenre = genre">{{
            genre
          }}
        </button>
      </li>
    </ul>
    <ul v-if="sortedPlays.length > 0" :class="{ 'play-list': true, 'horizontal-scroll': listType === 'ALL' }">
      <PlayItem
          v-for="(play, index) in (listType === 'ALL' ? sortedPlays : sortedPlays.slice(0, 3))"
          :key="play.id"
          :play="play"
          :index="index"
          :showImageNumber="showImageNumber"
          @add-reservation="addReservation"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.plays-container {
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  .genre-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin-bottom: 1rem;

    li {
      button {
        background-color: #C10000;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &:hover {
          background-color: #fff;
          color: #C10000;
        }

        &.selected {
          background-color: #fff;
          color: #C10000;
        }
      }
    }
  }

  h1 {
    font-size: 1.8rem;
    font-weight: 500;
    color: #C10000;
  }

  .divider {
    height: 1px;
    background-color: #C10000;
    width: 100%;
    margin-bottom: 1rem;
  }

  .play-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 1rem;
    list-style: none;
    padding: 0;
    min-height: 500px;
  }
}
</style>