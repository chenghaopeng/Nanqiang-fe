<template>
	<view class="option-card-whole">
		<view
			v-for="(option, $index) in options"
			:key="option"
			:class="['option-card-option', $index === index ? 'option-card-checked' : '']"
			@click="handleClick($index)"
		>
			{{ option }}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'OptionCard',
		props: {
				options: {
					type: Array,
					default: ['选项']
				}
		},
		data () {
			return {
				index: 0
			}
		},
		methods: {
			handleClick ($index) {
				if (this.index === $index) return
				this.index = $index
				this.$emit('change', $index)
			}
		}
	}
</script>

<style lang="less">
	.option-card-whole {
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		overflow-y: scroll;
		filter: drop-shadow(0upx 0upx 8upx fade(black, 16));
		.option-card-option {
			flex: none;
			margin-right: 16upx;
			padding: 8upx 16upx;
			min-width: 144upx;
			text-align: center;
			border: 2upx solid var(--primary-color);
			border-radius: 8upx;
			background-color: fade(#AEB5FF, 60);
			color: var(--primary-color);
			&:last-child {
				margin: none;
			}
			&.option-card-checked {
				background-color: var(--primary-color);
				font-weight: bold;
				color: white;
			}
		}
	}
</style>
