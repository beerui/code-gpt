<script setup lang="ts">
</script>
<template>
<div class="page">
  <p id="companionMethods"></p>
  <client-only>
    <VueCodeMirror />
  </client-only>
  <StepWarp />
</div>
</template>
<style lang="less" scoped>
.page {
  padding: 2rem;
}
</style>
