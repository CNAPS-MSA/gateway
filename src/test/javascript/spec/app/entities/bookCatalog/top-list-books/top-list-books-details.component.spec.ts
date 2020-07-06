/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TopListBooksDetailComponent from '@/entities/bookCatalog/top-list-books/top-list-books-details.vue';
import TopListBooksClass from '@/entities/bookCatalog/top-list-books/top-list-books-details.component';
import TopListBooksService from '@/entities/bookCatalog/top-list-books/top-list-books.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('TopListBooks Management Detail Component', () => {
    let wrapper: Wrapper<TopListBooksClass>;
    let comp: TopListBooksClass;
    let topListBooksServiceStub: SinonStubbedInstance<TopListBooksService>;

    beforeEach(() => {
      topListBooksServiceStub = sinon.createStubInstance<TopListBooksService>(TopListBooksService);

      wrapper = shallowMount<TopListBooksClass>(TopListBooksDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { topListBooksService: () => topListBooksServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTopListBooks = { id: '123' };
        topListBooksServiceStub.find.resolves(foundTopListBooks);

        // WHEN
        comp.retrieveTopListBooks('123');
        await comp.$nextTick();

        // THEN
        expect(comp.topListBooks).toBe(foundTopListBooks);
      });
    });
  });
});
