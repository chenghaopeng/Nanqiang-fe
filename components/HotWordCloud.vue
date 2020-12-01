<template>
	<view class="hot-word-cloud-whole">
		<option-card :options="options" @change="handleTrendChange($event)"></option-card>
		<view v-if="custom" class="hot-word-cloud-pickers">
			<picker class="hot-word-cloud-picker" mode="date" :value="beginDate" @change="handleBeginChange">起于 {{beginDate}}</picker>
			<picker class="hot-word-cloud-picker" mode="date" :value="endDate" @change="handleEndChange">止于 {{endDate}}</picker>
		</view>
		<canvas
			canvas-id="canvasWord"
			id="canvasWord"
			:class="['hot-word-cloud-charts', detailed ? 'hot-word-cloud-charts-detailed' : '']"
			@click="handleTrendClickWord"
		></canvas>
		<view v-if="detailed" class="hot-word-cloud-details">
			<view class="hot-word-cloud-detail">
				<text>热词</text>
				<text>热度</text>
			</view>
			<view v-for="item in sortedSeries" :key="item.name" class="hot-word-cloud-detail">
				<text>{{ item.name }}</text>
				<text>{{ item.score }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../js_sdk/u-charts/u-charts/u-charts.js'
	import OptionCard from './OptionCard/OptionCard.vue'
	import request from '../utils/request.js'
	import DateFormat from '../js_sdk/xfl-DateFormat/DateFormat.js'
	export default {
		name: 'HotWordCloud',
		components: {
			OptionCard
		},
		props: {
			detailed: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				offset: [
					3600 * 24,
					3600 * 24 * 7,
					3600 * 24 * 30,
					3600 * 24 * 365
				],
				series: [],
				ref: null,
				index: 0,
				begin: null,
				end: null,
				custom: false
			}
		},
		computed: {
			options () {
				if (this.detailed) return ['今日', '昨日', '本周', '上周', '本月', '上月', '今年', '去年', '自定']
				return ['今日', '本周', '本月', '今年']
			},
			begins () {
				const time = Math.round(new Date().getTime() / 1000)
				const { offset } = this
				let ret
				if (this.detailed) ret = [-offset[0], - 2 * offset[0], -offset[1], - 2 * offset[1], -offset[2], - 2 * offset[2], -offset[3], - 2 * offset[3]]
				else ret = offset.map(t => -t)
				return ret.map(t => t + time)
			},
			ends () {
				const time = Math.round(new Date().getTime() / 1000)
				const { offset } = this
				let ret
				if (this.detailed) ret = [0, -offset[0], 0, -offset[1], 0, -offset[2], 0, -offset[3]]
				else ret = [0, 0, 0, 0]
				return ret.map(t => t + time)
			},
			beginDate () {
				return new DateFormat(this.begin * 1000).toString('yyyy-mm-dd')
			},
			endDate () {
				return new DateFormat(this.end * 1000).toString('yyyy-mm-dd')
			},
			sortedSeries () {
				return this.series.sort((a, b) => (b.score - a.score))
			}
		},
		mounted () {
			this.handleTrendChange(0)
		},
		methods: {
			update (begin, end) {
				this.begin = begin
				this.end = end
				request(`/trend/${this.begin}/${this.end}`).then(res => {
					this.series = Object.keys(res.data).map(item => {
						return {
							name: item,
							score: res.data[item],
							textSize: this.detailed ? (25 + 11 * res.data[item]) : (16 + 9 * res.data[item])
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
						height: uni.upx2px(this.detailed ? 800 : 400),
						extra: {
							word: {
								type: 'normal'
							}
						}
					})
				})
			},
			handleTrendClickWord (e) {
				const index = this.ref.getCurrentDataIndex(e)
				if (index < 0) return
				const { name } = this.series[index]
				this.$showWord(this.begin, this.end, name)
			},
			handleTrendChange ($index) {
				this.index = $index
				if (this.detailed && $index === this.options.length - 1) {
					this.custom = true
				}
				else {
					this.custom = false
					this.update(this.begins[$index], this.ends[$index])
				}
			},
			handleBeginChange (e) {
				let newBegin = Math.round(new Date(e.target.value).getTime() / 1000)
				if (newBegin > this.end) newBegin = this.end - this.offset[0]
				this.update(newBegin, this.end)
			},
			handleEndChange (e) {
				let newEnd = Math.round(new Date(e.target.value).getTime() / 1000)
				if (newEnd < this.begin) newEnd = this.begin + this.offset[0]
				this.update(this.begin, newEnd)
			}
		}
	}
</script>

<style lang="less">
	.hot-word-cloud-whole {
		display: grid;
		grid-template-columns: 100%;
		gap: 32upx;
		.hot-word-cloud-pickers {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 16upx;
			.hot-word-cloud-picker {
				padding: 8upx;
				text-align: center;
				background-color: fade(white, 32);
				box-shadow: 0upx 0upx 16upx 0upx fade(black, 4);
				border-radius: 16upx;
			}
		}
		.hot-word-cloud-charts {
			width: 686upx;
			height: 400upx;
			border-radius: 16upx;
			overflow: hidden;
			filter: drop-shadow(0upx 0upx 32upx fade(black, 8));
			&.hot-word-cloud-charts-detailed {
				height: 800upx;
			}
		}
		.hot-word-cloud-details {
			padding: 32upx 64upx;
			display: grid;
			grid-template-columns: 100%;
			gap: 16upx;
			background-color: fade(white, 32);
			border-radius: 32upx;
			.hot-word-cloud-detail {
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>
