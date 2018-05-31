<template>
	<section>
		<div id="mapBox">
		</div>
		<button id="btn" @click="exportPic">exportPic</button>
	</section>
</template>

<script>
	require('leaflet/dist/leaflet.css');
	import Vue from 'vue';
	import L from 'leaflet';
	import '../js/LeafletContextMenu';
	import '../js/leaflet.areaSelect.js';
	import 'Leaflet.Graticule-master/L.Graticule';
	import $ from 'jquery';
	import * as html2canvas from 'html2canvas/dist/html2canvas.js';
	import '../js/rgbcolor.js';
	import '../js/StackBlur.js';
	import '../js/canvg.js';
	import { GisFactory } from '../js/gisFactory.js';

	export default Vue.extend({
	  data() {
	    return {
	      // title: 'i am an apple'

	      map: null,
	      circleFeatures: {
	      	type: 'FeatureCollection',
	      	features: [{
	      		geometry: {
	      			coordinates: [113.781623840332, 23.0181282272195],   /** 经纬度顺序相反！！！！ */
	      			type: 'Point'
	      		},
	      		id: '1',
	      		type: 'Feature',
	      		properties: {
	      			name: 'testCircle_1',
	      			radius: 2000
	      		}
	      	}]
	      },
	      gisFactory: new GisFactory()
	    };
	  },
	  mounted() {
	    this.initMap();
	    // this.addGraticule();

	    this.addMarkerByFactory();

	    setTimeout(() => {
	      this.map.removeLayer(this.gisFactory.getPel('5a0914155ac3ea26c884cbbe'));
    	  this.addMarkerByFactory();
	    }, 1000);
	    // this.addMarker();
	    // this.addCircle();

	    // this.drawCircleByGeoJSON();
	  },
	  methods: {
	    initMap() {
	      this.map = L.map('mapBox', {
	        center: [23.032192, 113.772628],
	        zoom: 12,
	        fadeAnimation: false,
	        // attributionControl: false,
	        zoomControl: false,
	        selectArea: true,
	        contextmenu: true,
	        contextmenuItems: []
	      });

	      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
	          maxZoom: 18
	        })
	        .addTo(this.map);

          // console.log(this.map.getBounds()); //东北 西南对角的经纬度
	    },
	    addGraticule() {
	      if (!this.map) {
	      	return;
	      }

	      L.graticule({
	      	interval: 1,
	      	onEachFeature(feature, layer) {
	      		console.log(feature);
	      		layer.bindPopup('<strong>' + '2333333333' + '</strong>');
	      	}
	      }).addTo(this.map);
	    },
	    addMarkerByFactory() {
          const vm = this;

          const marker = vm.gisFactory.create({
            geometry: {
              coordinates: [113.772628, 23.032192]
            },
            id: '5a0914155ac3ea26c884cbbe',
            properties: {},
            type: 'Feature'
          }, {
          	icon: new L.Icon.Default()
          });
          marker.bindTooltip('hello').openTooltip();
          marker.addTo(vm.map);
	    },
	    addMarker() {
	      L.marker([23.032192, 113.772628], {
	          icon: new L.Icon.Default(),
	          contextmenu: true,
	          contextmenuInheritItems: false,
	          contextmenuItems: [{
	            text: '111',
	            callback: () => {
	              console.log(11);
	            }
	          }]
	        })
	      	.on('click', function(e) {
	      		console.log(e);
	      	})
	        .bindTooltip('maker', {
	          permanent: true,
	          direction: 'bottom'
	        })
	        .addTo(this.map);
	    },
	    addCircle() {
	      const circle = L.circle([51.505, -0.09], 2000).bindPopup('circle', {
	        closeButton: false
	      }).addTo(this.map);

	      circle.openPopup();

	      // setTimeout(() => {
	      // 	circle.setLatLng([51, -0.09]);
	      // }, 2000)
	    },
	    drawCircleByGeoJSON() {
	    	const vm = this;

	    	L.geoJSON(this.circleFeatures, {
	    		pointToLayer(feature, latlng) {
	    			vm.map.panTo(latlng);
	    			return L.circle(latlng, feature.properties.radius, {
	    				weight: 1,
	    				fillColor: '#f00',
	    				dashArray: '5, 5',
	    				contextmenu: true,
	    				contextmenuItems: [{
	    					text: 'circleGeoJSON',
	    					callback(...arg) {
	    						console.log(...arg);
	    					}
	    				}]
	    			});
	    		}
	    	}).addTo(this.map);
	    },
	    exportPic() {
	    	const nodesToRecover = [];
	    	const nodesToRemove = [];

	    	/* svg to canvas */
	    	const svgEles = $('#mapBox').find('svg');
	    	svgEles.each((ix, _svg) => {
	    		const parentNode = _svg.parentNode;
	    		const svg = $.trim(_svg.outerHTML);

	    		const _canvas = document.createElement('canvas');
	    		canvg(_canvas, svg);

	    		if (_svg.style.position) {
	    			_canvas.style.position += _svg.style.position;
	    			_canvas.style.left += _svg.style.left;
                    _canvas.style.top += _svg.style.top;
	    		}
	    		try {
	    			const matrix = $(_svg).css('transform').match(/\-?\d+/g);
	    			const offsetX = matrix[matrix.length - 2];
	    			const offsetY = matrix[matrix.length - 1];

	    			_canvas.style.left += Number(offsetX) + 'px';
	    			_canvas.style.top += Number(offsetY) + 'px';
	    		} catch (er) {}

		        nodesToRecover.push({
		          parent: parentNode,
		          child: _svg
		        });
		        parentNode.removeChild(_svg);

		        nodesToRemove.push({
		          parent: parentNode,
		          child: _canvas
		        });
		        parentNode.appendChild(_canvas);
	    	});

	    	html2canvas($('#mapBox')[0], {
	    		height: $('#mapBox').outerHeight()
	    	}).then((canvas) => {
	    		// document.body.appendChild(canvas);

	    		const _tempLink = document.createElement('a');
	    		_tempLink.setAttribute('href', canvas.toDataURL());
	    		_tempLink.setAttribute('download', 'test.png');
	    		document.body.appendChild(_tempLink);
	    		_tempLink.click();
	    		setTimeout(document.body.removeChild, 0, _tempLink);

	    		nodesToRemove.forEach((_item) => {
	    			_item.parent.removeChild(_item.child);
	    		});
	    		nodesToRecover.forEach((_item) => {
	    			_item.parent.appendChild(_item.child);
	    		});
	    	});
	    }
	  }
	  // components: {
	  // 	testtest
	  // }
	})
</script>

<style>
	#mapBox
	{
		margin: 0 auto;
		width: 80%;
		height: 666px;
	}
	.leaflet-contextmenu
	{
		background-color: #fff;
	}
	.leaflet-contextmenu-item
	{
		display: block;
		padding: 10px;
	}
</style>