<template>
      <div class="row items-center vertical-top">
        <div class="cursor-pointer">
        <div class="col-1-center spec">
            <q-input filled stack-label  v-model="coordinatess[0]" label="Longitude" @blur=onSearch(this.coordinatess) />
          </div>
        </div>
        <div class="cursor-pointer spec">
        <div class="col-1-center">
          <q-input filled stack-label v-model="coordinatess[1]" label="Latitude" @blur=onSearch(this.coordinatess) />
          </div>
          </div>
          <div class="col-2-bottom spec">
          <q-input borderless v-model="searchTerm" readonly/>
        </div>


          <div class="col-4 q-pt-lg" >
            Radijus: {{ radius }}
            <q-slider
              dense
              v-model="radius"
              :min="0"
              :max="10000"

            />

          </div>
    <div class="q-pa-xs">
    <q-btn-dropdown id="btnn"
    >
      <div class="row no-wrap q-pa-md">
        <div class="col">
          <div class="text-h6 q-mb-md">Slojevi</div>
          <div v-for="(layer, index) in layers" :key="index">
          <q-toggle :id="'layerToggle' + index" class="layerToggle" v-model="layer.visible" @update:model-value="toggleLayer(layer)"
 />
          <label :for="'layerToggle' + index">{{ layer.name }}</label>
    </div>
        </div>

      </div>
    </q-btn-dropdown>
  </div>
        </div>
  <div id = map class="map">
  </div>
  <q-page-sticky position="bottom-right" class="loc">
        <q-btn round dense color="red-10" @click="locateMe" icon="room" ></q-btn>
    </q-page-sticky>
    <div v-show="showPopup" id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"> <q-icon id="icon" name="place" /><RouterLink :to ="`species/${radius}/${coordinatess[1]}/${coordinatess[0]}`"
     >{{ this.popUpContent }}</RouterLink>

    </div>
</div>
<q-footer class="foot">
  <div class="row items-center">
  <div id='mouse-position'></div>
  <q-select id ="sel" dense borderless v-model="projection" :options="options" @update:model-value="changeProj(projection)"> </q-select>
</div>
</q-footer>
</template>
<script>
import { Map, View } from 'ol';
import TileWMS from 'ol/source/TileWMS.js';
import 'ol/ol.css';
import proj4 from 'proj4';
import epsg3765 from 'epsg-index/s/3765.json'
import { register as registerProjection } from 'ol/proj/proj4'
import ZoomToExtent from 'ol/control/ZoomToExtent';
import Overlay from 'ol/Overlay.js';
import {get as getProjection, fromLonLat, transform} from 'ol/proj';
import * as olProj from 'ol/proj';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {Circle as CircleStyle, Fill, Style, Icon} from 'ol/style.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {ZoomSlider} from 'ol/control.js';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import {getAllLayers} from 'src/api/defineLayers';

