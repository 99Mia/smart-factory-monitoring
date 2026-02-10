package org.psh.shipbackend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "ship_data")
public class ShipData {
    @Id
    @Column(name = "idx")
    private Integer idx;

    @Column(name="lever_position")
    private Double leverPosition;

    @Column(name="ship_speed")
    private Double shipSpeed;

    @Column(name="GT_shaft_torque")
    private Double gtShaftTorque;
// 가스터빈 회전수(rpm), 용도: 엔진 안정성, 회전수 변동성 kpi
    @Column(name="GT_n_rpm")
    private Double gtNRpm;
// 가스터빈 발전기 회전수, 용도: 발전기 출력 효율, 부하 모니터링
    @Column(name="GG_n_rpm")
    private Double ggNRpm;
// 우현(Starboard) 프로펠러 토크(힘), 용도: 추진력, 선박 방향/속도 제어 관련 kpi
    @Column(name="Ts")
    private Double ts;
// 좌현(Port) 프로펠러 토크(힘), Ts와 함께 추진력 계산, 엔진 부하 평가
    @Column(name="Tp")
    private Double tp;
// HP 터빈 출구 온도, 용도 : 터빈 열 상태 평가, 과열 감지
    @Column(name="HP_turbine_exit_temp")
    private Double hpTurbineExitTemp;
// 가스터빈 압축기 입구 온도, 용도: 공기 흡입 조건, 성능 분석
    @Column(name="GT_compressor_inlet_temp")
    private Double gtCompressorInletTemp;
// 가스터빈 압축기 출구 온도, 용도: 압축기 효율, 온도 상승 추적
    @Column(name="GT_compressor_outlet_temp")
    private Double gtCompressorOutletTemp;
// HP 터빈 출구 압력, 용도: 터빈 성능, 엔진 부하 계산
    @Column(name="HP_turbine_exit_pressure")
    private Double hpTurbineExitPressure;
// GT 압축기 입구 압력, 용도: 흡입 공기 상태, 압력 손실 분석
    @Column(name="GT_compressor_inlet_pressure")
    private Double gtCompressorInletPressure;
// GT 압축기 출구 압력, 용도: 압축기 성능 평가
    @Column(name="GT_compressor_outlet_pressure")
    private Double gtCompressorOutletPressure;
// 가스터빈 배기 압력(Pexh), 용도: 배기 효율, 장비 이상 여부
    @Column(name="GT_exhaust_pressure")
    private Double gtExhaustPressure;
// Turbine Injection Control [%], 용도: 연료 공급 제어, 출력 조정 상태
    @Column(name="TIC")
    private Double tic;
// 연료 유량(mf) [kg/s], 용도: 연료 효율, 운항 비용, kpi 계산
    @Column(name="fuel_flow")
    private Double fuelFlow;
// GT 압축기 감쇠 개수, 용도: 압축기 성능 저하 추적, 예지보전
    @Column(name="GT_compressor_decay_coeff")
    private Double gtCompressorDecayCoeff;
// GT 터빈 삼쇠 개수, 용도: 터빈 성능 저하 추적, 예지보전
    @Column(name="GT_turbine_decay_coeff")
    private Double gtTurbineDecayCoeff;


    // 논리 삭제용 필드, 기본값 false
    private Boolean deleted = false;

}



























