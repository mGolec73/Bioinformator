<template>
  <div class="q-pa-md">
    <div style="width: 500px; max-width: 90vw;">
      <q-item clickable v-ripple @click="getDetaljiUrl(speciesId)">
        <q-item-section>
          <q-item-label overline>Vrsta</q-item-label>
          <q-item-label>{{ name }}</q-item-label>
        </q-item-section>
      </q-item>
    <q-item>
        <q-item-section>
          <q-item-label overline>Narodni naziv</q-item-label>
          <q-item-label>{{ commonName }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-carousel
      animated
      v-model="slide"
      arrows
      infinite
    >
        <q-carousel-slide v-for="(photoId, index) in getPhotos(speciesId)" :name="index" :key="photoId" :img-src="getImageUrl(photoId)">
          <div class="absolute-bottom-right custom-caption">
          <q-btn dense class ="cm" v-ripple @click="getImageBig(photoId)" icon="image"><q-tooltip>
    Prikaži!
    </q-tooltip></q-btn>
          <q-btn dense class ="cm" v-ripple @click="getImageBig(photoId)"> {{ index+1 }} / {{ photosLength }} <q-tooltip>
    Prikaži!
    </q-tooltip></q-btn>
          </div>
        </q-carousel-slide>
      </q-carousel>

    </div>
    </div>

</template>

<script>
import { useSpecStore } from 'src/stores/specDet';
import { useSettStore } from 'src/stores/settings';


export default {
  data(){
    return{
      slide:1,
      link:"",
      imageUrl:"",
    }
  }
  ,
  props: {
    speciesId: {
      type: String,
    },
  },
  methods: {
    getPhotos(id){
      const store = useSpecStore();
      var data = store.getDetailsBySpeciesId(id);
      var photos = data.Photos;
      return photos;
    },

    getImageUrl(photoId) {
      return this.photoUrl.replace("{0}",photoId);
    },

    getImageBig(id) {
      const imageLink = `https://visiani.botanic.hr/fcd-gallery/Photo/Show/{0}`
      const url = imageLink.replace("{0}",id);
      window.open(url,"_blank");

    },
    getDetaljiUrl(id) {
      const url = this.taxonDetails.replace("{0}",id);
      window.open(url,"_blank");

    }

  },
  computed: {
    name() {
      return useSpecStore().getDetailsBySpeciesId(this.speciesId).Name;
    },
    commonName(){
      return useSpecStore().getDetailsBySpeciesId(this.speciesId).CommonName;
    },
    photosLength(){
      return useSpecStore().getDetailsBySpeciesId(this.speciesId).Photos.length;
    },
    sources(){
      return useSpecStore().getDetailsBySpeciesId(this.speciesId).Sources;
    },
    photoUrl(){
      return useSettStore().getSettings().PhotoUrl;

    },
    taxonDetails(){
      return useSettStore().getSettings().TaxonDetails;

    },
  },

};
</script>
<style scoped>
.cm{
  background-color:rgba(163, 160, 160, 0.982);

}
</style>
