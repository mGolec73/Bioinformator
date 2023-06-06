import TileWMS from 'ol/source/TileWMS.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';

const addZupanije =() => {
  var wmsLayer = new TileLayer({
  source: new TileWMS({
url: 'https://visiani.botanic.hr:8443/geoserver/FCD.administrativne_jedinice/wms',
params: {
  'SERVICE': 'WMS',
  'VERSION': '1.3.0',
  'LAYERS': 'zupanije',
  'TRANSPARENT': true,
  'TILED':true,
},
serverType: 'geoserver'
}),
opacity: 0.5
})
return wmsLayer} ;

const addOpcine = () => {
  var wmsLayer = new TileLayer({
    source: new TileWMS({
  url: 'https://visiani.botanic.hr:8443/geoserver/FCD.administrativne_jedinice/wms',
  params: {
    'SERVICE': 'WMS',
    'VERSION': '1.3.0',
    'LAYERS': 'opcine',
    'TRANSPARENT': true,
    'TILED':true,
  },
  serverType: 'geoserver'
  }),
  opacity: 0.5
  })
  return wmsLayer};

  const addNaselja = () => {
    var wmsLayer = new TileLayer({
      source: new TileWMS({
    url: 'https://visiani.botanic.hr:8443/geoserver/FCD.administrativne_jedinice/wms',
    params: {
      'SERVICE': 'WMS',
      'VERSION': '1.3.0',
      'LAYERS': 'naselja',
      'TRANSPARENT': true,
      'TILED':true,
    },
    serverType: 'geoserver'
    }),
    opacity: 0.5
    })
    return wmsLayer};

    const addMtb1_4 = () => {
      var wmsLayer = new TileLayer({
        source: new TileWMS({
      url: 'https://visiani.botanic.hr:8443/geoserver/FCD.mreze/wms',
      params: {
        'SERVICE': 'WMS',
        'VERSION': '1.3.0',
        'LAYERS': 'mtb1_4',
        'TRANSPARENT': true,
        'TILED':true,
      },
      serverType: 'geoserver'
      }),
      opacity: 0.3
      })
      return wmsLayer};

const addHtrs = () => {
  var wmsLayer = new TileLayer({
    source: new TileWMS({
  url: 'https://visiani.botanic.hr:8443/geoserver/FCD.mreze/wms',
  params: {
    'SERVICE': 'WMS',
    'VERSION': '1.3.0',
    'LAYERS': 'htrs_10x10',
    'TRANSPARENT': true,
    'TILED':true,
  },
  serverType: 'geoserver'
  }),
  opacity: 0.6
  })
  return wmsLayer};

  const addTK25 = () => {
    var wmsLayer = new TileLayer({
      source: new TileWMS({
    url: 'https://geoportal.dgu.hr/wms',
    params: {
      'SERVICE': 'WMS',
      'VERSION': '1.3.0',
      'LAYERS': 'TK25',
      'TRANSPARENT': true,
      'TILED':true,
    },
    serverType: 'geoserver'
    }),
    opacity: 1
    })
    return wmsLayer};



const addbioGeo = () => {
var wmsLayer = new TileLayer({
source: new TileWMS({
url: 'https://services.bioportal.hr/wms',
params: {
'SERVICE': 'WMS',
'VERSION': '1.3.0',
'LAYERS': 'biogeoregije',
'TRANSPARENT': true,
'TILED':true,
},
serverType: 'geoserver'
}),
opacity: 0.7
})
return wmsLayer};


const addClimate1= () => {
var wmsLayer = new TileLayer({
  source: new TileWMS({
url: 'https://visiani.botanic.hr:8443/geoserver/FCD.abiotski_cimbenici/wms',
params: {
  'SERVICE': 'WMS',
  'VERSION': '1.3.0',
  'LAYERS': 'bioclim',
  'STYLES': 'Bio_1',
  'TRANSPARENT': true,
  'TILED':true,
},
serverType: 'geoserver'
}),
opacity: 0.7
})
return wmsLayer};

