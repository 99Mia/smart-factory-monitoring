package org.psh.shipbackend.repository;

import org.psh.shipbackend.domain.ShipData;
import org.springframework.data.jpa.repository.JpaRepository;

/*
여기에 있는 ShipData 이부분이 엔티티 클래스, 즉 도메인 클래스이다.
Jpa는 이 클래스를 보고 어떤 테이블과 매핑할지, 컬럼은 뭐가 있는지를 알 수 있다. 그래서 Repository안에서
shipdata를 쓰면 이 레파지토리는 shipdata 테이블과 연결된 crud 기능을 제공한다고(그니까 db 데이터를 삭제하고 가져오고
업데이트하고 그런 기능)
Integer는 그 테이블의 기본키 타입이다
 */
public interface ShipDataRepository extends JpaRepository<ShipData, Integer> {
}
