import "./PointsPlotComp.css";
import {openBlock as $5c8ij$openBlock, createElementBlock as $5c8ij$createElementBlock, createElementVNode as $5c8ij$createElementVNode, toDisplayString as $5c8ij$toDisplayString, createCommentVNode as $5c8ij$createCommentVNode, Fragment as $5c8ij$Fragment, renderList as $5c8ij$renderList, normalizeStyle as $5c8ij$normalizeStyle} from "vue";

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequirecc9f"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequirecc9f"] = parcelRequire;
}
parcelRequire.register("21e52", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $178698ce9e3a2c58$export$2e2bcd8739ae039);

var $jh7Fu = parcelRequire("jh7Fu");

var $ePcHl = parcelRequire("ePcHl");
var $178698ce9e3a2c58$export$2e2bcd8739ae039 = {
    name: "PointsPlotComp",
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
            default: ""
        },
        yLabel: {
            type: String,
            default: ""
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
            default: 60
        },
        marginBottom: {
            type: Number,
            default: 60
        },
        pointStroke: {
            type: String,
            default: "#000000"
        },
        pointFill: {
            type: String,
            default: "#FFFFFF"
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
            default: ()=>{
                return null;
            }
        },
        fitPointColor: {
            type: String,
            default: "#FF1940"
        },
        grouping: {
            type: Object,
            default: ()=>{
                return {};
            }
        },
        cssVariables: {
            type: Object,
            default: null
        }
    },
    emits: {
        "PointsPlotCompHover": null
    },
    data () {
        return {
            fit_data: null,
            titleY: 20,
            subtitleY: 45,
            yLoc: 10,
            ctrWidth: 0,
            ctrHeight: 0,
            yLabelStyle: {
                transform: "rotate(270deg)",
                textAnchor: "middle",
                fontSize: "16px",
                fontWeight: "bold"
            }
        };
    },
    computed: {
        drawXaxis () {
            return `M 0 0 H ${this.ctrWidth}`;
        },
        drawYaxis () {
            return `M 0 0 V ${this.ctrHeight}`;
        },
        xScale () {
            return this.ctrWidth / (this.xLimits.max - this.xLimits.min);
        },
        xLimits () {
            const xaxis = {
                min: 0,
                max: 1,
                step: 1
            };
            if (this.xAxis !== null) {
                xaxis.min = this.xAxis.min;
                xaxis.max = this.xAxis.max;
                xaxis.step = this.xAxis.step;
            } else if (this.x !== null) {
                const nice_tics = (0, $jh7Fu.default)(this.x, 10);
                xaxis.min = nice_tics.min;
                xaxis.max = nice_tics.max;
                xaxis.step = nice_tics.step;
            }
            return xaxis;
        },
        xTics () {
            const xtics = [];
            const xN = Math.round((this.xLimits.max - this.xLimits.min) / this.xLimits.step);
            for(let i = 0; i < xN + 1; i++){
                const value = this.xLimits.min + i * this.xLimits.step;
                xtics.push({
                    loc: (value - this.xLimits.min) * this.xScale,
                    label: value
                });
            }
            return xtics;
        },
        yScale () {
            return this.ctrHeight / (this.yLimits.max - this.yLimits.min);
        },
        yLimits () {
            const yaxis = {
                min: 0,
                max: 1,
                step: 1
            };
            if (this.yAxis !== null) {
                yaxis.min = this.yAxis.min;
                yaxis.max = this.yAxis.max;
                yaxis.step = this.yAxis.step;
            } else if (this.y !== null) {
                //console.log(`y: ${this.y}`);
                const nice_tics = (0, $jh7Fu.default)(this.y, 10);
                yaxis.min = nice_tics.min;
                yaxis.max = nice_tics.max;
                yaxis.step = nice_tics.step;
            //console.log(`ymin: ${yaxis.min} ymax: ${yaxis.max} step: ${yaxis.step}`);
            }
            return yaxis;
        },
        yTics () {
            const ytics = [];
            const yN = Math.round((this.yLimits.max - this.yLimits.min) / this.yLimits.step);
            //console.log(`yN: ${yN} yScale: ${this.yScale}`);
            for(let i = 0; i < yN + 1; i++){
                const value = this.yLimits.min + i * this.yLimits.step;
                // console.log(`value: ${value}`);
                ytics.push({
                    loc: this.ctrHeight - i * this.yLimits.step * this.yScale,
                    label: value
                });
            }
            return ytics;
        },
        translateXAxis () {
            return `translate(${this.marginLeft} ${this.ctrHeight + this.yLoc})`;
        },
        translateYAxis () {
            return `translate(${this.marginLeft} ${this.yLoc})`;
        },
        translatePoints () {
            return `translate(${this.marginLeft} ${this.yLoc})`;
        },
        getGroups () {
            const groups = [];
            let index = 0;
            if (this.x !== null && this.y !== null) {
                // For non-grouping case
                if (this.grp === null) {
                    const group = [];
                    for(let i = 0; i < this.x.length; i++){
                        const obj = {
                            x: this.x[i],
                            y: this.y[i],
                            index: index,
                            stroke: this.pointStroke,
                            fill: this.pointFill
                        };
                        group.push(obj);
                        index++;
                    }
                    groups.push(group);
                } else {
                    const group_names = Object.keys(this.grouping);
                    const group_data = {};
                    for (let name of group_names)group_data[name] = [];
                    for(let i = 0; i < this.x.length; i++)if (group_names.indexOf(this.grp[i]) !== -1) {
                        const obj = {
                            x: this.x[i],
                            y: this.y[i],
                            index: index,
                            stroke: this.grouping[this.grp[i]].stroke,
                            fill: this.grouping[this.grp[i]].fill
                        };
                        group_data[this.grp[i]].push(obj);
                        index++;
                    }
                    for (let key of Object.keys(group_data))groups.push(group_data[key]);
                }
            }
            return groups;
        },
        getFittedData () {
            const fitted_data = [];
            for(let i = 1; i < this.fitData.length; i++){
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
    mounted () {
        if (this.cssVariables !== null) for (let key of Object.keys(this.cssVariables))this.$el.style.setProperty(`--${key}`, this.cssVariables[key]);
        if (this.title !== null) this.yLoc = this.yLoc + this.titleY;
        if (this.subTitle !== null) this.yLoc = this.yLoc + this.subtitleY;
        this.ctrWidth = this.width - this.marginLeft - 10;
        this.ctrHeight = this.height - this.marginBottom - this.yLoc;
    },
    methods: {
        drawXtic (item) {
            return `M ${item.loc} 0 V 10 Z`;
        },
        drawYtic (item) {
            //console.log(`tic label: ${item.label}`)
            return `M 0 ${item.loc} H -10 Z`;
        },
        mouse_legend_down (e) {
            return (0, $ePcHl.mouse_down)(e);
        },
        mouse_legend_move (e) {
            return (0, $ePcHl.mouse_move)(e);
        },
        mouse_legend_end (e) {
            return (0, $ePcHl.mouse_end)(e);
        },
        mouse_over_point (e, index) {
            this.$emit("PointsPlotCompHover", {
                x: this.x[index],
                y: this.y[index]
            });
        },
        mouse_leave_point (e) {
            this.$emit("PointsPlotCompHover", {
                x: "",
                y: ""
            });
        }
    }
};

});
parcelRequire.register("jh7Fu", function(module, exports) {

$parcel$export(module.exports, "default", () => $e0858d9af9fe471a$export$2e2bcd8739ae039);
/**
 * Created by Rick on 2022-05-26.
 */ "use strict";
function $e0858d9af9fe471a$export$2e2bcd8739ae039(data, maxTicks) {
    function nice_number(range, round) {
        const exp = Math.floor(Math.log10(range));
        const frac = range / Math.pow(10, exp);
        let niceFrac;
        if (round) {
            if (frac < 1.5) niceFrac = 1;
            else if (frac <= 3) niceFrac = 2;
            else if (frac <= 7) niceFrac = 5;
            else niceFrac = 10;
        } else {
            if (frac < 1) niceFrac = 1;
            else if (frac <= 2) niceFrac = 2;
            else if (frac <= 5) niceFrac = 5;
            else niceFrac = 10;
        }
        return niceFrac * Math.pow(10, exp);
    }
    let min = data[0];
    for(let i = 1; i < data.length; i++)if (data[i] < min) min = data[i];
    let max = data[0];
    for(let i1 = 1; i1 < data.length; i1++)if (data[i1] > max) max = data[i1];
    const range1 = nice_number(max - min, false);
    const tickSpacing = nice_number(range1 / (maxTicks - 1), true);
    const niceMin = Math.floor(min / tickSpacing) * tickSpacing;
    const niceMax = Math.ceil(max / tickSpacing) * tickSpacing;
    return {
        min: niceMin,
        max: niceMax,
        step: tickSpacing
    };
}

});

