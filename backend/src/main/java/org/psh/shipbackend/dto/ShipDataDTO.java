package org.psh.shipbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShipDataDTO {
    private Integer idx;

    /*
    여기서 JsonProperty라는 어노테이션이 의미하는것
    json 필드명과 dto 필드명을 연결(mapping)해주는 역할이다
    예를 들면 lever_position : 3.5, ship_speed : 12.2 라고 되어있으면
    lever_position 이 leverPosition 필드에 자동으로 들어간다
    요약하면 json(리액트가 보내는 컬럼명)과 dto 필드명이 서로 다르더라도 jsonProperty가 매핑해주기때문에
    dto 필드로 바로 접근 가능하다는 의미이다
     */
    @JsonProperty("lever_position")
    private Double leverPosition;

    @JsonProperty("ship_speed")
    private Double shipSpeed;

    @JsonProperty("GT_shaft_torque")
    private Double gtShaftTorque;

    @JsonProperty("GT_n_rpm")
    private Double gtNRpm;

    @JsonProperty("GG_n_rpm")
    private Double ggNRpm;

    @JsonProperty("Ts")
    private Double ts;

    @JsonProperty("Tp")
    private Double tp;

    @JsonProperty("HP_turbine_exit_temp")
    private Double hpTurbineExitTemp;

    @JsonProperty("GT_compressor_inlet_temp")
    private Double gtCompressorInletTemp;

    @JsonProperty("GT_compressor_outlet_temp")
    private Double gtCompressorOutletTemp;

    @JsonProperty("HP_turbine_exit_pressure")
    private Double hpTurbineExitPressure;

    @JsonProperty("GT_compressor_inlet_pressure")
    private Double gtCompressorInletPressure;

    @JsonProperty("GT_compressor_outlet_pressure")
    private Double gtCompressorOutletPressure;

    @JsonProperty("GT_exhaust_pressure")
    private Double gtExhaustPressure;

    @JsonProperty("TIC")
    private Double tic;

    @JsonProperty("fuel_flow")
    private Double fuelFlow;

    @JsonProperty("GT_compressor_decay_coeff")
    private Double gtCompressorDecayCoeff;

    @JsonProperty("GT_turbine_decay_coeff")
    private Double gtTurbineDecayCoeff;
}




