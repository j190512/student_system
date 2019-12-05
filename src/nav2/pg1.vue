<template>
  <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '年级人数柱状图' },
            tooltip: {},
            xAxis: {
                data: ["语文","英语","数学"]
            },
            yAxis: [
              {
                type:'value'
              }
            ],
            series: [{
                name: '人数',
                type: 'bar',
                data: [this.$store.getters.getMajorTotal('语文'), this.$store.getters.getMajorTotal('英语'), this.$store.getters.getMajorTotal('数学')]
            }]
        });
    }
  }
}
</script>

<style>

</style>