parcelRequire.register("ePcHl", function(module, exports) {

$parcel$export(module.exports, "mouse_down", () => $acafadb653ab98dd$export$6b46ca70a9bd0eab);
$parcel$export(module.exports, "mouse_move", () => $acafadb653ab98dd$export$da7eae10901c483d);
$parcel$export(module.exports, "mouse_end", () => $acafadb653ab98dd$export$b648c78575241103);
/**
 * Created by Rick on 2022-06-03.
 */ "use strict";
const $acafadb653ab98dd$var$move_target = {
    "node": null,
    "start_move": false,
    "click_x": null,
    "click_y": null,
    "move_x": 0,
    "move_y": 0
};
function $acafadb653ab98dd$export$6b46ca70a9bd0eab(e) {
    $acafadb653ab98dd$var$move_target.click_x = e.clientX;
    $acafadb653ab98dd$var$move_target.click_y = e.clientY;
    $acafadb653ab98dd$var$move_target.node = e.target.parentNode;
    if ($acafadb653ab98dd$var$move_target.node.last_move_x === undefined) {
        $acafadb653ab98dd$var$move_target.node.last_move_x = 0;
        $acafadb653ab98dd$var$move_target.node.last_move_y = 0;
    }
    $acafadb653ab98dd$var$move_target.start_move = true;
}
function $acafadb653ab98dd$export$da7eae10901c483d(e) {
    if ($acafadb653ab98dd$var$move_target.start_move) {
        $acafadb653ab98dd$var$move_target.move_x = $acafadb653ab98dd$var$move_target.node.last_move_x + e.clientX - $acafadb653ab98dd$var$move_target.click_x;
        $acafadb653ab98dd$var$move_target.move_y = $acafadb653ab98dd$var$move_target.node.last_move_y + e.clientY - $acafadb653ab98dd$var$move_target.click_y;
        $acafadb653ab98dd$var$move_target.node.setAttribute("transform", `translate(${$acafadb653ab98dd$var$move_target.move_x},${$acafadb653ab98dd$var$move_target.move_y})`);
    }
}
function $acafadb653ab98dd$export$b648c78575241103(e) {
    $acafadb653ab98dd$var$move_target.start_move = false;
    if ($acafadb653ab98dd$var$move_target.node !== null) {
        $acafadb653ab98dd$var$move_target.node.last_move_x = $acafadb653ab98dd$var$move_target.move_x;
        $acafadb653ab98dd$var$move_target.node.last_move_y = $acafadb653ab98dd$var$move_target.move_y;
    }
}

});


