import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasReporteComponent } from './compras-reporte.component';

describe('ComprasReporteComponent', () => {
  let component: ComprasReporteComponent;
  let fixture: ComponentFixture<ComprasReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprasReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
