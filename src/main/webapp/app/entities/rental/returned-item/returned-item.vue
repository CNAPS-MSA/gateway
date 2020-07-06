<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('gatewayApp.rentalReturnedItem.home.title')" id="returned-item-heading">Returned Items</span>
            <router-link :to="{name: 'ReturnedItemCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-returned-item">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('gatewayApp.rentalReturnedItem.home.createLabel')">
                    Create a new Returned Item
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
        <div class="alert alert-warning" v-if="!isFetching && returnedItems && returnedItems.length === 0">
            <span v-text="$t('gatewayApp.rentalReturnedItem.home.notFound')">No returnedItems found</span>
        </div>
        <div class="table-responsive" v-if="returnedItems && returnedItems.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('bookId')"><span v-text="$t('gatewayApp.rentalReturnedItem.bookId')">Book Id</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bookId'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('returnedDate')"><span v-text="$t('gatewayApp.rentalReturnedItem.returnedDate')">Returned Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'returnedDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('bookTitle')"><span v-text="$t('gatewayApp.rentalReturnedItem.bookTitle')">Book Title</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bookTitle'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('rentalId')"><span v-text="$t('gatewayApp.rentalReturnedItem.rental')">Rental</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'rentalId'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="returnedItem in returnedItems"
                    :key="returnedItem.id">
                    <td>
                        <router-link :to="{name: 'ReturnedItemView', params: {returnedItemId: returnedItem.id}}">{{returnedItem.id}}</router-link>
                    </td>
                    <td>{{returnedItem.bookId}}</td>
                    <td>{{returnedItem.returnedDate}}</td>
                    <td>{{returnedItem.bookTitle}}</td>
                    <td>
                        <div v-if="returnedItem.rentalId">
                            <router-link :to="{name: 'RentalView', params: {rentalId: returnedItem.rentalId}}">{{returnedItem.rentalId}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ReturnedItemView', params: {returnedItemId: returnedItem.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ReturnedItemEdit', params: {returnedItemId: returnedItem.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(returnedItem)"
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
            <span slot="modal-title"><span id="gatewayApp.rentalReturnedItem.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-returnedItem-heading" v-text="$t('gatewayApp.rentalReturnedItem.delete.question', {'id': removeId})">Are you sure you want to delete this Returned Item?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-returnedItem" v-text="$t('entity.action.delete')" v-on:click="removeReturnedItem()">Delete</button>
            </div>
        </b-modal>
        <div v-show="returnedItems && returnedItems.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./returned-item.component.ts">
</script>
