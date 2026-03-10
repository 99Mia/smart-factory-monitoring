# 스마트팩토리 실시간 모니터링 시스템

![Project Badge](https://img.shields.io/badge/Status-Completed-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-Spring%20Boot%20|%20React%20|%20MySQL-blue)

## 목차
- [프로젝트 개요](#1-프로젝트-개요)
- [시스템 목표](#2-시스템-목표)
- [아키텍처](#3-아키텍처)
- [사용 기술](#4-사용-기술)
- [담당 역할 및 구현 내역](#5-담당-역할-및-구현-내역)
  - [Database 설계 및 연동](#51-database-설계-및-연동)
  - [Backend 설계 및 구현](#52-backend-설계-및-구현)
  - [Frontend 설계 및 구현](#53-frontend-설계-및-구현)
  - [시스템 통합 및 최적화](#54-시스템-통합-및-최적화)
- [구현 결과 / 성과](#6-구현-결과--성과)
- [구현 영상](#구현-영상)
- [실행 방법](#실행-방법)

---

## 1. 프로젝트 개요
- Kaggle 기반 제조 데이터로 설계·개발한 **스마트팩토리 실시간 모니터링 시스템**  
- 실시간 KPI 계산, 컬럼별 데이터 조회, 관리자 페이지 데이터 관리, 알람 처리 기능을 **End-to-End 데이터 파이프라인**으로 구현  
- 목표: 산업 환경과 유사하게 **데이터 수집 → 분석 → 시각화 → 실시간 의사결정 지원** 구조 구현

---

## 2. 시스템 목표
- 실시간 설비 및 운영 데이터 기반 KPI 산출 및 시각화  
- 관리자 페이지를 통한 컬럼별 데이터 관리 및 알람 상태 실시간 반영  
- Flux + SSE 기반 **서버-클라이언트 실시간 데이터 스트리밍** 구축  
- JWT 인증 기반 사용자 접근 제어로 보안 강화  

---

## 3. 아키텍처
**데이터 파이프라인 구조:**  
MySQL DB → Spring Boot Backend → React Frontend → 실시간 차트/알람

- **Backend:** KPI 계산, 컬럼별 API 제공, Flux + SSE 기반 실시간 스트리밍  
- **Frontend:** 정적 DB 기반 시뮬레이션 차트 + 실시간 KPI 대시보드  
- **Database:** MySQL/JPA 기반 데이터 모델링 및 권한 관리  
- **보안:** JWT 인증 처리, 로그인 사용자 전용 데이터 접근  

---

## 4. 사용 기술
- **Backend:** Spring Boot, WebFlux, SSE, Spring Security, JWT, JPA  
- **Frontend:** React, REST API, useState/useEffect, setInterval 기반 실시간 UI 시뮬레이션  
- **Database:** MySQL  
- **협업/버전관리:** Git, GitHub  

---

## 5. 담당 역할 및 구현 내역

### 5.1 Database 설계 및 연동
- MySQL 기반 테이블 설계 및 관계 정의, JPA 매핑  
- 컬럼별 데이터 구조 설계 및 효율적 저장 전략 수립  
- JWT 인증 및 권한 관리를 위한 데이터 모델 설계  

### 5.2 Backend 설계 및 구현
- 컬럼별 전체 데이터 조회 API 설계 및 구현  
- KPI 계산 로직 개발 및 Flux + SSE 기반 실시간 데이터 스트리밍 구현  
- 실시간 알람 API 설계 및 대시보드 연동  
- JWT 기반 로그인 사용자 전용 데이터 접근 제어  

### 5.3 Frontend 설계 및 구현
- **클라이언트(UI) 시뮬레이션**: DB 기반 정적 데이터를 **0.5초 간격(setInterval)**으로 차례대로 누적하여 실시간 그래프 구현  
- **서버-클라이언트 실시간 스트리밍 시뮬레이션**: Flux + SSE 구조 설계·개발, **2초 간격 데이터 전송**  
- **관리자 페이지**: 컬럼별 데이터 수정 및 알람 상태 실시간 관리  
- **접근 제어**: 로그인 사용자 전용 권한 적용 (JWT 기반)  

### 5.4 시스템 통합 및 최적화
- DB → Spring Boot → React End-to-End 데이터 파이프라인 구축  
- 컬럼별 상태 관리 및 차트 업데이트 최적화  
- KPI 데이터 최신 50개 유지, 알람 색상 구분 및 상단 표시 로직 구현  

---

## 6. 구현 결과 / 성과
- 정적 DB 기반 실시간 UI 시뮬레이션 및 Flux 기반 실제 KPI 대시보드 구현  
- 관리자 페이지를 통한 컬럼별 데이터 수정 및 알람 상태 실시간 관리 가능  
- 실시간 KPI 시각화를 통한 **운영 의사결정 지원 및 이상 탐지 효율 향상**  
- JWT 인증 적용으로 보안 강화  

---

## 구현 영상
[영상 시청하기](https://youtu.be/UsvzC-mqnlE)  

---

## 실행 방법
1. Backend(Spring Boot) 실행  
2. Frontend(React) 실행  
3. 실시간 KPI 모니터링 및 컬럼별 데이터 확인
