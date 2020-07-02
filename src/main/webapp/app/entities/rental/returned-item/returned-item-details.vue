<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="returnedItem">
                <h2 class="jh-entity-heading"><span v-text="$t('gatewayApp.rentalReturnedItem.detail.title')">ReturnedItem</span> {{returnedItem.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('gatewayApp.rentalReturnedItem.bookId')">Book Id</span>
                    </dt>
                    <dd>
                        <span>{{returnedItem.bookId}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.rentalReturnedItem.returnedDate')">Returned Date</span>
                    </dt>
                    <dd>
                        <span>{{returnedItem.returnedDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.rentalReturnedItem.bookTitle')">Book Title</span>
                    </dt>
                    <dd>
                        <span>{{returnedItem.bookTitle}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.rentalReturnedItem.rental')">Rental</span>
                    </dt>
                    <dd>
                        <div v-if="returnedItem.rentalId">
                            <router-link :to="{name: 'RentalView', params: {rentalId: returnedItem.rentalId}}">{{returnedItem.rentalId}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="returnedItem.id" :to="{name: 'ReturnedItemEdit', params: {returnedItemId: returnedItem.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./returned-item-details.component.ts">
</script>
