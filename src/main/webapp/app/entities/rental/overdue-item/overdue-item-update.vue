<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="gatewayApp.rentalOverdueItem.home.createOrEditLabel" v-text="$t('gatewayApp.rentalOverdueItem.home.createOrEditLabel')">Create or edit a OverdueItem</h2>
                <div>
                    <div class="form-group" v-if="overdueItem.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="overdueItem.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalOverdueItem.bookId')" for="overdue-item-bookId">Book Id</label>
                        <input type="number" class="form-control" name="bookId" id="overdue-item-bookId"
                            :class="{'valid': !$v.overdueItem.bookId.$invalid, 'invalid': $v.overdueItem.bookId.$invalid }" v-model.number="$v.overdueItem.bookId.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalOverdueItem.dueDate')" for="overdue-item-dueDate">Due Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="overdue-item-dueDate"
                                    v-model="$v.overdueItem.dueDate.$model"
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
                            <b-form-input id="overdue-item-dueDate" type="text" class="form-control" name="dueDate"  :class="{'valid': !$v.overdueItem.dueDate.$invalid, 'invalid': $v.overdueItem.dueDate.$invalid }"
                            v-model="$v.overdueItem.dueDate.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalOverdueItem.bookTitle')" for="overdue-item-bookTitle">Book Title</label>
                        <input type="text" class="form-control" name="bookTitle" id="overdue-item-bookTitle"
                            :class="{'valid': !$v.overdueItem.bookTitle.$invalid, 'invalid': $v.overdueItem.bookTitle.$invalid }" v-model="$v.overdueItem.bookTitle.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalOverdueItem.rental')" for="overdue-item-rental">Rental</label>
                        <select class="form-control" id="overdue-item-rental" name="rental" v-model="overdueItem.rentalId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="rentalOption.id" v-for="rentalOption in rentals" :key="rentalOption.id">{{rentalOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.overdueItem.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./overdue-item-update.component.ts">
</script>
