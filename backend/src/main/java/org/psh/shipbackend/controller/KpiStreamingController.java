package org.psh.shipbackend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.psh.shipbackend.dto.KpiAlarmDTO;
import org.psh.shipbackend.security.service.KpiAlarm.KpiAlarmService;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
@Log4j2
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class KpiStreamingController {
    private final KpiAlarmService kpiAlarmService;
    private final Random random = new Random(); // Random 객체 추가

    // 최근 알람 50건만 유기
    private final Deque<KpiAlarmDTO> recentAlarms = new LinkedList<>();
    private final int MAX_ALARMS = 50;

    @GetMapping(value = "/stream/kpi", produces = "text/event-stream")
    public Flux<ServerSentEvent<Map<String, Object>>> streamKpi() {

        return Flux.interval(Duration.ofSeconds(2))
                .map(tick -> {

                    // KPI 랜덤 생성
                    Map<String, Double> kpiValues = Map.of(
                            "fuelEfficiency", randomDouble(20, 32),
                            "torqueUtilization", randomDouble(0.3, 0.9),
                            "gtRpmStd", randomDouble(500, 900),
                            "propellerBalance", randomDouble(0, 3),
                            "decayIndex", randomDouble(1, 5)
                    );

                    //log.info(kpiValues + "+++++++++++++++++++++++++++++++++++");

                    //  KPI 상태 계산
                    Map<String, String> kpiStatus = new HashMap<>();
                    kpiValues.forEach((kpi, value) -> {
                        switch (kpi) {
                            case "fuelEfficiency":
                                kpiStatus.put(kpi, value < 21 ? "danger" : value < 23 ? "warning" : "normal");
                                break;
                            case "torqueUtilization":
                                kpiStatus.put(kpi, value > 0.88 ? "danger" : value > 0.87 ? "warning" : "normal");
                                break;
                            case "gtRpmStd":
                                kpiStatus.put(kpi, value > 897 ? "danger" : value > 895 ? "warning" : "normal");
                                break;
                            case "propellerBalance":
                                kpiStatus.put(kpi, value > 2.9 ? "danger" : value > 2.8 ? "warning" : "normal");
                                break;
                            case "decayIndex":
                                kpiStatus.put(kpi, value > 4.9 ? "danger" : value > 4.6 ? "warning" : "normal");
                                break;
                        }
                    });


                    // warning/danger인 KPI는 DB에 저장 (최근 50건만 유지)
                    kpiValues.forEach((kpiName, value) -> {
                        String status = kpiStatus.get(kpiName);
                        if ("warning".equals(status) || "danger".equals(status)) {

                            KpiAlarmDTO dto = KpiAlarmDTO.builder()
                                    .kpi(kpiName)
                                    .value(value)
                                    .type(status)
                                    .msg(kpiName + " 상태: " + status)
                                    .timestamp(LocalDateTime.now())
                                    .build();

                            //최근 50건 관리
                            System.out.println("메서드 진입 확인");
                            KpiAlarmDTO savedDto = kpiAlarmService.saveAlarm(dto);
                            System.out.println("Saved DTO id : " + savedDto.getId());

                                synchronized (recentAlarms) {
                                    recentAlarms.addLast(savedDto);
                                    while (recentAlarms.size() > MAX_ALARMS) {
                                        KpiAlarmDTO removed = recentAlarms.removeFirst();
                                        // DB에서도 삭제
                                        kpiAlarmService.deleteAlarm(removed);
                                    }
                                }

                        }
                    });



                    // SSE에 보낼 데이터 구성
                    Map<String, Object> data = new HashMap<>();
                    kpiValues.forEach((kpiName, value) -> {
                        data.put(kpiName, Map.of(
                                "value", value,
                                "status", kpiStatus.get(kpiName)
                        ));
                    });

                    // 알람 리스트
                    List<Map<String, String>> alarmList = new ArrayList<>();
                    kpiStatus.forEach((kpi, status) -> {
                        if ("warning".equals(status) || "danger".equals(status)) {
                            alarmList.add(Map.of(
                                    "type", status,
                                    "msg", kpi + " 상태: " + status
                            ));
                        }
                    });
                    data.put("alarmList", alarmList);

                    return ServerSentEvent.<Map<String, Object>>builder()
                            .event("kpiUpdate")
                            .data(data)
                            .build();
                });
    }


    // Random 객체 사용
    /*
    random은 java.util.random 객체이다. nextDouble()은 0.0 이상 1.0 미만의 난수를 반환한다
    random.
     */
    private double randomDouble(double min, double max) {
        return Math.round((random.nextDouble() * (max - min) + min) * 100) / 100.0;
    }


}