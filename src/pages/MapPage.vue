<template>
  <q-page class="grid" >
<div id="full-height">
  <MapComponent ref="map" :center="location"></MapComponent>
</div>
</q-page>
</template>

<script>
import MapComponent from 'src/components/MapComponent.vue';

import { defineComponent } from 'vue';

export default defineComponent({
components:{
  MapComponent,
},
data(){
  return {
    location:{lat:44.5, lng:17.5}
  };
},
})
</script>
<style>
#full-hegiht{
  height: 100%;
  width: 100%;
}
</style>
