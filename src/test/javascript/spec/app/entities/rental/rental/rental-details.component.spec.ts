/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import RentalDetailComponent from '@/entities/rental/rental/rental-details.vue';
import RentalClass from '@/entities/rental/rental/rental-details.component';
import RentalService from '@/entities/rental/rental/rental.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Rental Management Detail Component', () => {
    let wrapper: Wrapper<RentalClass>;
    let comp: RentalClass;
    let rentalServiceStub: SinonStubbedInstance<RentalService>;

    beforeEach(() => {
      rentalServiceStub = sinon.createStubInstance<RentalService>(RentalService);

      wrapper = shallowMount<RentalClass>(RentalDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { rentalService: () => rentalServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundRental = { id: 123 };
        rentalServiceStub.find.resolves(foundRental);

        // WHEN
        comp.retrieveRental(123);
        await comp.$nextTick();

        // THEN
        expect(comp.rental).toBe(foundRental);
      });
    });
  });
});
