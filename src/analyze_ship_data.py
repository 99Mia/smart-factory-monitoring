# [1]운항 효율

# 1. Speed-to-Torque Ratio(속도 대비 프로펠러 토크 비율)
# --> 속도 대비 추진력 효율, 낮으면 엔진 과부하 가능성

# 2. LoadFactor(엔진 부하율)
# --> 실제 운항에서 엔진을 어느정도 부하로 쓰는지 확인, 유지보수 계획에 필요

# [2] 연료 효율,환경 지표
# 1. Fuel Efficiency Index
# --> 단순 속도 대비 연료가 아니라, 엔진 출력까지 고려한 실제 효율

# 2. Excess Fuel Alert
# --> 연료 사용량이 특정 RPM 대비 예상 범위 초과 -> 알람 발생
# --> 산업 현장에서는 이런 이상치 탐지가 핵심 


# [3] 엔진,장비 상태 지표

# 1. RPM 변동성(Stability Index)
# --> 회전수 변동이 크면 장비 이상 가능성

# 2. Turbine Thermal Stress
# --> 온도 상승이 출력에 미치는 영향, 고장 예측용

# 3. Compressor/Turbine Decay Tracking
# --> 시간 대비 GT_compressor_decay_coeff와 GT_turbine_decay_coeff 추적


# 시각화 포인트
# Heatmap: TPS vs RPM vs Fuel --> 효율 구간 시각화
# Time Series: 속도, 연료, 토크 변화 추세 --> 실시간 모니터링
# Alerts: 특정 KPI 이상 시, 빨간색 마커로 표시 -> 산업용 느낌 강조


# 또 다른 예시



import pandas as pd
import mysql.connector
import json

# mysql 연결
conn=mysql.connector.connect(
  host="127.0.0.1",
  user="psh",
  password ="1234",
  database = "ship.db"
)
cursor = conn.cursor(dictionary=True)

# 2. 데이터 가져오기
cursor.execute("SELECT * FROM ship_data")
rows = cursor.fetchall()
df = pd.DataFrame(rows)

# 3. kpi 계산

# 속도 대비 연료 효율 
df['fuel_efficiency'] = df['ship_speed'] / df['fuel_flow']

# 엔진 부하율 (Torque Utilization)
# 이거 나중에 연료 효율이 낮고 부하율이 높은 경우 '주의', 아니면 '정상' 이라고 화면에 뜨게 해야함
# 연료효율이 평균보다 낮거나 부하율이 80% 이상이면 과부하 -> 경고 신호
df['torque_utilization'] = (df['GT_shaft_torque'] / df['GT_shaft_torque'].max())

# RPM 변동성 (구간별 회전수 표준편차)
window_size = 10
df['GT_rpm_std'] = df['GT_n_rpm'].rolling(window=window_size).std()

# 프로펠러 균형
df['propeller_balance'] = abs(df['Ts'] - df['Tp'])

# 예지보전 지표(Decay Monitoring)
df['decay_index'] = df['GT_compressor_decay_coeff'] + df['GT_turbine_decay_coeff']


# 4. React에서 사용할 JSON 구조 만들기
# React는 일반적으로 time-series 데이터, 또는 KPI별 배열 형태를 선호

kpi_json ={
  "fuel_efficiency" : df['fuel_efficiency'].tolist(),
  "torque_utilization": df['torque_utilization'].tolist(),
  "GT_rpm_std": df['GT_rpm_std'].fillna(0).tolist(),  # 첫 window_size-1개는 NaN
  "propeller_balance": df['propeller_balance'].tolist(),
  "decay_index" : df['decay_index'].tolist(),
  "timestamps": df['idx'].tolist()  # x축용 인덱스

}

# 5. JSON 파일로 저장 (React에서 fetch 가능)
with open("kpi_data.json", "w") as f:
  json.dump(kpi_json, f, indent=4)

print("KPI JSON 파일 생성 완료!")



# 시각화 포인트: Time Series Chart: 시간별 decay_index(성능저하 계수) 변화를 모니터링
# Alert Marker: 일정 기준 이상이면 빨간색으로 표시 -> 실시간 알람처럼 보여줄 수 있음
# KPI란 장비의 건강상태를 숫자로 보여주는 KPI 이다



