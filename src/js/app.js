import * as d3 from "d3";

import coinType from './constants/coin_types';

import { fetchData } from './util/cryptocurrency_api_util'

import { generateGraph } from './d3/generate_graph';


document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello World');

  let params = {
    'startDate': '2019/05/01',
    'endDate': '2019/07/04',
    'rows': 20,
    "type": coinType.ethereum
  }

  fetchData(params).then(
    res => {
      let items = res.data.records;
      // console.log(`res.data.records: ${JSON.stringify(items)}`);
      generateGraph(items);
    }
  );


  


})