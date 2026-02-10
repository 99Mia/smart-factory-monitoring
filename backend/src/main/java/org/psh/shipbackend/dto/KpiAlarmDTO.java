package org.psh.shipbackend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KpiAlarmDTO {
    private Long id;
    private String type;
    private String msg;
    private String kpi;
    private Double value;
    private LocalDateTime timestamp;
}
