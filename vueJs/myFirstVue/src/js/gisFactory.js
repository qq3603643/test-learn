/**
 * GIS 图元管理
 */
import L from 'leaflet';

export class GisFactory {
  constructor() {
    this.features = new Map();
    this.pels = new Map();
  }

  create(feature, options) {
    const {
      id
    } = feature;

    this.features.set(id, feature);

    const latlng = L.latLng(feature.geometry.coordinates.reverse());

    if (this.pels.has(id)) {

      return this.pels.get(id).setLatLng(latlng);
    }

    const _marker = L.marker(latlng, options);

    this.pels.set(id, _marker);

    return _marker;
  }

  getFeature(id) {
  	return this.features.get(id);
  }

  getPel(id) {
  	return this.pels.get(id);
  }
}
