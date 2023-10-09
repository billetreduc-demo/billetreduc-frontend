<script setup>
import {computed, ref} from "vue";

const prop = defineProps({
  play: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  showImageNumber: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const imageUrl = ref('');
const showDialog = ref(false);

import(`@/assets/${prop.play.uniqueImageId}.jpg`)
    .then(module => {
      imageUrl.value = module.default;
    })
    .catch(error => {
      console.error('Image failed to load', error);
    });

const toggleDialog = () => {
  showDialog.value = !showDialog.value;
}

const closeDialog = () => {
  showDialog.value = false;
}

// The 'ticketsLeft' value will change when the 'play' prop changes, because it is a dependency of the computed property
const ticketsLeft = computed(() => prop.play.numberOfTickets - prop.play.numberOfReservations);

const ticketsLeftText = computed(() => {
  return ticketsLeft.value === 1 ? '1 ticket left' : `${ticketsLeft.value} tickets left`;
});

defineEmits(["add-reservation"]);
</script>

<template>
  <li @click="toggleDialog">
    <div v-if="showImageNumber" class="index-circle">{{ index + 1 }}</div>
    <img :src="imageUrl" :alt="play.title">
  </li>

  <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
    <div class="dialog" @click.stop>
      <div class="dialog-content">
        <div class="play-data">
          <h3>{{ play.genre }}</h3>
          <h2>{{ play.title }}</h2>
          <p class="play-desc">{{ play.description }}</p>
          <div class="buy-info">
            <p class="tickets-left">{{ ticketsLeftText }}</p>
            <p class="play-price">{{ play.price }} €</p>
          </div>
          <button v-if="ticketsLeft > 0" class="reserve-btn" @click="$emit('add-reservation', play.id)">Make a
            reservation
          </button>
        </div>
        <div class="play-image">
          <img :src="imageUrl" :alt="play.title">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  max-width: 28%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  margin: 10px 0 20px 0;

  .index-circle {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ffffff;
    color: #C10000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
  }
}

.dialog-overlay {
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  z-index: 100;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  z-index: 1000;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  max-height: fit-content;

  .dialog-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .play-data {
    flex: 1;
    margin-right: 20px;
    padding-left: 20px;

    h3 {
      font-size: 1.3rem;
      font-weight: 500;
      color: #808080;
      margin-bottom: 0;
      margin-top: 20px;
    }

    h2 {
      font-size: 2rem;
      font-weight: 600;
      color: #000000;
      margin-top: 10px;
    }

    .play-desc {
      margin-top: 20px;
    }

    .buy-info {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 20px;

      .tickets-left {
        font-size: 1.8rem;
        font-weight: 600;
        color: #808080;
        text-decoration: underline;
      }

      .play-price {
        font-size: 1.8rem;
        font-weight: 400;
        color: #C10000;
      }
    }

    .reserve-btn {
      width: 100%;
      height: 50px;
      background-color: #C10000;
      border: none;
      border-radius: 10px;
      color: #ffffff;
      font-size: 1.7rem;
      font-weight: 500;
      margin-top: 20px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: #a80000;
      }
    }
  }

  .play-image {
    flex: 1;
  }

  .play-image img {
    width: 100%;
    height: auto;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: block;
  }
}
</style>