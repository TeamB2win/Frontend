<img src="src/passerby_service.gif"/>

# 🕵🏻 Passerby-Frontend

### <div align="center"><b><i> Passerby, 여러분의 안전을 책임집니다. </i></b></div>

&nbsp; 

> Passerby project
> 
> launched at 2023.06
> 
> Programmers AI DEV-course 5th

&nbsp; 

🎥 **Passerby**는 공개수배자들의 이미지를 **AI 기술**을 통하여 비디오로 생성하여 여러분께 제공합니다.

🇰🇷 본 프로젝트를 통해 팀 B2Win은 **더 안전한 대한민국, 더 건강한 대한민국**을 꿈꿉니다.

💾 본 리포지토리는 Passerby의 Frontend Server 저장소입니다.

&nbsp;

# ⚙️ Tech Stack

<div align="center">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"><img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=React%20Router&logoColor=white"><img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
</div>
&nbsp; 

# ❓ About B2win Team

<div align="center">
  
| [@hwaxrang](https://github.com/hwaxrang) | [@Magenta195](https://github.com/Magenta195) | [@moongni](https://github.com/moongni) | [@heehaaaheeeee](https://github.com/heehaaaheeeee) | [@ShinEunChae](https://github.com/ShinEunChae) | [@joseokjun](https://github.com/joseokjun) |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="src/khr.png" width=200 /> | <img src="src/kth.jpeg" width=200 /> | <img src="src/mgh.png" width=200 /> | <img src="src/msh.jpg" width=200 /> | <img src="src/sec.jpeg" width=200 /> | <img src="src/jsj.jpg" width=200 /> |
| `권화랑`   | `김태형` | `문건희` | `문숙희` | `신은채` | `조석준`  |

</div>

<div align="center">
<a href = "https://github.com/TeamB2win"><img alt="GitHub" src ="https://img.shields.io/badge/GitHub-181717.svg?&style=for-the-badge&logo=GitHub&logoColor=white"/></a>
<a href = "https://www.notion.so/B2Win-Between-a9b09623b67243319d9bbce293bfa46b?pvs=4"><img alt="Notion" src ="https://img.shields.io/badge/Notion-eeeeee.svg?&style=for-the-badge&logo=Notion&logoColor=black"/></a>
</div>
&nbsp; 

# 🗝️ Key Service

💡 사용자는 passerby 웹 및 모바일 환경에 접속하여 **전체 공개수배자 신상정보**를 확인할 수 있습니다.

💡 또한, 공개수배자 정보와 대조하여 바로 제보 및 신고할 수 있도록 **관련 안내 정보**를 제공합니다.

💡 관리자는 passerby db를 통하여 공개수배자 **생성, 조회**, 이미지 및 비디오, 신상정보의 **수정, 삭제**를 수행할 수 있습니다.

# 🧭 Structure
```bash
🗂️ Frontend
├── 📂 wanted
│   ├── 📄 README.md
│   ├── 📄 package-lock.json
│   ├── 📄 package.json
│   ├── 📂 public
│   │   ├── 📄 favicon.ico
│   │   ├── 📄 github.png
│   │   ├── 📂 images
│   │   │   ├── 📂 admin
│   │   │   │   ├── 📄 admin-interface.png
│   │   │   │   ├── 📄 default-image.png
│   │   │   │   └── 📄 user-interface.png
│   │   │   └── 📂 report
│   │   │       ├── 📄 report112.png
│   │   │       ├── 📄 report_smart_app.png
│   │   │       ├── 📄 report_smart_web.png
│   │   │       ├── 📄 report_tutorial_01.png
│   │   │       ├── 📄 report_tutorial_02.png
│   │   │       └── 📄 report_tutorial_03.png
│   │   ├── 📄 index.html
│   │   ├── 📄 logo.png
│   │   ├── 📄 logo192.png
│   │   ├── 📄 logo512.png
│   │   ├── 📄 manifest.json
│   │   ├── 📄 notion_app_logo.png
│   │   ├── 📄 robots.txt
│   │   └── 📂 workspace
│   │       ├── 📄 README.md
│   │       └── 📂 data
│   │           └── 📄 README.md
│   ├── 📂 src
│   │   ├── 📂 components
│   │   │   ├── 📄 adminNav.css
│   │   │   ├── 📄 adminNav.js
│   │   │   ├── 📄 navLink.js
│   │   │   ├── 📄 userNav.css
│   │   │   └── 📄 userNav.js
│   │   ├── 📂 hooks
│   │   │   └── 📄 useDataFetch.js
│   │   ├── 📄 index.css
│   │   ├── 📄 index.js
│   │   ├── 📄 logo.svg
│   │   ├── 📂 pages
│   │   │   ├── 📂 admin
│   │   │   │   ├── 📂 create
│   │   │   │   │   └── 📄 create.js
│   │   │   │   ├── 📂 css
│   │   │   │   │   └── 📄 crud.css
│   │   │   │   ├── 📂 dashboard
│   │   │   │   │   ├── 📄 dashboard.css
│   │   │   │   │   └── 📄 dashboard.js
│   │   │   │   ├── 📂 edit
│   │   │   │   │   ├── 📄 edit.css
│   │   │   │   │   └── 📄 edit.js
│   │   │   │   └── 📂 update
│   │   │   │       └── 📄 update.js
│   │   │   ├── 📄 nopage.js
│   │   │   └── 📂 user
│   │   │       ├── 📂 docs
│   │   │       │   ├── 📄 docsPage.css
│   │   │       │   └── 📄 docsPage.js
│   │   │       ├── 📂 grid
│   │   │       │   ├── 📄 gridPage.css
│   │   │       │   └── 📄 gridPage.js
│   │   │       ├── 📂 home
│   │   │       │   ├── 📄 home.css
│   │   │       │   └── 📄 home.js
│   │   │       ├── 📂 login
│   │   │       │   ├── 📄 login.css
│   │   │       │   └── 📄 login.js
│   │   │       └── 📂 report
│   │   │           ├── 📄 reportPage.css
│   │   │           └── 📄 reportPage.js
│   │   ├── 📂 redux
│   │   │   ├── 📄 dataSlice.js
│   │   │   └── 📄 store.js
│   │   ├── 📄 reportWebVitals.js
│   │   ├── 📄 route.js
│   │   └── 📄 setupTests.js
│   └── 📄 yarn.lock
└── 📄 README.md
```

# 📝 Tutorial

본 프론트엔드 레포지토리는 `/wanted` 디랙토리를 기준으로 `npm` 환경에서 실행됩니다.

프로젝트 설치에 앞서, `.env` 파일을 `/wanted` 디렉토리에 설정해주어야 합니다.
`.env` 파일은 다음과 같은 형식을 올바르게 포함해야 합니다.

```bash
REACT_APP_BACK_BASE_URL="(Your Backend path):(Your Backend Server Port)"
```

올바르게 설정이 완료되었다면, 다음 코드를 통해 프론트앤드 의존성 모듈을 설치합니다.

```bash
npm install
```

모든 준비 과정이 끝났다면, 다음 코드를 통해 프로젝트를 실행합니다.

```bash
npm start
```

