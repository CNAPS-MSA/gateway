/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import InStockBookDetailComponent from '@/entities/book/in-stock-book/in-stock-book-details.vue';
import InStockBookClass from '@/entities/book/in-stock-book/in-stock-book-details.component';
import InStockBookService from '@/entities/book/in-stock-book/in-stock-book.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('InStockBook Management Detail Component', () => {
    let wrapper: Wrapper<InStockBookClass>;
    let comp: InStockBookClass;
    let inStockBookServiceStub: SinonStubbedInstance<InStockBookService>;

    beforeEach(() => {
      inStockBookServiceStub = sinon.createStubInstance<InStockBookService>(InStockBookService);

      wrapper = shallowMount<InStockBookClass>(InStockBookDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { inStockBookService: () => inStockBookServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundInStockBook = { id: 123 };
        inStockBookServiceStub.find.resolves(foundInStockBook);

        // WHEN
        comp.retrieveInStockBook(123);
        await comp.$nextTick();

        // THEN
        expect(comp.inStockBook).toBe(foundInStockBook);
      });
    });
  });
});
