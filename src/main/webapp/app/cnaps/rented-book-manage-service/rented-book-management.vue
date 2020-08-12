<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('global.menu.manageRented')">RentedBooks Management</span>
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
        <form class="form-inline my-2 my-lg-0" v-on:submit.prevent="search">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="title">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit" >Search</button>
        </form>


        <div class="table-responsive" v-if="books && books.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('gatewayApp.rentalRentedItem.bookTitle')">Book Title</span></th>
                    <th><span v-text="$t('gatewayApp.rentalRentedItem.rentedDate')">Rented Date</span></th>
                    <th><span v-text="$t('gatewayApp.rentalRentedItem.dueDate')">Due Date</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="book in books"
                    :key="book.id">
                    <td>{{book.bookTitle}}</td>
                    <td>{{book.rentedDate}}</td>
                    <td>{{book.dueDate}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <b-button class="btn btn-primary" @click="prepareOverdue(book.rentalId, book.bookId)"
                                        v-b-modal.doOverdue>
                                <span class="d-none d-md-inline" v-text="$t('global.overdueBook')">Overdue Books</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="doOverdue" id="doOverdue">
            <span slot="modal-title"><span v-text="$t('gatewayApp.rentalRentedItem.doOverdue.title')">Confirm Overdue This Book</span></span>
            <div class="modal-body">
                <p v-text="$t('gatewayApp.rentalRentedItem.doOverdue.question')">Are you sure want to set this book be Overdue?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="overdueBook()">Confirm</button>
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

<script lang="ts" src="./rented-book-management.component.ts">
</script>
