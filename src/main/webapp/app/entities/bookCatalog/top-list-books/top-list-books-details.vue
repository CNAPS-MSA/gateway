<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="topListBooks">
                <h2 class="jh-entity-heading"><span v-text="$t('gatewayApp.bookCatalogTopListBooks.detail.title')">TopListBooks</span> {{topListBooks.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogTopListBooks.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{topListBooks.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogTopListBooks.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{topListBooks.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogTopListBooks.author')">Author</span>
                    </dt>
                    <dd>
                        <span>{{topListBooks.author}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogTopListBooks.publisher')">Publisher</span>
                    </dt>
                    <dd>
                        <span>{{topListBooks.publisher}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="topListBooks.id" :to="{name: 'TopListBooksEdit', params: {topListBooksId: topListBooks.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./top-list-books-details.component.ts">
</script>
