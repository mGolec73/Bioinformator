<template>
  <q-page class="grid" >
<div>
  <SpeciesDetails :speciesId="id"></SpeciesDetails>
</div>
</q-page>
</template>

<script>
import SpeciesDetails from 'src/components/SpeciesDetails.vue';

import { defineComponent } from 'vue';

export default defineComponent({
props:{
  id:Number
},
components:{
  SpeciesDetails,
},
computed: {
    id() {
      return id;

    },
  },
})
</script>
