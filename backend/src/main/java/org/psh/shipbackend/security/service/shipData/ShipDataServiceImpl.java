package org.psh.shipbackend.security.service.shipData;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.psh.shipbackend.domain.ShipData;
import org.psh.shipbackend.dto.ShipDataDTO;
import org.psh.shipbackend.repository.ShipDataRepository;
import org.springframework.beans.BeanUtils;

import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;


import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import java.util.Map;
import java.util.stream.Collectors;
@Log4j2
@Service
@RequiredArgsConstructor
public class ShipDataServiceImpl implements ShipDataService {
    private final ShipDataRepository shipDataRepository;

    @Override
    public List<ShipDataDTO> getAllShipData() {
        List<ShipData> shipData=shipDataRepository.findAll();
        List<ShipDataDTO> shipDataDTO=new ArrayList<>();
        for(ShipData shipData1:shipData){
            shipDataDTO.add(entityToDto(shipData1));
        }
        return shipDataDTO;
    }

    @Override
    public ShipDataDTO updateShipData(ShipDataDTO shipDataDTO) {
        ShipData shipData = dtoToEntity(shipDataDTO);
        ShipData existing = shipDataRepository.findById(shipDataDTO.getIdx())
                .orElseThrow(()-> new RuntimeException("ShipData not found"));

        // idx 와 deleted는 제외하고 기존 엔티티에 덮어쓰기
        BeanUtils.copyProperties(shipData, existing, "idx", "deleted");
        ShipData saved = shipDataRepository.save(existing);
        return entityToDto(saved);
    }

    
    @Override
    public List<Float> getColumnData(String columnName) {
        List<ShipDataDTO> allData = shipDataRepository.findAll()
                .stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());

// 이부분은 리액트에서 보내오는 컬럼네임을 dto의 JsonProperty 와 연결해준다
        ObjectMapper mapper = new ObjectMapper();

        return allData.stream()
                .map(dto -> {
                    // DTO를 Map으로 변환
                    Map<String, Object> dtoMap = mapper.convertValue(dto, new TypeReference<Map<String, Object>>() {});

                    // 컬럼명(columnName) 그대로 Map에서 가져오기
                    Object value = dtoMap.get(columnName);

                    if (value instanceof Number) return ((Number) value).floatValue();
                    return 0f;
                }).collect(Collectors.toList());
    }







/*
이거는 각 칼럼 이름별 리스트를 어떻게 만들어서 반환하는지를 보여주고 있다
allData.stream().map 이 부분은 allData를 스트림으로 변환시켜서 각 객체(ship)을 하나씩 처리하려고 하는 것이다
.map() 함수 안에서 각 한 row의 데이터 객체를 추출한다
--> .stream()을 호출하면 스트림(Stream) 객체로 변환된다.
스트림 (Stream)이란? 데이터의 흐름을 의미한다. 배열이나 리스트 같은 컬렉션을 하나씩 반복하지 않고도 함수형 방식으로 처리가능
예를들면 필터링, 변환, 정렬 등 다양한 연산을 연결해서 사용할 수있다

스트림 코드를 하나 알려주겠다
List<Float> leverPositions = allData.stream()
        .map (ship -> ship.getLeverPosition())
        .collect(Collectors.toList());
        
일단 allData에는 모든 shipDataList가 들어가있고, 그 안에 데이터를 stream해서 바꾸겠다는 의미이다. 
stream을 쓰면 map을 사용할 수 있다 
Stream<ShipData> shipStream = allData.stream() --> shipStream 안에 allData 리스트의 요소 하나하나가
흐름처럼 들어간다
.map(ship -> ship.getLeverPosition())
.map()은 스트림 안의 각 요소를 다른 값으로 변환할 때 사용한다. 여기서 각 shipData의 객체를 ship 이라는 이름으로 두고
해당 객체의 leverPosition 값으로 변환한다. 그러면 해당객체에서 leverPosition 값만 꺼내서 leverPositions라는
리스트에 담는 것이다 결과적으로 스트림 안의 각 ShipData 객체는 Float 값으로 바뀐다
.collect(Collectors.toList() 이 부분은 스트림 변환만 해주고 원래 컬렉션으로는 안돌아 간다는 의미히이다. 
.collect(Collectors.toList() 를 사용하면 스트림 결과를 리스트로 다시 모아서 반환한다


진짜 중요 ************* 여기서 List<Float>에서 Float는 예를들면 columnName 이 leverPositiond이면
그 levetPosition 안의 데이터 하나를 의미한다. 그래서 Float들의 List를 만들어서 반환해야하는 것이다
 */




