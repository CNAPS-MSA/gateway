<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="gatewayApp.bookCatalogTopListBooks.home.createOrEditLabel" v-text="$t('gatewayApp.bookCatalogTopListBooks.home.createOrEditLabel')">Create or edit a TopListBooks</h2>
                <div>
                    <div class="form-group" v-if="topListBooks.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="topListBooks.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogTopListBooks.title')" for="top-list-books-title">Title</label>
                        <input type="text" class="form-control" name="title" id="top-list-books-title"
                            :class="{'valid': !$v.topListBooks.title.$invalid, 'invalid': $v.topListBooks.title.$invalid }" v-model="$v.topListBooks.title.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogTopListBooks.description')" for="top-list-books-description">Description</label>
                        <input type="text" class="form-control" name="description" id="top-list-books-description"
                            :class="{'valid': !$v.topListBooks.description.$invalid, 'invalid': $v.topListBooks.description.$invalid }" v-model="$v.topListBooks.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogTopListBooks.author')" for="top-list-books-author">Author</label>
                        <input type="text" class="form-control" name="author" id="top-list-books-author"
                            :class="{'valid': !$v.topListBooks.author.$invalid, 'invalid': $v.topListBooks.author.$invalid }" v-model="$v.topListBooks.author.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookCatalogTopListBooks.publisher')" for="top-list-books-publisher">Publisher</label>
                        <input type="text" class="form-control" name="publisher" id="top-list-books-publisher"
                            :class="{'valid': !$v.topListBooks.publisher.$invalid, 'invalid': $v.topListBooks.publisher.$invalid }" v-model="$v.topListBooks.publisher.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.topListBooks.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./top-list-books-update.component.ts">
</script>
