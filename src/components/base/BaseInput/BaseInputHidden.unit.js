import BaseInput from "./BaseInput";
import { supportedTypes } from "./BaseInputHidden";

describe("@components/base/BaseInputHidden", () => {
	it("input is not visible", () => {
		const mockText = "test input";
		supportedTypes.forEach(() => {
			const wrapper = mount(BaseInput, {
				propsData: {
					type: "hidden",
					vmodel: mockText,
				},
			});
			const input = wrapper.find(`input`);
			expect(input.element.value).toBe(mockText);
			expect(input.isVisible()).toBe(false);
		});
	});
});
