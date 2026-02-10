package org.psh.shipbackend.security.service.ShipDataKPI;

import lombok.RequiredArgsConstructor;
import org.psh.shipbackend.domain.ShipData;
import org.psh.shipbackend.dto.KpiDTO;
import org.psh.shipbackend.repository.ShipDataRepository;
import org.psh.shipbackend.security.service.shipData.ShipDataService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KpiServiceImpl implements KpiService {
    private final ShipDataRepository shipDataRepository;


    @Override
    public KpiDTO calculateKpi() {
        // DB 에서 모든 ShipData 데이터를 가져오는 부분이다. ShipData는 한 배에서 측정한 엔진/센서 데이터 한 줄을 의미
        List<ShipData> allData = shipDataRepository.findAll();

        // 연료 효율을 계산한다. 한 줄씩 데이터를 꺼내서 ShipSpeed, FuelFlow를 계산한다
        // 연료 효율은 배 속도를 연료 소비량으로 나눈 값이다. 모든 값의 평균을 내서 전체 Kpi로 사용한다
        /*
        mapToDouble : Jpa stream api를 이용한 수치 계산 부분이다
        먼저 allData.stream 해서 리스트를 스트림으로 변환한다 스트림은 리스트의 데이터를 순차적으로 처리할 수 있는 일종의
        데이터 파이프라인이다. 
        mapToDouble 은 각 데이터를 double 값으로 변환할 때 사용한다
        여기서 d는 스트림 안의 각 shipData 객체를 의미한다
        d.getShipSpeed()/ d.getFuelFlow 현재 배 스피드를 연료량으로 바꿔서 연료 효율을 계산한다
        즉, 이 단계에서 리스트 shipSpeed1/fuelFlow1, shipSpeed2/fuelFlow2 로 변환된다.
        mapToDouble을 쓰는 이유는 average() 같은 수치 계산 함수가 DoubleStream에서만 제공되기 때문이다
        .average로 연료효율의 평균을 계산한다
         */
        double fuelEfficiency = allData.stream()
                .mapToDouble(d -> d.getShipSpeed()/ d.getFuelFlow())
                .average().orElse(0.0);

        // 엔진 부하율 계산
        /*
        먼저 allData 리스트를 스트림으로 변환시킨다. 그리고 mapToDouble 을 사용해서 각 shipData 객체 d를 double 갑으로
        변환시킨다.
        1. 그 다음에 가스터빈 샤프트 토크 값을 가져오고 (d.getGtShaftTorque)
        2. 전체 데이터에서 최대 GT 샤프트 토크를 구한다
        allData.stream() 해서 다시 모든 리스트를 스트림으로 변환후(다시 한번 말하지만 스트림은 리스트를 순차적으로 처리할수 있는
        데이터 파이프라인이다.
        그 후 mapToDouble을 사용해서 ShipData :: getGtShaftTorque 이거는 shipData 객체에서 GtShaftTorque만 추출해서
        오는 것이다. 그 값의 max 값을 구한다
        즉, 현재 가스터빈 샤프트 토크 값에 max 값을 나눈값들의 평균을 구한다
         */
        double torqueUtilization = allData.stream()
                .mapToDouble(d -> d.getGtShaftTorque() / allData.stream()
                        .mapToDouble(ShipData :: getGtShaftTorque).max().orElse(1.0))
                .average().orElse(0.0);

        /*
        표준편차 값을 구하는 calculateStd 함수를 이용해서 가스터빈 회전수 평균을 구한다
        allData 리스트를 stream 하고 mapToDouble로 gtGtNRpm 을 가져와서 double로 바꾼 후 그 모든 데이터를 array리스트
        형태로 변환시킨다.
        왜냐하면 calculateStd 의 매개변수가 Double[] 이거이기 때문에 타입을 맞춰줘야한다
         */
        double gtRpmStd = calculateStd(allData.stream().mapToDouble(ShipData::getGtNRpm).toArray());

        // 프로펠러 균형
        double propellerBalance = allData.stream()
                .mapToDouble(d -> Math.abs(d.getTs() - d.getTp()))
                .average().orElse(0.0);
        // 예지보전 지표
        // 가스터빈 압축기 성능저하계수와 가스터빈 터빈 성능 계하 지수를 더한 값의 평균
        double decayIndex = allData.stream()
                .mapToDouble(d -> d.getGtCompressorDecayCoeff() + d.getGtTurbineDecayCoeff())
                .average().orElse(0.0);

        return new KpiDTO(fuelEfficiency, torqueUtilization, gtRpmStd, propellerBalance, decayIndex);
    }
    /*
    {
      "fuelEfficiency": 26.87254115101515,
      "torqueUtilization": 0.3743564790175303,
      "gtRpmStd": 774.051555050264,
      "propellerBalance": 0,
      "decayIndex": 1.9625
    }
    이런 형태로 반환된다. 그게 리액트로 보내진다
    
     */


    // 배열 표준편차 계산
    /*
    values 는 배열 안에 있는 숫자들의 표준편차를 계산하는 개인용(private) 메서드이다
     */
    private double calculateStd(double[] values) {
        if (values.length == 0) return 0.0;
        // 평균을 담을 변수를 초기화한 것이다. mean 변수는 누적 합을 저장할 임시 공간 역할도 한다
        double mean = 0.0;
        // 향상된 for 문, 의미는 values 배열 안에있는 각 객체의 이름을 v 로 두고 하나씩 꺼내서 
        // mean 이라는 변수에 담는다. 즉 누적합을 구하는 것이다
        // 이 단계에서 mean 은 합(sum)이 된다
        for (double v : values) mean += v;
        // 여기서는 누적합이 담긴 mean을 데이터 개수로 나누어서 평균을 개산한다
        /*
        예를들어 mean = 12.0
        values.length = 3
        mean /= 3    --> 12/3 = 4
        그러면 mean은 이제 진짜 평균이 된다
         */
        mean /= values.length;

        // 여기서는 표준편차 계산용 누적 합을 담을 변수를 초기화 한다
        // 나중에 이 변수에 (값 - 평균)^2 를 하나씩 더한다
        double sum = 0.0;
        // 여기서 values의 모든 값을 하나씩 꺼낸다. 
        /*
        v - mean은 현재 값에서 평균을 뺀 값(편차)
        Math.pow(v - mean ,2) 이거는 편차(mean-v)를 제곡한다. 
        제곱하는 이유는 음수 문제를 제거라고 큰 편차를 더 중요하게 반영하려고
        반복할때 마다 sum += 이렇게 편차 제곱을 sum 변수에 계속 더한다
        반복이 끝나면 sum 에는 모든 값의 편차 제곱 합이 들어있다
         */
        for (double v : values) sum += Math.pow(v - mean, 2);
        /*
        편차제곱의 합(sum)을 데이터 개수로 나눈다 -> 분산 계산
        분산(Variance) : 값들이 평균에서 얼마나 떨어져 있는지 평균적인 정도를 나타내고 싶다
        방법: 
        1.각 값에서 평균을 뺀 편차를 구함 (값 - 평균)
        2.편차를 제곱 -> 음수 제거 + 큰 편차를 강조
        3. 편차 제곱의 합을 데이터 개수로 나눔
        4. 편차 제곱의 합을 데이터 개수로 나눈 것이 분산이다 : 값들이 평균에서 얼마나 멀리 떨어져 있는지를 평균적 정도를 
        숫자로 나타낸 것이다
        Math.sqrt() --> x 의 제곱근
        분산은 편차를 제곱해서 계산했기 때문에 단위에 원래 값의 제곱과 같다
        sqrt는 그 제곱을 없애서 원래 값 단위로 되돌린다 --> 그것이 바로 표준편차
         */
        return Math.sqrt(sum/ values.length);
    }


}

















