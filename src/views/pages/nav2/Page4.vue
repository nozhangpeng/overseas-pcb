<template>
  <div>
    <h1>vuex 测试</h1>
    Clicked: {{ Count.id }} times{{ Count.id }}
    <el-button type="primary" @click="increment" icon="el-icon-plus">加</el-button>
    <!-- <button @click="decrement">-</button> -->
  </div>
</template>

<script>
// import store from '@store'
import { mapGetters, mapMutations } from 'vuex'
import types from '@store/types'

export default {
  data () {
    return {
      index: 2
    }
  },
  computed: {
    ...mapGetters({
      Count: types.user.getter.user
    })
  },
  methods: {
    ...mapMutations({
      currten: types.user.mutation.update
    }),
    increment () {
      this.index++
      this.currten({ id: this.index })
    }
  }
}

</script>
