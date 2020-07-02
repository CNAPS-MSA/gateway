<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="book">
                <h2 class="jh-entity-heading"><span v-text="$t('gatewayApp.bookBook.detail.title')">Book</span> {{book.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('gatewayApp.bookBook.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{book.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookBook.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{book.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookBook.author')">Author</span>
                    </dt>
                    <dd>
                        <span>{{book.author}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookBook.publisher')">Publisher</span>
                    </dt>
                    <dd>
                        <span>{{book.publisher}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookBook.isbn')">Isbn</span>
                    </dt>
                    <dd>
                        <span>{{book.isbn}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookBook.publicationDate')">Publication Date</span>
                    </dt>
                    <dd>
                        <span>{{book.publicationDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookBook.classification')">Classification</span>
                    </dt>
                    <dd>
                        <span v-text="$t('gatewayApp.Classification.' + book.classification)">{{book.classification}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookBook.bookStatus')">Book Status</span>
                    </dt>
                    <dd>
                        <span v-text="$t('gatewayApp.BookStatus.' + book.bookStatus)">{{book.bookStatus}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('gatewayApp.bookBook.location')">Location</span>
                    </dt>
                    <dd>
                        <span v-text="$t('gatewayApp.Location.' + book.location)">{{book.location}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="book.id" :to="{name: 'BookEdit', params: {bookId: book.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./book-details.component.ts">
</script>
