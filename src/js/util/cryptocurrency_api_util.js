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
          break;
        case "type":
          link = url[value]
          break;
        case "timezone":
          param_arr.push(`&timezone=${encodeURI(value)}`)
          break;
        default:
          break;
      }
    })


    link += encodeURI(`&q=${q_arr.join(` AND `)}`);
    console.log(`Params: ${param_arr}`)
    link += encodeURI(param_arr.join(''));
  }

  console.log(`fetch ${params.type} from ${link}`);

  return axios.get(link)


}

