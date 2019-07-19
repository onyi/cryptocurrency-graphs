const dataType = require('../constants/data_types');
const coinType = require('../constants/coin_types');
const url = require('../constants/url');

const axios = require('axios');

export const fetchData = (params) => {

  let link = url.bitcoin; //default is bitcoin

  if(params){
    // console.log(`params: ${JSON.stringify(params)}`);
    let param_arr = [];
    let q_arr = [];
    Object.keys(params).forEach( key => {
      let value = params[key];

      console.log(`Key: ${key}, value: ${value}, param_arr: ${param_arr}, q_arr: ${q_arr}`);

      switch(key){
        case "startDate":
          q_arr.push(`date >= ${value}`);
          break;
        case "endDate":
          q_arr.push(`date <= ${value}`);
          break;
        case "rows":
          param_arr.push(`&rows=${value}`);
        case "type":
          link = url[value]
        default:
          break;
      }
    })


    link += encodeURI(`&q=${q_arr.join(` AND `)}`);
    link += encodeURI(`${Object.keys(param_arr).map( k => `&${k}=${param_arr[k]}`)}`);
  }

  // console.log(`fetchBitcoin from ${link}`);

  return axios.get(link)


}

