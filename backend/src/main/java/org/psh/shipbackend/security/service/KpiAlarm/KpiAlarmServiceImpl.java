package org.psh.shipbackend.security.service.KpiAlarm;

import lombok.RequiredArgsConstructor;
import org.psh.shipbackend.domain.KpiAlarm;
import org.psh.shipbackend.dto.KpiAlarmDTO;
import org.psh.shipbackend.repository.KpiAlarmRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KpiAlarmServiceImpl implements KpiAlarmService {
    private final KpiAlarmRepository kpiAlarmRepository;


    @Override
    @Transactional
    public KpiAlarmDTO saveAlarm(KpiAlarmDTO dto) {
        KpiAlarm entity = dtoToEntity(dto);
        KpiAlarm saved = kpiAlarmRepository.save(entity);
        return entityToDto(saved);
    }

    @Override
    public List<KpiAlarmDTO> getAllAlarms() {
        return kpiAlarmRepository.findAll()
                .stream()
                .map(this::entityToDto)
                .toList();

    }

    @Override
    public KpiAlarmDTO updateAlarm(KpiAlarmDTO dto) {
        KpiAlarm updatedAlarm = dtoToEntity(dto); // DTO -> Entity 변환
        KpiAlarm existing = kpiAlarmRepository.findById(dto.getId())
                .orElseThrow(()-> new RuntimeException("KpiAlarm Not Found"));

        // id와 timestamp를 제외하고 기존 엔티티에 DTO 값 덮어쓰기
        BeanUtils.copyProperties(updatedAlarm, existing, "id","timestamp");
        KpiAlarm saved = kpiAlarmRepository.save(existing);
        return entityToDto(saved);
    }

    @Override
    public void deleteAlarm(KpiAlarmDTO dto) {
        kpiAlarmRepository.deleteById(dto.getId());
    }


}
