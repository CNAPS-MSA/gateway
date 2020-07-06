<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="gatewayApp.bookInStockBook.home.createOrEditLabel" v-text="$t('gatewayApp.bookInStockBook.home.createOrEditLabel')">Create or edit a InStockBook</h2>
                <div>
                    <div class="form-group" v-if="inStockBook.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="inStockBook.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookInStockBook.title')" for="in-stock-book-title">Title</label>
                        <input type="text" class="form-control" name="title" id="in-stock-book-title"
                            :class="{'valid': !$v.inStockBook.title.$invalid, 'invalid': $v.inStockBook.title.$invalid }" v-model="$v.inStockBook.title.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookInStockBook.description')" for="in-stock-book-description">Description</label>
                        <input type="text" class="form-control" name="description" id="in-stock-book-description"
                            :class="{'valid': !$v.inStockBook.description.$invalid, 'invalid': $v.inStockBook.description.$invalid }" v-model="$v.inStockBook.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookInStockBook.author')" for="in-stock-book-author">Author</label>
                        <input type="text" class="form-control" name="author" id="in-stock-book-author"
                            :class="{'valid': !$v.inStockBook.author.$invalid, 'invalid': $v.inStockBook.author.$invalid }" v-model="$v.inStockBook.author.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookInStockBook.publisher')" for="in-stock-book-publisher">Publisher</label>
                        <input type="text" class="form-control" name="publisher" id="in-stock-book-publisher"
                            :class="{'valid': !$v.inStockBook.publisher.$invalid, 'invalid': $v.inStockBook.publisher.$invalid }" v-model="$v.inStockBook.publisher.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookInStockBook.isbn')" for="in-stock-book-isbn">Isbn</label>
                        <input type="number" class="form-control" name="isbn" id="in-stock-book-isbn"
                            :class="{'valid': !$v.inStockBook.isbn.$invalid, 'invalid': $v.inStockBook.isbn.$invalid }" v-model.number="$v.inStockBook.isbn.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookInStockBook.publicationDate')" for="in-stock-book-publicationDate">Publication Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="in-stock-book-publicationDate"
                                    v-model="$v.inStockBook.publicationDate.$model"
                                    name="publicationDate"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="in-stock-book-publicationDate" type="text" class="form-control" name="publicationDate"  :class="{'valid': !$v.inStockBook.publicationDate.$invalid, 'invalid': $v.inStockBook.publicationDate.$invalid }"
                            v-model="$v.inStockBook.publicationDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookInStockBook.source')" for="in-stock-book-source">Source</label>
                        <select class="form-control" name="source" :class="{'valid': !$v.inStockBook.source.$invalid, 'invalid': $v.inStockBook.source.$invalid }" v-model="$v.inStockBook.source.$model" id="in-stock-book-source" >
                            <option value="Donated" v-bind:label="$t('gatewayApp.Source.Donated')">Donated</option>
                            <option value="Purchased" v-bind:label="$t('gatewayApp.Source.Purchased')">Purchased</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.inStockBook.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./in-stock-book-update.component.ts">
</script>
