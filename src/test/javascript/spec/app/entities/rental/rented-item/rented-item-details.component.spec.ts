/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import RentedItemDetailComponent from '@/entities/rental/rented-item/rented-item-details.vue';
import RentedItemClass from '@/entities/rental/rented-item/rented-item-details.component';
import RentedItemService from '@/entities/rental/rented-item/rented-item.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('RentedItem Management Detail Component', () => {
    let wrapper: Wrapper<RentedItemClass>;
    let comp: RentedItemClass;
    let rentedItemServiceStub: SinonStubbedInstance<RentedItemService>;

    beforeEach(() => {
      rentedItemServiceStub = sinon.createStubInstance<RentedItemService>(RentedItemService);

      wrapper = shallowMount<RentedItemClass>(RentedItemDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { rentedItemService: () => rentedItemServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundRentedItem = { id: 123 };
        rentedItemServiceStub.find.resolves(foundRentedItem);

        // WHEN
        comp.retrieveRentedItem(123);
        await comp.$nextTick();

        // THEN
        expect(comp.rentedItem).toBe(foundRentedItem);
      });
    });
  });
});
