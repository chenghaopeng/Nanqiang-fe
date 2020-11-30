<template>
	<view class="page-home-whole">
		<view class="page-home-block">
			<text class="page-home-block-title">画廊</text>
			<option-card :options="gallery.options" @change="handleGalleryChange($event)"></option-card>
			<view class="page-home-block-content page-home-block-gallery">
				<image
					class="page-home-block-gallery-image"
					v-for="image in gallery.images"
					:key="image.src"
					:src="image.src"
					mode="aspectFill"
					@click="handleImageClick(image.id)"
				></image>
			</view>
		</view>
		<view class="page-home-block">
			<text class="page-home-block-title">趋势</text>
			<option-card :options="trend.options" @change="handleTrendChange($event)"></option-card>
			<canvas
				canvas-id="canvasWord"
				id="canvasWord"
				class="page-home-block-content page-home-block-charts"
				@click="handleTrendClickWord"
			></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js'
	import OptionCard from '../../components/OptionCard/OptionCard.vue'
	import request, { imageProxy } from '../../utils/request.js'
	export default {
		components: {
			OptionCard
		},
		data () {
			return {
				gallery: {
					options: ['全部', '猫', '狗', '天空', '日出', '碗', '帅哥', '美女', '演出', '美食', '植物'],
					images: []
				},
				trend: {
					options: ['今日', '本周', '本月', '今年'],
					apis: ['day', 'week', 'month', 'year'],
					series: [],
					ref: null
				}
			}
		},
		methods: {
			handleGalleryChange ($index) {
				this.gallery.images = ['']
				request($index === 0 ? `/gallery/${Number.MAX_SAFE_INTEGER}/10` : `/gallery/type/0/10/${this.gallery.options[$index]}`).then(res => {
					this.gallery.images = Array.from(new Set(res.data)).map(item => { return { ...item, src: imageProxy(item.src) } })
				})
			},
			handleTrendChange ($index) {
				request(`/trend/${this.trend.apis[$index]}`).then(res => {
					this.trend.series = Object.keys(res.data).map(item => {
						return {
							name: item,
							textSize: 16 + 9 * res.data[item]
						}
					})
					this.trend.ref = new uCharts({
						$this: this,
						canvasId: 'canvasWord',
						type: 'word',
						background: 'white',
						animation: true,
						pixelRatio: 1,
						series: this.trend.series,
						width: uni.upx2px(686),
						height: uni.upx2px(400),
						extra: {
							word: {
								type: 'normal'
							}
						}
					})
				})
			},
			handleImageClick (id) {
				this.$showContent(id)
			},
			handleTrendClickWord (e) {
				const index = this.trend.ref.getCurrentDataIndex(e)
				if (index < 0) return
				const { name } = this.trend.series[index]
				this.$showWord(name)
			}
		},
		mounted() {
			this.handleGalleryChange(0)
			this.handleTrendChange(0)
		}
	}
</script>

<style lang="less">
	.page-home-whole {
		display: grid;
		grid-template-columns: 1fr;
		gap: 32upx;
		align-content: start;
		.page-home-block {
			display: grid;
			grid-template-columns: 1fr;
			gap: 16upx;
			.page-home-block-title {
				font-size: 48upx;
			}
		}
		.page-home-block-content {
			margin-top: 16upx;
			filter: drop-shadow(0upx 0upx 32upx fade(black, 8));
		}
		.page-home-block-gallery {
			display: flex;
			flex-flow: row nowrap;
			overflow-y: scroll;
			.page-home-block-gallery-image {
				flex: none;
				margin-right: 32upx;
				width: 400upx;
				height: 300upx;
				border-radius: 32upx;
				&:last-child {
					margin: none;
				}
			}
		}
		.page-home-block-charts {
			width: 686upx;
			height: 400upx;
		}
	}
</style>
