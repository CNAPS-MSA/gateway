import Vue from 'vue';
import Component from 'vue-class-component';
import Router from 'vue-router';
import { Authority } from '@/shared/security/authority';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const Register = () => import('../account/register/register.vue');
const Activate = () => import('../account/activate/activate.vue');
const ResetPasswordInit = () => import('../account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('../account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('../account/change-password/change-password.vue');
const Settings = () => import('../account/settings/settings.vue');
const JhiUserManagementComponent = () => import('../admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('../admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('../admin/user-management/user-management-edit.vue');
const JhiConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../admin/docs/docs.vue');
const JhiHealthComponent = () => import('../admin/health/health.vue');
const JhiLogsComponent = () => import('../admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../admin/metrics/metrics.vue');
const JhiGatewayComponent = () => import('../admin/gateway/gateway.vue');
/* tslint:disable */
// prettier-ignore
const Book = () => import('../entities/book/book/book.vue');
// prettier-ignore
const BookUpdate = () => import('../entities/book/book/book-update.vue');
// prettier-ignore
const BookDetails = () => import('../entities/book/book/book-details.vue');
// prettier-ignore
const InStockBook = () => import('../entities/book/in-stock-book/in-stock-book.vue');
// prettier-ignore
const InStockBookUpdate = () => import('../entities/book/in-stock-book/in-stock-book-update.vue');
// prettier-ignore
const InStockBookDetails = () => import('../entities/book/in-stock-book/in-stock-book-details.vue');
// prettier-ignore
const BookCatalog = () => import('../entities/bookCatalog/book-catalog/book-catalog.vue');
// prettier-ignore
const BookCatalogUpdate = () => import('../entities/bookCatalog/book-catalog/book-catalog-update.vue');
// prettier-ignore
const BookCatalogDetails = () => import('../entities/bookCatalog/book-catalog/book-catalog-details.vue');
// prettier-ignore
const Rental = () => import('../entities/rental/rental/rental.vue');
// prettier-ignore
const RentalUpdate = () => import('../entities/rental/rental/rental-update.vue');
// prettier-ignore
const RentalDetails = () => import('../entities/rental/rental/rental-details.vue');
// prettier-ignore
const OverdueItem = () => import('../entities/rental/overdue-item/overdue-item.vue');
// prettier-ignore
const OverdueItemUpdate = () => import('../entities/rental/overdue-item/overdue-item-update.vue');
// prettier-ignore
const OverdueItemDetails = () => import('../entities/rental/overdue-item/overdue-item-details.vue');
// prettier-ignore
const RentedItem = () => import('../entities/rental/rented-item/rented-item.vue');
// prettier-ignore
const RentedItemUpdate = () => import('../entities/rental/rented-item/rented-item-update.vue');
// prettier-ignore
const RentedItemDetails = () => import('../entities/rental/rented-item/rented-item-details.vue');
// prettier-ignore
const ReturnedItem = () => import('../entities/rental/returned-item/returned-item.vue');
// prettier-ignore
const ReturnedItemUpdate = () => import('../entities/rental/returned-item/returned-item-update.vue');
// prettier-ignore
const ReturnedItemDetails = () => import('../entities/rental/returned-item/returned-item-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here
const BookRental = () => import('../cnaps/book-rental-service/book-rental.vue'); // 도서 대출 페이지
const BookRentalDetails = () => import('../cnaps/book-rental-service/book-rental-details.vue'); // 도서 상세정보
const BookRegisterInStock = () => import('../cnaps/book-register-service/book-register.vue'); // 도서 등록
const BookRegisterForm = () => import('../cnaps/book-register-service/book-register-form.vue'); // 도서 등록 form
const RentedBookManagement = () => import('../cnaps/rented-book-manage-service/rented-book-management.vue');
const MyPage = () => import('../cnaps/mypage-service/mypage.vue');
Vue.use(Router);

// prettier-ignore

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/account/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/account/reset/request',
      name: 'ResetPasswordInit',
      component: ResetPasswordInit
    },
    {
      path: '/account/reset/finish',
      name: 'ResetPasswordFinish',
      component: ResetPasswordFinish
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/admin/user-management',
      name: 'JhiUser',
      component: JhiUserManagementComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/new',
      name: 'JhiUserCreate',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'JhiUserEdit',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'JhiUserView',
      component: JhiUserManagementViewComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: [Authority.ADMIN] }
    }
,
    {
      path: '/admin/gateway',
      name: 'JhiGatewayComponent',
      component: JhiGatewayComponent,
      meta: { authorities: [Authority.ADMIN] }
    }
    ,
    {
      path: '/book',
      name: 'Book',
      component: Book,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/book/new',
      name: 'BookCreate',
      component: BookUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/book/:bookId/edit',
      name: 'BookEdit',
      component: BookUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/book/:bookId/view',
      name: 'BookView',
      component: BookDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/in-stock-book',
      name: 'InStockBook',
      component: InStockBook,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/in-stock-book/new',
      name: 'InStockBookCreate',
      component: InStockBookUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/in-stock-book/:inStockBookId/edit',
      name: 'InStockBookEdit',
      component: InStockBookUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/in-stock-book/:inStockBookId/view',
      name: 'InStockBookView',
      component: InStockBookDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/book-catalog',
      name: 'BookCatalog',
      component: BookCatalog,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/book-catalog/new',
      name: 'BookCatalogCreate',
      component: BookCatalogUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/book-catalog/:bookCatalogId/edit',
      name: 'BookCatalogEdit',
      component: BookCatalogUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/book-catalog/:bookCatalogId/view',
      name: 'BookCatalogView',
      component: BookCatalogDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/rental',
      name: 'Rental',
      component: Rental,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/rental/new',
      name: 'RentalCreate',
      component: RentalUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/rental/:rentalId/edit',
      name: 'RentalEdit',
      component: RentalUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/rental/:rentalId/view',
      name: 'RentalView',
      component: RentalDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/overdue-item',
      name: 'OverdueItem',
      component: OverdueItem,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/overdue-item/new',
      name: 'OverdueItemCreate',
      component: OverdueItemUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/overdue-item/:overdueItemId/edit',
      name: 'OverdueItemEdit',
      component: OverdueItemUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/overdue-item/:overdueItemId/view',
      name: 'OverdueItemView',
      component: OverdueItemDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/rented-item',
      name: 'RentedItem',
      component: RentedItem,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/rented-item/new',
      name: 'RentedItemCreate',
      component: RentedItemUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/rented-item/:rentedItemId/edit',
      name: 'RentedItemEdit',
      component: RentedItemUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/rented-item/:rentedItemId/view',
      name: 'RentedItemView',
      component: RentedItemDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/returned-item',
      name: 'ReturnedItem',
      component: ReturnedItem,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/returned-item/new',
      name: 'ReturnedItemCreate',
      component: ReturnedItemUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/returned-item/:returnedItemId/edit',
      name: 'ReturnedItemEdit',
      component: ReturnedItemUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/returned-item/:returnedItemId/view',
      name: 'ReturnedItemView',
      component: ReturnedItemDetails,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/rent',
      name: 'BookRental',
      component: BookRental,
      meta: { authorities: [Authority.USER]}
    },
    {
      path: '/rent/:bookId/view',
      name: 'BookRentalView',
      component: BookRentalDetails,
      meta: { authorities: [Authority.USER]}
    },
    {
      path: '/register/book',
      name: 'RegisterBookView',
      component : BookRegisterInStock,
      meta: { authorities: [Authority.ADMIN]}
    },
    {
      path : '/register/book/:inStockId',
      name : 'RegisterBookForm',
      component: BookRegisterForm,
      meta : { authorities: [Authority.ADMIN]}
    },
    {
      path : '/manage/rentedBook',
      name : 'RentedBookManagement',
      component : RentedBookManagement,
      meta : { authorities: [Authority.ADMIN]}
    },
    {
      path : '/mypage',
      name : 'MyPage',
      component : MyPage,
      meta : { authorities: [Authority.USER]}
    }

    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});
