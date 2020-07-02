/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import BookDetailComponent from '@/entities/book/book/book-details.vue';
import BookClass from '@/entities/book/book/book-details.component';
import BookService from '@/entities/book/book/book.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Book Management Detail Component', () => {
    let wrapper: Wrapper<BookClass>;
    let comp: BookClass;
    let bookServiceStub: SinonStubbedInstance<BookService>;

    beforeEach(() => {
      bookServiceStub = sinon.createStubInstance<BookService>(BookService);

      wrapper = shallowMount<BookClass>(BookDetailComponent, { store, i18n, localVue, provide: { bookService: () => bookServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBook = { id: 123 };
        bookServiceStub.find.resolves(foundBook);

        // WHEN
        comp.retrieveBook(123);
        await comp.$nextTick();

        // THEN
        expect(comp.book).toBe(foundBook);
      });
    });
  });
});
