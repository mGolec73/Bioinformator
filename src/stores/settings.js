import { defineStore } from 'pinia'

export const useSettStore = defineStore('sett', {
  state: () => ({
    settings: {},
  }),
  actions: {
    addDetails(details) {
      if (!this.settings) {
        this.settings= {};
      }
      this.settings = details;
    },
  },
  getters: {
    getSettings: (state) => () => {
      return state.settings || {};
    },
  },
});
