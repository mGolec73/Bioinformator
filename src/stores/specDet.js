import { defineStore } from 'pinia'

export const useSpecStore = defineStore('species', {
  state: () => ({
    speciesDetails: {},
  }),
  actions: {
    addDetails(speciesId, details) {
      if (!this.speciesDetails[speciesId]) {
        this.speciesDetails[speciesId] = {};
      }
      this.speciesDetails[speciesId] = details;
    },
  },
  getters: {
    getDetailsBySpeciesId: (state) => (speciesId) => {
      return state.speciesDetails[speciesId] || {};
    },
  },
});
