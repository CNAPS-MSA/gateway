/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import BookCatalogDetailComponent from '@/entities/bookCatalog/book-catalog/book-catalog-details.vue';
import BookCatalogClass from '@/entities/bookCatalog/book-catalog/book-catalog-details.component';
import BookCatalogService from '@/entities/bookCatalog/book-catalog/book-catalog.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('BookCatalog Management Detail Component', () => {
    let wrapper: Wrapper<BookCatalogClass>;
    let comp: BookCatalogClass;
    let bookCatalogServiceStub: SinonStubbedInstance<BookCatalogService>;

    beforeEach(() => {
      bookCatalogServiceStub = sinon.createStubInstance<BookCatalogService>(BookCatalogService);

      wrapper = shallowMount<BookCatalogClass>(BookCatalogDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { bookCatalogService: () => bookCatalogServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBookCatalog = { id: '123' };
        bookCatalogServiceStub.find.resolves(foundBookCatalog);

        // WHEN
        comp.retrieveBookCatalog('123');
        await comp.$nextTick();

        // THEN
        expect(comp.bookCatalog).toBe(foundBookCatalog);
      });
    });
  });
});
