const INITIAL_KEY = '__CLIENT_INITIAL__';

export function isClientInitial() {
    return window[INITIAL_KEY];
}

export function setClientInitial(value) {
    window[INITIAL_KEY] = value;
}
