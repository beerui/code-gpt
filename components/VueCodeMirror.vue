<template>
  <div>
    <Codemirror
      v-model:value="codeStore.vueCode"
      :options="{ mode: 'text/x-vue', theme: 'default' }"
      border
      ref="vueRef"
      height="400"
      width="600"
      @change="onChange"
      @input="onInput"
      @ready="onReady"
    >
    </Codemirror>
    <Codemirror
      v-model:value="codeStore.jsxCode"
      :options="jsxOptions"
      border
      ref="jsxRef"
      height="400"
      width="600"
      @change="onChange"
      @input="onInput"
      @ready="onReady"
    >
    </Codemirror>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue"
import "codemirror/mode/javascript/javascript.js"
import Codemirror from "codemirror-editor-vue3"
import type { CmComponentRef } from "codemirror-editor-vue3"
import type { Editor, EditorConfiguration } from "codemirror"
import {useCodeMirrorStore} from "../stores/codeMirror";
const codeStore = useCodeMirrorStore()

const vueRef = ref<CmComponentRef>()
const jsxRef = ref<CmComponentRef>()
const jsxOptions: EditorConfiguration = {
  mode: 'text/javascript'
}
const vueOptions: EditorConfiguration = {
  mode: "text/x-vue"
}

const onChange = (val: string, cm: Editor) => {
  console.log(val)
  console.log(cm.getValue())
}

const onInput = (val: string) => {
  console.log(val)
}

const onReady = (cm: Editor) => {
  console.log(cm.focus())
}

onMounted(() => {
  setTimeout(() => {
    jsxRef.value?.refresh()
    vueRef.value?.refresh()
  }, 1000)


  setTimeout(() => {
    vueRef.value?.cminstance.isClean()
    jsxRef.value?.cminstance.isClean()
  }, 3000)
})

onUnmounted(() => {
  vueRef.value?.destroy()
  jsxRef.value?.destroy()
})
</script>
