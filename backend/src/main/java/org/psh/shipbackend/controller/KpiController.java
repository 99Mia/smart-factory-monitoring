package org.psh.shipbackend.controller;

import lombok.RequiredArgsConstructor;
import org.psh.shipbackend.dto.KpiDTO;
import org.psh.shipbackend.security.service.ShipDataKPI.KpiService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class KpiController {
    private final KpiService kpiService;

    @GetMapping("/kpi")
    public ResponseEntity<Object> getKpi(){
        System.out.println("Kpi");
        return new ResponseEntity<>(kpiService.calculateKpi(), HttpStatus.OK);

    }
}
