import AntHead from '@anthead/core'
import TDesign from 'tdesign-vue-next'
import { InstallCodemirro } from 'codemirror-editor-vue3'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TDesign)
  nuxtApp.vueApp.use(AntHead)
  nuxtApp.vueApp.use(InstallCodemirro)
})
