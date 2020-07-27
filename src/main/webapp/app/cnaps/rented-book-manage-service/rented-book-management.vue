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
                            <router-link :to="{name: 'RentedBookDetailsView', params: {bookId: book.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <b-button class="btn btn-primary" @click="prepareOverdue(book.rentalId, book.bookId)"
                                        v-b-modal.doOverdue>
                                <span class="d-none d-md-inline" v-text="$t('global.overdueBook')">Overdue Books</span>
                            </b-button>
                            <!--                        <router-link :to="{name: 'BookRentalDo', params: {rentalId: book.id}}" tag="button" class="btn btn-primary btn-sm edit">-->
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
        <b-modal ref="doOverdue" id="doOverdue">
            <span slot="modal-title"><span v-text="$t('gatewayApp.rentalRentedItem.doOverdue.title')"></span>Confirm Overdue This Book</span>
            <div class="modal-body">
                <p v-text="$t('gatewayApp.rentalRentedItem.doOverdue.question')">Are you sure want to set this book be Overdue?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="overdueBook()">Confirm</button>
            </div>
        </b-modal>
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

<script lang="ts" src="./rented-book-management.component.ts">
</script>
