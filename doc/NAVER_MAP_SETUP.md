# 네이버 지도 API 설정 안내

## 1. 네이버 클라우드 플랫폼 가입 및 API 키 발급

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/)에 가입합니다.
2. **Console > Services > AI·NAVER API > AI·NAVER API**로 이동합니다.
3. **Application 등록** 버튼을 클릭합니다.
4. Application 이름을 입력하고 **Web 서비스 URL**에 사용할 도메인을 입력합니다.
   - 로컬 테스트: `http://localhost` 또는 `http://127.0.0.1`
   - 실제 서비스: 실제 도메인 주소
5. 등록 후 발급된 **Client ID**를 복사합니다.

## 2. index.html 파일 수정

`index.html` 파일을 열어서 다음 줄을 찾습니다:

```html
<script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID"></script>
```

`YOUR_CLIENT_ID`를 발급받은 실제 Client ID로 변경합니다:

```html
<script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=실제_클라이언트_ID"></script>
```

## 3. 확인

브라우저에서 `index.html`을 열어 "위치 및 연락처" 섹션에서 지도가 정상적으로 표시되는지 확인합니다.

## 주의사항

- **Web 서비스 URL**에 등록되지 않은 도메인에서는 지도가 표시되지 않습니다.
- 무료 플랜의 경우 일일 요청 제한이 있습니다.
- 로컬 파일(`file://`)로 직접 열 경우 API가 작동하지 않을 수 있습니다. 로컬 서버를 사용하거나 실제 도메인에 배포해야 합니다.

## 로컬 서버 실행 방법

### Python 3
```bash
python -m http.server 8000
```

### Node.js (http-server)
```bash
npx http-server -p 8000
```

그 후 브라우저에서 `http://localhost:8000`으로 접속합니다.

