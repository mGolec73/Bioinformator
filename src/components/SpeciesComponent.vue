<template>
  <q-item
    clickable
    tag="a"
    @click="getDetaljiUrl(this.Id)"
  >
    <q-item-section avatar>
    <q-btn padding="none" id="btns" @click.capture.stop="$router.push(`/speciesDetails/${Id}`)">
    <q-avatar square size="80px" >
      <img v-if="hasImage" :src="`https://visiani.botanic.hr/fcd-gallery/Photo/Thumb/${this.Photos[0]}`"/>
      <q-icon v-else :name="icon"></q-icon>
    </q-avatar>
    <q-tooltip>
    Prikaži fotografije!
    </q-tooltip>
    </q-btn>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ Name }}</q-item-label>
      <q-item-label caption> {{ CommonName }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import { useSettStore } from 'src/stores/settings';

export default defineComponent({
  name: 'SpeciesComponent',
  props: {
    Name: {
      type: String,
      required: true
    },
    CommonName: {
      type: String,
      required: true
    },
    Id: {
      type: Number,
      required: true
    },
    Photos:{
      type:Array
    },

    icon: {
      type: String,
      default: 'local_florist'
    },

  },
  methods:{
    getDetaljiUrl(id) {
      const url = this.taxonDetails.replace("{0}",id);
      window.open(url,"_blank");

    },
    getImagesDetails(id) {
      const url = this.photoUrl.replace("{0}",id);
      window.open(url,"_blank");

    },

  },
  computed: {
    hasImage() {
      return Boolean(this.Photos[0]);
    },
    photoUrl(){
      return useSettStore().getSettings().PhotoUrl;

    },
    taxonDetails(){
      return useSettStore().getSettings().TaxonDetails;

    },
  },
})
</script>
<style scoped>
#btns{
  padding: 0px 0px 0px 0px;
}

</style>
