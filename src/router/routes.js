
import HelpPage from 'pages/HelpPage.vue'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MapPage.vue') },
      { path: 'help', component : HelpPage},
      { path:'species/:radius/:lat/:lng', name:'species',
        component: () => import('pages/SpeciesPage.vue'), props:true},
      { path:'speciesDetails/:id',  name:'speciesD',
        component: () => import('pages/SpecDetails.vue'), props:true},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
