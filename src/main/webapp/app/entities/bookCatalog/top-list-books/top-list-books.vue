<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('gatewayApp.bookCatalogTopListBooks.home.title')" id="top-list-books-heading">Top List Books</span>
            <router-link :to="{name: 'TopListBooksCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-top-list-books">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('gatewayApp.bookCatalogTopListBooks.home.createLabel')">
                    Create a new Top List Books
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && topListBooks && topListBooks.length === 0">
            <span v-text="$t('gatewayApp.bookCatalogTopListBooks.home.notFound')">No topListBooks found</span>
        </div>
        <div class="table-responsive" v-if="topListBooks && topListBooks.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('title')"><span v-text="$t('gatewayApp.bookCatalogTopListBooks.title')">Title</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'title'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('description')"><span v-text="$t('gatewayApp.bookCatalogTopListBooks.description')">Description</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('author')"><span v-text="$t('gatewayApp.bookCatalogTopListBooks.author')">Author</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'author'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('publisher')"><span v-text="$t('gatewayApp.bookCatalogTopListBooks.publisher')">Publisher</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'publisher'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="topListBooks in topListBooks"
                    :key="topListBooks.id">
                    <td>
                        <router-link :to="{name: 'TopListBooksView', params: {topListBooksId: topListBooks.id}}">{{topListBooks.id}}</router-link>
                    </td>
                    <td>{{topListBooks.title}}</td>
                    <td>{{topListBooks.description}}</td>
                    <td>{{topListBooks.author}}</td>
                    <td>{{topListBooks.publisher}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'TopListBooksView', params: {topListBooksId: topListBooks.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'TopListBooksEdit', params: {topListBooksId: topListBooks.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(topListBooks)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="gatewayApp.bookCatalogTopListBooks.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-topListBooks-heading" v-text="$t('gatewayApp.bookCatalogTopListBooks.delete.question', {'id': removeId})">Are you sure you want to delete this Top List Books?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-topListBooks" v-text="$t('entity.action.delete')" v-on:click="removeTopListBooks()">Delete</button>
            </div>
        </b-modal>
        <div v-show="topListBooks && topListBooks.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./top-list-books.component.ts">
</script>
