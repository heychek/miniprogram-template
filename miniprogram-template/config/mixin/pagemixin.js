import grace from '../entry/index.js';
import { getPageName } from '../../utils/utils.js';

const log = (method, page, options) => {
    const base = `---${method} invoked in ${getPageName(page)}`;
    if (typeof(options) !== 'undefined') {
        console.log(`${base} & options is---`, options);
        return;
    }
    console.log(`${base}---`);
};

const lifeLogger = ob => {
    grace.mixin(ob, {
        onLoad(options) {
            log('onLoad', this.route, options);
        },
        onReady() {
            log('onReady', this.route);
        },
        onShow() {
            log('onShow', this.route);
        },
        onHide() {
            log('onHide', this.route);
        },
        onUnload() {
            log('onUnload', this.route);
        }
    })
};

module.exports = {
    lifeLogger
};