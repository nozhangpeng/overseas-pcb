<template>
	<div class="apps">
		<div class="container">
			<div class="header" style="padding-bottom: 20px">我的Table<span class="tips">power by PAMS</span>
	       <el-button type="primary" size="small" icon="el-icon-plus" plain @click="addFormDialogVisible = true" style="float: right;margin-right: 15px">新增</el-button>
	    </div>
			<div class="bread-crumbs">
				<el-row>
	        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
	            <el-input class="file-search" v-model="query.name" placeholder="输入姓名" size="small" suffix-icon="el-icon-search" @keyup.enter.native="getUsers()"></el-input>
	        </el-col>
        </el-row>
      </div>
			<div class="app-list" v-loading="listLoading">
				<el-table :data="users" highlight-current-row @selection-change="selsChange" style="width: 100%;">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column type="index" width="60">
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="120" sortable>
					</el-table-column>
					<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
					</el-table-column>
					<el-table-column prop="age" label="年龄" width="100" sortable>
					</el-table-column>
					<el-table-column prop="birth" label="生日" width="120" sortable>
					</el-table-column>
					<el-table-column prop="addr" label="地址" min-width="180" sortable>
					</el-table-column>
					<el-table-column label="操作" width="150">
						<template slot-scope="scope">
							<el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
							<el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="batchRemove">
					<el-button type="danger" size="small" @click="batchRemove()" :disabled="this.sels.length===0">批量删除</el-button>
				</div>
				<el-pagination
          @current-change="changePage"
          @size-change="changeSize"
          :current-page="query.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="query.pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
			</div>
		</div>
		<add-from-dialog v-model="addFormDialogVisible" @submit="afterAddFrom"></add-from-dialog>
		<edit-from-dialog v-model="editFormDialogVisible" @submit="afterEditFrom" :origin="editForm"></edit-from-dialog>
	</div>
</template>

<script>
	import util from '@helper/util'
	import { $api } from '@helper'
	import addFromDialog from './fromcomponents/AddFrom.vue'
	import editFromDialog from './fromcomponents/EditFrom.vue'

	export default {
		name: 'from',
		components: { addFromDialog, editFromDialog },
		data() {
			return {
				query: {
					page: 1,
					pageSize: 20,
					name: ''
				},
				users: [],
				total: null,
				listLoading: false,
				sels: [],
				editFormDialogVisible: false,
				addFormDialogVisible: false,
				editForm: null
			}
		},
		methods: {
			//性别显示转换
			formatSex (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知'
			},
			async changePage (page) {
				this.query.page = page
				await this.getUsers()
			},
			async changeSize (size) {
	      this.query.pageSize = size
	      await this.getUsers()
    	},
			async getUsers () {
				try {
					this.listLoading = true
					const respones = await $api.app.getUserListPage(this.query)
					this.total = respones.total
					this.users = respones.users
				} catch (e) {}
				this.listLoading = false
			},
			async handleDel (row) {
				try {
					await this.$confirm(`确认删除该记录吗?`, '提示', { type: 'warning' })
					this.listLoading = true
					let para = { id: row.id }
					await $api.app.removeUser(para)
					this.$message.success('删除成功')
					this.getUsers()
				} catch (e) {}
				this.listLoading = false
			},
			afterAddFrom () {
				this.addFormDialogVisible = false
				this.getUsers()
			},
			afterEditFrom () {
				this.editFormDialogVisible = false
				this.getUsers()
			},
			handleEdit (row) {
				this.editForm = Object.assign({}, row)
				this.editFormDialogVisible = true
			},
			selsChange (sels) {
				this.sels = sels
			},
			async batchRemove () {
				let ids = this.sels.map(item => item.id).toString()
				try {
					await this.$confirm(`确认删除选中记录吗？`, '提示', { type: 'warning' })
					this.listLoading = true
					let para = { ids: ids }
					await $api.app.batchRemoveUser(para)
					this.$message.success('删除成功')
					this.getUsers()
				} catch (e) {}
				this.listLoading = false
			}
		},
		created () {
			this.getUsers()
		}
	}

</script>

<style lang="scss" scoped>
@import '~@assets/scss/style.scss';
.apps {
  .container {
    background: #fff;
    padding: 20px;
    margin: 20px;

    .header {
      font-size: 18px;
      padding-bottom: 12px;
      border-bottom: 1px solid $border-grey;

      .tips {
        font-size: 12px;
        margin-left: 10px;
        color: $font-second-color;
      }
    }
		 .bread-crumbs {
			 padding: 10px 15px;
       display: flex;
			 justify-content: flex-end;
		 }
    .app-list {
			.batchRemove {
				display: flex;
				justify-content: flex-end;
				padding: 10px 10px 0 10px;
			}
			.no-data {
        color: $font-second-color;
        text-align: center;
        height: 75px;
        line-height: 75px;
        background-color: #fff;
        border-bottom: 1px solid $border-grey-second;
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
}
.copy-line {
  .fa-copy {
    margin-left: 5px;
    font-size: 16px;
    color: $primary;
    display: none;
  }
}
.copy-line:hover {
  cursor: pointer;
  .fa-copy {
    display: inline-block;
  }
}
</style>
