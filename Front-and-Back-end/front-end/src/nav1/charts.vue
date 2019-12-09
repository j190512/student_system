<template>
  <div class="chart">
    <div id="BarChart" :style="{width: '300px', height: '300px'}"></div>
    <div id="PieChart" :style="{width: '400px', height: '300px'}"></div>
  </div>
</template>

<script>

// import echarts from "echarts";
//引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图饼状图等组件
require('echarts/lib/chart/pie')
require('echarts/lib/chart/bar')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  data() {
    return {
      
    };
  },
  mounted() {
    this.$init;
    this.drawLineBar();
    this.drawLinePie();
  },
  methods: {
    //柱状图
    drawLineBar() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("BarChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "专业人数柱状图", x: "left" },
        //提示框
        tooltip: {
          formatter: function(params) {
            console.log(params);
            return `${params.name} : ${params.data}`;
          }
        },
        xAxis: {
          data: ["语文", "英语", "数学"]
        },
        yAxis: [
          {
            // 纵轴标尺固定
            type: "value",
            scale: true,
            max: 50,
            min: 0,
            splitNumber: 5,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: "人数",
            type: "bar",
            data: [
              this.$store.getters.getMajorTotal("语文"),
              this.$store.getters.getMajorTotal("英语"),
              this.$store.getters.getMajorTotal("数学")
            ],
            itemStyle: {
              normal: {
                //这里是重点 设置柱子颜色
                color: function(params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "yellowgreen",
                    "green",
                    "blue",
                    "white",
                    "red"
                  ];
                  return colorList[params.dataIndex];
                },
                //柱子上方显示文字
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 12
                  }
                }
              }
            },
            barWidth: "40px"
          }
        ]
      });
    },
    //饼状图
    drawLinePie() {
      let myChart = echarts.init(document.getElementById("PieChart"));
      myChart.setOption({
        title: { text: "男女比例图", x: "right" },
        tooltip: {
          //格式化
          formatter: function(params) {
            return params.data.name+' : '+params.data.value+'人';
          }
        },
        backgroundColor: "rgba(0,0,0,.3)",
        //解释 说明 图例
        legend: {
          orient: "vertical",
          x: "left",
          data: ["男", "女"],
          textStyle: {
            color: "white"
          }
        },
        //设置饼状图每个颜色块的颜色
        color: ["green", "blue", "indigo", "purple"],
        series: [
          {
            name: "饼图",
            type: "pie",
            radius: "55%", //饼图的半径大小
            center: ["50%", "55%"], //饼图的位置
            data: [
              { value: this.$store.getters.getSexTotal("1"), name: "男" },
              { value: this.$store.getters.getSexTotal("0"), name: "女" }
            ],
            label: {
              normal: {
                //折线（区域）图、柱状（条形）图、K线图 : {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
                // 散点图（气泡）图 : {a}（系列名称），{b}（数据名称），{c}（数值数组）, {d}（无）
                // 地图 : {a}（系列名称），{b}（区域名称），{c}（合并数值）, {d}（无）
                // 饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
                // formatter: "{b}:{c} ({d}%)",
                formatter: "{b|{b}}({c|{c}}) {per|{d}%}",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 15,
                  rich: {
                    c: {
                      color: "white"
                    }
                  }
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "white"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },

            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.chart {
  div {
    display: inline-block;
    border: 1px solid #b3c0d1;
  }
}
</style>