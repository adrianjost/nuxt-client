import { storiesOf } from "@storybook/vue";

import BaseTitle from "@components/base/BaseTitle";

storiesOf("4 Base UI Components/Base UI/BaseTitle", module).add(
	"BaseTitle",
	() => ({
		components: { BaseTitle },
		template: `
		<BaseTitle>BaseTitle Component</BaseTitle>`,
	})
);
