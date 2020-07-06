<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="overdueItem">
                <h2 class="jh-entity-heading"><span v-text="$t('gatewayApp.rentalOverdueItem.detail.title')">OverdueItem</span> {{overdueItem.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('gatewayApp.rentalOverdueItem.bookId')">Book Id</span>
                    </dt>
                    <dd>
                        <span>{{overdueItem.bookId}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.rentalOverdueItem.dueDate')">Due Date</span>
                    </dt>
                    <dd>
                        <span>{{overdueItem.dueDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.rentalOverdueItem.bookTitle')">Book Title</span>
                    </dt>
                    <dd>
                        <span>{{overdueItem.bookTitle}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.rentalOverdueItem.rental')">Rental</span>
                    </dt>
                    <dd>
                        <div v-if="overdueItem.rentalId">
                            <router-link :to="{name: 'RentalView', params: {rentalId: overdueItem.rentalId}}">{{overdueItem.rentalId}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="overdueItem.id" :to="{name: 'OverdueItemEdit', params: {overdueItemId: overdueItem.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./overdue-item-details.component.ts">
</script>
