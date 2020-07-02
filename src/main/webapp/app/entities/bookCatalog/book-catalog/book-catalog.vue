<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('gatewayApp.bookCatalogBookCatalog.home.title')" id="book-catalog-heading">Book Catalogs</span>
            <router-link :to="{name: 'BookCatalogCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-book-catalog">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('gatewayApp.bookCatalogBookCatalog.home.createLabel')">
                    Create a new Book Catalog
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
        <div class="alert alert-warning" v-if="!isFetching && bookCatalogs && bookCatalogs.length === 0">
            <span v-text="$t('gatewayApp.bookCatalogBookCatalog.home.notFound')">No bookCatalogs found</span>
        </div>
        <div class="table-responsive" v-if="bookCatalogs && bookCatalogs.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('title')"><span v-text="$t('gatewayApp.bookCatalogBookCatalog.title')">Title</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'title'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('description')"><span v-text="$t('gatewayApp.bookCatalogBookCatalog.description')">Description</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('author')"><span v-text="$t('gatewayApp.bookCatalogBookCatalog.author')">Author</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'author'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('publicationDate')"><span v-text="$t('gatewayApp.bookCatalogBookCatalog.publicationDate')">Publication Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'publicationDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('classification')"><span v-text="$t('gatewayApp.bookCatalogBookCatalog.classification')">Classification</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'classification'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('rented')"><span v-text="$t('gatewayApp.bookCatalogBookCatalog.rented')">Rented</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'rented'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('rentCnt')"><span v-text="$t('gatewayApp.bookCatalogBookCatalog.rentCnt')">Rent Cnt</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'rentCnt'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('bookId')"><span v-text="$t('gatewayApp.bookCatalogBookCatalog.bookId')">Book Id</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bookId'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="bookCatalog in bookCatalogs"
                    :key="bookCatalog.id">
                    <td>
                        <router-link :to="{name: 'BookCatalogView', params: {bookCatalogId: bookCatalog.id}}">{{bookCatalog.id}}</router-link>
                    </td>
                    <td>{{bookCatalog.title}}</td>
                    <td>{{bookCatalog.description}}</td>
                    <td>{{bookCatalog.author}}</td>
                    <td>{{bookCatalog.publicationDate}}</td>
                    <td>{{bookCatalog.classification}}</td>
                    <td>{{bookCatalog.rented}}</td>
                    <td>{{bookCatalog.rentCnt}}</td>
                    <td>{{bookCatalog.bookId}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BookCatalogView', params: {bookCatalogId: bookCatalog.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'BookCatalogEdit', params: {bookCatalogId: bookCatalog.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(bookCatalog)"
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
            <span slot="modal-title"><span id="gatewayApp.bookCatalogBookCatalog.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-bookCatalog-heading" v-text="$t('gatewayApp.bookCatalogBookCatalog.delete.question', {'id': removeId})">Are you sure you want to delete this Book Catalog?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-bookCatalog" v-text="$t('entity.action.delete')" v-on:click="removeBookCatalog()">Delete</button>
            </div>
        </b-modal>
        <div v-show="bookCatalogs && bookCatalogs.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./book-catalog.component.ts">
</script>
