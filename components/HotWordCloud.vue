<template>
	<view class="hot-word-cloud-whole">
		<option-card :options="options" @change="handleTrendChange($event)"></option-card>
		<canvas
			canvas-id="canvasWord"
			id="canvasWord"
			class="hot-word-cloud-charts"
			@click="handleTrendClickWord"
		></canvas>
	</view>
</template>

<script>
	import uCharts from '../js_sdk/u-charts/u-charts/u-charts.js'
	import OptionCard from './OptionCard/OptionCard.vue'
	import request from '../utils/request.js'
	export default {
		name: 'HotWordCloud',
		components: {
			OptionCard
		},
		data () {
			return {
				options: ['今日', '本周', '本月', '今年'],
				offset: [
					3600 * 24,
					3600 * 24 * 7,
					3600 * 24 * 30,
					3600 * 24 * 365
				],
				series: [],
				ref: null,
				index: 0
			}
		},
		mounted () {
			this.handleTrendChange(0)
		},
		methods: {
			handleTrendClickWord (e) {
				const index = this.ref.getCurrentDataIndex(e)
				if (index < 0) return
				const { name } = this.series[index]
				const time = Math.round(new Date().getTime() / 1000)
				this.$showWord(time - this.offset[this.index], time, name)
			},
			handleTrendChange ($index) {
				this.index = $index
				const time = Math.round(new Date().getTime() / 1000)
				request(`/trend/${time - this.offset[this.index]}/${time}`).then(res => {
					this.series = Object.keys(res.data).map(item => {
						return {
							name: item,
							textSize: 16 + 9 * res.data[item]
						}
					})
					this.ref = new uCharts({
						$this: this,
						canvasId: 'canvasWord',
						type: 'word',
						background: 'white',
						animation: true,
						pixelRatio: 1,
						series: this.series,
						width: uni.upx2px(686),
						height: uni.upx2px(400),
						extra: {
							word: {
								type: 'normal'
							}
						}
					})
				})
			}
		}
	}
</script>

<style lang="less">
	.hot-word-cloud-whole {
		display: grid;
		grid-template-columns: 100%;
		gap: 32upx;
		.hot-word-cloud-charts {
			width: 686upx;
			height: 400upx;
		}
	}
</style>
