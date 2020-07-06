<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="gatewayApp.rentalReturnedItem.home.createOrEditLabel" v-text="$t('gatewayApp.rentalReturnedItem.home.createOrEditLabel')">Create or edit a ReturnedItem</h2>
                <div>
                    <div class="form-group" v-if="returnedItem.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="returnedItem.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalReturnedItem.bookId')" for="returned-item-bookId">Book Id</label>
                        <input type="number" class="form-control" name="bookId" id="returned-item-bookId"
                            :class="{'valid': !$v.returnedItem.bookId.$invalid, 'invalid': $v.returnedItem.bookId.$invalid }" v-model.number="$v.returnedItem.bookId.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalReturnedItem.returnedDate')" for="returned-item-returnedDate">Returned Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="returned-item-returnedDate"
                                    v-model="$v.returnedItem.returnedDate.$model"
                                    name="returnedDate"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="returned-item-returnedDate" type="text" class="form-control" name="returnedDate"  :class="{'valid': !$v.returnedItem.returnedDate.$invalid, 'invalid': $v.returnedItem.returnedDate.$invalid }"
                            v-model="$v.returnedItem.returnedDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalReturnedItem.bookTitle')" for="returned-item-bookTitle">Book Title</label>
                        <input type="text" class="form-control" name="bookTitle" id="returned-item-bookTitle"
                            :class="{'valid': !$v.returnedItem.bookTitle.$invalid, 'invalid': $v.returnedItem.bookTitle.$invalid }" v-model="$v.returnedItem.bookTitle.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalReturnedItem.rental')" for="returned-item-rental">Rental</label>
                        <select class="form-control" id="returned-item-rental" name="rental" v-model="returnedItem.rentalId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="rentalOption.id" v-for="rentalOption in rentals" :key="rentalOption.id">{{rentalOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.returnedItem.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./returned-item-update.component.ts">
</script>
