<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="gatewayApp.rentalRentedItem.home.createOrEditLabel" v-text="$t('gatewayApp.rentalRentedItem.home.createOrEditLabel')">Create or edit a RentedItem</h2>
                <div>
                    <div class="form-group" v-if="rentedItem.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="rentedItem.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalRentedItem.bookId')" for="rented-item-bookId">Book Id</label>
                        <input type="number" class="form-control" name="bookId" id="rented-item-bookId"
                            :class="{'valid': !$v.rentedItem.bookId.$invalid, 'invalid': $v.rentedItem.bookId.$invalid }" v-model.number="$v.rentedItem.bookId.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalRentedItem.rentedDate')" for="rented-item-rentedDate">Rented Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="rented-item-rentedDate"
                                    v-model="$v.rentedItem.rentedDate.$model"
                                    name="rentedDate"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="rented-item-rentedDate" type="text" class="form-control" name="rentedDate"  :class="{'valid': !$v.rentedItem.rentedDate.$invalid, 'invalid': $v.rentedItem.rentedDate.$invalid }"
                            v-model="$v.rentedItem.rentedDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalRentedItem.dueDate')" for="rented-item-dueDate">Due Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="rented-item-dueDate"
                                    v-model="$v.rentedItem.dueDate.$model"
                                    name="dueDate"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="rented-item-dueDate" type="text" class="form-control" name="dueDate"  :class="{'valid': !$v.rentedItem.dueDate.$invalid, 'invalid': $v.rentedItem.dueDate.$invalid }"
                            v-model="$v.rentedItem.dueDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalRentedItem.bookTitle')" for="rented-item-bookTitle">Book Title</label>
                        <input type="text" class="form-control" name="bookTitle" id="rented-item-bookTitle"
                            :class="{'valid': !$v.rentedItem.bookTitle.$invalid, 'invalid': $v.rentedItem.bookTitle.$invalid }" v-model="$v.rentedItem.bookTitle.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalRentedItem.rental')" for="rented-item-rental">Rental</label>
                        <select class="form-control" id="rented-item-rental" name="rental" v-model="rentedItem.rentalId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="rentalOption.id" v-for="rentalOption in rentals" :key="rentalOption.id">{{rentalOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.rentedItem.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./rented-item-update.component.ts">
</script>
