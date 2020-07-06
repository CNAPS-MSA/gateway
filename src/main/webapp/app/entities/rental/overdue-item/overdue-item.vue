<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('gatewayApp.rentalOverdueItem.home.title')" id="overdue-item-heading">Overdue Items</span>
            <router-link :to="{name: 'OverdueItemCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-overdue-item">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('gatewayApp.rentalOverdueItem.home.createLabel')">
                    Create a new Overdue Item
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
        <div class="alert alert-warning" v-if="!isFetching && overdueItems && overdueItems.length === 0">
            <span v-text="$t('gatewayApp.rentalOverdueItem.home.notFound')">No overdueItems found</span>
        </div>
        <div class="table-responsive" v-if="overdueItems && overdueItems.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('bookId')"><span v-text="$t('gatewayApp.rentalOverdueItem.bookId')">Book Id</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bookId'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('dueDate')"><span v-text="$t('gatewayApp.rentalOverdueItem.dueDate')">Due Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'dueDate'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('bookTitle')"><span v-text="$t('gatewayApp.rentalOverdueItem.bookTitle')">Book Title</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bookTitle'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('rentalId')"><span v-text="$t('gatewayApp.rentalOverdueItem.rental')">Rental</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'rentalId'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="overdueItem in overdueItems"
                    :key="overdueItem.id">
                    <td>
                        <router-link :to="{name: 'OverdueItemView', params: {overdueItemId: overdueItem.id}}">{{overdueItem.id}}</router-link>
                    </td>
                    <td>{{overdueItem.bookId}}</td>
                    <td>{{overdueItem.dueDate}}</td>
                    <td>{{overdueItem.bookTitle}}</td>
                    <td>
                        <div v-if="overdueItem.rentalId">
                            <router-link :to="{name: 'RentalView', params: {rentalId: overdueItem.rentalId}}">{{overdueItem.rentalId}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'OverdueItemView', params: {overdueItemId: overdueItem.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'OverdueItemEdit', params: {overdueItemId: overdueItem.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(overdueItem)"
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
            <span slot="modal-title"><span id="gatewayApp.rentalOverdueItem.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-overdueItem-heading" v-text="$t('gatewayApp.rentalOverdueItem.delete.question', {'id': removeId})">Are you sure you want to delete this Overdue Item?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-overdueItem" v-text="$t('entity.action.delete')" v-on:click="removeOverdueItem()">Delete</button>
            </div>
        </b-modal>
        <div v-show="overdueItems && overdueItems.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./overdue-item.component.ts">
</script>
