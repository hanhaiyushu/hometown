<template>
  <el-dialog
    :visible="visible "
    top="auto"
    :modal="true"
    :custom-class="'dialog-wrapper'"
    :append-to-body="body"
    :destroy-on-close="destroyOnClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="afterClose"
  >
    <div v-if="showHeader" class="custom-dialog-header">
      <div class="title-text">{{ title }}</div>
      <SvgIcon icon-class="close" class="close-btn" @click.native="handleClose" />
    </div>
    <SvgIcon v-else icon-class="close" class="close-btn corner-btn" @click.native="handleClose" />
    <slot />
    <div v-if="showFooter" class="custom-dialog-footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    body: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    },
    afterClose () {
      if (this.destroyOnClose) {
        const parent = this.$parent
        Object.assign(parent.$data, parent.$options.data.call(parent))
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./CustomDialog.scss";
</style>
