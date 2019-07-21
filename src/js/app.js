import * as d3 from "d3";

import coinType from './constants/coin_types';

import { generateGraph } from './d3/generate_graph';

import Graph from './components/graph';


document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello World');

  let params = {
    'startDate': '2019/05/01',
    'endDate': '2019/07/04',
    'rows': 20,
    "type": coinType.ethereum
  }


  const graph = new Graph();
  // graph.render();




})