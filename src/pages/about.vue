<template>
  <div>about</div>
  <div>{{ userId }}</div>
</template>
<script lang="ts">
export default defineComponent({
  name: "About",
  // watch: {
  //   $route(to, form) {
  //     console.log(to, form)
  //   },
  // },
  beforeRouteEnter(to, form) {
    console.log(to, form)
  },
})
</script>
<script setup lang="ts">
import {
  useRouter,
  useRoute,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from "vue-router"
import { ref, watch, toRaw, unref, defineComponent } from "vue"
const route = useRoute()
watch(
  () => route.params.id,
  (val, old) => {
    console.log(val, old)
  }
)
console.log(route.name)
// 与 beforeRouteLeave 相同，无法访问 `this`
// onBeforeRouteLeave((to, from) => {
//   const answer = window.confirm(
//     "Do you really want to leave? you have unsaved changes!"
//   )
//   // 取消导航并停留在同一页面上
//   if (!answer) return false
// })
const userId = ref(route.params.id)
onBeforeRouteUpdate((to, from) => {
  userId.value = to.params.id
})
</script>

<style scoped></style>
