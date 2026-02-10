package org.psh.shipbackend.security.service.KpiAlarm;

import org.psh.shipbackend.domain.KpiAlarm;
import org.psh.shipbackend.dto.KpiAlarmDTO;

import java.util.List;

public interface KpiAlarmService {
    KpiAlarmDTO saveAlarm(KpiAlarmDTO dto);
    List<KpiAlarmDTO> getAllAlarms();
    KpiAlarmDTO updateAlarm(KpiAlarmDTO dto);
    void deleteAlarm(KpiAlarmDTO dto);


    default KpiAlarm dtoToEntity(KpiAlarmDTO dto) {
        return KpiAlarm.builder()
                .id(dto.getId())
                .type(dto.getType())
                .msg(dto.getMsg())
                .kpi(dto.getKpi())
                .value(dto.getValue())
                .build();
    }

    default KpiAlarmDTO entityToDto(KpiAlarm entity) {
        return KpiAlarmDTO.builder()
                .id(entity.getId())
                .type(entity.getType())
                .msg(entity.getMsg())
                .kpi(entity.getKpi())
                .value(entity.getValue())
                .timestamp(entity.getTimestamp())
                .build();
    }


}


