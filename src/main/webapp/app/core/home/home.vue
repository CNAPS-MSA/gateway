<template>
    <div class="home row">
        <div class="col-md-3">
            <span class="hipster img-fluid rounded"></span>
        </div>
        <div class="col-md-9">
            <h1 class="display-4" v-text="$t('home.title')">Welcome, CNAPS 3.0's Library System!</h1>
            <p class="lead" v-text="$t('home.subtitle')">This is your homepage</p>

            <div>
                <div class="alert alert-success" v-if="authenticated">
                    <span v-if="username" v-text="$t('home.logged.message', { 'username': username})">You are logged in as user "{{username}}"</span>
                </div>

                <div class="alert alert-warning" v-if="!authenticated">
                    <span v-text="$t('global.messages.info.authenticated.prefix')">If you want to </span>
                    <a class="alert-link" v-on:click="openLogin()" v-text="$t('global.messages.info.authenticated.link')">sign in</a><span v-html="$t('global.messages.info.authenticated.suffix')">, you can try the default accounts:<br/>- Administrator (login="admin" and password="admin") <br/>- User (login="user" and password="user").</span>
                </div>
                <div class="alert alert-warning" v-if="!authenticated">
                    <span v-text="$t('global.messages.info.register.noaccount')">You don't have an account yet?</span>&nbsp;
                    <router-link class="alert-link" to="/register" v-text="$t('global.messages.info.register.link')">Register a new account</router-link>
                </div>
            </div>
            <div  class="table-responsive" style="margin-top: 10px;" v-if="authenticated&& books && books.length> 0">
                <h4><strong>인기 대여 도서 목록</strong></h4>
                <table class="table table-striped" >
                    <thead>
                    <tr>
                        <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.title')">Title</span></th>
                        <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.description')">Description</span></th>
                        <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.classification')">Classification</span></th>
                        <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.author')">Author</span></th>
                        <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.publicationDate')">Publication Date</span></th>
                        <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.rented')">Rented</span></th>
                        <th><span v-text="$t('gatewayApp.bookCatalogBookCatalog.rentCnt')">Rental Count</span></th>
                        <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="book in books"
                            :key="book.id">
                            <td>
                                <router-link :to="{name: 'BookRentalView', params: {bookId: book.id}}">{{book.title}}</router-link>
                            </td>
                            <td>{{book.description}}</td>
                            <td>{{book.classification}}</td>
                            <td>{{book.author}}</td>
                            <td>{{book.publicationDate}}</td>
                            <td v-if="book.rented">대여중</td>
                            <td v-if="!book.rented">대여 가능</td>
                            <td>{{book.rentCnt}}</td>
                            <td class="text-right">
                                <div class="btn-group">
                                    <router-link :to="{name: 'BookRentalView', params: {bookId: book.id}}" tag="button" class="btn btn-info btn-sm details">
                                        <font-awesome-icon icon="eye"></font-awesome-icon>
                                        <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                                    </router-link>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    </div>
</template>

<script lang="ts" src="./home.component.ts">
</script>
