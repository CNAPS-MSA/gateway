<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('global.menu.board')">Board</span>
        </h2>
        <b-alert :show="dismissCountDown"
                 dismissible
                 :variant="alertType"
                 @dismissed="dismissCountDown=0"
                 @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && boards && boards.length === 0">
            <span>No boards found</span>
        </div>
<!--        <form class="form-inline my-2 my-lg-0" v-on:submit.prevent="search()" >-->
<!--            <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="title">-->
<!--            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>-->
<!--        </form>-->
        <div >
<!--            <b-form-select class="m-md-2" v-model="categorySelect.categorySelected" :options="categorySelect.options"-->
<!--                           :text="categorySelect.categorySelected" @change="changeCategory"></b-form-select>-->
            <b-dropdown class="m-md-2" v-model="categorySelect.categorySelected"  :text="categorySelect.categorySelected" >
                <b-dropdown-item disabled value="0">카테고리를 선택하세요.</b-dropdown-item>
                <b-dropdown-item v-for="option in categorySelect.options"
                                    :key="option.value"
                                    :value="option.value"
                                 @click="changeCategory(option.value)">{{option.value}}</b-dropdown-item>
            </b-dropdown>
        </div>
        <div class="table-responsive" style="margin-top: 10px;" v-if="boards && boards.length > 0">
            <table class="table table-striped" >
                <thead>
                <tr>
                    <th>ID</th>
                    <th><span v-text="$t('gatewayApp.boardBoard.title')">Title</span></th>
                    <th><span v-text="$t('gatewayApp.boardBoard.writerName')">writerName</span></th>
                    <th><span v-text="$t('gatewayApp.boardBoard.createdDate')">Created Date</span></th>
                    <th><span v-text="$t('gatewayApp.boardBoard.category')">category</span></th>
                    <th v-on:click="changeOrder('hit')"><span v-text="$t('gatewayApp.boardBoard.hit')">Hit</span><jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'hit'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="board in boards"
                    :key="board.id">
                    <td>{{board.id}}</td>
                    <td>{{board.title}}</td>
                    <td>{{board.writerName}}</td>
                    <td>{{board.createdDate}}</td>
                    <td>{{board.category}}</td>
                    <td>{{board.hit}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-show="boards && boards.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./board.component.ts">
</script>
