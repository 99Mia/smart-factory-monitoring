package org.psh.shipbackend.controller;

import lombok.RequiredArgsConstructor;
import org.psh.shipbackend.domain.ShipData;
import org.psh.shipbackend.dto.ShipDataDTO;
import org.psh.shipbackend.repository.ShipDataRepository;
import org.psh.shipbackend.security.service.shipData.ShipDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ship")  // 엔드포인트 기본 경로
@RequiredArgsConstructor
public class ShipDataController {

    @Autowired
    private final ShipDataService shipDataService;


    // 로그인 된 사용자면 모두 접근 가능
    // 리액트가 서버(백엔드)에 요청할 엔드포인트
    @GetMapping("/list")
    public ResponseEntity<List<ShipDataDTO>> getAllShipData() {
        System.out.println("getAllShipData List");
        return new ResponseEntity<>(shipDataService.getAllShipData(), HttpStatus.OK);
    }

    
    @PutMapping("/admin/{id}")
    public ResponseEntity<Object> updateShipData(@PathVariable Long id, @RequestBody ShipDataDTO shipDataDTO) {
        System.out.println("updateShipData List");
        // 여기서 id를 updateShipData 함수에 매개변수로 전해주지 않아도 되는 이유는 
        // 리액트에서 보내오는 shipDataDTO 안에 idx(즉, id) 필드가 들어있기 때문이다.
        // ShipDataDTO.getIdx() 하면은 DB에 업데이트할 엔티티를 조회할 수 있다
        return new ResponseEntity<>( shipDataService.updateShipData(shipDataDTO),HttpStatus.OK);
    }


    // 관리자만 ShipData 논리 삭제
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Object> deleteShipData(@PathVariable int id){
        shipDataService.deleteShipData(id);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    // 칼럼 단위 조회 API
    @GetMapping("/column/{name}")
    public ResponseEntity<List<Float>> getColumnData(@PathVariable String name) {

       System.out.println("getColumnData"+name);
       return new ResponseEntity<>(shipDataService.getColumnData(name), HttpStatus.OK);
    }

    /*
    리액트에서 name을 보내면
     */
}




