parcelRequire.register("4FlDc", function(module, exports) {

$parcel$export(module.exports, "render", () => $365bc540dfa4b1a6$export$b3890eb0ae9dca99);

const $365bc540dfa4b1a6$var$_hoisted_1 = {
    id: "container"
};
const $365bc540dfa4b1a6$var$_hoisted_2 = [
    "width",
    "height"
];
const $365bc540dfa4b1a6$var$_hoisted_3 = [
    "x",
    "y"
];
const $365bc540dfa4b1a6$var$_hoisted_4 = [
    "x",
    "y"
];
const $365bc540dfa4b1a6$var$_hoisted_5 = [
    "transform"
];
const $365bc540dfa4b1a6$var$_hoisted_6 = [
    "d"
];
const $365bc540dfa4b1a6$var$_hoisted_7 = [
    "d"
];
const $365bc540dfa4b1a6$var$_hoisted_8 = [
    "x"
];
const $365bc540dfa4b1a6$var$_hoisted_9 = [
    "x"
];
const $365bc540dfa4b1a6$var$_hoisted_10 = [
    "transform"
];
const $365bc540dfa4b1a6$var$_hoisted_11 = [
    "d"
];
const $365bc540dfa4b1a6$var$_hoisted_12 = [
    "d"
];
const $365bc540dfa4b1a6$var$_hoisted_13 = [
    "y"
];
const $365bc540dfa4b1a6$var$_hoisted_14 = [
    "x",
    "y"
];
const $365bc540dfa4b1a6$var$_hoisted_15 = [
    "transform"
];
const $365bc540dfa4b1a6$var$_hoisted_16 = [
    "fill",
    "cx",
    "cy",
    "r",
    "onMouseover"
];
const $365bc540dfa4b1a6$var$_hoisted_17 = [
    "transform"
];
const $365bc540dfa4b1a6$var$_hoisted_18 = [
    "x1",
    "y1",
    "x2",
    "y2"
];
const $365bc540dfa4b1a6$var$_hoisted_19 = [
    "transform"
];
const $365bc540dfa4b1a6$var$_hoisted_20 = [
    "x1",
    "y1",
    "x2",
    "y2"
];
const $365bc540dfa4b1a6$var$_hoisted_21 = [
    "fill",
    "cx",
    "cy",
    "r"
];
const $365bc540dfa4b1a6$var$_hoisted_22 = [
    "x",
    "y"
];
function $365bc540dfa4b1a6$export$b3890eb0ae9dca99(_ctx, _cache, $props, $setup, $data, $options) {
    return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("div", $365bc540dfa4b1a6$var$_hoisted_1, [
        ((0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("svg", {
            width: $props.width,
            height: $props.height
        }, [
            (0, $5c8ij$createElementVNode)("g", null, [
                $props.title ? ((0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("text", {
                    key: 0,
                    class: "titles",
                    "font-size": 28,
                    x: $props.width / 2,
                    y: $data.titleY
                }, (0, $5c8ij$toDisplayString)($props.title), 9, $365bc540dfa4b1a6$var$_hoisted_3)) : (0, $5c8ij$createCommentVNode)("", true),
                $props.subTitle ? ((0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("text", {
                    key: 1,
                    class: "titles",
                    "font-size": 20,
                    x: $props.width / 2,
                    y: $data.subtitleY
                }, (0, $5c8ij$toDisplayString)($props.subTitle), 9, $365bc540dfa4b1a6$var$_hoisted_4)) : (0, $5c8ij$createCommentVNode)("", true),
                (0, $5c8ij$createElementVNode)("g", {
                    id: "xAxisGroup",
                    transform: $options.translateXAxis
                }, [
                    (0, $5c8ij$createElementVNode)("path", {
                        class: "ticLines",
                        d: $options.drawXaxis
                    }, null, 8, $365bc540dfa4b1a6$var$_hoisted_6),
                    ((0, $5c8ij$openBlock)(true), (0, $5c8ij$createElementBlock)((0, $5c8ij$Fragment), null, (0, $5c8ij$renderList)($options.xTics, (item, index)=>{
                        return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("path", {
                            key: index,
                            class: "ticLines",
                            d: $options.drawXtic(item)
                        }, null, 8, $365bc540dfa4b1a6$var$_hoisted_7);
                    }), 128)),
                    ((0, $5c8ij$openBlock)(true), (0, $5c8ij$createElementBlock)((0, $5c8ij$Fragment), null, (0, $5c8ij$renderList)($options.xTics, (item, index)=>{
                        return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("text", {
                            key: index,
                            class: "ticLabels",
                            x: item.loc,
                            y: 20
                        }, (0, $5c8ij$toDisplayString)(item.label), 9, $365bc540dfa4b1a6$var$_hoisted_8);
                    }), 128)),
                    (0, $5c8ij$createElementVNode)("text", {
                        class: "axisTitle",
                        x: $data.ctrWidth / 2,
                        y: 50
                    }, (0, $5c8ij$toDisplayString)($props.xLabel), 9, $365bc540dfa4b1a6$var$_hoisted_9)
                ], 8, $365bc540dfa4b1a6$var$_hoisted_5),
                (0, $5c8ij$createElementVNode)("g", {
                    id: "yAxisGroup",
                    transform: $options.translateYAxis
                }, [
                    (0, $5c8ij$createElementVNode)("path", {
                        class: "ticLines",
                        d: $options.drawYaxis
                    }, null, 8, $365bc540dfa4b1a6$var$_hoisted_11),
                    ((0, $5c8ij$openBlock)(true), (0, $5c8ij$createElementBlock)((0, $5c8ij$Fragment), null, (0, $5c8ij$renderList)($options.yTics, (item, index)=>{
                        return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("path", {
                            key: index,
                            class: "ticLines",
                            d: $options.drawYtic(item)
                        }, null, 8, $365bc540dfa4b1a6$var$_hoisted_12);
                    }), 128)),
                    ((0, $5c8ij$openBlock)(true), (0, $5c8ij$createElementBlock)((0, $5c8ij$Fragment), null, (0, $5c8ij$renderList)($options.yTics, (item, index)=>{
                        return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("text", {
                            key: index,
                            class: "ticLabels",
                            x: -20,
                            y: item.loc
                        }, (0, $5c8ij$toDisplayString)(item.label), 9, $365bc540dfa4b1a6$var$_hoisted_13);
                    }), 128)),
                    (0, $5c8ij$createElementVNode)("text", {
                        x: -$data.ctrHeight / 2,
                        y: -$props.marginLeft + 15,
                        style: (0, $5c8ij$normalizeStyle)($data.yLabelStyle)
                    }, (0, $5c8ij$toDisplayString)($props.yLabel), 13, $365bc540dfa4b1a6$var$_hoisted_14)
                ], 8, $365bc540dfa4b1a6$var$_hoisted_10),
                (0, $5c8ij$createElementVNode)("g", {
                    id: "pointsGroup",
                    transform: $options.translatePoints
                }, [
                    ((0, $5c8ij$openBlock)(true), (0, $5c8ij$createElementBlock)((0, $5c8ij$Fragment), null, (0, $5c8ij$renderList)($options.getGroups, (group)=>{
                        return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("g", null, [
                            ((0, $5c8ij$openBlock)(true), (0, $5c8ij$createElementBlock)((0, $5c8ij$Fragment), null, (0, $5c8ij$renderList)(group.length, (i)=>{
                                return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("circle", {
                                    class: "points",
                                    style: (0, $5c8ij$normalizeStyle)({
                                        stroke: group[i - 1].stroke
                                    }),
                                    fill: group[i - 1].fill,
                                    cx: (group[i - 1].x - $options.xLimits.min) * $options.xScale,
                                    cy: $data.ctrHeight - (group[i - 1].y - $options.yLimits.min) * $options.yScale,
                                    r: $props.pointSize,
                                    onMouseover: ($event)=>$options.mouse_over_point($event, group[i - 1].index),
                                    onMouseleave: _cache[0] || (_cache[0] = ($event)=>$options.mouse_leave_point($event))
                                }, (0, $5c8ij$toDisplayString)(group[i - 1].icon), 45, $365bc540dfa4b1a6$var$_hoisted_16);
                            }), 256))
                        ]);
                    }), 256))
                ], 8, $365bc540dfa4b1a6$var$_hoisted_15),
                $props.connectPoints ? ((0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("g", {
                    key: 2,
                    id: "linesGroup",
                    transform: $options.translatePoints
                }, [
                    ((0, $5c8ij$openBlock)(true), (0, $5c8ij$createElementBlock)((0, $5c8ij$Fragment), null, (0, $5c8ij$renderList)($options.getGroups, (group)=>{
                        return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("g", null, [
                            ((0, $5c8ij$openBlock)(true), (0, $5c8ij$createElementBlock)((0, $5c8ij$Fragment), null, (0, $5c8ij$renderList)(group.length - 1, (i)=>{
                                return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("line", {
                                    style: (0, $5c8ij$normalizeStyle)({
                                        stroke: group[i - 1].stroke
                                    }),
                                    x1: (group[i - 1].x - $options.xLimits.min) * $options.xScale,
                                    y1: $data.ctrHeight - (group[i - 1].y - $options.yLimits.min) * $options.yScale,
                                    x2: (group[i].x - $options.xLimits.min) * $options.xScale,
                                    y2: $data.ctrHeight - (group[i].y - $options.yLimits.min) * $options.yScale
                                }, null, 12, $365bc540dfa4b1a6$var$_hoisted_18);
                            }), 256))
                        ]);
                    }), 256))
                ], 8, $365bc540dfa4b1a6$var$_hoisted_17)) : (0, $5c8ij$createCommentVNode)("", true),
                $props.fitData ? ((0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("g", {
                    key: 3,
                    id: "fitGroup",
                    transform: $options.translatePoints
                }, [
                    ((0, $5c8ij$openBlock)(true), (0, $5c8ij$createElementBlock)((0, $5c8ij$Fragment), null, (0, $5c8ij$renderList)($options.getFittedData, (item, index)=>{
                        return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("line", {
                            key: index,
                            style: (0, $5c8ij$normalizeStyle)({
                                stroke: $props.fitPointColor
                            }),
                            x1: (item.x1 - $options.xLimits.min) * $options.xScale,
                            y1: $data.ctrHeight - (item.y1 - $options.yLimits.min) * $options.yScale,
                            x2: (item.x2 - $options.xLimits.min) * $options.xScale,
                            y2: $data.ctrHeight - (item.y2 - $options.yLimits.min) * $options.yScale
                        }, null, 12, $365bc540dfa4b1a6$var$_hoisted_20);
                    }), 128))
                ], 8, $365bc540dfa4b1a6$var$_hoisted_19)) : (0, $5c8ij$createCommentVNode)("", true),
                $props.grouping ? ((0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("g", {
                    key: 4,
                    id: "legend",
                    onMousedown: _cache[1] || (_cache[1] = ($event)=>$options.mouse_legend_down($event)),
                    onMousemove: _cache[2] || (_cache[2] = ($event)=>$options.mouse_legend_move($event)),
                    onMouseup: _cache[3] || (_cache[3] = ($event)=>$options.mouse_legend_end($event)),
                    onMouseout: _cache[4] || (_cache[4] = ($event)=>$options.mouse_legend_end($event))
                }, [
                    ((0, $5c8ij$openBlock)(true), (0, $5c8ij$createElementBlock)((0, $5c8ij$Fragment), null, (0, $5c8ij$renderList)($props.grouping, (item, key, index)=>{
                        return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("circle", {
                            key: index,
                            fill: item.fill,
                            cx: .85 * $data.ctrWidth,
                            cy: 0.2 * $data.ctrHeight + index * 30 - 5,
                            r: $props.pointSize
                        }, null, 8, $365bc540dfa4b1a6$var$_hoisted_21);
                    }), 128)),
                    ((0, $5c8ij$openBlock)(true), (0, $5c8ij$createElementBlock)((0, $5c8ij$Fragment), null, (0, $5c8ij$renderList)($props.grouping, (item, key, index)=>{
                        return (0, $5c8ij$openBlock)(), (0, $5c8ij$createElementBlock)("text", {
                            key: index,
                            style: (0, $5c8ij$normalizeStyle)({
                                stroke: item.stroke
                            }),
                            x: .85 * $data.ctrWidth + 20,
                            y: 0.2 * $data.ctrHeight + index * 30
                        }, (0, $5c8ij$toDisplayString)(key), 13, $365bc540dfa4b1a6$var$_hoisted_22);
                    }), 128))
                ], 32)) : (0, $5c8ij$createCommentVNode)("", true)
            ])
        ], 8, $365bc540dfa4b1a6$var$_hoisted_2))
    ]);
}

});

parcelRequire.register("8WtaD", function(module, exports) {

$parcel$export(module.exports, "default", () => $682a5e2eeba13001$export$2e2bcd8739ae039);
let $682a5e2eeba13001$var$NOOP = ()=>{};
var $682a5e2eeba13001$export$2e2bcd8739ae039 = (script)=>{};

});

let $68c7e742f55826b2$var$script;




let $68c7e742f55826b2$var$initialize = ()=>{
    $68c7e742f55826b2$var$script = (parcelRequire("21e52"));
    if ($68c7e742f55826b2$var$script.__esModule) $68c7e742f55826b2$var$script = $68c7e742f55826b2$var$script.default;
    $68c7e742f55826b2$var$script.render = (parcelRequire("4FlDc")).render;
    $68c7e742f55826b2$var$script.__cssModules = {};
    (parcelRequire("8WtaD")).default($68c7e742f55826b2$var$script);
    $68c7e742f55826b2$var$script.__scopeId = "data-v-be41dd";
    $68c7e742f55826b2$var$script.__file = "PointsPlotComp.vue";
};
$68c7e742f55826b2$var$initialize();
var $68c7e742f55826b2$export$2e2bcd8739ae039 = $68c7e742f55826b2$var$script;


export {$68c7e742f55826b2$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=PointsPlotComp.js.map
