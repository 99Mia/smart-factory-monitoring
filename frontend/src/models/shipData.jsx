// 나중에 화면에 데이터를 정렬, 필터링, 검색할 때 유용하게 쓸 수 있게 남겨두는게 맞다
// 그 이유가 이 ShipData 가 있어야 하는 이유이다
export default class ShipData{
  constructor(
    idx,
    leverPosition,
    shipSpeed,
    gtShaftTorque,
    gtNRpm,
    ggNRpm,
    ts,
    tp,
    hpTurbineExitTemp,
    gtCompressorInletTemp,
    gtCompressorOutletTemp,
    hpTurbineExitPressure,
    gtCompressorInletPressure,
    gtCompressorOutletPressure,
    gtExhaustPressure,
    tic,
    fuelFlow,
    gtCompressorDecayCoeff,
    gtTurbineDecayCoeff,
  ){
    this.idx = idx;
    this.leverPosition = leverPosition;
    this.shipSpeed = shipSpeed;
    this.gtShaftTorque = gtShaftTorque;
    this.gtNRpm = gtNRpm;
    this.ggNRpm = ggNRpm;
    this.ts = ts;
    this.tp = tp;
    this.hpTurbineExitTemp = hpTurbineExitTemp;
    this.gtCompressorInletTemp = gtCompressorInletTemp;
    this.gtCompressorOutletTemp = gtCompressorOutletTemp;
    this.hpTurbineExitPressure = hpTurbineExitPressure;
    this.gtCompressorInletPressure = gtCompressorInletPressure;
    this.gtCompressorOutletPressure = gtCompressorOutletPressure;
    this.gtExhaustPressure = gtExhaustPressure;
    this.tic = tic;
    this.fuelFlow = fuelFlow;
    this.gtCompressorDecayCoeff = gtCompressorDecayCoeff;
    this.gtTurbineDecayCoeff = gtTurbineDecayCoeff;
  }
}