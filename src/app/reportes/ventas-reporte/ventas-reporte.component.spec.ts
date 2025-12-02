import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasReporteComponent } from './ventas-reporte.component';

describe('VentasReporteComponent', () => {
  let component: VentasReporteComponent;
  let fixture: ComponentFixture<VentasReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
