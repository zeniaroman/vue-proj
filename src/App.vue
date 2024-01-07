<template lang="pug">
router-view
</template>

<script>
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'App',
  setup() {
    const { locale } = useI18n();

    watch(
      () => locale.value,
      (lang) => {
        document.documentElement.lang = lang;
      },
      {
        immediate: true 
      }
    )
  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box

html
  flex: auto
  display: flex
  flex-direction: column
  min-height: 100%

body
  flex: 1
  display: flex
  color: c_gray()
  font-size: 16px
  font-weight: 500
  letter-spacing: .05em
  font-family: 'Helvetica', sans-serif

.app
  flex: 1
  display: flex
  width: 100%
  margin: 0 auto
  background: c_layout_main()


.fade-enter-active,
.fade-leave-active
  transition: opacity 0.1s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
