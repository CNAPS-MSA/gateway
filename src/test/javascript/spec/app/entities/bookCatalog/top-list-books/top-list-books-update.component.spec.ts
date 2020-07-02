/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import TopListBooksUpdateComponent from '@/entities/bookCatalog/top-list-books/top-list-books-update.vue';
import TopListBooksClass from '@/entities/bookCatalog/top-list-books/top-list-books-update.component';
import TopListBooksService from '@/entities/bookCatalog/top-list-books/top-list-books.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('TopListBooks Management Update Component', () => {
    let wrapper: Wrapper<TopListBooksClass>;
    let comp: TopListBooksClass;
    let topListBooksServiceStub: SinonStubbedInstance<TopListBooksService>;

    beforeEach(() => {
      topListBooksServiceStub = sinon.createStubInstance<TopListBooksService>(TopListBooksService);

      wrapper = shallowMount<TopListBooksClass>(TopListBooksUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          topListBooksService: () => topListBooksServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: '123' };
        comp.topListBooks = entity;
        topListBooksServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(topListBooksServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.topListBooks = entity;
        topListBooksServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(topListBooksServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
