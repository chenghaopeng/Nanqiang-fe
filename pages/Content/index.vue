<template>
	<popup-view @mounted="handleMounted">
		<view class="content-container-whole" v-if="!loading && content">
			<view class="content-container-whole-bubble content-container-whole-message">
				<text class="content-container-whole-bubble-content">{{ (content.label ? (content.label + ' | ') : '') + content.content }}</text>
				<auto-size-image
					v-for="src in content.piclist"
					:key="src"
					:src="imageProxy(src)"
					mode="aspectFit"
					class="content-container-whole-bubble-image"
					@click="handleImageClick(imageProxy(src))"
				></auto-size-image>
				<text class="content-container-whole-bubble-time">{{ new DateFormat(content.time * 1000).toString() }}</text>
			</view>
			<view
				v-for="comment in content.commentlist"
				:key="comment.time + comment.name"
				class="content-container-whole-bubble content-container-whole-comment"
			>
				<text class="content-container-whole-bubble-content">{{ comment.content }}</text>
				<auto-size-image
					v-for="src in comment.comment_piclist"
					:key="src"
					:src="imageProxy(src)"
					mode="aspectFit"
					class="content-container-whole-bubble-image"
					@click="handleImageClick(imageProxy(src))"
				></auto-size-image>
				<text class="content-container-whole-bubble-time">{{ new DateFormat(comment.time * 1000).toString() }}</text>
			</view>
		</view>
	</popup-view>
</template>

<script>
	import Vue from 'vue'
	import request, { imageProxy, getImageInfo } from '../../utils/request.js'
	import DateFormat from '../../js_sdk/xfl-DateFormat/DateFormat.js'
	import AutoSizeImage from '../../components/AutoSizeImage.vue'
	import PopupView from '../../components/PopupView.vue'
	export default {
		components: {
			AutoSizeImage,
			PopupView
		},
		data() {
			return {
				hook: null,
				id: null,
				loading: false,
				content: null,
				images: []
			}
		},
		methods: {
			DateFormat,
			imageProxy,
			getImageInfo,
			handleMounted (hook) {
				this.hook = hook
			},
			load (id) {
				this.id = id
				this.loading = true
				this.hook()
				request('/content/' + id).then(res => {
					this.loading = false
					if (res.code === 0) {
						this.content = res.data
						this.images = []
						if (this.content.piclist) this.images = this.images.concat(this.content.piclist)
						if (this.content.commentlist) this.content.commentlist.map(comment => {
							if (comment.comment_piclist) {
								this.images = this.images.concat(comment.comment_piclist)
							}
						})
						this.images = this.images.map(src => imageProxy(src))
					}
					else this.content = null
				})
			},
			handleImageClick (src) {
				uni.previewImage({
					current: this.images.indexOf(src),
					urls: this.images
				})
			}
		},
		mounted () {
			Vue.prototype.$showContent = id => {
				this.load(id)
			}
		}
	}
</script>

<style lang="less">
	.content-container-whole {
		display: grid;
		grid-template-columns: 100%;
		gap: 8upx;
		.content-container-whole-bubble {
			max-width: 70vw;
			padding: 32upx;
			margin: 8upx;
			display: grid;
			grid-template-columns: 100%;
			gap: 8upx;
			line-height: 48upx;
			letter-spacing: 2upx;
			word-break: break-all;
			box-shadow: 0upx 0upx 8upx 0upx fade(black, 16);
			border-radius: 32upx;
			.content-container-whole-bubble-content {
			}
			.content-container-whole-bubble-image {
				width: 400upx;
			}
			.content-container-whole-bubble-time {
				justify-self: end;
				font-size: smaller;
				color: grey;
			}
		}
		.content-container-whole-message {
			justify-self: start;
			background-color: fade(white, 80);
			.content-container-whole-bubble-time {
				justify-self: start;
			}
		}
		.content-container-whole-comment {
			justify-self: end;
			background-color: fade(white, 32);
			.content-container-whole-bubble-time {
				justify-self: end;
			}
		}
	}
</style>