export default {
    name: "MapComponent",
    data() {
        return {
            showPopup: false,
            searchTerm: "",
            radius: 0,
            coordinatess:{},
            geodata:{},
            overlay:{},
            popUpContent:"Prikažite vrste! ",
            projection:'EPSG:4326',
            options:['EPSG:4326','EPSG:3857','HTRS96'],
            mpsCtrl:{},
            layers:[],

        };
    },
    props: {
        center: {
            type: Object,
            default: () => ({ lat: 45.5, lng: 16.5}),
        },
    },
    methods: {
      addLayer(layer) {
      if (layer.source) {
        layer.source.setVisible(layer.visible);
        this.map.addLayer(layer.source);
      }
    },
    removeLayer(layer) {
      if (layer.source) {
        this.map.removeLayer(layer.source);
      }
    },
    toggleLayer(layer) {
      if (layer.visible) {
        this.addLayer(layer);
      } else {
        this.removeLayer(layer);
      }
    },
     registerProjections(){
        const projName = `EPSG:${epsg3765.code}`;
        proj4.defs(projName, epsg3765.wkt);
        registerProjection(proj4);
        const htrsProjection = getProjection(projName);
        },
      changeProj(proj){
        if(proj=='HTRS96'){
          console.log(proj);
          proj =  `EPSG:${epsg3765.code}`;
        }
        this.mpsCtrl.setProjection(proj);
      },
      addMouse(){
        var mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: this.projection,
        target: document.getElementById('mouse-position'),
        });
        this.mpsCtrl = mousePositionControl;
        this.map.addControl(this.mpsCtrl);
      },
      addExtent(){
        var zoomToExtentControl = new ZoomToExtent({
        extent: [1461387, 5210800, 1914470, 5677775]
      });
      this.map.addControl(zoomToExtentControl);
    },
        onSearch(coordinates) {
          let fll= transform( [coordinates[0], coordinates[1]],
              "EPSG:4326",
              "EPSG:3857");
          this.addMarker(fll);
          this.center.lng = coordinates[0];
          this.center.lat = coordinates[1];
          this.coordinatess = coordinates;
          this.reverseGeocode(coordinates);
        },
        async reverseGeocode(coordinates){
          await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client\?latitude\=${coordinates[1]}\&longitude\=${coordinates[0]}\&localityLanguage\=hr`
        )
          .then((response) => response.json())
          .then((geodata) =>{ console.log(geodata)
                              this.geodata=geodata;
                              this.searchTerm = this.geodata.locality;
          });
        },
        onClick(event) {
          var coordinates = olProj.transform(event.coordinate, "EPSG:3857", "EPSG:4326");
          var fll = fromLonLat([coordinates[0], coordinates[1]]);
          this.reverseGeocode(coordinates);
          this.coordinatess = coordinates;
          this.center.lng = coordinates[0];
          this.center.lat = coordinates[1];
          this.addMarker(fll);

        },

     locateMe(){navigator.geolocation.getCurrentPosition(
      (data) => {
        var coordinates = [data.coords.longitude, data.coords.latitude];
        this.reverseGeocode(coordinates);
        let fll= transform( [data.coords.longitude, data.coords.latitude],
              "EPSG:4326",
              "EPSG:3857");
        let crods = olProj.transform(fll, "EPSG:3857", "EPSG:4326");
        this.coordinatess=crods;
        this.addMarker(fll);
        this.center.lng = data.coords.longitude;
        this.center.lat = data.coords.latitude;
          ;})},

      addMarker(fll) {
          const source = this.vectorLayer.getSource();
          source.clear();
          console.log(fll);
            if (this.overlay) {
                this.map.removeLayer(this.overlay);
            }

            const point = new Point(fll);
            const feature = new Feature(point);
            feature.setStyle(new Style({
                image: new CircleStyle({
                    radius: 6,
                    fill: new Fill({
                        color: "#FF0000"
                    })
                })
            }));
            const overlay = new Overlay({
             element: document.getElementById('popup'),
              autoPan: {
                animation: {
               duration: 250,
            },
          },
        });
          this.overlay = overlay;
          source.addFeature(feature);
          this.overlay.setPosition(fll);
          this.map.addOverlay(this.overlay);

          this.showPopup = true;
          let closer = document.getElementById('popup-closer');
          closer.onclick = function () {
                overlay.setPosition(undefined);
                closer.blur();
                source.clear();
                return false;
            };

        },


  },

    mounted() {
        this.vectorLayer = new VectorLayer({
            source: new VectorSource({})
        });
        this.tileLayer = new TileLayer({ source: new OSM() });
        this.map = new Map({
            target: "map",
            layers: [this.tileLayer, this.vectorLayer],
            view: new View({
                center: fromLonLat([this.center.lng, this.center.lat]),
                zoom: 7.5
            })
        });
        this.layers = getAllLayers(); //?? di cemo to
        var zoomSlider = new ZoomSlider();
        this.map.addControl(zoomSlider);
        this.addExtent();
        this.addMouse();
        this.registerProjections();
        this.map.on("singleclick", this.onClick);



    },
    watch: {
        center: {
            handler() {
                this.map.getView().animate({
                    center: fromLonLat([this.center.lng, this.center.lat]),
                    duration: 100
                });
            },
            deep: true
        },


    },

}
</script>
<style>
#map{
  margin: 0;
  width:100vw;
  height:100vh;
  position: absolute;
  font-family: sans-serif;
}
.row{
  display: flex;
  flex-wrap: wrap;
  margin: 0px 0px 0px 0px;

}
.spec{

  padding-left: 10px;
  padding-top: 7px;
  width:180px;
  max-width: 90vw;

}
.options-button {
  z-index: 100;
}
q-input{
  max-width: 50px;
}
.col-2-center{
  font-size: 14px;
}
.loc{
  padding-right: 3px;
  padding-bottom: 3px;
}

#icon {
  font-size: 2em;
  color: red;
}
#btnn{
  width: 50px;
}
#sel{
  color: beige;
  height: 15px;
  padding-left: 10px;
}
.ol-mouse-position{
  padding: 11px 10px 10px 10px;
}


</style>
