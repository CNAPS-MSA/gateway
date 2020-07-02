<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('gatewayApp.rentalRental.home.title')" id="rental-heading">Rentals</span>
            <router-link :to="{name: 'RentalCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-rental">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('gatewayApp.rentalRental.home.createLabel')">
                    Create a new Rental
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
        <div class="alert alert-warning" v-if="!isFetching && rentals && rentals.length === 0">
            <span v-text="$t('gatewayApp.rentalRental.home.notFound')">No rentals found</span>
        </div>
        <div class="table-responsive" v-if="rentals && rentals.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('userId')"><span v-text="$t('gatewayApp.rentalRental.userId')">User Id</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'userId'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('rentalStatus')"><span v-text="$t('gatewayApp.rentalRental.rentalStatus')">Rental Status</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'rentalStatus'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('lateFee')"><span v-text="$t('gatewayApp.rentalRental.lateFee')">Late Fee</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'lateFee'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="rental in rentals"
                    :key="rental.id">
                    <td>
                        <router-link :to="{name: 'RentalView', params: {rentalId: rental.id}}">{{rental.id}}</router-link>
                    </td>
                    <td>{{rental.userId}}</td>
                    <td v-text="$t('gatewayApp.RentalStatus.' + rental.rentalStatus)">{{rental.rentalStatus}}</td>
                    <td>{{rental.lateFee}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'RentalView', params: {rentalId: rental.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'RentalEdit', params: {rentalId: rental.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(rental)"
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
            <span slot="modal-title"><span id="gatewayApp.rentalRental.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-rental-heading" v-text="$t('gatewayApp.rentalRental.delete.question', {'id': removeId})">Are you sure you want to delete this Rental?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-rental" v-text="$t('entity.action.delete')" v-on:click="removeRental()">Delete</button>
            </div>
        </b-modal>
        <div v-show="rentals && rentals.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./rental.component.ts">
</script>
