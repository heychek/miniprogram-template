import { img404, types, getType, log } from './utils.js';

Component({
  externalClasses: ['img-class'],

  properties: {
    src: {
      type: String,
      value: img404,
      observer: 'handle'
    },
    isDefault: {
      type: Boolean,
      value: true
    }
  },

  data: {
    img: ''
  },

  methods: {
    handle(newVal) {
      const srcType = getType(newVal);

      if (srcType !== types.NORMAL) {
        log(srcType);
        this.setDefault();
        return;
      }
      this.setData({
        img: newVal
      });
    },

    imgErr() {
      log(getType('error'));
      this.setDefault();
    },

    setDefault() {
      if (this.properties.isDefault) {
        this.setData({
          img: img404
        });
        return;
      }
      this.setData({
        img: this.data.src
      });
    }
  }
});
