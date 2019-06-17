import { Dimensions, Platform, PixelRatio } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export function responsive(size){
  return parseInt(size*width*height)/90000;
}

export function scale_size(w){
    return parseInt(w*width*(height+5000))/85000;
}

export function scale_height(h){
    return parseInt(h*height)/120;
}

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
