<template>
  <list
   :data="data2"
  >
   <template
     scope="props"
   >
    <span>index: {{ props.index }}</span>
   	<span>name: {{ props.row.name }}</span>
   	<span>sex: {{ props.row.sex }}</span>
   </template>
  </list>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        data2: [{
          name: 'apple',
          sex: 'felman'
        }, {
          name: 'tangerine',
          sex: 'man'
        }]
      };
    },
    components: {
      list: {
        template: `
        <ul>
         <li v-for="(item, ix) in data">
          <slot :row="item" :index="ix"></slot>
         </li>
        </ul>`,
        props: {
          data: {
            type: Array,
            required: true
          }
        }
      }
    }
  });
</script>