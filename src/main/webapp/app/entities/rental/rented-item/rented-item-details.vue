<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="rentedItem">
                <h2 class="jh-entity-heading"><span v-text="$t('gatewayApp.rentalRentedItem.detail.title')">RentedItem</span> {{rentedItem.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('gatewayApp.rentalRentedItem.bookId')">Book Id</span>
                    </dt>
                    <dd>
                        <span>{{rentedItem.bookId}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.rentalRentedItem.rentedDate')">Rented Date</span>
                    </dt>
                    <dd>
                        <span>{{rentedItem.rentedDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.rentalRentedItem.dueDate')">Due Date</span>
                    </dt>
                    <dd>
                        <span>{{rentedItem.dueDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.rentalRentedItem.bookTitle')">Book Title</span>
                    </dt>
                    <dd>
                        <span>{{rentedItem.bookTitle}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.rentalRentedItem.rental')">Rental</span>
                    </dt>
                    <dd>
                        <div v-if="rentedItem.rentalId">
                            <router-link :to="{name: 'RentalView', params: {rentalId: rentedItem.rentalId}}">{{rentedItem.rentalId}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="rentedItem.id" :to="{name: 'RentedItemEdit', params: {rentedItemId: rentedItem.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./rented-item-details.component.ts">
</script>
