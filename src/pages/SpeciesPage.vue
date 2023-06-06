<template>
  <q-page>

      <q-list bordered separator>
        <div style="width: 500px; max-width: 95vw;">
        <q-item>
        <q-item-section>
          <q-item-label overline>Radijus</q-item-label>
          <q-item-label>{{ radius }}m</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label overline>Latitude</q-item-label>
          <q-item-label>{{ trimCoord.lat }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label overline>Longitude</q-item-label>
          <q-item-label>{{ trimCoord.lng }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label overline>Broj vrsta</q-item-label>
          <q-item-label>{{ speciesList.length }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
        <SpeciesComponent
          v-for="species in displayedItems"
          :key="species.Id"
          v-bind="species"
        />
      </q-list>
      <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :max="totalPages"
        @update:model-value="paginateItems"
        input
      ></q-pagination>
      </div>
  </q-page>
</template>

<script>

import { defineComponent} from 'vue'
import SpeciesComponent from 'components/SpeciesComponent.vue'
import { useSpecStore } from 'src/stores/specDet';
import { useSettStore } from 'src/stores/settings';


export default defineComponent({
  name: 'SpeciesPage',
  data(){
    return{
      speciesList:[],
      trimCoord:{},
      currentPage: 1,
      pageSize: 5,
      settings:{},
    }
  },
  props:{
  radius:String,
   lat:String,
   lng:String,
  },
  components: {
    SpeciesComponent
},
methods:{

    paginateItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedItems = this.speciesList.slice(startIndex, endIndex);
    },

  async fetchData(radius, lat, lng) {
        const store = useSpecStore();
        const settStore = useSettStore();

        let lat1 = parseFloat(lat).toPrecision(6);
        let lng1 = parseFloat(lng).toPrecision(6);

        const response = await
        fetch(`https://visiani.botanic.hr/fcd-bioinformant/Findings/List/${radius}/${lat1}/${lng1}`);
        const responseJ = await response.json();
        this.speciesList = responseJ.Data;
        this.settings = responseJ.Settings;

        this.paginateItems();

      settStore.addDetails(this.settings);
      this.speciesList.forEach((species) => {
        store.addDetails(species.Id,species);
      });

      }
},
computed: {
    totalPages() {
      return Math.ceil(this.speciesList.length / this.pageSize);
    },
  },

updated(){

  this.trimCoord.lng = parseFloat(this.lng).toPrecision(6);
  this.trimCoord.lat = parseFloat(this.lat).toPrecision(6);
  this.fetchData(this.radius,this.lat,this.lng);
},

})
</script>
