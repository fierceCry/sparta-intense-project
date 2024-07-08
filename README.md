<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# 프로젝트 설명
이 프로젝트는 사용자 회원가입, 로그인, 공연 등록 및 관리, 공연 검색과 예매 등의 기능을 제공하는 배달 서비스 플랫폼입니다. 사용자는 회원가입 및 로그인을 통해 일반 사용자 또는 관리자(admin) 권한을 가질 수 있습니다. 일반 사용자는 공연을 검색하고 예매할 수 있으며, 관리자는 공연을 등록하고 관리할 수 있습니다.

# 기능
  이 프로젝트는 다음과 같은 주요 기능을 제공합니다.

- 사용자 회원가입 및 로그인: 사용자는 이메일과 비밀번호를 통해 회원가입을 할 수 있습니다.
  
- 사용자 인증: 사용자는 로그인 후, JWT 토큰을 통해 인증을 받습니다.
  
- admin유저 공연등록: 관리자(admin) 권한을 가진 사용자는 새로운 공연을 등록할 수 있습니다. 공연 등록 시 공연명, 날짜, 장소, 가격 등의 정보를 입력할 수 있습니다.
  
- 공연 카테고리 조회: 사용자는 등록된 공연의 카테고리를 조회할 수 있습니다.
  
- 공연 검색 기능: 사용자는 공연명 키워드를 입력하여 원하는 공연을 검색할 수 있습니다.
  
- 공연 상세보기 : 사용자는 공연 목록에서 특정 공연을 선택하여 해당 공연의 상세 정보를 볼 수 있습니다.
공연의 상세 정보에는 공연명, 날짜, 장소, 가격, 공연 설명 등이 포함됩니다.

- 공연 포인트 결제:사용자는 예매 시, 자신의 포인트를 사용하여 공연 티켓을 결제할 수 있습니다.
포인트는 회원가입 시 제공되며, 사용자가 공연을 예매할 때 차감됩니다.

- 예매 확인하기:사용자는 자신이 예매한 공연 목록을 조회할 수 있습니다.
예매한 공연의 상세 정보를 확인하고, 예매 내역을 관리할 수 있습니다.

# 기술스택

- 백엔드 프레임워크: NestJS, typeORM, Swagger
- 데이터베이스 : MySQL
- 인증 및 보안: JSON Web Token (JWT), bcrypt, Joi


## 목차

1. [소개](#프로젝트-설명)
2. [설치](#프로젝트-설치-및-실행-방법)
3. [사용법](#프로젝트-사용-방법)
4. [참고 자료](#참고-자료)

## 프로젝트 설치 및 실행 방법

이 프로젝트를 로컬 환경에 설치하고 실행하는 방법은 다음과 같습니다:

1. 저장소를 클론합니다:
    ```bash
    git clone https://github.com/fierceCry/sparta-intense-project.git
    ```

2. 프로젝트 디렉토리로 이동합니다:
    ```bash
    cd sparta-intense-project
    ```

3. 필요한 패키지를 설치합니다:
    ```bash
    npm install
    ```

4. 환경 변수를 설정합니다. `.env` 파일을 생성하고 다음과 같은 설정을 추가합니다:
    ```
    PORT=3000
    DB_USERNAME=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=
    DB_NAME=
    DB_SYNC=
    JWT_SECRET_KEY=
    JWT_EXPIRE=
    ```

### Swagger 주소
API 문서를 확인하려면 다음 주소로 이동하세요:
- **URL**: `http://43.203.96.176:3095/sparta`

1. 애플리케이션을 실행합니다:
    ```bash
    npm run start:dev
    ```

2. 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 프로젝트 사용 방법

### API 엔드포인트

#### 사용자 회원가입
- **Method**: `POST`
- **URL**: `/user/sign-up`

#### 사용자 로그인
- **Method**: `POST`
- **URL**: `/user/sign-in`

#### 사용자 인증
- **Method**: `GET`
- **URL**: `/user/my`

#### 공연 생성
- **Method**: `POST`
- **URL**: `/performance`

#### 공연 카테고리 조회
- **Method**: `GET`
- **URL**: `/performance/:categoryId`

#### 공연 검색
- **Method**: `GET`
- **URL**: `/performance/:performanceName`

#### 공연 상세보기
- **Method**: `GET`
- **URL**: `/performance/:performanceId`

#### 공연 예매
- **Method**: `POST`
- **URL**: `/order/reserve/`

#### 공연 예매 확인하기
- **Method**: `GET`
- **URL**: `/order/reserve`

### 참고 자료
- [Nest.js](https://nestjs.com/)
- [MySQL 공식 문서](https://dev.mysql.com/doc/refman/8.0/en/select.html)
- [JSON Web Token (JWT) 공식 문서](https://jwt.io/introduction/)
- [Joi 공식 문서](https://joi.dev/api/?v=17.13.0)
