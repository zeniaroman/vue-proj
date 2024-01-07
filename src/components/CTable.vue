<template lang="pug">
table.table
	slot
</template>

<script>
export default {
	name: 'CTable',
	setup() {
	}
}
</script>

<style lang="sass">
.table
  width: 100%
  border-spacing: 0 10px
  border-collapse: separate
  thead
    th
      padding: 0 20px 20px
      font-weight: 500
  tbody
    tr
      background: c_black()
      border-radius: 10px
      &:nth-child(odd)
        background: cmw(c_black(), 2)
      td
        padding: 20px
        color: cmb(c_white(), 30)
        text-align: center
        white-space: nowrap
        &:first-child
          text-align: left
          white-space: normal
          border-radius: 10px 0 0 10px
        &:last-child
          border-radius: 0 10px 10px 0

        button
          padding: 10px 20px
          border: none
          color: c_white()
          font-size: .9em
          background: c_button_bg()
          border-radius: 5px
          cursor: pointer
          appearance: none
          outline: none
</style>
