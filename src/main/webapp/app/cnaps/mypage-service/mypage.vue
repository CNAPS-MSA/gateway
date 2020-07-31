<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('global.menu.mypage')">My Page</span>
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
        <h3>나의 대여 정보</h3>
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                대여 가능 상태
                <span class="badge badge-primary badge-pill" v-text="$t('gatewayApp.RentalStatus.' + rental.rentalStatus)">{{rental.rentalStatus}}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                잔여 POINT
                <span class="badge badge-primary badge-pill">{{user.point}}}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                연체료
                <span class="badge badge-primary badge-pill">{{rental.lateFee}}</span>
            </li>
        </ul>
        <button v-if="rental.lateFee > 0" type="button" class="btn btn-primary" @click="prepareReleaseOverdue()">연체료 결제</button>
        <br/>
        <br/>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link class="nav-link" data-toggle="tab" to="/mypage/my-rented">My Rented Items</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" data-toggle="tab" to="/mypage/my-overdue">My Overdue Items</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" data-toggle="tab" to="/mypage/my-returned">My Returned Items</router-link>
            </li>
        </ul>
        <div id="myTabContent" class="tab-content">
            <router-view></router-view>
        </div>
<!--        <div id="myTabContent" class="tab-content">-->
<!--            <div class="tab-pane fade active show" id="home">-->
<!--                <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>-->
<!--            </div>-->
<!--            <div class="tab-pane fade" id="profile">-->
<!--                <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>-->
<!--            </div>-->
<!--            <div class="tab-pane fade" id="dropdown1">-->
<!--                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>-->
<!--            </div>-->
<!--            <div class="tab-pane fade" id="dropdown2">-->
<!--                <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater.</p>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="alert alert-warning" v-if="!isFetching && books && books.length === 0">-->
<!--            <span>No books found</span>-->
<!--        </div>-->
<!--        <form class="form-inline my-2 my-lg-0" v-on:submit.prevent="search">-->
<!--            <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="title">-->
<!--            <button class="btn btn-secondary my-2 my-sm-0" type="submit" >Search</button>-->
<!--        </form>-->


<!--        <div class="table-responsive" v-if="books && books.length > 0">-->
<!--            <table class="table table-striped">-->
<!--                <thead>-->
<!--                <tr>-->
<!--                    <th><span v-text="$t('gatewayApp.rentalRentedItem.bookTitle')">Book Title</span></th>-->
<!--                    <th><span v-text="$t('gatewayApp.rentalRentedItem.rentedDate')">Rented Date</span></th>-->
<!--                    <th><span v-text="$t('gatewayApp.rentalRentedItem.dueDate')">Due Date</span></th>-->
<!--                    <th></th>-->
<!--                </tr>-->
<!--                </thead>-->
<!--                <tbody>-->
<!--                <tr v-for="book in books"-->
<!--                    :key="book.id">-->
<!--                    <td>{{book.bookTitle}}</td>-->
<!--                    <td>{{book.rentedDate}}</td>-->
<!--                    <td>{{book.dueDate}}</td>-->
<!--                    <td class="text-right">-->
<!--                        <div class="btn-group">-->
<!--                            <b-button class="btn btn-primary" @click="prepareOverdue(book.rentalId, book.bookId)"-->
<!--                                        v-b-modal.doOverdue>-->
<!--                                <span class="d-none d-md-inline" v-text="$t('global.overdueBook')">Overdue Books</span>-->
<!--                            </b-button>-->
<!--                            &lt;!&ndash;                        <router-link :to="{name: 'BookRentalDo', params: {rentalId: book.id}}" tag="button" class="btn btn-primary btn-sm edit">&ndash;&gt;-->
<!--                            &lt;!&ndash;                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&ndash;&gt;-->
<!--                            &lt;!&ndash;                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>&ndash;&gt;-->
<!--                            &lt;!&ndash;                            </router-link>&ndash;&gt;-->
<!--                            &lt;!&ndash;                            <b-button v-on:click="prepareRemove(book)"&ndash;&gt;-->
<!--                            &lt;!&ndash;                                   variant="danger"&ndash;&gt;-->
<!--                            &lt;!&ndash;                                   class="btn btn-sm"&ndash;&gt;-->
<!--                            &lt;!&ndash;                                   v-b-modal.removeEntity>&ndash;&gt;-->
<!--                            &lt;!&ndash;                                <font-awesome-icon icon="times"></font-awesome-icon>&ndash;&gt;-->
<!--                            &lt;!&ndash;                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>&ndash;&gt;-->
<!--                            &lt;!&ndash;                            </b-button>&ndash;&gt;-->
<!--                        </div>-->
<!--                    </td>-->
<!--                </tr>-->
<!--                </tbody>-->
<!--            </table>-->
<!--        </div>-->
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
        <!--        <b-modal ref="removeEntity" id="removeEntity" >-->
        <!--            <span slot="modal-title"><span id="gatewayApp.rentalRental.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>-->
        <!--            <div class="modal-body">-->
        <!--                <p id="jhi-delete-rental-heading" v-text="$t('gatewayApp.rentalRental.delete.question', {'id': removeId})">Are you sure you want to delete this Rental?</p>-->
        <!--            </div>-->
        <!--            <div slot="modal-footer">-->
        <!--                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>-->
        <!--                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-rental" v-text="$t('entity.action.delete')" v-on:click="removeRental()">Delete</button>-->
        <!--            </div>-->
        <!--        </b-modal>-->
<!--        <div v-show="bookLength > 0">-->
<!--            <div class="row justify-content-center">-->
<!--                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>-->
<!--            </div>-->
<!--            <div class="row justify-content-center">-->
<!--                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script lang="ts" src="./mypage.component.ts">
</script>
