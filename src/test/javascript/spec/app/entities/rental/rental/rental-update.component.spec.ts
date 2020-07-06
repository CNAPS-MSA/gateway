/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import RentalUpdateComponent from '@/entities/rental/rental/rental-update.vue';
import RentalClass from '@/entities/rental/rental/rental-update.component';
import RentalService from '@/entities/rental/rental/rental.service';

import RentedItemService from '@/entities/rental/rented-item/rented-item.service';

import OverdueItemService from '@/entities/rental/overdue-item/overdue-item.service';

import ReturnedItemService from '@/entities/rental/returned-item/returned-item.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Rental Management Update Component', () => {
    let wrapper: Wrapper<RentalClass>;
    let comp: RentalClass;
    let rentalServiceStub: SinonStubbedInstance<RentalService>;

    beforeEach(() => {
      rentalServiceStub = sinon.createStubInstance<RentalService>(RentalService);

      wrapper = shallowMount<RentalClass>(RentalUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          rentalService: () => rentalServiceStub,

          rentedItemService: () => new RentedItemService(),

          overdueItemService: () => new OverdueItemService(),

          returnedItemService: () => new ReturnedItemService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.rental = entity;
        rentalServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(rentalServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.rental = entity;
        rentalServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(rentalServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
