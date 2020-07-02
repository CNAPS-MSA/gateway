<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="gatewayApp.bookBook.home.createOrEditLabel" v-text="$t('gatewayApp.bookBook.home.createOrEditLabel')">Create or edit a Book</h2>
                <div>
                    <div class="form-group" v-if="book.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="book.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookBook.title')" for="book-title">Title</label>
                        <input type="text" class="form-control" name="title" id="book-title"
                            :class="{'valid': !$v.book.title.$invalid, 'invalid': $v.book.title.$invalid }" v-model="$v.book.title.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookBook.description')" for="book-description">Description</label>
                        <input type="text" class="form-control" name="description" id="book-description"
                            :class="{'valid': !$v.book.description.$invalid, 'invalid': $v.book.description.$invalid }" v-model="$v.book.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookBook.author')" for="book-author">Author</label>
                        <input type="text" class="form-control" name="author" id="book-author"
                            :class="{'valid': !$v.book.author.$invalid, 'invalid': $v.book.author.$invalid }" v-model="$v.book.author.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookBook.publisher')" for="book-publisher">Publisher</label>
                        <input type="text" class="form-control" name="publisher" id="book-publisher"
                            :class="{'valid': !$v.book.publisher.$invalid, 'invalid': $v.book.publisher.$invalid }" v-model="$v.book.publisher.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookBook.isbn')" for="book-isbn">Isbn</label>
                        <input type="number" class="form-control" name="isbn" id="book-isbn"
                            :class="{'valid': !$v.book.isbn.$invalid, 'invalid': $v.book.isbn.$invalid }" v-model.number="$v.book.isbn.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookBook.publicationDate')" for="book-publicationDate">Publication Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="book-publicationDate"
                                    v-model="$v.book.publicationDate.$model"
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
                            <b-form-input id="book-publicationDate" type="text" class="form-control" name="publicationDate"  :class="{'valid': !$v.book.publicationDate.$invalid, 'invalid': $v.book.publicationDate.$invalid }"
                            v-model="$v.book.publicationDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookBook.classification')" for="book-classification">Classification</label>
                        <select class="form-control" name="classification" :class="{'valid': !$v.book.classification.$invalid, 'invalid': $v.book.classification.$invalid }" v-model="$v.book.classification.$model" id="book-classification" >
                            <option value="Arts" v-bind:label="$t('gatewayApp.Classification.Arts')">Arts</option>
                            <option value="Photography" v-bind:label="$t('gatewayApp.Classification.Photography')">Photography</option>
                            <option value="Biographies" v-bind:label="$t('gatewayApp.Classification.Biographies')">Biographies</option>
                            <option value="BusinessMoney" v-bind:label="$t('gatewayApp.Classification.BusinessMoney')">BusinessMoney</option>
                            <option value="Children" v-bind:label="$t('gatewayApp.Classification.Children')">Children</option>
                            <option value="ComputerTechnology" v-bind:label="$t('gatewayApp.Classification.ComputerTechnology')">ComputerTechnology</option>
                            <option value="History" v-bind:label="$t('gatewayApp.Classification.History')">History</option>
                            <option value="Medical" v-bind:label="$t('gatewayApp.Classification.Medical')">Medical</option>
                            <option value="Travel" v-bind:label="$t('gatewayApp.Classification.Travel')">Travel</option>
                            <option value="Romance" v-bind:label="$t('gatewayApp.Classification.Romance')">Romance</option>
                            <option value="Science" v-bind:label="$t('gatewayApp.Classification.Science')">Science</option>
                            <option value="Math" v-bind:label="$t('gatewayApp.Classification.Math')">Math</option>
                            <option value="SelfHelp" v-bind:label="$t('gatewayApp.Classification.SelfHelp')">SelfHelp</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookBook.bookStatus')" for="book-bookStatus">Book Status</label>
                        <select class="form-control" name="bookStatus" :class="{'valid': !$v.book.bookStatus.$invalid, 'invalid': $v.book.bookStatus.$invalid }" v-model="$v.book.bookStatus.$model" id="book-bookStatus" >
                            <option value="AVAILABLE" v-bind:label="$t('gatewayApp.BookStatus.AVAILABLE')">AVAILABLE</option>
                            <option value="UNAVAILABLE" v-bind:label="$t('gatewayApp.BookStatus.UNAVAILABLE')">UNAVAILABLE</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.bookBook.location')" for="book-location">Location</label>
                        <select class="form-control" name="location" :class="{'valid': !$v.book.location.$invalid, 'invalid': $v.book.location.$invalid }" v-model="$v.book.location.$model" id="book-location" >
                            <option value="JEONGJA" v-bind:label="$t('gatewayApp.Location.JEONGJA')">JEONGJA</option>
                            <option value="PANGYO" v-bind:label="$t('gatewayApp.Location.PANGYO')">PANGYO</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.book.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./book-update.component.ts">
</script>
