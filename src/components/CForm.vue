<template lang="pug">
form.form
	slot
</template>

<script>
export default {
	name: 'CForm',
	setup() {
	}
}
</script>

<style lang="sass">
.form
  display: flex
  flex-direction: column
  width: 100%
  max-width: 450px
  &__title
    width: 100%
    margin-bottom: 40px
    font-weight: 500
  &__row
    display: flex
  &__column
    display: flex
    flex-direction: column
    width: 50%
    padding-right: 10%
  &__radio-container
    display: flex
    margin-bottom: 20px
  &__radio
    &-button
      margin-right: 5px
      cursor: pointer
    &-label
      margin-right: 40px

  &__label
    margin-top: 10px
    padding-bottom: 10px
    cursor: pointer
    &-select
      position: relative
      height: 0
      top: 15px
      padding: 0 15px
      font-size: .6em
      color: c_placeholder()
      text-align: right
      z-index: 10
      cursor: pointer
  &__input-container
    display: flex
    flex-direction: column
    width: 50%
    padding: 0 10px
    &:first-child
      padding-left: 0
    &:last-child
      padding-right: 0
  &__input
    max-width: 400px
    margin-bottom: 20px
    padding: 12px 15px
    color: c_white()
    font-size: 1em
    background: c_input_bg()
    border: none
    border-radius: 5px
    outline: none
    appearance: none
    &::placeholder
      color: c_placeholder()
    &:disabled
      cursor: not-allowed
  &__file-upload-container
    display: flex
    margin-bottom: 20px
  &__file-upload-preview
    display: flex
    align-items: center
    justify-content: center
    width: 100px
    min-width: 100px
    height: 100px
    min-height: 100px
    margin-right: 20px
    color: c_input_bg()
    background: c_file_preview_bg()
    border-radius: 10px
    &-text
      font-size: .8em
  &__file-upload-input
    flex: 1
    display: flex
    flex-direction: column
    justify-content: space-between
  &__file-upload-desc
    margin-bottom: 5px
  &__input-file
    width: 100%
    margin-bottom: 0
    cursor: pointer

  &__textarea
    min-height: 80px
    font-family: 'Helvetica', sans-serif
  &__select
    color: c_placeholder()
    background-image: url('./../assets/select-arrow.png')
    background-repeat: no-repeat
    background-position: 98% 50%
    background-size: 20px
    cursor: pointer
  &__submit
    width: 60%
    max-width: 220px
    margin-top: 20px
    color: c_white()
    background: c_action()
    cursor: pointer
    &:hover
      background: cmb(c_action(), 10)
    &_lg-show
      display: none
  &__error
    position: relative
    top: -18px
    height: 0
    padding-left: 15px
    color: c_action()
    font-size: .8em
</style>
