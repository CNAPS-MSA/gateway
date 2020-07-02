<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="gatewayApp.rentalRental.home.createOrEditLabel" v-text="$t('gatewayApp.rentalRental.home.createOrEditLabel')">Create or edit a Rental</h2>
                <div>
                    <div class="form-group" v-if="rental.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="rental.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalRental.userId')" for="rental-userId">User Id</label>
                        <input type="number" class="form-control" name="userId" id="rental-userId"
                            :class="{'valid': !$v.rental.userId.$invalid, 'invalid': $v.rental.userId.$invalid }" v-model.number="$v.rental.userId.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalRental.rentalStatus')" for="rental-rentalStatus">Rental Status</label>
                        <select class="form-control" name="rentalStatus" :class="{'valid': !$v.rental.rentalStatus.$invalid, 'invalid': $v.rental.rentalStatus.$invalid }" v-model="$v.rental.rentalStatus.$model" id="rental-rentalStatus" >
                            <option value="RENT_AVAILABLE" v-bind:label="$t('gatewayApp.RentalStatus.RENT_AVAILABLE')">RENT_AVAILABLE</option>
                            <option value="RENT_UNAVAILABLE" v-bind:label="$t('gatewayApp.RentalStatus.RENT_UNAVAILABLE')">RENT_UNAVAILABLE</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('gatewayApp.rentalRental.lateFee')" for="rental-lateFee">Late Fee</label>
                        <input type="number" class="form-control" name="lateFee" id="rental-lateFee"
                            :class="{'valid': !$v.rental.lateFee.$invalid, 'invalid': $v.rental.lateFee.$invalid }" v-model.number="$v.rental.lateFee.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.rental.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./rental-update.component.ts">
</script>
