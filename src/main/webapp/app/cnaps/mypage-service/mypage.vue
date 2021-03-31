<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('global.menu.mypage.home')">My Page</span>
        </h2>
        <b-alert :show="dismissCountDown"
                 dismissible
                 :variant="alertType"
                 @dismissed="dismissCountDown=0"
                 @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <br/>
        <h3>나의 대출 정보</h3>
        <ul class="list-group" style="max-width: 30rem;">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-if="rental">
                대출 가능 상태
                <span class="badge badge-primary badge-pill" v-text="$t('gatewayApp.RentalStatus.' + rental.rentalStatus)">{{rental.rentalStatus}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center" v-if="user">
                잔여 POINT
                <span class="badge badge-primary badge-pill">{{user.point}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center" v-if="rental">
                연체료
                <span class="badge badge-primary badge-pill">{{rental.lateFee}}</span>
            </li>
        </ul>
        <button style="margin-top: 10px" v-if="rental&&rental.lateFee > 0" type="button" class="btn btn-primary" @click="prepareReleaseOverdue()">연체료 결제</button>
        <br/>
        <br/>
        <div v-if="rental" class="card border-primary mb-3" >
            <div class="card-header" v-text="$t('global.menu.mypage.rentedpage')">My Rented Items</div>
            <div class="card-body">
                <div class="table-responsive" v-if="rentedBooks && rentedBooks.length > 0">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th v-on:click="changeOrder('bookTitle')"><span v-text="$t('gatewayApp.rentalRentedItem.bookTitle')">Book Title</span> </th>
                            <th v-on:click="changeOrder('rentedDate')"><span v-text="$t('gatewayApp.rentalRentedItem.rentedDate')">Rented Date</span> </th>
                            <th v-on:click="changeOrder('dueDate')"><span v-text="$t('gatewayApp.rentalRentedItem.dueDate')">Due Date</span> </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="rentedBook in rentedBooks"
                            :key="rentedBook.id">
                            <td>{{rentedBook.bookTitle}}</td>
                            <td>{{rentedBook.rentedDate}}</td>
                            <td>{{rentedBook.dueDate}}</td>
                            <td class="text-right">
                                <div class="btn-group">

                                    <b-button v-on:click="prepareReturn(rentedBook.bookId)"
                                              variant="danger"
                                              class="btn btn-sm"
                                              v-b-modal.returnBook>
                                        <font-awesome-icon icon="times"></font-awesome-icon>
                                        <span class="d-none d-md-inline" v-text="$t('global.menu.mypage.returnBook.return')">Return Book</span>
                                    </b-button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div v-show="rentedBooks && rentedBooks.length > 0">
                    <div class="row justify-content-center">
                        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
                    </div>
                    <div class="row justify-content-center">
                        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="rental" class="card border-primary mb-3" >
            <div class="card-header" v-text="$t('global.menu.mypage.overduepage')">My Overdue Items</div>
            <div class="card-body">
                <div class="table-responsive" v-if="overdueBooks && overdueBooks.length > 0">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th v-on:click="changeOrder('bookTitle')"><span v-text="$t('gatewayApp.rentalOverdueItem.bookTitle')">Book Title</span> </th>
                            <th v-on:click="changeOrder('rentedDate')"><span v-text="$t('gatewayApp.rentalOverdueItem.rentedDate')">Rented Date</span> </th>
                            <th v-on:click="changeOrder('dueDate')"><span v-text="$t('gatewayApp.rentalOverdueItem.dueDate')">Due Date</span> </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="overdueBook in overdueBooks"
                            :key="overdueBook.id">
                            <td>{{overdueBook.bookTitle}}</td>
                            <td>{{overdueBook.rentedDate}}</td>
                            <td>{{overdueBook.dueDate}}</td>
                            <td class="text-right">
                                <div class="btn-group">

                                    <b-button v-on:click="prepareOverdueReturn(overdueBook.bookId)"
                                              variant="danger"
                                              class="btn btn-sm"
                                              v-b-modal.returnOverdueBook>
                                        <font-awesome-icon icon="times"></font-awesome-icon>
                                        <span class="d-none d-md-inline" v-text="$t('global.menu.mypage.returnBook.return')">Return Book</span>
                                    </b-button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div v-show="overdueBooks && overdueBooks.length > 0">
                    <div class="row justify-content-center">
                        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
                    </div>
                    <div class="row justify-content-center">
                        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="rental" class="card border-primary mb-3" >
            <div class="card-header" v-text="$t('global.menu.mypage.returnedpage')">My Returned Items</div>
            <div class="card-body">
                <div class="table-responsive" v-if="returnedBooks && returnedBooks.length > 0">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th v-on:click="changeOrder('bookTitle')"><span v-text="$t('gatewayApp.rentalReturnedItem.bookTitle')">Book Title</span> </th>
                            <th v-on:click="changeOrder('rentedDate')"><span v-text="$t('gatewayApp.rentalReturnedItem.returnedDate')">Returned Date</span> </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="returnedBook in returnedBooks"
                            :key="returnedBook.id">
                            <td>{{returnedBook.bookTitle}}</td>
                            <td>{{returnedBook.returnedDate}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div v-show="returnedBooks && returnedBooks.length > 0">
                    <div class="row justify-content-center">
                        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
                    </div>
                    <div class="row justify-content-center">
                        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
                    </div>
                </div>
            </div>
        </div>
        <b-modal ref="releaseOverdue" id="releaseOverdue">
            <span slot="modal-title"><span v-text="$t('gatewayApp.rentalRental.releaseOverdue.title')"></span>Confirm Release Overdue State</span>
            <div class="modal-body">
                <p v-text="$t('gatewayApp.rentalRental.releaseOverdue.question')">Are you sure want to release overdue state?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeOverdueDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="releaseOverdue()">Confirm</button>
            </div>
        </b-modal>
        <b-modal ref="returnBook" id="returnBook" >
            <span slot="modal-title"><span  v-text="$t('global.menu.mypage.returnBook.return')">Return Book</span></span>
            <div class="modal-body">
                <p id="jhi-delete-rentedItem-heading" v-text="$t('global.menu.mypage.returnBook.question')">Are you sure you want to return this Rented Book?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeReturnDialog()">Cancel</button>
                <button type="button" class="btn btn-primary"  v-text="$t('global.menu.mypage.returnBook.return')" v-on:click="returnBook()">Delete</button>
            </div>
        </b-modal>
        <b-modal ref="returnOverdueBook" id="returnOverdueBook" >
            <span slot="modal-title"><span  v-text="$t('global.menu.mypage.returnBook.return')">Return Book</span></span>
            <div class="modal-body">
                <p id="jhi-delete-OverdueItem-heading" v-text="$t('global.menu.mypage.returnBook.question')">Are you sure you want to return this Rented Book?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeOverdueReturnDialog()">Cancel</button>
                <button type="button" class="btn btn-primary"  v-text="$t('global.menu.mypage.returnBook.return')" v-on:click="returnOverdueBook()">Delete</button>
            </div>
        </b-modal>

    </div>
</template>

<script lang="ts" src="./mypage.component.ts">
</script>
