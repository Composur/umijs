<template>
  <div class="navs">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/docs">Docs</router-link>
      </li>
      <li>
        <router-link to="/about/1">about1</router-link>
      </li>
      <li>
        <router-link to="/about/2">about2</router-link>
      </li>
      <li>
        <div @click="aboutHandle">about3</div>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import { watch } from "vue"
import { useRouter, useRoute, onBeforeRouteUpdate } from "umi"
const router = useRouter()
const route = useRoute()
const aboutHandle = () => {
  router.push({
    path: "/about/3",
  })
}
</script>
<style lang="less">
.navs {
  ul {
    padding: 0;
    list-style: none;
    display: flex;
  }
  li {
    margin-right: 1em;
  }
}
</style>
