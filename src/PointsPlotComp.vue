<template>
  <div id="container">
    <svg
      :width="width"
      :height="height"
    >
      <g>
        <!--draw the title-->
        <text
          v-if="title"
          class="titles"
          :font-size="28"
          :x="width / 2"
          :y="titleY"
        >
          {{ title }}
        </text>
        <!--draw the subTitle-->
        <text
          v-if="subTitle"
          class="titles"
          :font-size="20"
          :x="width / 2"
          :y="subtitleY"
        >
          {{ subTitle }}
        </text>
        
        <!--draw x axis-->
        <g
          id="xAxisGroup"
          :transform="translateXAxis"
        >
          <!--draw horizontal line-->
          <path 
            class="ticLines"
            :d="drawXaxis"
          />
          <!--draw tic lines-->
          <path 
            v-for="(item, index) in xTics"
            :key="index"
            class="ticLines"
            :d="drawXtic(item)"
          />
          <!--draw tic labels-->
          <text
            v-for="(item, index) in xTics"
            :key="index"
            class="ticLabels"
            :x="item.loc"
            :y="20"
          >
            {{ item.label }}
          </text>
          <!--draw x axis label-->
          <text
            class="axisTitle"
            :x="ctrWidth / 2"
            :y="50"
          >
            {{ xLabel }}
          </text>
        </g>

        <!--draw y axis-->
        <g
          id="yAxisGroup"
          :transform="translateYAxis"
        >
          <!--draw vertical line-->
          <path
            class="ticLines"
            :d="drawYaxis"
          />
          <!--draw tic lines-->
          <path
            v-for="(item, index) in yTics"
            :key="index"
            class="ticLines"
            :d="drawYtic(item)"
          />
          <!--draw tic labels-->
          <text
            v-for="(item, index) in yTics"
            :key="index"
            class="ticLabels"
            :x="-20"
            :y="item.loc"
          >
            {{ item.label }}
          </text>
          <!--draw y axis label-->
          <text
            :x="-ctrHeight / 2"
            :y="-marginLeft + 15"
            :style="yLabelStyle"
          >
            {{ yLabel }}
          </text>
        </g>

        <!--draw points-->
        <g
          id="pointsGroup"
          :transform="translatePoints"
        >
          <g v-for="group in getGroups">
            <circle class="points" v-for="i in group.length"
              :style="{stroke: group[i-1].stroke}"
              :fill="group[i-1].fill"
              :cx="(group[i-1].x - xLimits.min) * xScale"
              :cy="ctrHeight - (group[i-1].y - yLimits.min) * yScale"
              :r="pointSize"
              @mouseover="mouse_over_point($event, group[i-1].index)"
              @mouseleave="mouse_leave_point($event)"
            >
              {{group[i-1].icon}}
            </circle>
          </g>
        </g>

        <!--connect points with lines-->
        <g
          id="linesGroup"
          v-if="connectPoints"
          :transform="translatePoints"
        >
          <g v-for="group in getGroups">
            <line v-for="i in group.length-1"
              :style="{stroke: group[i-1].stroke}"
              :x1="(group[i-1].x - xLimits.min) * xScale"
              :y1="ctrHeight - (group[i-1].y - yLimits.min) * yScale"
              :x2="(group[i].x - xLimits.min) * xScale"
              :y2="ctrHeight - (group[i].y - yLimits.min) * yScale"
            >
            </line>
          </g>
        </g>
        <!--draw fit data-->
        <g
          v-if="fitData"
          id="fitGroup"
          :transform="translatePoints"
        >
          <line
            v-for="(item,index) in getFittedData"
            :key="index"
            :style="{stroke: fitPointColor}"
            :x1="(item.x1 - xLimits.min) * xScale"
            :y1="ctrHeight - (item.y1 - yLimits.min) * yScale"
            :x2="(item.x2 - xLimits.min) * xScale"
            :y2="ctrHeight - (item.y2 - yLimits.min) * yScale"
          />
        </g>
        
        <!--draw legend-->
        <g
          v-if="grouping"
          id="legend"
          @mousedown="mouse_legend_down($event)"
          @mousemove="mouse_legend_move($event)"
          @mouseup="mouse_legend_end($event)"
          @mouseout="mouse_legend_end($event)"
        >

          <circle
            v-for="(item,key,index) in grouping"
            :key="index"
            :fill="item.fill"
            :cx=".85 * ctrWidth"
            :cy="0.2 * ctrHeight + index * 30 - 5"
            :r="pointSize"
          />
          <text
            v-for="(item,key,index) in grouping"
            :key="index"
            :style="{stroke: item.stroke}"
            :x=".85 * ctrWidth + 20"
            :y="0.2 * ctrHeight + index * 30"
          >
            {{ key }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import nice_ticks from './nice_ticks';
import {mouse_down, mouse_move, mouse_end} from './mouse_move_event';

export default {
  name: 'PointsPlotComp',
  
  props: {
    x: {
      type: Array,
      default: null,
      required: true
    },
    y: {
      type: Array,
      default: null,
      required: true
    },
    grp: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    subTitle: {
      type: String,
      default: null
    },
    xLabel: {
      type: String,
      default: ''
    },
    yLabel: {
      type: String,
      default: ''
    },
    xAxis: {
      type: Object,
      default: null
    },
    yAxis: {
      type: Object,
      default: null
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 600
    },
    marginLeft: {
      type: Number,
      default:60
    },
    marginBottom: {
      type: Number,
      default: 60
    },
    pointStroke: {
      type: String,
      default: '#000000'
    },
    pointFill: {
      type: String,
      default: '#FFFFFF'
    },
    pointSize: {
      type: Number,
      default: 6
    },
    connectPoints: {
      type: Boolean,
      default: false
    },
    fitData: {
      type: Array,
      default:() => {
        return null;
      }
    },
    fitPointColor: {
      type: String,
      default: '#FF1940'
    },
    grouping: {
      type: Object,
      default: () => {
        return {};
      }
    },
    cssVariables: {
      type: Object,
      default: null
    }
  },
  emits: {
    'PointsPlotCompHover': null
  },
  data() {
    return {
      fit_data: null,
      titleY: 20,
      subtitleY: 45,
      yLoc: 10,
      ctrWidth: 0,
      ctrHeight: 0,
      yLabelStyle: {
        transform: 'rotate(270deg)',
        textAnchor: 'middle',
        fontSize: '16px',
        fontWeight: 'bold'
      }
    };
  },
  computed: {
    drawXaxis(){
      return `M 0 0 H ${this.ctrWidth}`
    },
    drawYaxis(){
      return `M 0 0 V ${this.ctrHeight}`
    },
    xScale() {
      return this.ctrWidth / (this.xLimits.max - this.xLimits.min);
    },
    xLimits() {
      const xaxis = {
        min: 0,
        max: 1,
        step: 1
      };
      if(this.xAxis !== null){
        xaxis.min = this.xAxis.min;
        xaxis.max = this.xAxis.max;
        xaxis.step = this.xAxis.step;
      }else if(this.x !== null){
        const nice_tics = nice_ticks(this.x, 10);
        xaxis.min = nice_tics.min;
        xaxis.max = nice_tics.max;
        xaxis.step = nice_tics.step;
      }
      return xaxis;
    },
    xTics() {
      const xtics = [];
      const xN = Math.round((this.xLimits.max - this.xLimits.min) / this.xLimits.step);
      for(let i=0; i < xN + 1; i++){
        const value = this.xLimits.min + i * this.xLimits.step;
        xtics.push({
          loc: (value - this.xLimits.min) * this.xScale,
          label: value,
        });
      }
      return xtics;
    },
    yScale() {
      return this.ctrHeight / (this.yLimits.max - this.yLimits.min);
    },
    yLimits(){
      const yaxis = {
        min: 0,
        max: 1,
        step: 1
      };
      if(this.yAxis !== null){
        yaxis.min = this.yAxis.min;
        yaxis.max = this.yAxis.max;
        yaxis.step = this.yAxis.step;
      }else if(this.y !== null){
        //console.log(`y: ${this.y}`);
        const nice_tics = nice_ticks(this.y, 10);
        yaxis.min = nice_tics.min;
        yaxis.max = nice_tics.max;
        yaxis.step = nice_tics.step;
        //console.log(`ymin: ${yaxis.min} ymax: ${yaxis.max} step: ${yaxis.step}`);
      }
      return yaxis;
    },
    yTics() {
      const ytics = [];
      const yN = Math.round((this.yLimits.max - this.yLimits.min) / this.yLimits.step);
      //console.log(`yN: ${yN} yScale: ${this.yScale}`);
      for(let i=0; i < yN + 1; i++){
        const value = this.yLimits.min + i * this.yLimits.step;
       // console.log(`value: ${value}`);
        ytics.push({
          loc: this.ctrHeight - (i * this.yLimits.step * this.yScale),
          label: value
        });
      }
      return ytics;
    },
    translateXAxis(){
      return `translate(${this.marginLeft} ${this.ctrHeight + this.yLoc})`
    },
    translateYAxis(){
      return `translate(${this.marginLeft} ${this.yLoc})`
    },
    translatePoints(){
      return `translate(${this.marginLeft} ${this.yLoc})`
    },
    getGroups(){
      const groups = [];
      let index = 0;
      if(this.x !== null && this.y !== null){
        // For non-grouping case
        if(this.grp === null){
          const group = [];
          for(let i = 0; i < this.x.length; i++){
            const obj = {
              x: this.x[i],
              y: this.y[i],
              index: index,
              stroke :this.pointStroke,
              fill:this.pointFill,
            }
            group.push(obj);
            index++;
          }
          groups.push(group);
        }else{
          const group_names = Object.keys(this.grouping);
          const group_data = {};
          for(let name of group_names){
            group_data[name] = [];
          }
          for(let i = 0; i < this.x.length; i++){
            if(group_names.indexOf(this.grp[i]) !== -1){
              const obj = {
                x: this.x[i],
                y: this.y[i],
                index: index,
                stroke :this.grouping[this.grp[i]].stroke,
                fill:this.grouping[this.grp[i]].fill
              }
              group_data[this.grp[i]].push(obj);
              index++;
            }
          }
          for(let key of Object.keys(group_data)){
            groups.push(group_data[key]);
          }
        }
      }
      return groups;
    },
    getFittedData(){
      const fitted_data = [];
      for(let i=1; i < this.fitData.length; i++){
        const obj = {};
        obj.x1 = this.fitData[i - 1].x;
        obj.y1 = this.fitData[i - 1].y;
        obj.x2 = this.fitData[i].x;
        obj.y2 = this.fitData[i].y;
        fitted_data.push(obj);
      }
      return fitted_data;
    }
  },
  mounted() {
    if(this.cssVariables !== null){
      for(let key of Object.keys(this.cssVariables)){
        this.$el.style.setProperty(`--${key}`, this.cssVariables[key]);
      }
    }

    if(this.title !== null) this.yLoc = this.yLoc + this.titleY;
    if(this.subTitle !== null) this.yLoc = this.yLoc + this.subtitleY;
    this.ctrWidth = this.width - this.marginLeft - 10;
    this.ctrHeight = this.height - this.marginBottom - this.yLoc
  },
  methods: {
    drawXtic(item){
      return `M ${item.loc} 0 V 10 Z`
    },
    drawYtic(item){
      //console.log(`tic label: ${item.label}`)
      return `M 0 ${item.loc} H -10 Z`
    },
    mouse_legend_down(e){
      return mouse_down(e)
    },
    mouse_legend_move(e){
      return mouse_move(e);
    },
    mouse_legend_end(e){
      return mouse_end(e);
    },
    mouse_over_point(e, index){
      this.$emit('PointsPlotCompHover',{x: this.x[index], y: this.y[index]});
    },
    mouse_leave_point(e){
      this.$emit('PointsPlotCompHover',{x: "", y: ""});
    }
  }
};
</script>

<style>
  :root {
    --points_plot_comp_font_family: Verdana,serif;
    --points_plot_comp_background: white;
    --points_plot_comp_axis_color: black;
    --points_plot_comp_point_opacity: 0.6;

    --points_plot_comp_title_color: black;
  }

  #container {
    font-family: var(--points_plot_comp_font_family);
    background-color: var(--points_plot_comp_background);
  }
  .titles {
    text-anchor: middle;
    font-weight: bold;
    fill: var(--points_plot_comp_title_color);
  }
  .ticLines {
    stroke: var(--points_plot_comp_axis_color);
  }
  .ticLabels {
    text-anchor: middle;
    font-weight: bold;
    font-size: 11px;
    color: var(--points_plot_comp_axis_color);
  }
  .axisTitle {
    text-anchor: middle;
    font-weight: bold;
    font-size: 16px;
    color: var(--points_plot_comp_axis_color);
  }
  .points {
    opacity: var(--points_plot_comp_point_opacity);
    cursor: pointer;
  }
  #legend {
    cursor: move;
    background: transparent;
  }
</style>