
import { fetchData } from '../util/cryptocurrency_api_util';

import { generateGraph } from '../d3/generate_graph';

import coinType from '../constants/coin_types';

const moment = require('moment');

class Graph {
  constructor(){
    // this.type = type;
    // this.data = data;
    this.params = {
      startDate: moment().subtract(10, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      rows: 10,
      type: coinType.ethereum,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    

    // this.createComponents = this.createComponents.bind(this);
    this.createComponents();
  }

  clear(){ //clear graph and its child content

  }

  updateGraphType(e){
    e.preventDefault();
    let type = e.currentTarget.id
    this.params.type = type;
    this.render();
  }

  createComponents(){
    // let form = document.createElement('form');
    // form.setAttribute("id", "component-form");
    // let rowCount = document.createElement('input');
    // rowCount.setAttribute("class","row-count");
    // rowCount.setAttribute("id", "row-count");
    // let components = document.getElementById("components");
    // components.appendChild(rowCount);


    document.getElementById("component-form").onsubmit = (e) => {
      e.stopPropagation();
      e.preventDefault();
      // console.log(`Submit form`);
      // console.log(`${document.getElementById("row-count").value}`)
      // this.params.rowCount = document.getElementById("row-count").value;
      this.params.startDate = document.getElementById("start-date").value;
      this.params.endDate = document.getElementById("end-date").value;
      
      this.params.rows = moment(this.params.endDate).diff(moment(this.params.startDate), 'days');
      // console.log(`this.params.rows : ${this.params.rows }`)
      this.render();
    }

    let graphButtons = document.getElementsByClassName("graph-button");
     
    for(let i = 0; i < graphButtons.length; i++ ){
      let that = this;
      let button = graphButtons[i];
      button.onclick = (e) => this.updateGraphType(e);
      
      // console.log(`button.id: ${button.id}`);

      button.classList.remove("selected")
      if ( button.id  === this.params.type.toString()) {
        button.classList.add("selected")
      }
    }

    // document.getElementById("row-count").value = this.params.rows;
    document.getElementById("start-date").value = this.params.startDate;
    document.getElementById("end-date").value = this.params.endDate;

  }


  render(){
    this.createComponents();

    fetchData(this.params).then(
      res => {
        let items = res.data.records;

        // console.log(`res.data.records: ${JSON.stringify(items)}`);
        generateGraph(items);
      }
    );

  }



}

export default Graph;