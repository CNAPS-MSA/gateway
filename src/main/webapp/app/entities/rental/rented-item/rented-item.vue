<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('gatewayApp.rentalRentedItem.home.title')" id="rented-item-heading">Rented Items</span>
            <router-link :to="{name: 'RentedItemCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-rented-item">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('gatewayApp.rentalRentedItem.home.createLabel')">
                    Create a new Rented Item
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
        <div class="alert alert-warning" v-if="!isFetching && rentedItems && rentedItems.length === 0">
            <span v-text="$t('gatewayApp.rentalRentedItem.home.notFound')">No rentedItems found</span>
        </div>
        <div class="table-responsive" v-if="rentedItems && rentedItems.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('bookId')"><span v-text="$t('gatewayApp.rentalRentedItem.bookId')">Book Id</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bookId'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('rentedDate')"><span v-text="$t('gatewayApp.rentalRentedItem.rentedDate')">Rented Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'rentedDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('dueDate')"><span v-text="$t('gatewayApp.rentalRentedItem.dueDate')">Due Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'dueDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('bookTitle')"><span v-text="$t('gatewayApp.rentalRentedItem.bookTitle')">Book Title</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bookTitle'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('rentalId')"><span v-text="$t('gatewayApp.rentalRentedItem.rental')">Rental</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'rentalId'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="rentedItem in rentedItems"
                    :key="rentedItem.id">
                    <td>
                        <router-link :to="{name: 'RentedItemView', params: {rentedItemId: rentedItem.id}}">{{rentedItem.id}}</router-link>
                    </td>
                    <td>{{rentedItem.bookId}}</td>
                    <td>{{rentedItem.rentedDate}}</td>
                    <td>{{rentedItem.dueDate}}</td>
                    <td>{{rentedItem.bookTitle}}</td>
                    <td>
                        <div v-if="rentedItem.rentalId">
                            <router-link :to="{name: 'RentalView', params: {rentalId: rentedItem.rentalId}}">{{rentedItem.rentalId}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'RentedItemView', params: {rentedItemId: rentedItem.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'RentedItemEdit', params: {rentedItemId: rentedItem.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(rentedItem)"
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
            <span slot="modal-title"><span id="gatewayApp.rentalRentedItem.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-rentedItem-heading" v-text="$t('gatewayApp.rentalRentedItem.delete.question', {'id': removeId})">Are you sure you want to delete this Rented Item?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-rentedItem" v-text="$t('entity.action.delete')" v-on:click="removeRentedItem()">Delete</button>
            </div>
        </b-modal>
        <div v-show="rentedItems && rentedItems.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./rented-item.component.ts">
</script>
