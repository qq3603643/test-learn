import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hi from '../components/Hi'
import VuexTest from '../components/vuexTest.vue'

import Apple from '../components/apple'
import Tangerine from '../components/tangerine'
import ElementUI from '../components/elementUI'
import Transition from '../components/transition'
import Slot from '../components/slot'
import LeafLet from '../components/leafLet'
import RenderFunction from '../components/renderFunction'
import Emit from '../components/emit'
import inputNb from '../components/inputNumber'
import props from '../components/props'
import styleScoped from '../components/style__scoped';
import updateV from '../components/updateVisible';

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/hello',
    name: 'Hello',
    component: Hello
  }, {
    path: '/hi',
    /** 前面有 / 的路径将被作为跟路径 */
    name: 'Hi',
    component: Hi,
    children: [{
      path: 'apple',
      /** 此处path前面无 /  !IMPORTANT */
      component: Apple
    }, {
      path: 'tangerine',
      component: Tangerine
    }]
  }, {
    path: '/vuexTest',
    name: '',
    component: VuexTest
  }, {
    path: '/elementUI',
    name: 'elementUI',
    component: ElementUI
  }, {
    path: '/transition',
    name: '',
    component: Transition
  }, {
    path: '/slot',
    component: Slot
  }, {
    path: '/leafLet',
    component: LeafLet
  }, {
    path: '/renderFunction',
    component: RenderFunction
  }, {
    path: '/emit',
    component: Emit
  }, {
    path: '/inputNb',
    component: inputNb
  }, {
    path: '/props',
    component: props
  }, {
    path: '/styleScoped',
    component: styleScoped
  }, {
    path: '/updateV',
    component: updateV
  }, {
    path: '/mixin',
    component: (resolve) => {
      require(['../components/mixins.vue'], resolve);
    },
    props: (route) => {
      console.log(route);
      return { name: route.query.name };
    }
  }, {
    path: '/watch',
    component(resolve) {
      require(['../components/$watch.vue'], resolve);
    }
  }]
})