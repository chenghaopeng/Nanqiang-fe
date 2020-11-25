<template>
	<view v-if="show" :class="['content-whole', hiding ? 'content-whole-hiding' : '']">
		<view class="content-container">
			<view class="content-container-back" @click="handleClose">
				<Am-FontAwesome size="64" class="fas fa-times-circle"></Am-FontAwesome>
			</view>
			<view class="content-container-whole" v-if="!loading">
				<view class="content-container-whole-bubble content-container-whole-message">
					<text class="content-container-whole-bubble-content">{{ (content.label ? (content.label + ' | ') : '') + content.content }}</text>
					<auto-size-image
						v-for="src in content.piclist"
						:key="src"
						:src="imageProxy(src)"
						mode="aspectFit"
						class="content-container-whole-bubble-image"
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
					></auto-size-image>
					<text class="content-container-whole-bubble-time">{{ new DateFormat(comment.time * 1000).toString() }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import request, { imageProxy, getImageInfo } from '../../utils/request.js'
	import DateFormat from '../../js_sdk/xfl-DateFormat/DateFormat.js'
	import AutoSizeImage from '../../components/AutoSizeImage.vue'
	export default {
		components: {
			AutoSizeImage
		},
		data() {
			return {
				show: false,
				hiding: false,
				id: null,
				loading: false,
				content: null
			}
		},
		methods: {
			DateFormat,
			imageProxy,
			getImageInfo,
			load (id) {
				this.id = id
				this.loading = true
				this.show = true
				request('/content/' + id).then(res => {
					this.loading = false
					if (res.code === 0) this.content = res.data
					else this.content = null
				})
			},
			handleClose () {
				this.hiding = true
				setTimeout(() => {
					this.show = false
					this.hiding = false
				}, 200)
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
	.content-whole {
		position: fixed;
		left: 4vw;
		top: calc(4vh + var(--window-top));
		width: calc(100% - 8vw);
		height: calc(100% - var(--window-top) - 8vh);
		padding: 64upx;
		backdrop-filter: blur(128upx);
		border-radius: 64upx;
		box-shadow: 0upx 0upx 128upx 0upx fade(black, 32);
		pointer-events: all;
		animation: show 0.2s ease-in-out;
		overflow: hidden;
		&.content-whole-hiding {
			animation: hide 0.2s ease-in-out;
		}
		@keyframes show {
			0% { transform: scale(0.75); opacity: 0; }
			75% { transform: scale(1.1); opacity: 1; }
			100% { transform: scale(1); opacity: 1; }
		}
		@keyframes hide {
			0% { transform: scale(1); opacity: 1; }
			25% { transform: scale(1.1); opacity: 0.5; }
			100% { transform: scale(0.75); opacity: 0; }
		}
		.content-container-back {
			position: absolute;
			right: 32upx;
			top: 32upx;
			height: 64upx;
			width: 64upx;
			color: var(--primary-color);
			filter: drop-shadow(0upx 2upx 4upx fade(black, 32));
		}
		.content-container {
			width: 100%;
			height: 100%;
			overflow-y: scroll;
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
		}
	}
</style>
