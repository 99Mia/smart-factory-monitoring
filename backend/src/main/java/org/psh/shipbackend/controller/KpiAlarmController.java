package org.psh.shipbackend.controller;

import lombok.RequiredArgsConstructor;
import org.psh.shipbackend.dto.KpiAlarmDTO;
import org.psh.shipbackend.security.service.KpiAlarm.KpiAlarmService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarms")
public class KpiAlarmController {
    private final KpiAlarmService kpiAlarmService;

    @GetMapping("/all")
    public ResponseEntity<List<KpiAlarmDTO>> getAllAlarms() {
        System.out.println("getAllAlarms");
        return new ResponseEntity<>(kpiAlarmService.getAllAlarms(), HttpStatus.OK);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<KpiAlarmDTO> getAlarm(@PathVariable String id, @RequestBody KpiAlarmDTO dto) {
        System.out.println("getAlarm"+id);
        return new ResponseEntity<>(kpiAlarmService.updateAlarm(dto), HttpStatus.OK);
    }

}

















