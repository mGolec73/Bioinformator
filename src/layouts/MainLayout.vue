<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Bioinformator
        </q-toolbar-title>
      </q-toolbar>
      <q-img
      src = "./backgorund.jpg"
      class="header-image absolute-top"></q-img>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navigacija
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
    <router-view v-slot="{ Component }">
    <keep-alive>
    <component :is="Component" />
    </keep-alive>
</router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Bioinformator',
    caption: 'Otvorite kartu',
    icon: 'map',
    link:'/'
  },
  {
    title: 'O aplikaciji',
    caption: 'Upute za korištenje',
    icon: 'help',
    link: '/info'
  },

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style>
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.4;

}
</style>
