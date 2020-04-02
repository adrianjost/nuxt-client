const showWarningOnRemainingSeconds =
	process.env.JWT_SHOW_TIMEOUT_WARNING_SECONDS || 3600;
const defaultRemainingTimeInSeconds =
	process.env.JWT_TIMEOUT_SECONDS || showWarningOnRemainingSeconds * 2;

let processing = false; // will be true for the time of extending the session
let retry = 0;
let totalRetry = 0;
const decRstIntervallSec = 20;
const updateIntervallMin = 2;
let decrementer = null;
let polling = null;

let lastUpdated = null;

const toast = {
	error401: -1,
	error: 0,
	success: 1,
};

const decrementRemainingTime = (commit, state) => {
	return setTimeout(() => {
		if (state.remainingTimeInSeconds >= 60) {
			commit(
				"setRemainingTimeInSeconds",
				state.remainingTimeInSeconds -
					Math.floor((Date.now() - lastUpdated) / 1000)
			);
			if (
				!processing &&
				!state.active &&
				state.remainingTimeInSeconds <= showWarningOnRemainingSeconds
			) {
				commit("setActive", { active: true, error: false });
			}
			decrementRemainingTime(commit, state);
		}
	}, 1000 * decRstIntervallSec);
};

const updateRemainingTime = (commit, dispatch) => {
	return setInterval(async () => {
		try {
			const res = await dispatch("accounts/getTTL", null, { root: true });
			if (res && res.ttl && Number.isInteger(res.ttl) && res.ttl > 0) {
				commit("setRemainingTimeInSeconds", res.ttl);
			} else {
				console.error("Update remaining session time failed!");
			}
		} catch (error) {
			console.error("Update remaining session time failed!");
		}
	}, 1000 * 60 * updateIntervallMin);
};

const extendSession = async (commit, state, dispatch) => {
	try {
		await dispatch("accounts/resetJwtTimer", null, { root: true });
		processing = false;
		totalRetry = 0;
		retry = 0;
		commit("showToast", toast.success);
		if (state.remainingTimeInSeconds < 60) {
			decrementer = decrementRemainingTime(commit, state);
		}
		commit("setRemainingTimeInSeconds", defaultRemainingTimeInSeconds);
	} catch (err) {
		if (err.response && err.response.status !== 405) {
			if (err.response && err.response.status !== 401) {
				// retry 4 times before showing error
				if (retry < 4) {
					retry += 1;
					setTimeout(() => {
						extendSession(commit, state, dispatch);
					}, 2 ** retry * 1000);
				} else {
					retry = 0;
					if (totalRetry) {
						commit("showToast", toast.error);
					} else {
						commit("setActive", { active: true, error: true });
					}
					totalRetry += 1;
				}
			} else {
				commit("showToast", toast.error401);
			}
		}
	}
};

export const mutations = {
	setActive(state, payload) {
		state.active = payload.active;
		state.error = payload.error;
	},
	setRemainingTimeInSeconds(state, payload) {
		lastUpdated = Date.now();
		state.remainingTimeInSeconds = payload;
	},
	showToast(state, payload) {
		state.showToast = payload;
	},
};

export const actions = {
	init({ commit, state, dispatch }) {
		if (!decrementer) {
			decrementer = decrementRemainingTime(commit, state);
		}
		if (!polling) {
			lastUpdated = Date.now();
			polling = updateRemainingTime(commit, dispatch);
		}
	},
	reset() {
		this.remainingTimeInSeconds = defaultRemainingTimeInSeconds;
	},
	async extendSession({ commit, state, dispatch }) {
		processing = true;
		commit("setActive", { active: false, error: false });
		commit("showToast", null);
		extendSession(commit, state, dispatch);
	},
};

export const state = () => {
	return {
		active: false,
		error: false,
		remainingTimeInSeconds: defaultRemainingTimeInSeconds,
		showToast: null,
	};
};

export default {
	mutations,
	actions,
	state,
	namespaced: true,
};