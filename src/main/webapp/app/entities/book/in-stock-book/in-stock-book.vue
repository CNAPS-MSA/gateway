<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('gatewayApp.bookInStockBook.home.title')" id="in-stock-book-heading">In Stock Books</span>
            <router-link :to="{name: 'InStockBookCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-in-stock-book">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('gatewayApp.bookInStockBook.home.createLabel')">
                    Create a new In Stock Book
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
        <div class="alert alert-warning" v-if="!isFetching && inStockBooks && inStockBooks.length === 0">
            <span v-text="$t('gatewayApp.bookInStockBook.home.notFound')">No inStockBooks found</span>
        </div>
        <div class="table-responsive" v-if="inStockBooks && inStockBooks.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('title')"><span v-text="$t('gatewayApp.bookInStockBook.title')">Title</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'title'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('description')"><span v-text="$t('gatewayApp.bookInStockBook.description')">Description</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('author')"><span v-text="$t('gatewayApp.bookInStockBook.author')">Author</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'author'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('publisher')"><span v-text="$t('gatewayApp.bookInStockBook.publisher')">Publisher</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'publisher'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('isbn')"><span v-text="$t('gatewayApp.bookInStockBook.isbn')">Isbn</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'isbn'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('publicationDate')"><span v-text="$t('gatewayApp.bookInStockBook.publicationDate')">Publication Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'publicationDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('source')"><span v-text="$t('gatewayApp.bookInStockBook.source')">Source</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'source'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="inStockBook in inStockBooks"
                    :key="inStockBook.id">
                    <td>
                        <router-link :to="{name: 'InStockBookView', params: {inStockBookId: inStockBook.id}}">{{inStockBook.id}}</router-link>
                    </td>
                    <td>{{inStockBook.title}}</td>
                    <td>{{inStockBook.description}}</td>
                    <td>{{inStockBook.author}}</td>
                    <td>{{inStockBook.publisher}}</td>
                    <td>{{inStockBook.isbn}}</td>
                    <td>{{inStockBook.publicationDate}}</td>
                    <td v-text="$t('gatewayApp.Source.' + inStockBook.source)">{{inStockBook.source}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'InStockBookView', params: {inStockBookId: inStockBook.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'InStockBookEdit', params: {inStockBookId: inStockBook.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(inStockBook)"
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
            <span slot="modal-title"><span id="gatewayApp.bookInStockBook.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-inStockBook-heading" v-text="$t('gatewayApp.bookInStockBook.delete.question', {'id': removeId})">Are you sure you want to delete this In Stock Book?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-inStockBook" v-text="$t('entity.action.delete')" v-on:click="removeInStockBook()">Delete</button>
            </div>
        </b-modal>
        <div v-show="inStockBooks && inStockBooks.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./in-stock-book.component.ts">
</script>
