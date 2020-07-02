/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import OverdueItemUpdateComponent from '@/entities/rental/overdue-item/overdue-item-update.vue';
import OverdueItemClass from '@/entities/rental/overdue-item/overdue-item-update.component';
import OverdueItemService from '@/entities/rental/overdue-item/overdue-item.service';

import RentalService from '@/entities/rental/rental/rental.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('OverdueItem Management Update Component', () => {
    let wrapper: Wrapper<OverdueItemClass>;
    let comp: OverdueItemClass;
    let overdueItemServiceStub: SinonStubbedInstance<OverdueItemService>;

    beforeEach(() => {
      overdueItemServiceStub = sinon.createStubInstance<OverdueItemService>(OverdueItemService);

      wrapper = shallowMount<OverdueItemClass>(OverdueItemUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          overdueItemService: () => overdueItemServiceStub,

          rentalService: () => new RentalService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.overdueItem = entity;
        overdueItemServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(overdueItemServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.overdueItem = entity;
        overdueItemServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(overdueItemServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
