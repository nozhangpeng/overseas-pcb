<template>
  <el-dialog title="编辑" :visible.sync="visible">
    <el-form :model="editForm" label-width="80px" :rules="addFormRules" ref="editForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="editForm.name" auto-complete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="editForm.sex">
          <el-radio class="radio" :label="1">男</el-radio>
          <el-radio class="radio" :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
      </el-form-item>
      <el-form-item label="生日" prop="birth">
        <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
      </el-form-item>
      <el-form-item label="地址" prop="addr">
        <el-input type="textarea" v-model="editForm.addr"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="submit" :loading="editLoading" :disabled="submitDisabled">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import { $api, $util } from '@helper'
import { isEqual } from 'lodash'
import { addFormRules } from '@constants/validateRules'
export default {
  name: 'add-from',
  props: {
    value: {
      type: Boolean
    },
    origin: {
      type: Object
    }
  },
  data () {
    return {
      addFormRules,
      editLoading: false,
      editForm: {
        id: 0,
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
    },
    submitDisabled () {
      return isEqual(this.editForm, this.origin)
    }
  },
  watch: {
    value (value) {
      if (value) {
        this.editForm = Object.assign({}, this.origin)
        console.log('===>', this.editForm)
      }
    }
  },
  methods: {
    async submit () {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          return false
        }
        try {
          await this.$confirm(`确认修改【${this.editForm.name}】的信息吗？`, '提示', { type: 'warning' })
          this.editLoading = true
          let para = Object.assign({}, this.editForm)
          // para.birth = (!para.birth || para.birth === '') ? '' : $util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
          para.birth = (!para.birth || para.birth === '') ? '' : moment(para.birth).format('YYYY-MM-DD')
          await $api.app.editUser(para)
          this.$message.success('修改成功')
          this.$emit('submit')
        } catch (e) {}
        this.editLoading = false
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
