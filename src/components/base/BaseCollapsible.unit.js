import BaseCollapsible from "./BaseCollapsible";

const collapsible = {
	data: () => ({ active: false }),
	template: `
		<base-collapsible label="Label for Toggle Button">
			<p id="slot-content">Slot Content</p>
		</base-collapsible>
	`,
	components: { BaseCollapsible },
};

describe("@components/base/BaseCollapsible", () => {
	it(...isValidComponent(BaseCollapsible));

	it("pressing the label should toggle slot visibility", async () => {
		const wrapper = mount(collapsible, {
			...createComponentMocks({ stubs: { transition: true } }),
		});

		expect(wrapper.find("#slot-content").exists()).toBe(false);
		wrapper.find(".collapsible").trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.find("#slot-content").exists()).toBe(true);
		wrapper.find(".collapsible").trigger("click");
		await wrapper.vm.$nextTick();
		expect(wrapper.find("#slot-content").exists()).toBe(false);
	});
});
