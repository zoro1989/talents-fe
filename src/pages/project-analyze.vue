<template>
  <div class="project-analyze">
    <div class="person-percent">
      <div class="menu">
        <mu-select-field class="item" v-model="chartBgData.personalTarget" @change="changePersonalTarget" label="个人信息指标" hintText="请选择">
          <mu-menu-item v-for="item in chartBgData.personalDicList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
        </mu-select-field>
        <mu-select-field class="item" v-model="chartBgData.techTarget" @change="changeTechTarget" label="技术指标" hintText="请选择">
          <mu-menu-item v-for="item in chartBgData.techDicList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
        </mu-select-field>
        <!--<mu-select-field class="item" v-model="chartBgData.projectTarget" label="项目指标" hintText="请选择">-->
          <!--<mu-menu-item v-for="item in chartBgData.projectDicList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>-->
        <!--</mu-select-field>-->
        <!--<mu-select-field class="item" v-model="chartBgData.projectTarget" label="时间跨度" hintText="请选择">-->
          <!--<mu-menu-item value="0" title="日"/>-->
          <!--<mu-menu-item value="1" title="月"/>-->
          <!--<mu-menu-item value="2" title="年"/>-->
        <!--</mu-select-field>-->
      </div>
      <div class="chart">
        <div class="show" ref="show1"></div>
      </div>
    </div>
    <div class="person-percent-tendency">
      <div class="chart">
        <div class="show" ref="show2"></div>
        <div class="show" ref="show3"></div>
      </div>
    </div>
    <tkm-loading ref="loading"></tkm-loading>
    <tkm-message ref="message" :message="message"></tkm-message>
  </div>
</template>
<script>
  import projectAnalyze from 'service/project-analyze'
  import {talentsMixin, messageMinxin} from 'common/js/mixin'
  const echarts = require('echarts')
  export default {
    mixins: [talentsMixin, messageMinxin],
    data() {
      return {
        chartBgData: {}
      }
    },
    created () {
      projectAnalyze.get.bind(this)({}, (data) => {
        this.chartBgData = data
      }, () => {
//      this.$message.error(err)
      })
    },
    methods: {
      changeTechTarget(value) {
        this.getChartData('1', value)
      },
      changePersonalTarget(value) {
        this.getChartData('0', value)
      },
      getChartData(type, value) {
        projectAnalyze.getChartPieData.bind(this)({type: type, dicValue: value}, (data) => {
          this.makeCharts1(data)
          let xAxisData = []
          let seriesData = []
          for (let item of data) {
            xAxisData.push(item.name)
            seriesData.push(item.value)
          }
          this.makeCharts2(xAxisData, seriesData)
          this.makeCharts3(xAxisData, seriesData)
        }, () => {
//      this.$message.error(err)
        })
      },
      makeCharts1(data) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.show1, 'dark')
        // 绘制图表
        myChart.setOption({
          backgroundColor: '#2c343c',
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              data: data,
              roseType: 'angle',
              itemStyle: {
                normal: {
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }, true)
      },
      makeCharts2(xAxisData, seriesData) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.show2, 'dark')
        // 绘制图表
        myChart.setOption({
          backgroundColor: '#2c343c',
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: xAxisData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: seriesData
            }
          ]
        })
      },
      makeCharts3(xAxisData, seriesData) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.show3, 'dark')
        // 绘制图表
        myChart.setOption({
          backgroundColor: '#2c343c',
          xAxis: {
            type: 'category',
            data: xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: seriesData,
            type: 'line',
            smooth: true
          }]
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  .show
    display: inline-block
    margin: 20px
    width: 500px
    height: 500px
</style>
