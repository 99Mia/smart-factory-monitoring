// 테이블 수정 시 ShipTable 말고 shipColumns 를 고치면 자동으로 테이블에 저장
/*
여기서 key는 api에서 데이터를 가져올 컬럼 이름이고
label은 화면에 표시할 이름이다
 */
export const shipColumns = [
  { key: "idx", label: "Idx" },
  { key: "lever_position", label: "Lever Position" },
  { key: "ship_speed", label: "Ship Speed" },
  { key: "GT_shaft_torque", label: "GT Shaft Torque" },
  { key: "GT_n_rpm", label: "GT N Rpm" },
  { key: "GG_n_rpm", label: "GG N Rpm" },
  { key: "Ts", label: "TS" },
  { key: "Tp", label: "TP" },
  { key: "HP_turbine_exit_temp", label: "HP Turbine Exit Temp" },
  { key: "GT_compressor_inlet_temp", label: "GT Compressor Inlet Temp" },
  { key: "GT_compressor_outlet_temp", label: "GT Compressor Outlet Temp" },
  { key: "HP_turbine_exit_pressure", label: "HP Turbine Exit Pressure" },
  { key: "GT_compressor_inlet_pressure", label: "GT Compressor Inlet Pressure" },
  { key: "GT_compressor_outlet_pressure", label: "GT Compressor Outlet Pressure" },
  { key: "GT_exhaust_pressure", label: "GT Exhaust Pressure" },
  { key: "TIC", label: "TIC" },
  { key: "fuel_flow", label: "Fuel Flow" },
  { key: "GT_compressor_decay_coeff", label: "GT Compressor Decay Coeff" },
  { key: "GT_turbine_decay_coeff", label: "GT Turbine Decay Coeff" }
];