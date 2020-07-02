/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import OverdueItemDetailComponent from '@/entities/rental/overdue-item/overdue-item-details.vue';
import OverdueItemClass from '@/entities/rental/overdue-item/overdue-item-details.component';
import OverdueItemService from '@/entities/rental/overdue-item/overdue-item.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('OverdueItem Management Detail Component', () => {
    let wrapper: Wrapper<OverdueItemClass>;
    let comp: OverdueItemClass;
    let overdueItemServiceStub: SinonStubbedInstance<OverdueItemService>;

    beforeEach(() => {
      overdueItemServiceStub = sinon.createStubInstance<OverdueItemService>(OverdueItemService);

      wrapper = shallowMount<OverdueItemClass>(OverdueItemDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { overdueItemService: () => overdueItemServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundOverdueItem = { id: 123 };
        overdueItemServiceStub.find.resolves(foundOverdueItem);

        // WHEN
        comp.retrieveOverdueItem(123);
        await comp.$nextTick();

        // THEN
        expect(comp.overdueItem).toBe(foundOverdueItem);
      });
    });
  });
});
