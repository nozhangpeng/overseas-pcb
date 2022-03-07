<template>
	<div class="apps">
		<div class="container">
			<div class="header" style="padding-bottom: 20px">我的User<span class="tips">power by PAMS</span></div>
			<div class="bread-crumbs">
				<el-row>
					<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
							<el-input class="file-search" v-model="filters.name" placeholder="输入姓名" size="small" suffix-icon="el-icon-search" @keyup.enter.native="getUser()"></el-input>
					</el-col>
				</el-row>
			</div>
			<div class="app-list" v-loading="loading">
				<el-table :data="users" highlight-current-row style="width: 100%;">
					<el-table-column type="index" width="100">
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="200" sortable>
					</el-table-column>
					<el-table-column prop="sex" label="性别" width="200" :formatter="formatSex" sortable>
					</el-table-column>
					<el-table-column prop="age" label="年龄" width="200" sortable>
					</el-table-column>
					<el-table-column prop="birth" label="生日" width="200" sortable>
					</el-table-column>
					<el-table-column prop="addr" label="地址" min-width="200" sortable>
					</el-table-column>
				</el-table>
			</div>
		</div>
</div>
</template>
<script>
	import { $api } from '@helper'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				users: []
			}
		},
		methods: {
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			async getUser () {
				let para = {
					name: this.filters.name
				}
				try {
					this.loading = true
					const respones = await $api.app.getUserList(para)
					this.users = respones.users
				} catch (e) {}
				this.loading = false
			}
		},
		mounted() {
			this.getUser();
		}
	};

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
    .app-list {}
  }
}
</style>
