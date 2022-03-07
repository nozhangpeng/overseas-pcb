<template>
  <div class="echarts" ref="container"></div>
</template>

<script>
const colors = ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8']
import echarts from 'echarts'

export default {
  name: 'echarts',
  props: ['options', 'loading', 'autoInit'],
  watch: {
    options: {
      handler (newOptions) {
        if (!this.chart) return
        newOptions.color = colors
        if (newOptions) this.chart.setOption(newOptions, true)
      },
      deep: true
    },
    loading: 'updateLoading'
  },
  methods: {
    self () {
      return this.chart
    },
    // 必须在容器可见时调用 resize() 方法来初始化图表，否则 clientWidth / clientHeight 为 0 导致 ECharts 报错
    resize () {
      if (!this.inited) {
        this.inited = true
        if (this.destroyed) return
        this.chart = echarts.init(this.$refs.container, 'light')
        if (this.options) {
          this.options.color = colors
          this.chart.setOption(this.options)
        }
        this.updateLoading()
        window.addEventListener('resize', this.resize)
      } else if (this.chart) {
        this.chart.resize()
      }
    },
    updateLoading () {
      if (!this.chart) return
      if (this.loading) {
        this.chart.showLoading({
          text: '加载中',
          color: '#20a0ff'
        })
      } else {
        this.chart.hideLoading()
      }
    }
  },
  mounted () {
    if (this.autoInit) {
      this.resize()
    }
  },
  beforeDestroy () {
    this.destroyed = true
    if (!this.chart) return
    this.chart.dispose()
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 450px;
}
</style>
