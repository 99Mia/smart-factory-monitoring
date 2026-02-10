package org.psh.shipbackend.security.service.ShipDataKPI;

import org.psh.shipbackend.dto.KpiDTO;
import org.springframework.stereotype.Service;


public interface KpiService {
    KpiDTO calculateKpi();


}
