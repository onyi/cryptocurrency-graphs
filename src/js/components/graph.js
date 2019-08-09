
import { fetchData } from '../util/cryptocurrency_api_util';

import { generateGraph } from '../d3/generate_graph';

import coinType from '../constants/coin_types';

import * as moment from 'moment';

import * as Lightpick from 'lightpick';

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
    
    var picker = new Lightpick({
      field: document.getElementById('datepicker'),
      singleDate: false,
      minDays: 10,
      maxDate: new Date(),
      format: "YYYY-MM-DD",
      onSelect: (start, end) => {
        // var str = '';
        // str += start ? start.format('YYYY-MM-DD') + ' to ' : '';
        // str += end ? end.format('YYYY-MM-DD') : '...';
        // console.log(`Start: ${start}; End: ${end}; String: ${str}`);
        if (start) this.params.startDate = start.format('YYYY-MM-DD');
        if(end) this.params.endDate = end.format('YYYY-MM-DD');
      }
    });
    picker.setDateRange(this.params.startDate, this.params.endDate);

    document.getElementById("graph-title").innerText = this.params.type;

    this.render();
  }

  clear(){ //clear graph and its child content

  }

  updateGraphType(e){
    e.preventDefault();
    let type = e.currentTarget.id
    this.params.type = type;
    this.createComponents();
    // this.render();
  }

  createComponents(){

    document.getElementById("component-form").onsubmit = (e) => {
      e.stopPropagation();
      e.preventDefault();
      // console.log(`Submit form`);
      // console.log(`${document.getElementById("row-count").value}`)
      // this.params.rowCount = document.getElementById("row-count").value;
     
      this.params.rows = moment(this.params.endDate).diff(moment(this.params.startDate), 'days');
      // console.log(`this.params.rows : ${this.params.rows }`)
      this.render();
    }

    let graphButtons = document.getElementsByClassName("graph-button");
     
    for(let i = 0; i < graphButtons.length; i++ ){
      let button = graphButtons[i];
      button.onclick = (e) => this.updateGraphType(e);
      
      // console.log(`button.id: ${button.id}`);

      button.classList.remove("selected")
      if ( button.id  === this.params.type.toString()) {
        button.classList.add("selected")
      }
    }

    document.getElementById("graph-title").innerText = this.params.type;


    // document.getElementById("row-count").value = this.params.rows;

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