//    @Override
//    public List<Float> getColumnData(String columnName) {
//        List<ShipData> allData=shipDataRepository.findAll();
//        return allData.stream().map(ship ->{

        // ShipData.class는 ShipData 엔티티 안에 어떤 필드가 있는지를 프로그래밍적으로 확인할 수 있게 해주는 객체이다
        // 쉽게 비유하자면 집 설계도에서 방1, 방2, 부엌, 화장실 정보를 꺼내는 것이다
        // ShipData.class + getDeclaredField("leverPosition") -> 이 설계도에서 leverPosition이라는
        // 방이 있네, 접근 가능하게 만들자 라고 하는 의미이다.
        // .getDeclaredField(columnName) -> 클래스 안에서 이름이 columnName인 멤버 변수(Field)를 가져온다.
        /*
        즉 ShipData 라는 클래스(설계도)안에서 leverPosition 같은 필드(속성) 정보를 가져오는 것이다
        이때 반환되는 field 는 설계도에서 해당 방(필드) 정보를 담고 있다.
        field.setAccessible(true)는 원래 private 필드는 외부에서 접근할 수 없는데, 이걸 강제로 접근 가능하게 만드는
        과정이다. 그니까 엔티티에서는 private Double leverPosition 이런식으로 되어잇으니까 이 필드를 외부에서도
        접근 가능하게 만드는 것이다. field 안에 들어있는 값이 private Double leverPositon 이니까
        ***********중요!!!!!!!!!! 여기서 field 안에 진짜로 들어있는 것은 leverPosition 이라는 변수 명만 들어있다
        값은 들어있지 않음. 이 칼럼이 클래스 안에 존재한다 라는 메타데이터만 가지고 있다
         */

//            try{
//                Field field = ShipData.class.getDeclaredField(columnName);
//                field.setAccessible(true);


                // field는 ShipData 클래스 안의 특정 컬럼(leverPosition) 정보를 가지고 있다. ship은 실제 데이터가
                // 들어있는 객체(엔티티)이다. 그래서 field.get(ship)은 그 객체의 해당 컬럼 값을 가져오는 것이다
                /*
                중요!!!!!!!!! 여기서 ship은 실제 데이터가 들어있는 객체, 즉 한 줄의 엔티티이다. 여기서는 값이 들어있다
                근데 field 에는 아직 값이 들어있지 않다 그 안에는 leverPosition 과 같은 변수 명만 들어있다
                그래서 실제 데이터를 안에 넣어줘야하는데
                넣어주는 방법이 field.get(ship); 인거다 ship 안에서 해당 field 가 가리키는 값만 꺼내는 것이다.
                
                쉽게말하면 field : 설계도, 칼럼 leverPosition이 클래스 안에 있다
                ship : 실제 데이터: leverPosition=3.1 ...
                field.get(ship) 설계도 (field)로 실제 데이터(ship) 의 leverPosition 값을 꺼내는 것이다
                중요한 포인트는 field.get(ship)은 ship 객체 전체를 가져오는게 아니라, ship 안에서 field가 지정한
                특정 칼럼 값만 가져오는 것이다
                앞에 (Float) 가 붙은 이유?
                get으로 가져오는 ship은 실제데이터 객체인데 문제는 리턴 타입이 Object 라는 것이다. 
                자바의 field.get()의 리턴 타입은 항상 Object이다. 그래서 나의 field는 Float 타입으로 바꿔주는것이다
                이유는 반환되는 값이 List<Float> 이니까
                 */

//                return (Float)field.get(ship);
//            }catch (Exception e){
//                throw new RuntimeException("Invalid Column Name : " + columnName);
//            }
//            /*
//            Stream API에서는 중간연산(map)을 통해 데이터를 처리한 후, 최종적으로 결과를 그니까 컬럼별로 나뉜 field 들을
//            collect()를 사용해서 리스트로 변환해줘야한다. 왜냐하면 반환값이 List<Float> 이니까
//            그리고 중요한건 여기서 Float 는 leverPosition이라면 3.4 라는 데이터 하나이다. 그래서 그 Float를 List로 바꿔서
//            변환해야하기 때문에 List<Float> 이렇게 된다
//             */
//        }).collect(Collectors.toList());
//    }


    // 논리삭제 서비스 함수
    // 여기도 지금 매개변수에 있는 int id 는 컨트롤러의 deleteShipData가 리액트에서 받은 axios.delete 데이터가 들어있다
    @Override
    public void deleteShipData(int id) {
        //DB에서 기존 데이터 조회(브라우저에서 삭제한 데이터 아이디로
        // findById(id)로 찾아온 데이터는 단일 엔티티 객체 데이터이다 그래서 existing 타입이 ShipData 객체타입
        ShipData existing = shipDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ShipData not found"));

        // 논리 삭제 처리 --> 상태를 true로 바꾼 후에 그 내용을 db에 반영해줘야한다
        existing.setDeleted(true);
        // 그래서 setDeleted(true) 처리한 existing을 db에 저장한다
        shipDataRepository.save(existing);
    }
}













