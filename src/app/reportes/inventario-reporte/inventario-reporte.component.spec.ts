import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioReporteComponent } from './inventario-reporte.component';

describe('InventarioReporteComponent', () => {
  let component: InventarioReporteComponent;
  let fixture: ComponentFixture<InventarioReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
