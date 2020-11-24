<template>
	<view class="page-home-whole">
		<view class="page-home-block">
			<text class="page-home-block-title">画廊</text>
			<option-card :options="gallery.options" @change="handleGalleryChange($event)"></option-card>
			<view class="page-home-block-gallery">
				<image class="page-home-block-gallery-image" v-for="image in gallery.images" :key="image.src" :src="image.src" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
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
				}
			}
		},
		methods: {
			handleGalleryChange ($index) {
				this.gallery.images = []
				request($index === 0 ? `/gallery/${Number.MAX_SAFE_INTEGER}/10` : `/gallery/type/0/10/${this.gallery.options[$index]}`).then(res => {
					this.gallery.images = Array.from(new Set(res.data)).map(item => { return { ...item, src: imageProxy(item.src) } })
				})
			}
		},
		mounted() {
			this.handleGalleryChange(0)
		}
	}
</script>

<style lang="less">
	.page-home-whole {
		height: 200vh;
		.page-home-block {
			display: grid;
			grid-template-columns: 1fr;
			gap: 16upx;
			.page-home-block-title {
				font-size: 48upx;
			}
		}
		.page-home-block-gallery {
			margin-top: 16upx;
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
