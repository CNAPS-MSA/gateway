<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('global.menu.registerbook')">Register new Book</span>
        </h2>
        <b-alert :show="dismissCountDown"
                 dismissible
                 :variant="alertType"
                 @dismissed="dismissCountDown=0"
                 @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && instockBooks && instockBooks.length === 0">
            <span>No books found</span>
        </div>
        <form class="form-inline my-2 my-lg-0" v-on:submit.prevent="search()">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="title">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit" >Search</button>
        </form>
        <div class="table-responsive" v-if="instockBooks && instockBooks.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('gatewayApp.bookInStockBook.title')">Title</span></th>
                    <th><span v-text="$t('gatewayApp.bookInStockBook.description')">Description</span></th>
                    <th><span v-text="$t('gatewayApp.bookInStockBook.author')">Author</span></th>
                    <th><span v-text="$t('gatewayApp.bookInStockBook.publisher')">Publisher</span></th>
                    <th><span v-text="$t('gatewayApp.bookInStockBook.isbn')">ISBN</span></th>
                    <th><span v-text="$t('gatewayApp.bookInStockBook.publicationDate')">PublicationDate</span></th>
                    <th><span v-text="$t('gatewayApp.bookInStockBook.source')">Source</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="instockBook in instockBooks"
                    :key="instockBook.id">
                    <td>{{instockBook.title}}</td>
                    <td>{{instockBook.description}}</td>
                    <td>{{instockBook.author}}</td>
                    <td>{{instockBook.publisher}}</td>
                    <td>{{instockBook.isbn}}</td>
                    <td>{{instockBook.publicationDate}}</td>
                    <td>{{instockBook.source}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'RegisterBookForm', params: {inStockId: instockBook.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.register')">Register</span>
                            </router-link>

                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-show="instockBooks && instockBooks.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./book-register.component.ts">
</script>
