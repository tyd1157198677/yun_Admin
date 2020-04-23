<template>
  <a-pagination
    class="my-pagination"
    v-model="current"
    :total="total"
    :size="size"
    :showTotal="(total, range)=> `共 ${total} 条`"
    :hideOnSinglePage="hideOnSinglePage"
    :showQuickJumper="showQuickJumper"
    :showSizeChanger="showSizeChanger"
    :pageSize.sync="currentPageSize"
    :pageSizeOptions="pageSizeOptions"
    @change="change"
    @showSizeChange="showSizeChange"></a-pagination>
</template>

<script>
export default {
  name: 'my-pagination',
  props: {
    value: { // 当前页
      type: Number,
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizeOptions: {
      type: Array,
      default () {
        return [ '10', '20', '50', '100', ]
      },
    },
    showQuickJumper: {
      type: Boolean,
      default: true,
    },
    showSizeChanger: {
      type: Boolean,
      default: true,
    },
    simple: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  data () {
    return {
      current: this.value,
      currentPageSize: this.pageSize,
    }
  },
  watch: {
    value (val) {
      this.current = val
    },
    pageSize (val) {
      this.currentPageSize = val
    },
  },
  methods: {
    change (page, pageSize) {
      this.$emit('input', page)
      this.$emit('update:pageSize', pageSize)
      this.$emit('change', page, pageSize)
    },
    showSizeChange (current, size) {
      this.$emit('input', current)
      this.$emit('update:pageSize', size)
      this.$emit('showSizeChange', current, size)
    },
  },
}
</script>