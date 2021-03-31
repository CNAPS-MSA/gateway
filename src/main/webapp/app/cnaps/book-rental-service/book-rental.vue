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
        <form class="form-inline my-2 my-lg-0" v-on:submit.prevent="search()" >
            <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="title">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div class="table-responsive" style="margin-top: 10px;" v-if="books && books.length > 0">
            <table class="table table-striped" >
                <thead>
                <tr>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.title')">Title</span></th>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.description')">Description</span></th>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.classification')">Classification</span></th>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.author')">Author</span></th>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.publicationDate')">Publication Date</span></th>
                    <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.rented')">Rented</span></th>
                    <th v-on:click="changeOrder('rentCnt')"><span v-text="$t('gatewayApp.bookCatalogBookCatalog.rentCnt')">Rental Count</span><jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'rentCnt'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="book in books"
                    :key="book.id">
                    <td>
                        <router-link :to="{name: 'BookRentalView', params: {bookId: book.id}}">{{book.title}}</router-link>
                    </td>
                    <td>{{book.description}}</td>
                    <td>{{book.classification}}</td>
                    <td>{{book.author}}</td>
                    <td>{{book.publicationDate}}</td>
                    <td v-if="book.rented">대출중</td>
                    <td v-if="!book.rented">대출 가능</td>
                    <td>{{book.rentCnt}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BookRentalView', params: {bookId: book.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <b-button v-if="!book.rented" type="button" class="btn btn-primary" @click="prepareRent(book)">
                                <span  class="d-none d-md-inline" v-text="$t('global.bookrent')">Rent</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="doRental" id="doRental" v-if="selected">
            <span slot="modal-title"><span v-text="$t('gatewayApp.rentalRental.doRent.title')">Confirm rent books</span></span>
            <div class="modal-body">
                <p v-text="$t('gatewayApp.rentalRental.doRent.question', {'param' : selected.title})">Are you sure want to rent these books?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="rentBooks()">Confirm</button>
            </div>
        </b-modal>
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
