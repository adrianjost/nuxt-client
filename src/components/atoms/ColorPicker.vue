<template>
	<color-picker
		v-bind="{ ...$attrs }"
		:swatches="colors"
		:value="value"
		@input="$emit('input', $event)"
	/>
</template>

<script>
import ColorPicker from "vue-swatches";

export default {
	components: { ColorPicker },
	props: {
		value: {
			type: String,
			default: () => {
				return "";
			},
		},
		colors: {
			type: Array,
			default: () => {
				return [
					"#ACACAC",
					"#D4AF37",
					"#00E5FF",
					"#1DE9B6",
					"#546E7A",
					"#FFC400",
					"#BCAAA4",
					"#FF4081",
					"#FFEE58",
				];
			},
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style src="vue-swatches/dist/vue-swatches.css"></style>
