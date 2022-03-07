<template>
  <el-dialog title="新增" :visible.sync="visible">
    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="addForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="addForm.sex">
          <el-radio class="radio" :label="1">男</el-radio>
          <el-radio class="radio" :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
      </el-form-item>
      <el-form-item label="生日" prop="birth">
        <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
      </el-form-item>
      <el-form-item label="地址" prop="addr">
        <el-input type="textarea" v-model="addForm.addr"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="submit" :loading="addLoading">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { $api } from '@helper'
import { addFormRules } from '@constants/validateRules'
export default {
  name: 'add-from',
  props: {
    value: {
      type: Boolean
    }
  },
  data () {
    return {
      addFormRules,
      addLoading: false,
      addForm: {
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      }
    }
  },
  computed: {
    visible: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {},
  methods: {
    async submit () {
      this.$refs['addForm'].validate(async valid => {
        if (!valid) {
          return false
        }
        try {
          await this.$confirm('确认提交吗？', '提示', { type: 'warning'})
            this.addLoading = true
            let para = Object.assign({}, this.addForm)
            para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            await $api.app.addUser(para)
            this.$message.success('提交成功')
            this.$emit('submit')
            this.$refs['addForm'].resetFields()
        } catch (e) {}
        this.addLoading = false
      })
    },
    closeDialog () {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@assets/scss/style.scss';
.el-form {
  width: 400px;
  margin: 0 auto;
  .el-input {
    width: 250px;
  }
}
.el-select {
  width: 250px;
}
</style>
