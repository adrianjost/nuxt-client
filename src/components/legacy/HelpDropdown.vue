<template>
	<ul class="dropdown-menu">
		<li v-for="menuItem in menuItems" :key="menuItem.label" class="menu-item">
			<span class="core">
				<base-icon
					source="fa"
					:icon="menuItem.icon"
					fill="var(--color-tertiary-dark)"
				/>
				<base-link :href="menuItem.action" target="_self" class="link">
					{{ menuItem.label }}
				</base-link>
			</span>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		menuItems: {
			type: Array,
			required: true,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
	float: left;
	width: 261px;
	min-width: 10rem;
	text-align: left;
	list-style-type: none;
}

.menu-item {
	--hover-color: #f5f5f5;

	position: relative;
	display: block;
	padding: var(--space-sm) var(--space-sm);
	font-size: var(--text-md); // text size in legacy client 14px;
	text-align: inherit;
	background-color: var(--color-white);
	border-bottom: 1px solid var(--color-disabled);

	&:first-child {
		border-top-left-radius: var(--radius-sm);
		border-top-right-radius: var(--radius-sm);
	}
	&:last-child {
		border: none;
		border-radius: var(--radius-sm);
	}
	&:hover {
		background-color: var(--hover-color);
	}

	.core {
		display: flex;
		align-items: center;
	}
	.link {
		padding-left: var(--space-sm); // space in legacy client 8px;
		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}
}
</style>
