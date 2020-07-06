/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import RentedItemUpdateComponent from '@/entities/rental/rented-item/rented-item-update.vue';
import RentedItemClass from '@/entities/rental/rented-item/rented-item-update.component';
import RentedItemService from '@/entities/rental/rented-item/rented-item.service';

import RentalService from '@/entities/rental/rental/rental.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('RentedItem Management Update Component', () => {
    let wrapper: Wrapper<RentedItemClass>;
    let comp: RentedItemClass;
    let rentedItemServiceStub: SinonStubbedInstance<RentedItemService>;

    beforeEach(() => {
      rentedItemServiceStub = sinon.createStubInstance<RentedItemService>(RentedItemService);

      wrapper = shallowMount<RentedItemClass>(RentedItemUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          rentedItemService: () => rentedItemServiceStub,

          rentalService: () => new RentalService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.rentedItem = entity;
        rentedItemServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(rentedItemServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.rentedItem = entity;
        rentedItemServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(rentedItemServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
