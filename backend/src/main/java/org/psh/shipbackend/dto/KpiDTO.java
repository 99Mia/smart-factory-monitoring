package org.psh.shipbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KpiDTO {
    private double fuelEfficiency; // 연료 효율
    private double torqueUtilization; // 엔진 부하율
    private double gtRpmStd;  // Rpm 변동성
    private double propellerBalance; // 프로펠러 균형
    private double decayIndex; // 예지보전 지수
}
