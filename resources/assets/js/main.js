var Vue = require('vue');
var VueResource = require('vue-resource');

import HikesList from './components/backend/hikes/index.vue';
import TrailsList from './components/backend/trails/index.vue';
// import Listing from './components/backend/listing/index.vue';

Vue.use(VueResource);
new Vue({
    el: '#app',

    components: {
        HikesList,
        TrailsList

    },

    ready() {
        console.log('App is ready!');
    }
});
