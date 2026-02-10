# 선박(ship) 및 동역학 및 가스터빈(Gas Turbine) 성능 관련 센서 데이터
# 선박이 운행 중인 상태에서 측정한 데이터이고 선박 내부 장비들의 성능과 상태도 동시에 기록됨
# index 순서대로 운항 시간 흐름에 따라 선박 속도, 레버 위치, 연료 유량, 프로펠러 토크, 가스터빈 회전수,
# 터빈 온도/압력 등 모든 관련 장비 데이터를 실시간으로 관찰할 수 있는 데이터 셋이다

import kagglehub

# Download latest version
path = kagglehub.dataset_download("thedevastator/improving-naval-vessel-condition-through-machine")

print("Path to dataset files:", path)

import os
import pandas as pd

# 다운로드 경로
data_path = r"C:\Users\it\.cache\kagglehub\datasets\thedevastator\improving-naval-vessel-condition-through-machine\versions\2"
print(os.listdir(data_path))
file_name = "data.csv"

#csv 읽기

df = pd.read_csv(os.path.join(data_path, file_name))

#데이터 확인 
print(df.head())  
print(df.info())
print(df.describe())

df.to_csv("new_data.csv", index=False)

# Mysql 연결
import mysql.connector
conn = mysql.connector.connect(
  host="127.0.0.1",
  port=3306,
  user="psh",
  password="1234",
  database="ship_db"
)
cursor = conn.cursor()
print("Mysql 연결 성공")

#테이블 생성
cursor.execute("""
CREATE TABLE IF NOT EXISTS ship_data (
    idx INT PRIMARY KEY,                 
    lever_position FLOAT,                  
    ship_speed FLOAT,                    
    GT_shaft_torque FLOAT,               
    GT_n_rpm FLOAT,                           
    GG_n_rpm FLOAT,                           
    Ts FLOAT,                                 
    Tp FLOAT,                                 
    HP_turbine_exit_temp FLOAT,             
    GT_compressor_inlet_temp FLOAT,           
    GT_compressor_outlet_temp FLOAT,         
    HP_turbine_exit_pressure FLOAT,          
    GT_compressor_inlet_pressure FLOAT,       
    GT_compressor_outlet_pressure FLOAT,      
    GT_exhaust_pressure FLOAT,                
    TIC FLOAT,                                
    fuel_flow FLOAT,                         
    GT_compressor_decay_coeff FLOAT,          
    GT_turbine_decay_coeff FLOAT             
)
""")

# lever_position : 레버 위치(1~N 등 조종 레버 상태), 용도: 추진력, 속도 제어 관련 kpi 계산 
# ship_speed : 선박 속도 (v), 용도: 연료 효율, 토크 대비 속도 kpi
# GT_shaft_torque : 가스터빈(GT) 샤프트 토크 [kN m], 용도: 엔진 부하 계산, 연료 효율과 연동  
# GT_n_rpm : 가스터빈 회전수 [rpm], 용도: 엔진 안정성, 회전수 변동성 kpi
# GG_n_rpm : 가스터빈 발전기 회전수 [rpm], 용도: 발전기 출력 효율, 부하 모니터링
# Ts : 우현(Starboard) 프로펠러 토크 [kN], 용도: 추진력, 선박 방향/속도 제어 관련 kpi
# Tp : 좌현(Port) 프로펠러 토크, 용도: Ts와 함께 추진력 계산, 엔진 부하 평가
# HP_turbine_exit_temp : HP 터빈 출구 온도(T48), 용도: 터빈 열 상태 평가, 과열 감지
# GT_compressor_inlet_temp : 가스터빈 압축기 입구 온도 (T1), 용도: 공기 흡입 조건, 성능 분석
# GT_compressor_outlet_temp : 가스터빈 압축기 출구 온도 (T2), 용도: 압축기 효율, 온도 상승 추적
# HP_turbine_exit_pressure : HP 터빈 출구 압력 (p48) [bar], 용도 : 터빈 성능, 엔진 부하 계산
# GT_compressor_inlet_pressure : GT 압축기 입구 압력 (P1) [bar] , 용도: 흡입 공기 상태, 압력 손실 분석
# GT_compressor_outlet_pressure : GT 압축기 출구 압력 (P2) [bar], 용도: 압축기 성능 평가
# GT_exhaust_pressure : 가스터빈 배기 압력(Pexh) [bar], 용도 : 배기 효율, 장비 이상 여부
# TIC : Turbine Injection Control [%], 용도 : 연료 공급 제어, 출력 조정 상태
# fuel_flow : 연료 유량(mf) [kg/s], 용도: 연료 효율, 운항 비용, kpi 계산
# GT_compressor_decay_coeff : GT 압축기 감쇠 개수, 용도: 압축기 성능 저하 추적, 예지보전
# GT_turbine_decay_coeff: GT 터빈 삼쇠 개수, 용도: 터빈 성능 저하 추적, 예지보전

# 데이터  삽입
for _, row in df.iterrows():
    cursor.execute("""
        INSERT INTO ship_data (
            idx, lever_position, ship_speed, GT_shaft_torque, GT_n_rpm,
            GG_n_rpm, Ts, Tp, HP_turbine_exit_temp, GT_compressor_inlet_temp,
            GT_compressor_outlet_temp, HP_turbine_exit_pressure,
            GT_compressor_inlet_pressure, GT_compressor_outlet_pressure,
            GT_exhaust_pressure, TIC, fuel_flow,
            GT_compressor_decay_coeff, GT_turbine_decay_coeff
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, tuple(row))

# 변경사항 저장
conn.commit()




