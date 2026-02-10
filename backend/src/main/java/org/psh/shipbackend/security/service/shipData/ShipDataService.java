package org.psh.shipbackend.security.service.shipData;

import org.psh.shipbackend.domain.ShipData;
import org.psh.shipbackend.dto.ShipDataDTO;

import java.util.List;

public interface ShipDataService {
    List<ShipDataDTO> getAllShipData();
    ShipDataDTO updateShipData(ShipDataDTO shipDataDTO);
    List<Float> getColumnData(String columnName);
    void deleteShipData(int id);

    default ShipData dtoToEntity(ShipDataDTO shipDataDTO) {
        ShipData shipData = ShipData.builder()
                .idx(shipDataDTO.getIdx())
                .leverPosition(shipDataDTO.getLeverPosition())
                .shipSpeed(shipDataDTO.getShipSpeed())
                .gtShaftTorque(shipDataDTO.getGtShaftTorque())
                .gtNRpm(shipDataDTO.getGtNRpm())
                .ggNRpm(shipDataDTO.getGgNRpm())
                .ts(shipDataDTO.getTs())
                .tp(shipDataDTO.getTp())
                .hpTurbineExitTemp(shipDataDTO.getHpTurbineExitTemp())
                .gtCompressorInletTemp(shipDataDTO.getGtCompressorInletTemp())
                .gtCompressorOutletTemp(shipDataDTO.getGtCompressorOutletTemp())
                .hpTurbineExitPressure(shipDataDTO.getHpTurbineExitPressure())
                .gtCompressorInletPressure(shipDataDTO.getGtCompressorInletPressure())
                .gtCompressorOutletPressure(shipDataDTO.getGtCompressorOutletPressure())
                .gtExhaustPressure(shipDataDTO.getGtExhaustPressure())
                .tic(shipDataDTO.getTic())
                .fuelFlow(shipDataDTO.getFuelFlow())
                .gtCompressorDecayCoeff(shipDataDTO.getGtCompressorDecayCoeff())
                .gtTurbineDecayCoeff(shipDataDTO.getGtTurbineDecayCoeff())
                .build();
        return shipData;
    }

    default ShipDataDTO entityToDto(ShipData shipData) {
        ShipDataDTO shipDataDTO = ShipDataDTO.builder()
                .idx(shipData.getIdx())
                .leverPosition(shipData.getLeverPosition())
                .shipSpeed(shipData.getShipSpeed())
                .gtShaftTorque(shipData.getGtShaftTorque())
                .gtNRpm(shipData.getGtNRpm())
                .ggNRpm(shipData.getGgNRpm())
                .ts(shipData.getTs())
                .tp(shipData.getTp())
                .hpTurbineExitTemp(shipData.getHpTurbineExitTemp())
                .gtCompressorInletTemp(shipData.getGtCompressorInletTemp())
                .gtCompressorOutletTemp(shipData.getGtCompressorOutletTemp())
                .hpTurbineExitPressure(shipData.getHpTurbineExitPressure())
                .gtCompressorInletPressure(shipData.getGtCompressorInletPressure())
                .gtCompressorOutletPressure(shipData.getGtCompressorOutletPressure())
                .gtExhaustPressure(shipData.getGtExhaustPressure())
                .tic(shipData.getTic())
                .fuelFlow(shipData.getFuelFlow())
                .gtCompressorDecayCoeff(shipData.getGtCompressorDecayCoeff())
                .gtTurbineDecayCoeff(shipData.getGtTurbineDecayCoeff())
                .build();
        return shipDataDTO;
    }




}















