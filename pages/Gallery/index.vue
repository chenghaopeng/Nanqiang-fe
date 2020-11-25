<template>
	<view class="gallery-whole">
		<option-card :options="options" @change="handleChange"></option-card>
		<xyz-masonry
			:masonryList="masonryList"
			:isSize="false"
			:borderRadius="16"
			:imgWidth="320"
			@mounted="handleMounted"
		></xyz-masonry>
		<button v-show="hasMore && !loading" class="gallery-more" @click="getMore">查看更多</button>
		<text v-show="!hasMore" class="gallery-end">到底啦！</text>
	</view>
</template>

<script>
	import XyzMasonry from '../../components/xyz-masonry/xyz-masonry.vue'
	import OptionCard from '../../components/OptionCard/OptionCard.vue'
	import request, { imageProxy } from '../../utils/request.js'
	export default {
		components: {
			XyzMasonry,
			OptionCard
		},
		data () {
			return {
				io: null,
				options: [],
				time: Number.MAX_SAFE_INTEGER,
				batchSize: 10,
				masonryList: [],
				hasMore: true,
				loading: false,
				clear: null,
				index: 0,
				begin: 0
			}
		},
		methods: {
			getMore () {
				if (!this.hasMore || this.loading) return
				this.loading = true
				request(this.index === 0 ? `/gallery/${this.time}/${this.batchSize}` : `/gallery/type/${this.begin}/${this.begin + this.batchSize}/${this.options[this.index]}`).then(res => {
					this.masonryList = Array.from(new Set(res.data)).map(item => { return { ...item, src: imageProxy(item.src) } })
					if (this.index === 0) this.time = Math.min(this.time, ...this.masonryList.map(item => item.time))
					else this.begin += this.batchSize
					this.hasMore = !!this.masonryList.length
					this.loading = false
				})
			},
			handleMounted (hook) {
				this.clear = () => {
					hook()
					this.masonryList = []
					this.time = Number.MAX_SAFE_INTEGER
					this.begin = 0
					this.hasMore = true
				}
			},
			handleChange ($index) {
				if ($index === this.index) return
				this.index = $index
				this.clear()
			}
		},
		mounted () {
			this.io = uni.createIntersectionObserver(this).relativeTo('.tabbar-whole')
			this.io.observe('.gallery-more', () => { this.getMore() })
			this.loading = true
			request('/gallery/types').then(res => {
				this.options = ['全部', ...res.data]
				this.loading = false
			})
		},
		beforeDestroy () {
			this.io.disconnect()
		}
	}
</script>

<style lang="less">
	.gallery-whole {
		display: grid;
		grid-template-columns: 100%;
		align-content: start;
		gap: 32upx;
		.gallery-end {
			text-align: center;
		}
	}
</style>
