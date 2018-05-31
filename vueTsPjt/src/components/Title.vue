<template>
	<h2>{{ title }}</h2>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch
} from 'vue-property-decorator';

@Component({})
export default class TitleMine extends Vue {
  @Prop({
    default: ''
  })
  title: string;
}
</script>