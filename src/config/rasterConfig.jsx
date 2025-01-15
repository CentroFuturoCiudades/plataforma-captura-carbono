import { Matrix4 } from 'math.gl';

export const viewState = {
  latitude: 1.6176412478782285,
  longitude: -75.60984999141394,
  zoom: 9,
  pitch: 10,
  bearing: 0,
};

// Data for TIFF files and transformations
export const tiffFilesOne = ['/data/rasters/esri_raster_florencia.tif', '/data/rasters/GLC_FCS30D_raster_florencia.tif', '/data/rasters/world_cover_raster_florencia.tif'];
export const zTranslationsOne = [new Matrix4().translate([0, 0, 40000]), new Matrix4().translate([0, 0, 24000]), new Matrix4().translate([0, 0, 8000])];

export const tiffFiles = ['/data/rasters/GLC_FCS30D_raster_florencia.tif'];
export const zTranslations = [ new Matrix4().translate([0, 0, 0])];

export const tiffFilesTwo = ['/path_to_other_raster_file_1.tif', '/path_to_other_raster_file_2.tif'];
export const zTranslationsTwo = [new Matrix4().translate([0, 0, 30000]), new Matrix4().translate([0, 0, 15000])];

export const tiffFilesThree = ['/path_to_another_raster_file_1.tif'];
export const zTranslationsThree = [new Matrix4().translate([0, 0, 20000]), new Matrix4().translate([0, 0, 15000])];