<template id="hikes-list-template">
    <listing items="items"></listing>
</template>

<script>
import Listing from '../listing/index.vue';
export default {
    template: "#hikes-list-template",


    components: {
        Listing
    },

    created: function() {
            console.log('home view');
    }
};
</script>

<style>

</style>