const addClimate2= () => {
  var wmsLayer = new TileLayer({
    source: new TileWMS({
  url: 'https://visiani.botanic.hr:8443/geoserver/FCD.abiotski_cimbenici/wms',
  params: {
    'SERVICE': 'WMS',
    'VERSION': '1.3.0',
    'LAYERS': 'bioclim',
    'STYLES': 'Bio_12',
    'TRANSPARENT': true,
    'TILED':true,
  },
  serverType: 'geoserver'
  }),
  opacity: 0.7
  })
  return wmsLayer};

  const addDem= () => {
    var wmsLayer = new TileLayer({
      source: new TileWMS({
    url: 'https://visiani.botanic.hr:8443/geoserver/FCD.abiotski_cimbenici/wms',
    params: {
      'SERVICE': 'WMS',
      'VERSION': '1.3.0',
      'LAYERS': 'dem',
      'TRANSPARENT': true,
      'TILED':true,
    },
    serverType: 'geoserver'
    }),
    opacity: 1
    })
    return wmsLayer};

    const addNum1= () => {
      var wmsLayer = new TileLayer({
        source: new TileWMS({
      url: 'https://visiani.botanic.hr:8443/geoserver/FCD.biotski_cimbenici/wms',
      params: {
        'SERVICE': 'WMS',
        'VERSION': '1.3.0',
        'LAYERS': 'htrs10x10km',
        'TRANSPARENT': true,
        'TILED':true,
      },
      serverType: 'geoserver'
      }),
      opacity: 1
      })
      return wmsLayer};

      const addNum2= () => {
        var wmsLayer = new TileLayer({
          source: new TileWMS({
        url: 'https://visiani.botanic.hr:8443/geoserver/FCD.biotski_cimbenici/wms',
        params: {
          'SERVICE': 'WMS',
          'VERSION': '1.3.0',
          'LAYERS': 'mtb_1_4',
          'TRANSPARENT': true,
          'TILED':true,
        },
        serverType: 'geoserver'
        }),
        opacity: 0.8
        })
        return wmsLayer};


      const addStanista1= () => {
                    var wmsLayer = new TileLayer({
                      source: new TileWMS({
                    url: 'https://services.bioportal.hr/wms',
                    params: {
                      'SERVICE': 'WMS',
                      'VERSION': '1.3.0',
                      'LAYERS': 'kopnena_stanista',
                      'TRANSPARENT': true,
                      'TILED':true,
                    },
                    serverType: 'geoserver'
                    }),
                    opacity: 1
                    })
                    return wmsLayer};


    const addStanistaTocke= () => {
                      var wmsLayer = new TileLayer({
                        source: new TileWMS({
                      url: 'https://services.bioportal.hr/wms',
                      params: {
                        'SERVICE': 'WMS',
                        'VERSION': '1.3.0',
                        'LAYERS': 'kopnena_stanista_tocke',
                        'TRANSPARENT': true,
                        'TILED':true,
                      },
                      serverType: 'geoserver'
                      }),
                      opacity: 1
                      })
                      return wmsLayer};


  const addNSS= () => {
          var wmsLayer = new TileLayer({
            source: new TileWMS({
          url: 'https://services.bioportal.hr/wms',
          params: {
            'SERVICE': 'WMS',
            'VERSION': '1.3.0',
            'LAYERS': 'kopnena_stanista_2016',
            'TRANSPARENT': true,
            'TILED':true,
          },
          serverType: 'geoserver'
          }),
          opacity: 0.7
          })
          return wmsLayer};

  const addNSS2= () => {
            var wmsLayer = new TileLayer({
              source: new TileWMS({
            url: 'https://services.bioportal.hr/wms',
            params: {
              'SERVICE': 'WMS',
              'VERSION': '1.3.0',
              'LAYERS': 'kopnena_stanista_tocke_2016',
              'TRANSPARENT': true,
              'TILED':true,
            },
            serverType: 'geoserver'
            }),
            opacity: 0.7
            })
            return wmsLayer};

            const addCorine= () => {
              var wmsLayer = new TileLayer({
                source: new TileWMS({
              url: 'https://servisi.azo.hr/tlo/wms',
              params: {
                'SERVICE': 'WMS',
                'VERSION': '1.3.0',
                'LAYERS': 'corine_2012',
                'TRANSPARENT': true,
                'TILED':true,
              },
              serverType: 'geoserver'
              }),
              opacity: 0.5
              })
              return wmsLayer};

    const addZastcena= () => {
                var wmsLayer = new TileLayer({
                  source: new TileWMS({
                url: 'https://services.bioportal.hr/wms',
                params: {
                  'SERVICE': 'WMS',
                  'VERSION': '1.3.0',
                  'LAYERS': 'dzzpnpis:zasticeno_podrucje_poligoni',
                  'TRANSPARENT': true,
                  'TILED':true,
                },
                serverType: 'geoserver'
                }),
                opacity: 1
                })
                return wmsLayer};
    const addNatura1= () => {
                  var wmsLayer = new TileLayer({
                    source: new TileWMS({
                  url: 'https://services.bioportal.hr/wms',
                  params: {
                    'SERVICE': 'WMS',
                    'VERSION': '1.3.0',
                    'LAYERS': 'psci',
                    'TRANSPARENT': true,
                    'TILED':true,
                  },
                  serverType: 'geoserver'
                  }),
                  opacity: 1
                  })
                  return wmsLayer};

      const addNatura2= () => {
                    var wmsLayer = new TileLayer({
                      source: new TileWMS({
                    url: 'https://services.bioportal.hr/wms',
                    params: {
                      'SERVICE': 'WMS',
                      'VERSION': '1.3.0',
                      'LAYERS': 'spa',
                      'TRANSPARENT': true,
                      'TILED':true,
                    },
                    serverType: 'geoserver'
                    }),
                    opacity: 1
                    })
                    return wmsLayer};

  const getAllLayers = () => {
    var layers = [{ name: 'Županije', visible: false, source: addZupanije() },
                 {  name: 'Općine', visible: false, source: addOpcine() },
                 {  name: 'Naselja', visible: false, source: addNaselja() },
                 {  name: 'MTB 1/4', visible: false, source: addMtb1_4() },
                 {  name: 'HTRS 10x10', visible: false, source: addHtrs() },
                 {  name: 'TK25', visible: false, source: addTK25() },
                 {  name: 'Biogeologija', visible: false, source: addbioGeo() },
                 {  name: 'Klima - padaline', visible: false, source: addClimate2() },
                 {  name: 'Klima - temperatura', visible: false, source: addClimate1() },
                 {  name: 'DEM', visible: false, source: addDem() },
                 {  name: 'Br. vrsta htrs 10x10', visible: false, source: addNum1() },
                 {  name: 'Br. vrsta mtb 1/4', visible: false, source: addNum2() },
                 {  name: 'Staništa - poligoni', visible: false, source: addStanista1() },
                 {  name: 'Nešumska - poligoni', visible: false, source: addNSS() },
                 {  name: 'Natura', visible: false, source: addNatura1() },
                 {  name: 'Natura 2', visible: false, source: addNatura2() },
                 {  name: 'Corine', visible: false, source: addCorine() },
                 {  name: 'Zaštićena područja', visible: false, source: addZastcena() },
                ]
    return layers;
  }



export {addZupanije, addOpcine, addNaselja,addMtb1_4, addHtrs, addTK25,  addbioGeo, addClimate1, addClimate2, addDem, addNum1,addNum2,
addStanista1, addStanistaTocke, addNSS, addNSS2, addNatura1, addNatura2, addCorine, addZastcena, getAllLayers};
