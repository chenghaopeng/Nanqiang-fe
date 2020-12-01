<template>
	<popup-view @mounted="handleMounted">
		<view class="word-whole">
			<view class="word-title">{{ word }} 的情感趋势</view>
			<scroll-view scroll-x="true">
				<canvas canvas-id="canvasLine" id="canvasLine" class="word-charts" :style="{ width: width + 'px' } "></canvas>
			</scroll-view>
			<view v-for="message in this.data" :key="message.id" class="word-content" @click="$showContent(message.id)">
				{{ message.content ? message.content : new DateFormat(message.time * 1000).toString()}}
			</view>
		</view>
	</popup-view>
</template>

<script>
	import Vue from 'vue'
	import request from '../../utils/request.js'
	import PopupView from '../../components/PopupView.vue'
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js'
	import DateFormat from '../../js_sdk/xfl-DateFormat/DateFormat.js'
	export default {
		components: {
			PopupView
		},
		data() {
			return {
				hook: null,
				word: null,
				data: [],
				ref: null,
				width: null
			}
		},
		methods: {
			handleMounted (hook) {
				this.hook = hook
			},
			load (begin, end, word) {
				this.data = []
				this.begin = begin
				this.end = end
				this.word = word
				this.hook()
				request(`/trend/${begin}/${end}/${word}`).then(res => {
					this.data = res.data
					this.width = uni.upx2px(Object.keys(this.data).length * 160)
					this.ref = new uCharts({
						$this: this,
						canvasId: 'canvasLine',
						type: 'line',
						legend: {
							show: false
						},
						dataPointShape: true,
						background: 'white',
						pixelRatio: 1,
						categories: Object.keys(this.data).map(key => new DateFormat(this.data[key].time * 1000).toString().split(' ')[0]),
						series: [{
							name: '情感趋势',
							data: Object.keys(this.data).map(key => this.data[key].score)
						}],
						animation: true,
						padding: [0, 48, 0, 0],
						xAxis: {
							type: 'grid',
							gridColor: '#CCCCCC',
							gridType: 'dash',
							dashLength: 8,
						  boundaryGap: 'justify'
						},
						yAxis: {
							gridType: 'dash',
							gridColor: '#CCCCCC',
							dashLength: 8,
							splitNumber: 10,
							format: val => val.toFixed(2)
						},
						width: this.width,
						height: uni.upx2px(500),
						extra: {
							line: {
								type: 'curve'
							}
						}
					})
				})
			}
		},
		mounted () {
			Vue.prototype.$showWord = (begin, end, word) => {
				this.load(begin, end, word)
			}
		}
	}
</script>

<style lang="less">
	.word-whole {
		display: grid;
		grid-template-columns: 100%;
		gap: 16upx;
		.word-title {
			font-size: larger;
		}
		.word-charts {
			height: 500upx;
			margin-bottom: 32upx;
		}
		.word-content {
			padding: 16upx;
			margin: 8upx;
			line-height: 48upx;
			letter-spacing: 2upx;
			word-break: break-all;
			box-shadow: 0upx 0upx 8upx 0upx fade(black, 16);
			border-radius: 16upx;
			background-color: fade(white, 40);
		}
	}
</style>
