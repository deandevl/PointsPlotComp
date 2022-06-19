<template>
  <div id="container">
    <div id="plotDiv">
      <points-plot-comp
        id="pointsPlotComp"
        :x="x"
        :y="y"
        :grp="grp"
        title="Fisher Iris Flower Data"
        sub-title="Demo of PointsPlotComp"
        :x-label="x_variable"
        :y-label="y_variable"
        :x-axis="xAxis"
        :y-axis="yAxis"
        :grouping="grouping"
        :fit-data="fitData"
        @points-plot-comp-hover="onPointHover"
      />
      <div id="tablesDiv">
        <table-comp
          title="Iris Variables"
          :rows="varTableRows"
          :headings="varTableHeadings"
          :table-height="varTableHeight"
          :column-widths="varTableColWidths"
          :css-variables="css_variables_table_comp"
        />
        <table-comp
          title="Linear Model"
          :rows="lmTableRows"
          :headings="lmTableHeadings"
          :table-height="lmTableHeight"
          :column-widths="lmTableColWidths"
          :css-variables="css_variables_table_comp"
        />
      </div>
    </div>
    <div id="controlsDiv">
      <div
        class="headingDiv"
      >
        Current Point- {{ hoverMessage }}
      </div>
      <div id="scaleDiv">
        <div class="headingDiv">
          Scaling-
        </div>
        <select-comp
          heading="Axis"
          placeholder="X"
          :items="XY"
          :blur-panel="blur_panel"
          :css-variables="css_variables_select_comp"
          @select-comp-value-changed="value => {scale_axis = value}"
        />
        <select-comp
          heading="Variable"
          placeholder="sepal_length"
          :items="variables"
          :blur-panel="blur_panel"
          :css-variables="css_variables_select_comp"
          @select-comp-value-changed="value => {scale_variable = value}"
        />
        <input-comp
          heading="Min"
          header-position="above"
          placeholder=""
          input-size="6"
          :input-value="scale_min_value"
          :css-variables="css_variables_input_comp"
          @input-comp-value-changed="value => {scale_min_value = value}"
        />
        <input-comp
          heading="Max"
          header-position="above"
          placeholder=""
          input-size="6"
          :input-value="scale_max_value"
          :css-variables="css_variables_input_comp"
          @input-comp-value-changed="value => {scale_max_value = value}"
        />
        <input-comp
          heading="Step"
          header-position="above"
          placeholder=""
          input-size="6"
          :input-value="scale_step_value"
          :css-variables="css_variables_input_comp"
          @input-comp-value-changed="value => {scale_step_value = value}"
        />
        <button-comp
          @button-comp-clicked="updateScaling"
        >
          Update
        </button-comp>
      </div>
    </div>
  </div>
</template>

<script>
import PointsPlotComp from './PointsPlotComp.vue';
import ButtonComp from 'buttoncomp';
import TableComp from 'tablecomp';
import SelectComp from 'selectcomp';
import InputComp from 'inputcomp';

