import grace from './request/httpConfig.js';
import { lifeLogger } from './mixin/pagemixin.js';

const page = grace.page;

grace.page = (ob) => {
    lifeLogger(ob);
    page.call(grace, ob)
};

export default grace;