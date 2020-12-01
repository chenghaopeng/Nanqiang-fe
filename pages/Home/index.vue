<template>
	<view class="page-home-whole">
		<view class="page-home-block">
			<text class="page-home-block-title">画廊</text>
			<option-card :options="gallery.options" @change="handleGalleryChange($event)"></option-card>
			<view class="page-home-block-gallery">
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
			<hot-word-cloud></hot-word-cloud>
		</view>
	</view>
</template>

<script>
	import OptionCard from '../../components/OptionCard.vue'
	import HotWordCloud from '../../components/HotWordCloud.vue'
	import request, { imageProxy } from '../../utils/request.js'
	export default {
		components: {
			OptionCard,
			HotWordCloud
		},
		data () {
			return {
				gallery: {
					options: ['全部', '猫', '狗', '天空', '日出', '碗', '帅哥', '美女', '演出', '美食', '植物'],
					images: []
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
			handleImageClick (id) {
				this.$showContent(id)
			}
		},
		mounted() {
			this.handleGalleryChange(0)
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
			gap: 32upx;
			.page-home-block-title {
				font-size: 48upx;
				margin-bottom: -16upx;
			}
		}
		.page-home-block-gallery {
			display: flex;
			flex-flow: row nowrap;
			overflow-y: scroll;
			filter: drop-shadow(0upx 0upx 32upx fade(black, 8));
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
	}
</style>
