package org.psh.shipbackend.repository;

import org.psh.shipbackend.domain.KpiAlarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KpiAlarmRepository extends JpaRepository<KpiAlarm,Long> {
}
