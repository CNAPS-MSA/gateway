/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import InStockBookUpdateComponent from '@/entities/book/in-stock-book/in-stock-book-update.vue';
import InStockBookClass from '@/entities/book/in-stock-book/in-stock-book-update.component';
import InStockBookService from '@/entities/book/in-stock-book/in-stock-book.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('InStockBook Management Update Component', () => {
    let wrapper: Wrapper<InStockBookClass>;
    let comp: InStockBookClass;
    let inStockBookServiceStub: SinonStubbedInstance<InStockBookService>;

    beforeEach(() => {
      inStockBookServiceStub = sinon.createStubInstance<InStockBookService>(InStockBookService);

      wrapper = shallowMount<InStockBookClass>(InStockBookUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          inStockBookService: () => inStockBookServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.inStockBook = entity;
        inStockBookServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(inStockBookServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.inStockBook = entity;
        inStockBookServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(inStockBookServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