export default {
  name: 'App',
  components: {
    PointsPlotComp,
    ButtonComp,
    TableComp,
    SelectComp,
    InputComp
  },
  data() {
    return {
      x: null,
      y: null,
      grp: null,
      variables: null,
      x_variable: null,
      y_variable: null,
      intercept: null,
      predictor: null,
      xAxis: {
        min: 0,
        max: 10,
        step: 1
      },
      yAxis: null,
      grouping: {
        'Iris-setosa': {color:'#FF19D9'},
        'Iris-versicolor':{color:'#55FF33'},
        'Iris-virginica':{color:'#3377FF'}
      },
      fitData: null,
      varTableRows: null,
      varTableHeadings: ['Name','Mean','Variance','Median','Min','Max','95th Q'],
      varTableHeight: 150,
      varTableColWidths: [120, 80, 80, 80, 80, 80, 80],

      lmTableRows: null,
      lmTableHeadings: ['Parameter', 'Value'],
      lmTableHeight: 100,
      lmTableColWidths: [120, 80],

      hoverMessage: 'X:  Y:',
      XY: ['X', 'Y'],
      blur_panel: true,
      css_variables_select_comp: {
        select_comp_width: '8rem',
        select_comp_items_panel_position: 'absolute',
        select_comp_items_panel_z_index: '100'
      },
      css_variables_table_comp: {
        table_comp_thead_background: 'transparent',
        table_comp_row_odd_background: 'transparent',
        table_comp_row_even_background: 'transparent',
        table_comp_cell_font_size: '1.0rem'
      },
      css_variables_input_comp: {
        input_comp_width: '4rem'
      },
      scale_axis: 'X',
      scale_variable: 'sepal_length',
      scale_min_value: 0,
      scale_max_value: 10,
      scale_step_value: 1
    };
  },
  methods: {
    getSummary: async function(){
      const summary_url = 'http://127.0.0.1:8080/summary';
      try{
        const resp = await fetch(summary_url, {
          method: 'GET',
          headers: {
            'Content-Type': 'text/plain'
          }
        })
        if(resp.ok){
          const response_text = await resp.text();
          return Promise.resolve(response_text);
        }else {
          return Promise.reject(`getVariables error. Status = ${resp.status}`);
        }
      }catch(err){
        console.log(err);
      }
    },
    getData: async function(){
      const data_url = 'http://127.0.0.1:8080/iris_data?';
      const esc = encodeURIComponent;  //encode to escape
      const params = {
        variable_1: this.x_variable,
        variable_2: this.y_variable
      }
      const query = Object.keys(params).map(k => `${esc(k)}=${esc(params[k])}`).join('&');
      try {
        const resp = await fetch(data_url + query, {
          method: 'GET',
          headers: {
            'Content-Type': 'text/plain'
          }
        })
        if(resp.ok){
          const response_text = await resp.text();
          return Promise.resolve(response_text);
        }else {
          return Promise.reject(`getData error. Status = ${resp.status}`);
        }
      }catch(err){
        console.log(err);
      }
    },
    getLm: async function(){
      const data_url = 'http://127.0.0.1:8080/iris_lm?';
      const esc = encodeURIComponent;  //encode to escape
      const params = {
        variable_1: this.x_variable,
        variable_2: this.y_variable
      }
      const query = Object.keys(params).map(k => `${esc(k)}=${esc(params[k])}`).join('&');
      try {
        const resp = await fetch(data_url + query, {
          method: 'GET',
          headers: {
            'Content-Type': 'text/plain'
          }
        })
        if(resp.ok){
          const response_text = await resp.text();
          return Promise.resolve(response_text);
        }else {
          return Promise.reject(`getLm error. Status = ${resp.status}`);
        }
      }catch(err){
        console.log(err);
      }
    },
    onPointHover: function(obj){
      this.hoverMessage = `X: ${obj.x} Y: ${obj.y}`;
    },
    updateScaling: async function(){
      if(this.scale_axis === 'X'){
        this.x_variable = this.scale_variable;
        this.xAxis = {
          min: parseFloat(this.scale_min_value),
          max: parseFloat(this.scale_max_value),
          step: parseFloat(this.scale_step_value)
        }
      }else if(this.scale_axis === 'Y'){
        this.y_variable = this.scale_variable;
        this.yAxis = {
          min: parseFloat(this.scale_min_value),
          max: parseFloat(this.scale_max_value),
          step: parseFloat(this.scale_step_value)
        }
      }

      await this.updatePlot();
    },
    updatePlot: async function(){
      let response_text = await this.getData();
      const data_obj = JSON.parse(response_text);
      this.x = data_obj.x;
      this.y = data_obj.y;
      this.grp = data_obj.grp;

      response_text = await this.getLm();
      const lm_obj = JSON.parse(response_text);
      this.intercept = parseFloat(lm_obj.intercept);
      this.predictor = parseFloat(lm_obj.predictor);
      //console.log(`intercept: ${this.intercept} predictor: ${this.predictor}`)
      const fit = lm_obj.fit;
      const fit_data = [];
      for(let i = 0; i < fit.length; i++){
        const obj = {};
        obj.x = this.x[i];
        obj.y = parseFloat(fit[i]);
        fit_data.push(obj);
      }
      this.fitData = fit_data;

      this.lmTableRows = [];
      this.lmTableRows.push({
        'parameter': 'Intercept',
        'value': this.intercept
      })
      this.lmTableRows.push({
        'parameter': this.x_variable,
        'value': this.predictor
      })
    }
  },
  async mounted() {
    this.x_variable = "sepal_length";
    this.y_variable = "petal_length";

    let response_text = await this.getSummary();
    const summary_obj = JSON.parse(response_text);
    this.varTableRows = [];
    this.variables = [];

    for(let key of Object.keys(summary_obj)){
      this.varTableRows.push(
        {
          'name': key,
          'mean': summary_obj[key].mean[0],
          'var': summary_obj[key].var[0],
          'median': summary_obj[key].median[0],
          'min': summary_obj[key].min[0],
          'max': summary_obj[key].max[0],
          'quantile': summary_obj[key].quantile_95[0]
        }
      )
      this.variables.push(key);
    }
    /*const min = variables_obj.min;
    const max = variables_obj.max;
    for(const [idx, name] of variables_obj.variables.entries()){
      this.tableRows.push({'name': name, 'min': min[idx], 'max': max[idx]});
      this.variables.push(name);
    }*/

    await this.updatePlot();
  }
};
</script>

<style>
  #container {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  #plotDiv {
    display: flex;
    flex-direction: row;
  }
  #tablesDiv {
    display: flex;
    flex-direction: column;
  }
  #controlsDiv {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
    margin-top: 30px;
  }
  #pointsPlotComp {
    margin-left: 40px;
  }
  .headingDiv {
    font-family: Verdana, sans-serif;
    font-size: 20px;
    font-weight: bold;
  }
  #scaleDiv {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 800px;
  }
</style>