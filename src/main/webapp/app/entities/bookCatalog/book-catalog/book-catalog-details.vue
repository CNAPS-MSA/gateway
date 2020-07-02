<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="bookCatalog">
                <h2 class="jh-entity-heading"><span v-text="$t('gatewayApp.bookCatalogBookCatalog.detail.title')">BookCatalog</span> {{bookCatalog.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{bookCatalog.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{bookCatalog.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.author')">Author</span>
                    </dt>
                    <dd>
                        <span>{{bookCatalog.author}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.publicationDate')">Publication Date</span>
                    </dt>
                    <dd>
                        <span>{{bookCatalog.publicationDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.classification')">Classification</span>
                    </dt>
                    <dd>
                        <span>{{bookCatalog.classification}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.rented')">Rented</span>
                    </dt>
                    <dd>
                        <span>{{bookCatalog.rented}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.rentCnt')">Rent Cnt</span>
                    </dt>
                    <dd>
                        <span>{{bookCatalog.rentCnt}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.bookId')">Book Id</span>
                    </dt>
                    <dd>
                        <span>{{bookCatalog.bookId}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="bookCatalog.id" :to="{name: 'BookCatalogEdit', params: {bookCatalogId: bookCatalog.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./book-catalog-details.component.ts">
</script>
