/**
 * Created by Rick on 2022-05-26.
 */
'use strict';

/**
 *
 * @param data A numeric array
 * @param maxTicks An integer that sets the maximum ticks
 */
export default function nice_ticks(data, maxTicks){
  function nice_number(range, round){
    const exp = Math.floor(Math.log10(range));
    const frac = range / Math.pow(10, exp);
    let niceFrac;
    if(round){
      if(frac < 1.5) niceFrac = 1
      else if(frac <= 3) niceFrac = 2
      else if(frac <= 7) niceFrac = 5
      else niceFrac = 10;
    }else {
      if(frac < 1) niceFrac = 1
      else if(frac <= 2) niceFrac = 2
      else if(frac <= 5) niceFrac = 5
      else niceFrac = 10;
    }
    return (niceFrac * Math.pow(10, exp))
  }

  let min = data[0];
  for(let i = 1; i < data.length; i++){
    if(data[i] < min){
      min = data[i];
    }
  }
  let max = data[0];
  for(let i = 1; i < data.length; i++){
    if(data[i] > max){
      max = data[i];
    }
  }

  const range = nice_number(max - min, false);
  const tickSpacing = nice_number(range / (maxTicks - 1), true);
  const niceMin = Math.floor(min / tickSpacing) * tickSpacing;
  const niceMax = Math.ceil(max / tickSpacing) * tickSpacing;

  return {
    min: niceMin,
    max: niceMax,
    step: tickSpacing
  }
}