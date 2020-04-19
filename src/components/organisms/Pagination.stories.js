import { storiesOf } from "@storybook/vue";
import { number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Pagination from "@components/organisms/Pagination";

storiesOf("6 Organisms", module).add("Pagination", () => ({
	components: { Pagination },
	data: () => ({
		currentPage: number("currentPage", 1),
		perPage: number("perPage", 5),
		total: number("total", 100),
	}),
	template: `
		<Pagination
			:currentPage="currentPage"
			:perPage="perPage"
			:total="total"
			@update:current-page="onCurrentPageChange"
			@update:per-page="onPerPageChange"/>`,
	methods: {
		onCurrentPageChange: action("@update:current-page"),
		onPerPageChange: action("@update:per-page"),
	},
}));
