<template>
	<div :style="currentPosition" class="fab">
		<fab-icon
			v-bind="$attrs"
			:expand-direction="expandDirection"
			:label-position="labelPosition"
			v-on="$listeners"
		/>
	</div>
</template>
<script>
/**
 * ToDo: Should support Text-Fab
 */
import FabIcon from "@components/molecules/FabIcon";

export default {
	components: { FabIcon },
	props: {
		position: {
			type: String,
			default: "bottom-right",
			validator: (value) =>
				["top-left", "bottom-left", "top-right", "bottom-right"].includes(
					value
				),
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		labelPosition() {
			switch (this.position) {
				case "top-left":
				case "bottom-left":
					return "right";
				case "top-right":
				case "bottom-right":
				default:
					return "left";
			}
		},
		expandDirection() {
			switch (this.position) {
				case "top-left":
				case "top-right":
					return "bottom";
				case "bottom-right":
				case "bottom-left":
				default:
					return "top";
			}
		},
		currentPosition() {
			switch (this.position) {
				case "bottom-right":
					return {
						right: "5vw",
						bottom: "4vh",
					};
				case "bottom-left":
					return {
						left: "5vw",
						bottom: "4vh",
					};
				case "top-left":
					return {
						left: "5vw",
						top: "4vh",
					};
				case "top-right":
				default:
					return {
						right: "5vw",
						top: "4vh",
					};
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.fab {
	position: fixed;
	z-index: var(--layer-fab);
}
</style>
