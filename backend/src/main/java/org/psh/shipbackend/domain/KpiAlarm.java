package org.psh.shipbackend.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name ="kpi_alarm")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KpiAlarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // db pk

    private String type;   // danger, warning
    private String msg;    // 알람 메시지
    private String kpi;    // Kpi 이름(gtRpmStd,  fuelEfficiency 등)
    private double value;  // Kpi 값

    @CreationTimestamp
    private LocalDateTime timestamp; // 생성시간 자동 기록
    
}
