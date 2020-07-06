<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="inStockBook">
                <h2 class="jh-entity-heading"><span v-text="$t('gatewayApp.bookInStockBook.detail.title')">InStockBook</span> {{inStockBook.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('gatewayApp.bookInStockBook.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{inStockBook.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookInStockBook.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{inStockBook.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookInStockBook.author')">Author</span>
                    </dt>
                    <dd>
                        <span>{{inStockBook.author}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookInStockBook.publisher')">Publisher</span>
                    </dt>
                    <dd>
                        <span>{{inStockBook.publisher}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookInStockBook.isbn')">Isbn</span>
                    </dt>
                    <dd>
                        <span>{{inStockBook.isbn}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookInStockBook.publicationDate')">Publication Date</span>
                    </dt>
                    <dd>
                        <span>{{inStockBook.publicationDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookInStockBook.source')">Source</span>
                    </dt>
                    <dd>
                        <span v-text="$t('gatewayApp.Source.' + inStockBook.source)">{{inStockBook.source}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="inStockBook.id" :to="{name: 'InStockBookEdit', params: {inStockBookId: inStockBook.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./in-stock-book-details.component.ts">
</script>
