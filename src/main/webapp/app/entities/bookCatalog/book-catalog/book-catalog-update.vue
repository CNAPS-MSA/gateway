<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="gatewayApp.bookCatalogBookCatalog.home.createOrEditLabel" v-text="$t('gatewayApp.bookCatalogBookCatalog.home.createOrEditLabel')">Create or edit a BookCatalog</h2>
                <div>
                    <div class="form-group" v-if="bookCatalog.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="bookCatalog.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogBookCatalog.title')" for="book-catalog-title">Title</label>
                        <input type="text" class="form-control" name="title" id="book-catalog-title"
                            :class="{'valid': !$v.bookCatalog.title.$invalid, 'invalid': $v.bookCatalog.title.$invalid }" v-model="$v.bookCatalog.title.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogBookCatalog.description')" for="book-catalog-description">Description</label>
                        <input type="text" class="form-control" name="description" id="book-catalog-description"
                            :class="{'valid': !$v.bookCatalog.description.$invalid, 'invalid': $v.bookCatalog.description.$invalid }" v-model="$v.bookCatalog.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogBookCatalog.author')" for="book-catalog-author">Author</label>
                        <input type="text" class="form-control" name="author" id="book-catalog-author"
                            :class="{'valid': !$v.bookCatalog.author.$invalid, 'invalid': $v.bookCatalog.author.$invalid }" v-model="$v.bookCatalog.author.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogBookCatalog.publicationDate')" for="book-catalog-publicationDate">Publication Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="book-catalog-publicationDate"
                                    v-model="$v.bookCatalog.publicationDate.$model"
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
                            <b-form-input id="book-catalog-publicationDate" type="text" class="form-control" name="publicationDate"  :class="{'valid': !$v.bookCatalog.publicationDate.$invalid, 'invalid': $v.bookCatalog.publicationDate.$invalid }"
                            v-model="$v.bookCatalog.publicationDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogBookCatalog.classification')" for="book-catalog-classification">Classification</label>
                        <input type="text" class="form-control" name="classification" id="book-catalog-classification"
                            :class="{'valid': !$v.bookCatalog.classification.$invalid, 'invalid': $v.bookCatalog.classification.$invalid }" v-model="$v.bookCatalog.classification.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogBookCatalog.rented')" for="book-catalog-rented">Rented</label>
                        <input type="checkbox" class="form-check" name="rented" id="book-catalog-rented"
                            :class="{'valid': !$v.bookCatalog.rented.$invalid, 'invalid': $v.bookCatalog.rented.$invalid }" v-model="$v.bookCatalog.rented.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogBookCatalog.rentCnt')" for="book-catalog-rentCnt">Rent Cnt</label>
                        <input type="number" class="form-control" name="rentCnt" id="book-catalog-rentCnt"
                            :class="{'valid': !$v.bookCatalog.rentCnt.$invalid, 'invalid': $v.bookCatalog.rentCnt.$invalid }" v-model.number="$v.bookCatalog.rentCnt.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogBookCatalog.bookId')" for="book-catalog-bookId">Book Id</label>
                        <input type="number" class="form-control" name="bookId" id="book-catalog-bookId"
                            :class="{'valid': !$v.bookCatalog.bookId.$invalid, 'invalid': $v.bookCatalog.bookId.$invalid }" v-model.number="$v.bookCatalog.bookId.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.bookCatalog.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./book-catalog-update.component.ts">
</script>
