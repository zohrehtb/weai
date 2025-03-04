import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      images: process.client ? JSON.parse(localStorage.getItem("images")) || [] : [],
    };
  },

  mutations: {
    addImage(state, imageData) {
      state.images.push(imageData);
      if (process.client) {
        localStorage.setItem("images", JSON.stringify(state.images));
      }
    },

    removeImage(state, index) {
      state.images.splice(index, 1);
      if (process.client) {
        localStorage.setItem("images", JSON.stringify(state.images));
      }
    },

    updateImage(state, updatedImage) {
      const index = state.images.findIndex((img) => img.src === updatedImage.src);
      if (process.client) {
        if (index !== -1) {
          state.images[index] = updatedImage;
          localStorage.setItem("images", JSON.stringify(state.images));
        }
      }
    },

    deleteImage(state, src) {
      state.images = state.images.filter((img) => img.src !== src);
      if (process.client) {
        localStorage.setItem("images", JSON.stringify(state.images));
      }
    },
  },

  getters: {
    getImages(state) {
      return state.images;
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store);
});
