<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="book">
                <h2 class="jh-entity-heading"><span v-text="$t('gatewayApp.bookCatalogBookCatalog.detail.header')">Book Details</span></h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{book.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{book.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.author')">Author</span>
                    </dt>
                    <dd>
                        <span>{{book.author}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.publicationDate')">Publication Date</span>
                    </dt>
                    <dd>
                        <span>{{book.publicationDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.classification')">Classification</span>
                    </dt>
                    <dd>
                        <span>{{book.classification}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.rented')">Rented</span>
                    </dt>
                    <dd>
                        <span v-if="book.rented">대출중</span>
                        <span v-if="!book.rented">대출 가능</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookCatalogBookCatalog.rentCnt')">Rent Cnt</span>
                    </dt>
                    <dd>
                        <span>{{book.rentCnt}}</span>
                    </dd>
                    <dt>
                        <span>대출</span>
                    </dt>
                    <dd>
                        <button v-if="!book.rented" type="button" class="btn btn-primary" @click="prepareRent(book)">
                            <span v-text="$t('global.bookrent')">Rent</span>
                        </button>
                    </dd>
                </dl>

            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./book-rental-details.component.ts">
</script>
