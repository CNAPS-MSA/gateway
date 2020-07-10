<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('global.menu.rentalpage')">Rental Page</span>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && books && books.length === 0">
            <span>No books found</span>
        </div>
        <div class="input-group mb-3">
            <label>
                <input type="text" class="form-control" placeholder="Search by title"
                       v-model="title"/>
            </label>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button"
                        @click="search(title)"
                >
                    Search
                </button>
            </div>
        </div>
        <div class="table-responsive" v-if="books && books.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.title')">Title</span></th>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.description')">Description</span></th>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.classification')">Classification</span></th>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.author')">Author</span></th>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.publicationDate')">Publication Date</span></th>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.rented')">Rented</span></th>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.rentCnt')">Rental Count</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="book in books"
                    :key="book.title">
                    <td>
                        <router-link :to="{name: 'BookRentalView', params: {bookTitle: book.title}}">{{book.title}}</router-link>
                    </td>
                    <td>{{book.description}}</td>
                    <td>{{book.classification}}</td>
                    <td>{{book.author}}</td>
                    <td>{{book.publicationDate}}</td>
                    <td>{{book.rented}}</td>
                    <td>{{book.rentCnt}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BookRentalView', params: {bookTitle: book.title}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
<!--                            <router-link :to="{name: 'RentalEdit', params: {rentalId: book.id}}" tag="button" class="btn btn-primary btn-sm edit">-->
<!--                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>-->
<!--                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>-->
<!--                            </router-link>-->
<!--                            <b-button v-on:click="prepareRemove(book)"-->
<!--                                   variant="danger"-->
<!--                                   class="btn btn-sm"-->
<!--                                   v-b-modal.removeEntity>-->
<!--                                <font-awesome-icon icon="times"></font-awesome-icon>-->
<!--                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>-->
<!--                            </b-button>-->
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
<!--        <b-modal ref="removeEntity" id="removeEntity" >-->
<!--            <span slot="modal-title"><span id="gatewayApp.rentalRental.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>-->
<!--            <div class="modal-body">-->
<!--                <p id="jhi-delete-rental-heading" v-text="$t('gatewayApp.rentalRental.delete.question', {'id': removeId})">Are you sure you want to delete this Rental?</p>-->
<!--            </div>-->
<!--            <div slot="modal-footer">-->
<!--                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>-->
<!--                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-rental" v-text="$t('entity.action.delete')" v-on:click="removeRental()">Delete</button>-->
<!--            </div>-->
<!--        </b-modal>-->
        <div v-show="books && books.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./book-rental.component.ts">
</script>
