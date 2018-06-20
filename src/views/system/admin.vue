<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <article class="tile is-child box">
                <b-field grouped group-multiline>
                    <b-select v-model="perPage">
                        <option value="5">每页5条</option>
                        <option value="10">每页10条</option>
                        <option value="15">每页15条</option>
                        <option value="20">每页20条</option>
                    </b-select>
                    <!--<b-input placeholder="跳转" style="width: 60px"-->
                    <!--@keyup.enter.native="onPageChange"></b-input>-->
                    <button class="button is-primary is-small" @click="addAdmin()">
                        新增
                    </button>
                </b-field>

                <b-table :data="isEmpty ? [] : data"
                         :loading="loading"
                         striped
                         hoverable

                         paginated
                         backend-pagination
                         :total="total"
                         :per-page="perPage"
                         :current-page.sync="currentPage"
                         @page-change="onPageChange"

                         backend-sorting
                         :default-sort-direction="defaultSortOrder"
                         :default-sort="[sortField, sortOrder]"
                         @sort="onSort">

                    <!-- 此处有bug-->
                    <!--<template slot-scope="props" slot="header">-->
                    <!--<b-tooltip :active="!!props.column.meta" :label="props.column.meta" dashed>-->
                    <!--{{ props.column.label }}-->
                    <!--</b-tooltip>-->
                    <!--</template>-->

                    <template slot-scope="props">
                        <b-table-column field="id" label="ID" width="40" sortable numeric centered>
                            {{ props.row.id }}
                        </b-table-column>

                        <b-table-column field="uname" label="用户名" meta="这是用户名" sortable centered>
                            {{ props.row.uname }}
                        </b-table-column>

                        <b-table-column field="nick" label="昵称" meta="这是昵称" sortable centered>
                            {{ props.row.nick }}
                        </b-table-column>

                        <b-table-column field="role" label="角色" meta="这是角色" sortable centered>
                            {{ props.row.role }}
                        </b-table-column>

                        <b-table-column field="state" label="状态" meta="这是状态" centered>
                            <b-switch v-model="props.row.state"
                                      true-value="enable" false-value="disable">
                                {{ props.row.state === 'enable' ? '启用' : '禁用'}}
                            </b-switch>
                        </b-table-column>

                        <b-table-column field="lastLoginTime" label="最后登录时间" meta="这是最后登录时间" sortable centered>
                            {{ props.row.lastLoginTime | formatTime }}
                        </b-table-column>

                        <b-table-column label="操作">
                            <button class="button is-primary is-small is-info" @click="updateAdmin(props.row.id)">更新
                            </button>
                            <button class="button is-primary is-small is-danger" @click="deleteAdmin(props.row.id)">删除
                            </button>
                        </b-table-column>

                    </template>

                    <template slot="empty">
                        <section class="section">
                            <div class="content has-text-grey has-text-centered">
                                <p>
                                    <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                                </p>
                                <p>Nothing here.</p>
                            </div>
                        </section>
                    </template>
                </b-table>
            </article>
        </div>

        <admin-modal :visible="showModal" :title="modalTitle" :isSave="isSave" @close="closeModal" @reload="load"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {openMessage} from '../../utils/extends'

    export default {
        data() {
            return {
                data: [],
                isEmpty: false,
                loading: false,
                total: 0,
                page: 1,
                perPage: 10,
                currentPage: 1,
                sortField: '',
                sortOrder: '',
                defaultSortOrder: 'asc',
                showModal: false,
                modalTitle: null,
                isSave: null
            }
        },
        methods: {
            load() {
                const params = {
                    // cond: {
                    //     sortField: this.sortField,
                    //     sortOrder: this.sortOrder,
                    // },
                    pageNum: this.page,
                    pageSize: this.perPage
                };

                this.loading = true;
                this.$store.dispatch('GetAdminList', params).then(() => {
                    this.data = this.adminList;
                    this.total = this.adminTotalCount;
                });
                this.loading = false;
            },
            closeModal() {
                this.showModal = false
            },
            addAdmin() {
                this.$store.dispatch('CleanAdminInfo').then(() => {
                    this.modalTitle = '添加用户';
                    this.isSave = true;
                    this.showModal = true
                })
            },
            updateAdmin(id) {
                this.$store.dispatch('GetAdminInfo', id).then(() => {
                    this.modalTitle = '更新用户';
                    this.isSave = false;
                    this.showModal = true
                });
            },
            deleteAdmin(id) {
                this.$dialog.confirm({
                    title: '删除用户',
                    message: '确定删除该用户？',
                    type: 'is-danger',
                    hasIcon: true,
                    confirmText: '确定',
                    cancelText: '取消',
                    onConfirm: () =>
                        this.$store.dispatch('DeleteAdmin', id).then(() => {
                            openMessage({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.load()
                        })
                })
            },
            onPageChange(page) {
                this.page = page;
                this.currentPage = page;
                this.load();
            },
            onSort(field, order) {
                this.sortField = field;
                this.sortOrder = order;
                this.load();
            }
        },
        computed: {
            ...mapGetters([
                'adminList',
                'adminTotalCount'
            ])
        },
        mounted() {
            this.load();
        },
    }
</script>
