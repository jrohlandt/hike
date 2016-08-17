<template id="listing-template">
    <ul>
        <li
            v-for="item in items"
            class="list-group-item"
        >
            {{ item.title }}
        </li>
    </ul>
</template>
<script>
export default {
    template: "#listing-template",

    props: ['items'],

    ready: function() {
            console.log('listing component');
    }
};
</script>

<style>
.list-group-item {
    padding: 1em;
}

</style>
